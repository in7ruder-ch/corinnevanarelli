'use client';

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Section from "./Section";

export default function Testimonials({ items: itemsProp }) {
  const t = useTranslations("Testimonials");

  // Si no pasan items por props, usamos i18n (4 ítems como en tu versión)
  const fallbackItems = [
    { name: t("items.0.name"), text: t("items.0.text") },
    { name: t("items.1.name"), text: t("items.1.text") },
    { name: t("items.2.name"), text: t("items.2.text") },
    { name: t("items.3.name"), text: t("items.3.text") },
  ];
  const items = itemsProp?.length ? itemsProp : fallbackItems;

  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % items.length);
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleUserNav = (fn) => () => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 6000);
  };

  const tItem = items[i];

  return (
    <Section
      id="stimmen"
      className="bg-white pt-16 pb-16 md:pb-24"
      containerClass="relative mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      {/* Cita centrada */}
      <div className="mx-auto max-w-4xl text-center min-h-[30rem] sm:min-h-[30rem] md:min-h-[25rem] lg:min-h-[25rem] flex flex-col justify-center">
        <div className="text-5xl md:text-6xl text-neutral-900">“</div>
        <p
          className="font-bold mt-6 text-xl md:text-2xl lg:text-[28px] leading-relaxed text-neutral-800 [text-wrap:balance]"
          aria-live="polite"
        >
          {tItem.text}
        </p>
        <p className="mt-6 text-sm text-neutral-600">- {tItem.name}</p>

        {/* Puntos */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={handleUserNav(() => setI(idx))}
              aria-label={t("dotAria", { index: idx + 1 })}
              className={[
                "h-2 w-2 rounded-full transition-opacity",
                i === idx ? "opacity-100 bg-neutral-800" : "opacity-40 bg-neutral-500 hover:opacity-70"
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Flechas izquierda/derecha (ocultas en mobile) */}
      <button
        type="button"
        onClick={handleUserNav(prev)}
        aria-label={t("prevAria")}
        className="hidden md:block absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-neutral-700 hover:text-neutral-900"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleUserNav(next)}
        aria-label={t("nextAria")}
        className="hidden md:block absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-neutral-700 hover:text-neutral-900"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </Section>
  );
}
