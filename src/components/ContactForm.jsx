'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('ContactForm');

  const [form, setForm] = useState({
    vorname: '',
    name: '',
    email: '',
    nachricht: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  // Scroll suave a #kontakt incluso viniendo desde otra ruta
  useEffect(() => {
    const NAV_OFFSET = 128;
    const smoothToKontakt = () => {
      if (typeof window === 'undefined') return;

      const shouldScroll =
        window.location.hash === '#kontakt' ||
        sessionStorage.getItem('scrollTo') === 'kontakt';
      if (!shouldScroll) return;

      const el = document.getElementById('kontakt');
      if (!el) return;

      const scrollOnce = () => {
        const top = Math.max(
          0,
          el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        );
        window.scrollTo({ top, behavior: 'smooth' });
      };

      setTimeout(scrollOnce, 50);
      const t2 = setTimeout(scrollOnce, 350);
      const t3 = setTimeout(scrollOnce, 900);

      if (window.location.hash !== '#kontakt') {
        window.history.replaceState(null, '', '/#kontakt');
      }
      sessionStorage.removeItem('scrollTo');

      return () => {
        clearTimeout(t2);
        clearTimeout(t3);
      };
    };

    const cleanup = smoothToKontakt();
    window.addEventListener('hashchange', smoothToKontakt);
    return () => {
      window.removeEventListener('hashchange', smoothToKontakt);
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || t('errors.unknown'));
      }

      setStatus('success');
      setMessage(t('feedback.success'));
      setForm({ vorname: '', name: '', email: '', nachricht: '' });
    } catch (err) {
      setStatus('error');
      setMessage(err.message || t('feedback.error'));
    }
  }

  return (
    <section
      id="kontakt"
      className="py-16 md:py-24 scroll-mt-32"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-[2rem] md:text-[2.75rem] leading-tight font-bold text-center"
          style={{ color: 'var(--text)' }}
        >
          {t('title')}
        </h2>

        {/* Tarjeta / formulario */}
        <div
          className="mt-8 rounded-2xl shadow-sm border"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'color-mix(in srgb, var(--brand) 35%, transparent)'
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 md:p-10 space-y-7"
            autoComplete="off"
            noValidate
          >
            {/* Vorname */}
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>
                {t('fields.vorname')} *
              </label>
              <input
                type="text"
                value={form.vorname}
                onChange={(e) => setForm({ ...form, vorname: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b focus:outline-none focus:ring-0 px-0 py-2"
                style={{
                  borderBottomColor: 'var(--border)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--brand)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>
                {t('fields.name')} *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b focus:outline-none focus:ring-0 px-0 py-2"
                style={{
                  borderBottomColor: 'var(--border)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--brand)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>
                {t('fields.email')} *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b focus:outline-none focus:ring-0 px-0 py-2"
                style={{
                  borderBottomColor: 'var(--border)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--brand)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
              />
            </div>

            {/* Nachricht */}
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--muted)' }}>
                {t('fields.nachricht')} *
              </label>
              <textarea
                rows={4}
                value={form.nachricht}
                onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                required
                className="w-full bg-transparent border-0 border-b focus:outline-none focus:ring-0 px-0 py-2 resize-none"
                style={{
                  borderBottomColor: 'var(--border)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--brand)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--border)')}
              />
            </div>

            {/* Botón + feedback */}
            <div className="pt-2 text-center space-y-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-2.5 rounded-lg text-white disabled:opacity-50 transition-colors"
                style={{ backgroundColor: 'var(--brand)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
              >
                {status === 'loading' ? t('actions.sending') : t('actions.send')}
              </button>

              {status !== 'idle' && (
                <div
                  className="text-sm"
                  style={{
                    color:
                      status === 'success'
                        ? 'var(--brand)'
                        : status === 'error'
                          ? '#B84A4A'
                          : 'var(--muted)',
                  }}
                >
                  {message}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Franja de contacto inferior */}
        <div className="mt-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x text-center" style={{ borderColor: 'var(--border)' }}>
              <li className="py-6 px-6">
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {t('footer.phone')}
                </div>
                <a
                  href="tel:+41797167212"
                  className="mt-2 inline-block underline underline-offset-4 hover:no-underline"
                  style={{ color: 'var(--brand)', textDecorationColor: 'var(--brand)' }}
                >
                  +41 79 716 7212
                </a>
              </li>

              <li className="py-6 px-6">
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {t('footer.email')}
                </div>
                <a
                  href="mailto:kontakt@corinnevanarelli.ch"
                  className="mt-2 inline-block underline underline-offset-4 hover:no-underline break-all"
                  style={{ color: 'var(--brand)', textDecorationColor: 'var(--brand)' }}
                >
                  kontakt@corinnevanarelli.ch
                </a>
              </li>

              <li className="py-6 px-6">
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {t('footer.address')}
                </div>
                <div className="mt-2" style={{ color: 'var(--text)' }}>
                  Gänsebergstrasse 12, 3186 Düdingen (FR)
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
