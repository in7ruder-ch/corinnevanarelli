import { NextResponse } from 'next/server';

const LOCALES = ['de', 'en', 'es'];
const DEFAULT_LOCALE = 'de';

// Paths that bypass locale routing entirely
const PUBLIC_PREFIXES = ['/admin', '/api', '/_next', '/img', '/flags'];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip static files and excluded paths
  if (
    PUBLIC_PREFIXES.some(p => pathname.startsWith(p)) ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a valid locale
  const pathnameHasLocale = LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return NextResponse.next();

  // No locale in URL — redirect to default locale
  const locale = DEFAULT_LOCALE;
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};