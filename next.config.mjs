// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    const paymentsEnabled = (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED || "").trim() === "true";

    const self = "'self'";
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
    const supabaseHost = supabaseUrl ? new URL(supabaseUrl).origin : "";
    const vercelInsights = "https://vitals.vercel-insights.com";

    // ===== BASE (prod por defecto) =====
    // En producción necesitamos permitir inline scripts que Next inyecta para hidratar.
    let scriptSrc = `${self} 'unsafe-inline' ${vercelInsights}`;
    let styleSrc = `${self} 'unsafe-inline'`;
    let imgSrc = `${self} https: data: blob:`;
    let fontSrc = `${self} https: data:`;
    let connectSrc = `${self} ${supabaseHost || ""} https://*.supabase.co`;
    let frameSrc = `${self}`;

    if (paymentsEnabled) {
      frameSrc += " https://www.paypal.com https://www.sandbox.paypal.com";
      scriptSrc += " https://www.paypal.com https://www.sandbox.paypal.com";
      connectSrc += " https://www.paypal.com https://www.sandbox.paypal.com";
    }

    // ===== AFINES DEV =====
    if (!isProd) {
      // Next dev HMR necesita eval + websockets y localhost
      scriptSrc += " 'unsafe-eval'";
      connectSrc += " ws: http://localhost:* https://localhost:*";
      imgSrc += " http://localhost:* https://localhost:*";
      fontSrc += " http://localhost:* https://localhost:*";
      frameSrc += " http://localhost:* https://localhost:*";
    }

    const csp = [
      `default-src ${self}`,
      `script-src ${scriptSrc}`,
      `style-src ${styleSrc}`,
      `img-src ${imgSrc}`,
      `font-src ${fontSrc}`,
      `connect-src ${connectSrc}`,
      `frame-src ${frameSrc}`,
      `object-src 'none'`,
      `base-uri ${self}`,
      `form-action ${self}`,
      `frame-ancestors 'none'`,
      `upgrade-insecure-requests`,
    ].join("; ");

    const securityHeaders = [
      { key: "Content-Security-Policy", value: csp },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
