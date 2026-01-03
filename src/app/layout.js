import "./globals.css";
import Navbar from "@/components/Navbar";

// Fonts
import {
  Inter,
  Allura,
  Cormorant,
  Cormorant_Garamond,
} from "next/font/google";

// [i18n-add]
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/lib/i18n";
import { getLocale } from "next-intl/server";

// Inter = base
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Allura = claim puntual
const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

// Cormorant Garamond = textos largos (blog / retreat)
const cormorantLong = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-long",
});

// ✅ Cormorant = Headings (Old Style / Garalde)
const cormorantTitle = Cormorant({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-title",
});

export const metadata = {
  metadataBase: new URL("https://www.corinnevanarelli.ch"),
  title: {
    default: "Corinne Vanarelli",
    template: "%s | Corinne Vanarelli",
  },
  description: "Akasha-Chronik Lesung, Herzheilung & Coaching in Düdingen & online.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: "Corinne Vanarelli",
    images: [{ url: "/img/banner3.webp", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

// [i18n-add]
export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${inter.variable} ${allura.variable} ${cormorantLong.variable} ${cormorantTitle.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
