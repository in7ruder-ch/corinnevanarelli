'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function NavLink({ href, children, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'text-[1.2rem] md:text-[1.2rem] font-medium transition-colors',
        isActive ? 'text-[#6d8f5e]' : 'text-neutral-700 hover:text-neutral-900'
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false); // ⬅️ controla el dropdown de “Angebote”
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const delta = y - lastY.current;
        const threshold = 6;
        if (Math.abs(delta) > threshold) {
          if (delta > 0 && y > 80) setVisible(false);
          else setVisible(true);
        }
        setAtTop(y <= 8);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  return (
    <nav
      className={[
        'fixed top-0 inset-x-0 z-50 w-full transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full'
      ].join(' ')}
      aria-label="Hauptnavigation"
    >
      {/* Barra */}
      <div
        className={[
          'w-full px-4 sm:px-6 lg:px-20',
          'h-32 flex items-center gap-6',
          atTop ? 'bg-white' : 'bg-white'
        ].join(' ')}
      >
        {/* Logo izquierda */}
        <Link href="/" className="shrink-0 flex items-center gap-3" onClick={() => setOffersOpen(false)}>
          <Image
            src="/img/Corinne Vanarelli Logo.png"
            alt="Corinne Vanarelli — Soulcoaching"
            width={200}
            height={200}
            priority
          />
        </Link>

        {/* Menú desktop (alineado a la derecha) */}
        <ul className="hidden md:flex items-center gap-10 ml-auto">
          <li><NavLink href="/" onClick={() => setOffersOpen(false)}>Home</NavLink></li>
          <li><NavLink href="/ueber-mich" onClick={() => setOffersOpen(false)}>Über mich</NavLink></li>

          {/* Dropdown: Angebote (linkea a /book, controlado por estado) */}
          <li
            className="relative"
            onMouseEnter={() => setOffersOpen(true)}
            onMouseLeave={() => setOffersOpen(false)}
          >
            <NavLink href="/book" onClick={() => setOffersOpen(false)}>
              <span className="inline-flex items-center gap-1">
                Angebote <span aria-hidden>▾</span>
              </span>
            </NavLink>

            {/* Submenú con “puente” de hover (pt-3). Visible según estado */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${offersOpen ? 'block' : 'hidden'}`}>
              <div className="min-w-[240px] rounded-xl border bg-white shadow-lg p-2">
                <Link
                  href="/angebote/ontologisches-coaching"
                  className="block px-3 py-2 rounded-md hover:bg-neutral-100"
                  onClick={() => setOffersOpen(false)}
                >
                  Ontologisches Coaching
                </Link>
                {/* Agregaremos los demás items más adelante */}
              </div>
            </div>
          </li>

          <li><NavLink href="/kontakt" onClick={() => setOffersOpen(false)}>Kontakt</NavLink></li>
        </ul>

        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 ring-1 ring-neutral-300"
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen ? 'true' : 'false'}
          onClick={() => { setMobileOpen(o => !o); setOffersOpen(false); }}
        >
          <svg
            className={`h-5 w-5 transition-transform ${mobileOpen ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Panel móvil (único) */}
      <div
        className={[
          'md:hidden w-full overflow-hidden transition-[max-height] duration-300 ease-in-out',
          mobileOpen ? 'max-h-96' : 'max-h-0',
          atTop ? 'bg-white' : 'bg-white/90 backdrop-blur'
        ].join(' ')}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-neutral-200">
          <li><NavLink href="/" onClick={() => setMobileOpen(false)}>Home</NavLink></li>
          <li><NavLink href="/ueber-mich" onClick={() => setMobileOpen(false)}>Über mich</NavLink></li>

          {/* “Angebote” apunta a /book en móvil */}
          <li><NavLink href="/book" onClick={() => setMobileOpen(false)}>Angebote</NavLink></li>
          <li className="pl-4">
            <Link
              href="/angebote/ontologisches-coaching"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-neutral-700 hover:text-neutral-900"
            >
              Ontologisches Coaching
            </Link>
          </li>

          <li><NavLink href="/kontakt" onClick={() => setMobileOpen(false)}>Kontakt</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
