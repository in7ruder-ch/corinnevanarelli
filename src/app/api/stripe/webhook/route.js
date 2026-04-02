import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { getSupabaseService } from '@/lib/supabaseService';
import { sendBookingPaidEmail } from '@/lib/mailer';

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.stripeWebhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const supabase = getSupabaseService();
    const product = session.metadata?.product;

    // ── Ebook ────────────────────────────────────────────────────────────────
    if (product === 'ebook') {
      console.log('Stripe checkout.session.completed [ebook]:', {
        sessionId: session.id,
        email: session.customer_details?.email || session.customer_email || null,
        paymentIntent: session.payment_intent || null,
        status: session.payment_status,
      });

      const { error } = await supabase.from('ebook_purchases').insert({
        email: session.customer_details?.email || session.customer_email || null,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent || null,
        status: session.payment_status || 'paid',
      });

      if (error) {
        console.error('Supabase insert error [ebook]:', error);
        return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
      }
    }

    // ── Booking ──────────────────────────────────────────────────────────────
    if (product === 'booking') {
      const bookingId = session.metadata?.bookingId;

      console.log('Stripe checkout.session.completed [booking]:', {
        sessionId: session.id,
        bookingId,
        email: session.customer_details?.email || null,
        paymentIntent: session.payment_intent || null,
        status: session.payment_status,
      });

      if (!bookingId) {
        console.error('Missing bookingId in metadata');
        return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
      }

      // Actualizamos el booking a PAID
      const { error: updateErr } = await supabase
        .from('bookings')
        .update({
          status: 'PAID',
          hold_until: null,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent || null,
        })
        .eq('id', bookingId)
        .eq('status', 'HOLD');

      if (updateErr) {
        console.error('Supabase update error [booking]:', updateErr);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      // Cargamos booking + servicio para el email
      const { data: booking } = await supabase
        .from('bookings')
        .select('id, start_at, end_at, customer_name, customer_email, service_id')
        .eq('id', bookingId)
        .maybeSingle();

      const { data: service } = await supabase
        .from('services')
        .select('id, title_de, duration_min, price_chf')
        .eq('id', booking?.service_id)
        .maybeSingle();

      // Enviamos email de confirmación (non-fatal)
      try {
        await sendBookingPaidEmail({
          booking,
          service: service || { title_de: bookingId, duration_min: 60, price_chf: 0 },
        });
      } catch (mailErr) {
        console.error('Email error [booking webhook] (non-fatal):', mailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}