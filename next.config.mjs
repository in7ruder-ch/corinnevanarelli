// next.config.mjs
/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // ----------------------
      // 1) Canonical host (SEO)
      // ----------------------
      {
        source: "/:path*",
        has: [{ type: "host", value: "corinnevanarelli.ch" }],
        destination: "https://www.corinnevanarelli.ch/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "corinnevanarelli.vercel.app" }],
        destination: "https://www.corinnevanarelli.ch/:path*",
        permanent: true,
      },

      // ----------------------
      // 2) Wix legacy routes -> /de/ (default locale)
      // ----------------------
      {
        source: "/service-page/:slug*",
        destination: "/de/angebote/:slug*",
        permanent: true,
      },
      {
        source: "/services-page",
        destination: "/de",
        permanent: true,
      },

      // ----------------------
      // 3) Legacy top-level -> /de/angebote/...
      // ----------------------
      {
        source: "/akasha-chronik-lesung",
        destination: "/de/angebote/akasha-chronik-lesung",
        permanent: true,
      },
      {
        source: "/chakra-clearing",
        destination: "/de/angebote/chakra-clearing",
        permanent: true,
      },
      {
        source: "/doterra-aromatouch",
        destination: "/de/angebote/doterra-aromatouch",
        permanent: true,
      },
      {
        source: "/hopi-herzheilung",
        destination: "/de/angebote/hopi-herzheilung",
        permanent: true,
      },
      {
        source: "/geistige-wirbelsäulenaufrichtung",
        destination: "/de/angebote/gwa",
        permanent: true,
      },
      {
        source: "/coaching",
        destination: "/de/angebote/ontologisches-coaching",
        permanent: true,
      },

      // ----------------------
      // 4) Umlaut duplicates
      // ----------------------
      {
        source: "/über-mich",
        destination: "/de/ueber-mich",
        permanent: true,
      },

      // ----------------------
      // 5) Old non-locale paths -> /de/ equivalent
      // ----------------------
      {
        source: "/angebote/:slug*",
        destination: "/de/angebote/:slug*",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/de/blog/:slug*",
        permanent: true,
      },
      {
        source: "/ueber-mich",
        destination: "/de/ueber-mich",
        permanent: true,
      },
      {
        source: "/events/:slug*",
        destination: "/de/events/:slug*",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/de/book",
        permanent: true,
      },
    ];
  },

  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    const self = "'self'";
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
    const supabaseHost = supabaseUrl ? new URL(supabaseUrl).origin : "";
    const vercelInsights = "https://vitals.vercel-insights.com";

    let scriptSrc = `${self} 'unsafe-inline' ${vercelInsights}`;
    let styleSrc = `${self} 'unsafe-inline'`;
    let imgSrc = `${self} https: data: blob:`;
    let fontSrc = `${self} https: data:`;
    let connectSrc = `${self} ${supabaseHost || ""} https://*.supabase.co`;
    let frameSrc = `${self}`;

    if (!isProd) {
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

const withNextIntl = createNextIntlPlugin("./i18n.js");
export default withNextIntl(nextConfig);