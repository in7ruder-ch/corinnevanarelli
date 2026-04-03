import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['de', 'en', 'es'],
  defaultLocale: 'de',
  localePrefix: 'always',
  localeDetection: false,
});

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip admin, api and static files entirely
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Let next-intl handle everything else — it sets the correct headers
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};