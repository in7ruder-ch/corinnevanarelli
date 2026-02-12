import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["de", "en", "es"],
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: false,
});

export function middleware(request) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};