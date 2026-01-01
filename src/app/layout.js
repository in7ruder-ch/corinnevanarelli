import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// [i18n-add]
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.corinnevanarelli.ch"),
  title: {
    default: "Corinne Vanarelli",
    template: "%s | Corinne Vanarelli"
  },
  description: "Akasha-Chronik Lesung, Herzheilung & Coaching in Düdingen & online.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  openGraph: {
    siteName: "Corinne Vanarelli",
    images: [{ url: "/img/Banner.jpeg", width: 1200, height: 630 }]
  },
  twitter: { card: "summary_large_image" }
};

// [i18n-add] async para obtener locale + messages
export default async function RootLayout({ children }) {
  const locale = await getLocale();                 // 'de' por defecto hoy
  const messages = await getMessages(locale);       // carga segura con fallback

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div aria-hidden className="h-32" />
          <main className="">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
