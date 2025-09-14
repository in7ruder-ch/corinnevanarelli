// src/components/Services.jsx
"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/services", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json(); // { services: [...] }
        if (!active) return;
        setServices(Array.isArray(json?.services) ? json.services : []);
      } catch {
        if (!active) return;
        setServices([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Section id="angebote">
      <h2 className="text-2xl md:text-3xl font-semibold">Angebote</h2>

      {loading ? (
        <div className="mt-6 text-sm text-neutral-600">Lade Services…</div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard
              key={String(s.id)}
              serviceId={s.id}
              title={s.title}
              modality={s.modality}
              durationLabel={s.durationLabel}  // ⬅️ nuevo
              notes={s.notes}
              priceLabel={s.priceLabel}        // ⬅️ nuevo ("Gratis" o "CHF N")
              bullets={[]}
            />
          ))}

          {!services.length && (
            <div className="col-span-full text-sm text-neutral-600">
              Zurzeit sind keine Services verfügbar.
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
