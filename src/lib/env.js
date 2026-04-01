// src/lib/env.js

function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const env = {
  get stripeSecretKey() { return requireEnv('STRIPE_SECRET_KEY'); },
  get stripeWebhookSecret() { return requireEnv('STRIPE_WEBHOOK_SECRET'); },
  get siteUrl() { return requireEnv('NEXT_PUBLIC_SITE_URL'); },
};