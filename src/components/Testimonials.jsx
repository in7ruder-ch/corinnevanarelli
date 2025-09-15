'use client';

import { useEffect, useRef, useState } from "react";
import Section from "./Section";

const items = [
  { name: "Nina N.", text: "Die Akasha Chronik öffnet für mich ein Tor: zu tiefem spirituellem Wissen und zu den Erfahrungen vergangener Leben. Sie ist zugleich etwas Geheimnisvolles und doch ganz greifbar – ein Spiegel meiner Seele. Für mich die vollkommene Balance zwischen Tiefe und Klarheit." },
  { name: "Nicolas M.", text: "Die Herzheilung war sanft und zugleich unglaublich kraftvoll. Schon nach einer Sitzung fühlte ich eine tiefe Veränderung – als hätte sich in mir etwas geöffnet. Ich habe Klarheit und Verbundenheit gespürt, wie lange nicht mehr.  Der Raum, den Coco schafft, ist voller Wärme und Intuition. Er hat mir den Mut gegeben, tiefer zu gehen und meinem wahren Selbst zu begegnen." },
  { name: "Michelle H.", text: "Du verbindest weltliche und spirituelle Aspekte auf wunderbare Weise – klar, geerdet und lichtvoll.  In deiner achtsamen, liebevollen Präsenz entsteht ein Raum, in dem echte Heilung geschehen darf.  Deine Arbeit hat mich auf meinem Weg spürbar weitergebracht.  Fachlich wie menschlich bist du eine echte Bereicherung." },
  { name: "Simone P.", text: "Bei der Herzheilung spürte ich eine Wärme wie eine Hand auf meinem Herzen – Tränen, Ruhe, tiefes Ankommen. Nach der Session kamen klare, starke Gefühle und Erkenntnisse – echte Transformation.  Es ist die intensivste und effektivste Form der Heilung, die ich je erlebt habe. Ich fühle mich bei Coco gesehen, vertrauensvoll begleitet und völlig wertfrei behandelt." }
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % items.length);
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);

  useEffect(() => {
    // autoplay cada 6s
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  // reiniciar autoplay cuando el usuario navega manualmente
  const handleUserNav = (fn) => () => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 4000);
  };

  const t = items[i];

  return (
    <Section
      id="stimmen"
      className="bg-white pt-16 pb-16 md:pb-24"
      containerClass="relative mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      {/* Cita centrada */}
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-5xl md:text-6xl text-neutral-900">“</div>
        <p
          className="font-bold mt-6 text-xl md:text-2xl lg:text-[28px] leading-relaxed text-neutral-800 [text-wrap:balance]"
          aria-live="polite"
        >
          {t.text}
        </p>
        <p className="mt-6 text-sm text-neutral-600">— {t.name}</p>

        {/* Puntos */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={handleUserNav(() => setI(idx))}
              aria-label={`Testimonial ${idx + 1}`}
              className={[
                "h-2 w-2 rounded-full transition-opacity",
                i === idx ? "opacity-100 bg-neutral-800" : "opacity-40 bg-neutral-500 hover:opacity-70"
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Flechas izquierda/derecha */}
      <button
        type="button"
        onClick={handleUserNav(prev)}
        aria-label="Vorheriges Testimonial"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-neutral-700 hover:text-neutral-900"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleUserNav(next)}
        aria-label="Nächstes Testimonial"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-neutral-700 hover:text-neutral-900"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </Section>
  );
}
