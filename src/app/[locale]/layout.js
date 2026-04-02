import Navbar from '@/components/Navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const SUPPORTED = ['de', 'en', 'es'];

export async function generateStaticParams() {
  return [
    { locale: 'de' },
    { locale: 'en' },
    { locale: 'es' },
  ];
}

export const metadata = {
  metadataBase: new URL('https://www.corinnevanarelli.ch'),
  title: {
    default: 'Corinne Vanarelli',
    template: '%s | Corinne Vanarelli',
  },
  description: 'Akasha-Chronik Lesung, Herzheilung & Coaching in Düdingen & online.',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    siteName: 'Corinne Vanarelli',
    images: [{ url: '/img/banner3.webp', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!SUPPORTED.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}