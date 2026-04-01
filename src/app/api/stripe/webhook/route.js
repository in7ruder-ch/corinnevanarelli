import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';
import { getSupabaseService } from '@/lib/supabaseService';

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

    console.log('Stripe checkout.session.completed received:', {
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
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}