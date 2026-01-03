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

function NavLink({ href, children, onClick, size = 'desktop' }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const sizeClass = size === 'mobile' ? 'text-base' : 'text-sm';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        sizeClass,
        'font-medium tracking-[0.02em] transition-colors',
        isActive
          ? 'text-[var(--brand)]'
          : 'text-[var(--text)] hover:text-[var(--brand)]'
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

function LocaleMenu({ activeLocale, pathname, onBeforeSubmit, onAfterSubmit, align = 'right' }) {
  const formRef = useRef(null);

  const LOCALES = [
    { value: 'de', label: 'DE', flagSrc: '/img/flags/de.svg', flagAlt: 'Deutsch' },
    { value: 'en', label: 'EN', flagSrc: '/img/flags/gb.svg', flagAlt: 'English' },
    { value: 'es', label: 'ES', flagSrc: '/img/flags/es.svg', flagAlt: 'Español' }
  ];

  const current = LOCALES.find(l => l.value === activeLocale) ?? LOCALES[0];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      const root = formRef.current;
      if (!root) return;
      if (!root.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  function submitLocale(nextLocale) {
    const form = formRef.current;
    if (!form) return;

    if (typeof window !== 'undefined') {
      onBeforeSubmit?.(form);

      const url = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const hidden = form.querySelector('input[name="redirectTo"]');
      if (hidden) hidden.value = url;
    }

    const input = form.querySelector('input[name="locale"]');
    if (input) input.value = nextLocale;

    form.requestSubmit();
    setOpen(false);
    onAfterSubmit?.();
  }

  return (
    <form ref={formRef} action={changeLocale} className="relative inline-flex items-center">
      <input type="hidden" name="redirectTo" value={pathname || '/'} />
      <input type="hidden" name="locale" value={activeLocale} />

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="rounded-md border px-2 py-1 text-sm inline-flex items-center gap-2 transition-colors"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
        }}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <Image
          src={current.flagSrc}
          alt={current.flagAlt}
          width={16}
          height={16}
          className="rounded-[2px]"
        />
        <span className="font-medium tracking-[0.02em]">{current.label}</span>
        <span aria-hidden className="opacity-70">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className={[
            'absolute top-full mt-2 w-28 rounded-xl shadow-lg p-1 z-50',
            align === 'left' ? 'left-0' : 'right-0'
          ].join(' ')}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          {LOCALES.map((l) => {
            const isActive = l.value === activeLocale;
            return (
              <button
                key={l.value}
                type="button"
                role="menuitem"
                onClick={() => submitLocale(l.value)}
                className={[
                  'w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm tracking-[0.02em] transition-colors',
                  isActive ? 'bg-black/5' : 'hover:bg-black/5'
                ].join(' ')}
                style={{ color: 'var(--text)' }}
              >
                <Image
                  src={l.flagSrc}
                  alt={l.flagAlt}
                  width={16}
                  height={16}
                  className="rounded-[2px]"
                />
                <span className="font-medium">{l.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </form>
  );
}

export default function Navbar() {
  const t = useTranslations('Navbar');
  const activeLocale = useLocale();

  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop hover dropdowns
  const [offersOpen, setOffersOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  // Mobile accordions (cerrados por defecto)
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ✅ 1) Lock scroll del body cuando menu mobile está abierto
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevBody || '';
      document.documentElement.style.overflow = prevHtml || '';
    }

    return () => {
      document.body.style.overflow = prevBody || '';
      document.documentElement.style.overflow = prevHtml || '';
    };
  }, [mobileOpen]);

  // ✅ 2) Scroll handler: ignorar mientras el mobile menu está abierto
  useEffect(() => {
    const onScroll = () => {
      if (mobileOpen) return;

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
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

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

    setTimeout(() => requestAnimationFrame(tryScroll), 0);
  }, []);

  function onBeforeLocaleSubmit() {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(
      SCROLL_KEY,
      JSON.stringify({ x: window.scrollX, y: window.scrollY })
    );
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileOffersOpen(false);
    setMobileEventsOpen(false);
  }

  return (
    <nav
      className={[
        'fixed top-0 inset-x-0 z-50 w-full transition-transform duration-300 ease-in-out',
        visible ? 'translate-y-0' : '-translate-y-full'
      ].join(' ')}
      aria-label="Hauptnavigation"
    >
      <div
        className={[
          'w-full px-4 sm:px-6 lg:px-20',
          'h-32 flex items-center gap-6'
        ].join(' ')}
        style={{
          backgroundColor: 'var(--bg)',
          borderBottom: atTop ? '1px solid transparent' : '1px solid var(--border)',
        }}
      >
        {/* Logo izquierda */}
        <Link
          href="/"
          className="shrink-0 flex items-center gap-3"
          onClick={() => {
            setOffersOpen(false);
            setEventsOpen(false);
            closeMobile();
          }}
        >
          <Image
            src="/img/Corinne Vanarelli Logo.png"
            alt="Corinne Vanarelli - Soulcoaching"
            width={200}
            height={200}
            priority
          />
        </Link>

        {/* Menú desktop */}
        <ul className="hidden md:flex items-center gap-10 ml-auto">
          <li>
            <NavLink href="/" onClick={() => { setOffersOpen(false); setEventsOpen(false); }}>
              {t('home')}
            </NavLink>
          </li>

          <li>
            <NavLink href="/ueber-mich" onClick={() => { setOffersOpen(false); setEventsOpen(false); }}>
              {t('about')}
            </NavLink>
          </li>

          {/* Dropdown: Angebote */}
          <li
            className="relative"
            onMouseEnter={() => { setOffersOpen(true); setEventsOpen(false); }}
            onMouseLeave={() => setOffersOpen(false)}
          >
            <NavLink href="/book" onClick={() => { setOffersOpen(false); setEventsOpen(false); }}>
              <span className="inline-flex items-center gap-1">
                {t('offers')} <span aria-hidden className="opacity-70">▾</span>
              </span>
            </NavLink>

            <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${offersOpen ? 'block' : 'hidden'}`}>
              <div
                className="min-w-[240px] rounded-xl shadow-lg p-2"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <Link href="/angebote/ontologisches-coaching" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('ontologicalCoaching')}
                </Link>
                <Link href="/angebote/akasha-chronik-lesung" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('akashaReading')}
                </Link>
                <Link href="/angebote/hopi-herzheilung" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('hopiHeartHealing')}
                </Link>
                <Link href="/angebote/chakra-clearing" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('chakraClearing')}
                </Link>
                <Link href="/angebote/gwa" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('spinalAlignment')}
                </Link>
                <Link href="/angebote/doterra-aromatouch" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setOffersOpen(false)}>
                  {t('aromatouch')}
                </Link>
              </div>
            </div>
          </li>

          {/* Dropdown: Events */}
          <li
            className="relative"
            onMouseEnter={() => { setEventsOpen(true); setOffersOpen(false); }}
            onMouseLeave={() => setEventsOpen(false)}
          >
            <NavLink href="/events" onClick={() => { setEventsOpen(false); setOffersOpen(false); }}>
              <span className="inline-flex items-center gap-1">
                {t('events')} <span aria-hidden className="opacity-70">▾</span>
              </span>
            </NavLink>

            <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${eventsOpen ? 'block' : 'hidden'}`}>
              <div
                className="min-w-[220px] rounded-xl shadow-lg p-2"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <Link href="/events/seminars" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setEventsOpen(false)}>
                  {t('eventsSeminars')}
                </Link>
                <Link href="/events/retreats/costa-rica" className="block px-3 py-2 rounded-md text-sm hover:bg-black/5" style={{ color: 'var(--text)' }} onClick={() => setEventsOpen(false)}>
                  {t('eventsRetreats')}
                </Link>
              </div>
            </div>
          </li>

          {/* Blog */}
          <li>
            <NavLink href="/blog" onClick={() => { setOffersOpen(false); setEventsOpen(false); }}>
              {t('blog')}
            </NavLink>
          </li>

          <li>
            <NavLink href="/#kontakt" onClick={() => { setOffersOpen(false); setEventsOpen(false); }}>
              {t('contact')}
            </NavLink>
          </li>

          {/* Selector idioma (desktop) */}
          <li>
            <LocaleMenu
              activeLocale={activeLocale}
              pathname={pathname}
              onBeforeSubmit={onBeforeLocaleSubmit}
            />
          </li>
        </ul>

        {/* Mobile: idioma visible */}
        <div className="md:hidden ml-auto flex items-center gap-3">
          <LocaleMenu
            activeLocale={activeLocale}
            pathname={pathname}
            onBeforeSubmit={onBeforeLocaleSubmit}
            align="left"
          />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 ring-1"
            style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen ? 'true' : 'false'}
            onClick={() => {
              setMobileOpen(o => !o);
              setOffersOpen(false);
              setEventsOpen(false);
              if (!mobileOpen) {
                setMobileOffersOpen(false);
                setMobileEventsOpen(false);
              }
            }}
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
      </div>

      {/* Panel móvil */}
      {mounted && (
        <div
          className={[
            'md:hidden w-full border-t',
            'overflow-y-auto overscroll-contain',
            'transition-[max-height] duration-300 ease-in-out',
            mobileOpen ? 'max-h-[calc(100vh-8rem)]' : 'max-h-0',
          ].join(' ')}
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
          suppressHydrationWarning
        >
          <ul className="px-6 pb-8 pt-6 flex flex-col gap-4">
            <li><NavLink href="/" onClick={closeMobile} size="mobile">{t('home')}</NavLink></li>
            <li><NavLink href="/ueber-mich" onClick={closeMobile} size="mobile">{t('about')}</NavLink></li>

            {/* OFFERS accordion */}
            <li>
              <button
                type="button"
                className="w-full text-left text-base font-medium tracking-[0.02em] inline-flex items-center justify-between transition-colors"
                style={{ color: 'var(--text)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                aria-expanded={mobileOffersOpen ? 'true' : 'false'}
                onClick={() => {
                  setMobileOffersOpen(o => !o);
                  setMobileEventsOpen(false);
                }}
              >
                <span>{t('offers')}</span>
                <span aria-hidden className="opacity-70">{mobileOffersOpen ? '▴' : '▾'}</span>
              </button>
            </li>

            {mobileOffersOpen ? (
              <>
                <li className="pl-4">
                  <Link href="/angebote/ontologisches-coaching" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('ontologicalCoaching')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/angebote/akasha-chronik-lesung" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('akashaReading')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/angebote/hopi-herzheilung" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('hopiHeartHealing')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/angebote/chakra-clearing" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('chakraClearing')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/angebote/gwa" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('spinalAlignment')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/angebote/doterra-aromatouch" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('aromatouch')}
                  </Link>
                </li>
              </>
            ) : null}

            {/* EVENTS accordion */}
            <li className="mt-2">
              <button
                type="button"
                className="w-full text-left text-base font-medium tracking-[0.02em] inline-flex items-center justify-between transition-colors"
                style={{ color: 'var(--text)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                aria-expanded={mobileEventsOpen ? 'true' : 'false'}
                onClick={() => {
                  setMobileEventsOpen(o => !o);
                  setMobileOffersOpen(false);
                }}
              >
                <span>{t('events')}</span>
                <span aria-hidden className="opacity-70">{mobileEventsOpen ? '▴' : '▾'}</span>
              </button>
            </li>

            {mobileEventsOpen ? (
              <>
                <li className="pl-4">
                  <Link href="/events/seminars" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('eventsSeminars')}
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/events/retreats/costa-rica" onClick={closeMobile} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                    {t('eventsRetreats')}
                  </Link>
                </li>
              </>
            ) : null}

            {/* Blog */}
            <li className="mt-2"><NavLink href="/blog" onClick={closeMobile} size="mobile">{t('blog')}</NavLink></li>
            <li><NavLink href="/#kontakt" onClick={closeMobile} size="mobile">{t('contact')}</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
