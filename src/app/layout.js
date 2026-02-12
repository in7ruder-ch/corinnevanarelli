import "./globals.css";
import {
  Inter,
  Allura,
  Cormorant,
  Cormorant_Garamond,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const cormorantLong = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-long",
});

const cormorantTitle = Cormorant({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-title",
});

export const metadata = {
  metadataBase: new URL("https://www.corinnevanarelli.ch"),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ✅ Este es el ÚNICO layout que retorna <html> y <body>
export default function RootLayout({ children }) {
  return (
    <html className={`scroll-smooth ${inter.variable} ${allura.variable} ${cormorantLong.variable} ${cormorantTitle.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}