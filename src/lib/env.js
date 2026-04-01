export const env = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
};

if (!env.stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables.');
}

if (!env.stripeWebhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET in environment variables.');
}

if (!env.siteUrl) {
  throw new Error('Missing NEXT_PUBLIC_SITE_URL in environment variables.');
}