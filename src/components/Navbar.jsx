'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// [i18n-add]
import { useTranslations, useLocale } from 'next-intl';
// [i18n-add]
import { changeLocale } from '@/actions/locale';

const SCROLL_KEY = 'scroll:after-locale';

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
  // [i18n-add]
  const t = useTranslations('Navbar');
  const activeLocale = useLocale();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  // [hydrate-fix] saber cuándo el componente está montado en cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  // submit inmediato del select (GUARDA scroll y preserva URL completa)
  function submitOnChange(e) {
    const form = e.currentTarget.form;
    if (!form) return;

    if (typeof window !== 'undefined') {
      // 1) guardar posición actual
      sessionStorage.setItem(
        SCROLL_KEY,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );

      // 2) asegurar redirect a path+query+hash actuales
      const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const hidden = form.querySelector('input[name="redirectTo"]');
      if (hidden) hidden.value = url;
    }

    form.requestSubmit();
  }

  // --- Restaurar posición de scroll después de cambiar el idioma ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return;

    sessionStorage.removeItem(SCROLL_KEY);
    const { x = 0, y = 0 } = JSON.parse(raw) || {};

    let tries = 0;
    const maxTries = 20;

    const tryScroll = () => {
      const ready =
        document.readyState === 'complete' ||
        (document.body && document.body.scrollHeight >= y);

      if (ready || tries >= maxTries) {
        window.scrollTo(x, y);
        return;
      }

      tries += 1;
      requestAnimationFrame(tryScroll);
    };

    // pequeño delay post-hidratación
    setTimeout(() => requestAnimationFrame(tryScroll), 0);
  }, []);

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
          <li><NavLink href="/" onClick={() => setOffersOpen(false)}>{t('home')}</NavLink></li>
          <li><NavLink href="/ueber-mich" onClick={() => setOffersOpen(false)}>{t('about')}</NavLink></li>

          {/* Dropdown: Angebote */}
          <li
            className="relative"
            onMouseEnter={() => setOffersOpen(true)}
            onMouseLeave={() => setOffersOpen(false)}
          >
            <NavLink href="/book" onClick={() => setOffersOpen(false)}>
              <span className="inline-flex items-center gap-1">
                {t('offers')} <span aria-hidden>▾</span>
              </span>
            </NavLink>

            {/* Submenú con “puente” */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${offersOpen ? 'block' : 'hidden'}`}>
              <div className="min-w-[240px] rounded-xl border bg-white shadow-lg p-2">
                <Link href="/angebote/ontologisches-coaching" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('ontologicalCoaching')}
                </Link>
                <Link href="/angebote/akasha-chronik-lesung" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('akashaReading')}
                </Link>
                <Link href="/angebote/hopi-herzheilung" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('hopiHeartHealing')}
                </Link>
                <Link href="/angebote/chakra-clearing" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('chakraClearing')}
                </Link>
                <Link href="/angebote/gwa" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('spinalAlignment')}
                </Link>
                <Link href="/angebote/doterra-aromatouch" className="block px-3 py-2 rounded-md hover:bg-neutral-100" onClick={() => setOffersOpen(false)}>
                  {t('aromatouch')}
                </Link>
              </div>
            </div>
          </li>

          {/* Kontakt → sección #kontakt en Home */}
          <li><NavLink href="/#kontakt" onClick={() => setOffersOpen(false)}>{t('contact')}</NavLink></li>

          {/* Selector de idioma (desktop) */}
          <li>
            <form action={changeLocale} className="inline-flex items-center">
              <input type="hidden" name="redirectTo" value={pathname || '/'} />
              <label htmlFor="locale-select" className="sr-only">Sprache</label>
              <select
                id="locale-select"
                name="locale"
                key={activeLocale}                         // [hydrate-fix]
                defaultValue={activeLocale}
                onChange={submitOnChange}
                suppressHydrationWarning                   // [hydrate-fix]
                className="rounded-md border border-neutral-300 px-2 py-1 text-sm text-neutral-700"
              >
                <option value="de">DE</option>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </form>
          </li>
        </ul>

        {/* Botón hamburguesa móvil */}
        <button
          type="button"
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 ring-1 ring-neutral-300"
          aria-label="Menü öffnen"
          aria-expanded={mobileOpen ? 'true' : 'false'}
          onClick={() => { setMobileOpen(o => !o); setOffersOpen(false); }}
          suppressHydrationWarning
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

      {/* Panel móvil (único) — se renderiza solo tras mount */}
      {mounted && (
        <div
          className={[
            'md:hidden w-full overflow-auto transition-[max-height] duration-300 ease-in-out',
            mobileOpen ? 'max-h-[calc(100vh-8rem)]' : 'max-h-0',
            atTop ? 'bg-white' : 'bg-white/90 backdrop-blur'
          ].join(' ')}
          suppressHydrationWarning
        >
          <ul className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-neutral-200">
            <li><NavLink href="/" onClick={() => setMobileOpen(false)}>{t('home')}</NavLink></li>
            <li><NavLink href="/ueber-mich" onClick={() => setMobileOpen(false)}>{t('about')}</NavLink></li>
            {/* “Angebote” apunta a /book en móvil */}
            <li><NavLink href="/book" onClick={() => setMobileOpen(false)}>{t('offers')}</NavLink></li>

            <li className="pl-4">
              <Link href="/angebote/ontologisches-coaching" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('ontologicalCoaching')}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/angebote/akasha-chronik-lesung" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('akashaReading')}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/angebote/hopi-herzheilung" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('hopiHeartHealing')}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/angebote/chakra-clearing" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('chakraClearing')}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/angebote/gwa" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('spinalAlignment')}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/angebote/doterra-aromatouch" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-700 hover:text-neutral-900">
                {t('aromatouch')}
              </Link>
            </li>

            {/* Kontakt → #kontakt en Home */}
            <li><NavLink href="/#kontakt" onClick={() => setMobileOpen(false)}>{t('contact')}</NavLink></li>

            {/* Selector idioma (mobile) */}
            <li className="pt-2">
              <form action={changeLocale} className="flex items-center">
                <input type="hidden" name="redirectTo" value={pathname || '/'} />
                <label htmlFor="locale-select-mobile" className="sr-only">Sprache</label>
                <select
                  id="locale-select-mobile"
                  name="locale"
                  key={activeLocale}                       // [hydrate-fix]
                  defaultValue={activeLocale}
                  onChange={submitOnChange}
                  suppressHydrationWarning                 // [hydrate-fix]
                  className="rounded-md border border-neutral-300 px-2 py-1 text-sm text-neutral-700"
                >
                  <option value="de">DE</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
