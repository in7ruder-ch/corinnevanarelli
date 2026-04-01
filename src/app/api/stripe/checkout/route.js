import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { env } from '@/lib/env';

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',

      metadata: {
        product: 'ebook',
      },

      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: 'Ebook',
            },
            unit_amount: 2600,
          },
          quantity: 1,
        },
      ],

      success_url: `${env.siteUrl}/ebook/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}/ebook/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}