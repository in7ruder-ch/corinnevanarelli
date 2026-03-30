'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { changeLocale } from '@/actions/locale';

const SCROLL_KEY = 'scroll:after-locale';

const LOCALES = [
  { value: 'de', label: 'DE', flagSrc: '/img/flags/de.svg', flagAlt: 'Deutsch' },
  { value: 'en', label: 'EN', flagSrc: '/img/flags/gb.svg', flagAlt: 'English' },
  { value: 'es', label: 'ES', flagSrc: '/img/flags/es.svg', flagAlt: 'Español' },
];

const NAV_LINKS = [
  { href: '/',           tKey: 'home' },
  { href: '/ueber-mich', tKey: 'about' },
];
const NAV_LINKS_RIGHT = [
  { href: '/blog',     tKey: 'blog' },
  { href: '/#kontakt', tKey: 'contact' },
];

const DROPDOWNS = [
  {
    tKey: 'offers',
    href: '/book',
    stateKey: 'offers',
    items: [
      { href: '/angebote/ontologisches-coaching', tKey: 'ontologicalCoaching' },
      { href: '/angebote/akasha-chronik-lesung',  tKey: 'akashaReading' },
      { href: '/angebote/hopi-herzheilung',        tKey: 'hopiHeartHealing' },
      { href: '/angebote/chakra-clearing',         tKey: 'chakraClearing' },
      { href: '/angebote/gwa',                     tKey: 'spinalAlignment' },
      { href: '/angebote/doterra-aromatouch',      tKey: 'aromatouch' },
    ],
  },
  {
    tKey: 'events',
    href: '/events',
    stateKey: 'events',
    items: [
      { href: '/events/retreats/costa-rica', tKey: 'eventsRetreats' },
    ],
  },
];

function NavLink({ href, children, onClick, size = 'desktop' }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        size === 'mobile' ? 'text-base' : 'text-sm',
        'font-medium tracking-[0.02em] transition-colors',
        isActive ? 'text-[var(--brand)]' : 'text-[var(--text)] hover:text-[var(--brand)]',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

function LocaleMenu({ activeLocale, pathname, onBeforeSubmit, onAfterSubmit, align = 'right' }) {
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
  const current = LOCALES.find(l => l.value === activeLocale) ?? LOCALES[0];

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open || !formRef.current?.contains(e.target)) setOpen(false);
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
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text)' }}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
      >
        <Image src={current.flagSrc} alt={current.flagAlt} width={16} height={16} className="rounded-[2px]" />
        <span className="font-medium tracking-[0.02em]">{current.label}</span>
        <span aria-hidden className="opacity-70">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className={['absolute top-full mt-2 w-28 rounded-xl shadow-lg p-1 z-50', align === 'left' ? 'left-0' : 'right-0'].join(' ')}
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {LOCALES.map((l) => (
            <button
              key={l.value}
              type="button"
              role="menuitem"
              onClick={() => submitLocale(l.value)}
              className={['w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm tracking-[0.02em] transition-colors', l.value === activeLocale ? 'bg-black/5' : 'hover:bg-black/5'].join(' ')}
              style={{ color: 'var(--text)' }}
            >
              <Image src={l.flagSrc} alt={l.flagAlt} width={16} height={16} className="rounded-[2px]" />
              <span className="font-medium">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

export default function Navbar() {
  const t = useTranslations('Navbar');
  const activeLocale = useLocale();
  const pathname = usePathname();

  const [visible, setVisible]       = useState(true);
  const [atTop, setAtTop]           = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(null);
  const [mobileOpen2, setMobileOpen2] = useState(null);

  const lastY   = useRef(0);
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? 'hidden' : prev;
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : prev;
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (mobileOpen) return;
      const y = window.scrollY || 0;
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const delta = y - lastY.current;
        if (Math.abs(delta) > 6) {
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
    const onResize = () => { if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return;
    sessionStorage.removeItem(SCROLL_KEY);
    const { x = 0, y = 0 } = JSON.parse(raw) || {};
    let tries = 0;
    const tryScroll = () => {
      const ready = document.readyState === 'complete' || document.body?.scrollHeight >= y;
      if (ready || tries >= 20) { window.scrollTo(x, y); return; }
      tries++;
      requestAnimationFrame(tryScroll);
    };
    setTimeout(() => requestAnimationFrame(tryScroll), 0);
  }, []);

  function onBeforeLocaleSubmit() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ x: window.scrollX, y: window.scrollY }));
    }
  }

  function closeAll() {
    setMobileOpen(false);
    setMobileOpen2(null);
    setDesktopOpen(null);
  }

  return (
    <nav
      className={['fixed top-0 inset-x-0 z-50 w-full transition-transform duration-300 ease-in-out', visible ? 'translate-y-0' : '-translate-y-full'].join(' ')}
      aria-label="Hauptnavigation"
    >
      {/* ── Bar ── */}
      <div
        className="w-full px-4 sm:px-6 lg:px-20 h-32 flex items-center gap-6"
        style={{ backgroundColor: 'var(--bg)', borderBottom: atTop ? '1px solid transparent' : '1px solid var(--border)' }}
      >
        <Link href="/" className="shrink-0 flex items-center gap-3" onClick={closeAll}>
          <Image src="/img/Corinne Vanarelli Logo.png" alt="Corinne Vanarelli - Soulcoaching" width={200} height={200} priority />
        </Link>

        {/* ── Desktop menu ── */}
        <ul className="hidden md:flex items-center gap-10 ml-auto">
          {NAV_LINKS.map(({ href, tKey }) => (
            <li key={href}>
              <NavLink href={href} onClick={() => setDesktopOpen(null)}>{t(tKey)}</NavLink>
            </li>
          ))}

          {DROPDOWNS.map(({ tKey, href, stateKey, items }) => (
            <li
              key={stateKey}
              className="relative"
              onMouseEnter={() => setDesktopOpen(stateKey)}
              onMouseLeave={() => setDesktopOpen(null)}
            >
              <NavLink href={href} onClick={() => setDesktopOpen(null)}>
                <span className="inline-flex items-center gap-1">
                  {t(tKey)} <span aria-hidden className="opacity-70">▾</span>
                </span>
              </NavLink>

              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${desktopOpen === stateKey ? 'block' : 'hidden'}`}>
                <div className="min-w-[220px] rounded-xl shadow-lg p-2" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  {items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDesktopOpen(null)}
                      className="block px-3 py-2 rounded-md text-sm hover:bg-black/5"
                      style={{ color: 'var(--text)' }}
                    >
                      {t(item.tKey)}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}

          {NAV_LINKS_RIGHT.map(({ href, tKey }) => (
            <li key={href}>
              <NavLink href={href} onClick={() => setDesktopOpen(null)}>{t(tKey)}</NavLink>
            </li>
          ))}

          <li>
            <LocaleMenu activeLocale={activeLocale} pathname={pathname} onBeforeSubmit={onBeforeLocaleSubmit} />
          </li>
        </ul>

        {/* ── Mobile: locale + hamburger ── */}
        <div className="md:hidden ml-auto flex items-center gap-3">
          <LocaleMenu activeLocale={activeLocale} pathname={pathname} onBeforeSubmit={onBeforeLocaleSubmit} align="left" />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 ring-1"
            style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen ? 'true' : 'false'}
            onClick={() => { setMobileOpen(o => !o); setMobileOpen2(null); }}
            suppressHydrationWarning
          >
            <svg className={`h-5 w-5 transition-transform ${mobileOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile panel ── */}
      {mounted && (
        <div
          className={['md:hidden w-full border-t overflow-y-auto overscroll-contain transition-[max-height] duration-300 ease-in-out', mobileOpen ? 'max-h-[calc(100vh-8rem)]' : 'max-h-0'].join(' ')}
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          suppressHydrationWarning
        >
          <ul className="px-6 pb-8 pt-6 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, tKey }) => (
              <li key={href}>
                <NavLink href={href} onClick={closeAll} size="mobile">{t(tKey)}</NavLink>
              </li>
            ))}

            {DROPDOWNS.map(({ tKey, stateKey, items }) => (
              <Fragment key={stateKey}>
                <li className="mt-2">
                  <button
                    type="button"
                    className="w-full text-left text-base font-medium tracking-[0.02em] inline-flex items-center justify-between transition-colors"
                    style={{ color: 'var(--text)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                    aria-expanded={mobileOpen2 === stateKey ? 'true' : 'false'}
                    onClick={() => setMobileOpen2(k => k === stateKey ? null : stateKey)}
                  >
                    <span>{t(tKey)}</span>
                    <span aria-hidden className="opacity-70">{mobileOpen2 === stateKey ? '▴' : '▾'}</span>
                  </button>
                </li>

                {mobileOpen2 === stateKey && items.map(item => (
                  <li key={item.href} className="pl-4">
                    <Link href={item.href} onClick={closeAll} className="text-sm hover:underline" style={{ color: 'var(--text)' }}>
                      {t(item.tKey)}
                    </Link>
                  </li>
                ))}
              </Fragment>
            ))}

            {NAV_LINKS_RIGHT.map(({ href, tKey }) => (
              <li key={href} className="mt-2">
                <NavLink href={href} onClick={closeAll} size="mobile">{t(tKey)}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}