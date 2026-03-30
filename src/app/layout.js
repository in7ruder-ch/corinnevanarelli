import './globals.css';
import {
  Inter,
  Allura,
  Cormorant,
  Cormorant_Garamond,
} from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const allura = Allura({ weight: '400', subsets: ['latin'], variable: '--font-script' });
const cormorantLong = Cormorant_Garamond({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-long' });
const cormorantTitle = Cormorant({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-title' });

export default function RootLayout({ children }) {
  return (
    <html
      lang="de"
      className={`scroll-smooth ${inter.variable} ${allura.variable} ${cormorantLong.variable} ${cormorantTitle.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}