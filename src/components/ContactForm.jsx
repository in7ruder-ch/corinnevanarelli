'use client';

import { useEffect } from 'react';

export default function ContactForm() {
  // Scroll suave a #kontakt incluso viniendo desde otra ruta
  useEffect(() => {
    const NAV_OFFSET = 128; // ≈ h-32 de la navbar

    const smoothToKontakt = () => {
      if (typeof window === 'undefined') return;

      const shouldScroll =
        window.location.hash === '#kontakt' ||
        sessionStorage.getItem('scrollTo') === 'kontakt';

      if (!shouldScroll) return;

      const el = document.getElementById('kontakt');
      if (!el) return;

      const scrollOnce = () => {
        const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
        window.scrollTo({ top, behavior: 'smooth' });
      };

      // reintentos por layout async (imágenes/fuentes)
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

  return (
    <section id="kontakt" className="bg-[#f5f5f5] py-16 md:py-24 scroll-mt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[2rem] md:text-[2.75rem] leading-tight font-bold text-neutral-900 text-center">
          Kontakt
        </h2>

        {/* Tarjeta / formulario */}
        <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
          <form className="p-6 sm:p-8 md:p-10 space-y-7" autoComplete="off" noValidate>
            {/* Vorname */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">Vorname *</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
                suppressHydrationWarning
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">Name *</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
                suppressHydrationWarning
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2"
                suppressHydrationWarning
              />
            </div>

            {/* Nachricht */}
            <div>
              <label className="block text-sm text-neutral-700 mb-2">Nachricht *</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full bg-transparent border-0 border-b border-neutral-300 focus:border-neutral-700 focus:outline-none focus:ring-0 px-0 py-2 resize-none"
                suppressHydrationWarning
              />
            </div>

            {/* Botón minimal centrado */}
            <div className="pt-2 text-center">
              <button
                type="button"
                className="text-neutral-700 hover:text-neutral-900"
                suppressHydrationWarning
              >
                Senden
              </button>
            </div>
          </form>
        </div>

        {/* Franja de contacto inferior */}
        <div className="mt-12 border-t border-neutral-900">
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-900 text-center">
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">Telefon</div>
                <a href="tel:+41797167212" className="mt-2 inline-block underline hover:no-underline">
                  +41 79 716 7212
                </a>
              </li>
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">E-mail</div>
                <a
                  href="mailto:kontakt@corinnevanarelli.ch"
                  className="mt-2 inline-block underline hover:no-underline break-all"
                >
                  kontakt@corinnevanarelli.ch
                </a>
              </li>
              <li className="py-6 px-6">
                <div className="text-sm text-neutral-600">Adresse</div>
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
