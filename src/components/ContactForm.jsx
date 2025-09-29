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
      className="bg-[#f5f5f5] py-16 md:py-24 scroll-mt-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[2rem] md:text-[2.75rem] leading-tight font-bold text-neutral-900 text-center">
          {t('title')}
        </h2>

        {/* Tarjeta / formulario */}
        <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 md:p-10 space-y-7"
            autoComplete="off"
            noValidate
          >
            {/* Vorname */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                {t('fields.vorname')} *
              </label>
              <input
                type="text"
                value={form.vorname}
                onChange={(e) =>
                  setForm({ ...form, vorname: e.target.value })
                }
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                {t('fields.name')} *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                {t('fields.email')} *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
              />
            </div>

            {/* Nachricht */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                {t('fields.nachricht')} *
              </label>
              <textarea
                rows={4}
                value={form.nachricht}
                onChange={(e) =>
                  setForm({ ...form, nachricht: e.target.value })
                }
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2 resize-none"
              />
            </div>

            {/* Botón + feedback */}
            <div className="pt-2 text-center space-y-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-900 disabled:opacity-50"
              >
                {status === 'loading' ? t('actions.sending') : t('actions.send')}
              </button>

              {status !== 'idle' && (
                <div
                  className={`text-sm ${
                    status === 'success'
                      ? 'text-green-600'
                      : status === 'error'
                      ? 'text-red-600'
                      : 'text-neutral-600'
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Franja de contacto inferior */}
        <div className="mt-12 border-t border-neutral-900">
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-900 text-center">
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">{t('footer.phone')}</div>
                <a
                  href="tel:+41797167212"
                  className="mt-2 inline-block underline hover:no-underline"
                >
                  +41 79 716 7212
                </a>
              </li>
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">{t('footer.email')}</div>
                <a
                  href="mailto:kontakt@corinnevanarelli.ch"
                  className="mt-2 inline-block underline hover:no-underline break-all"
                >
                  kontakt@corinnevanarelli.ch
                </a>
              </li>
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">{t('footer.address')}</div>
                <div className="mt-2">
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
