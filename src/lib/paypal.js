export function paypalBaseUrl() {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export async function paypalAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!client || !secret) throw new Error("Missing PayPal credentials");

  const auth = Buffer.from(`${client}:${secret}`).toString("base64");
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal token error: ${t}`);
  }
  const json = await res.json();
  return json.access_token;
}
