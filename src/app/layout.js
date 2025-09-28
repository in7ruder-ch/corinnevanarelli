import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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


export default function RootLayout({ children }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {/* navbar fija de 8rem -> padding top 8rem */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
