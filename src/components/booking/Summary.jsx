// src/components/booking/Summary.jsx
"use client";

import { useMemo } from "react";

export default function Summary({ service, datetime }) {
  // datetime: { date: Date|null, timeISO: string|null }
  const whenLabel = useMemo(() => {
    if (!datetime?.date || !datetime?.timeISO) return null;
    try {
      // timeISO viene como string ISO (ej: "2025-09-15T13:00:00.000Z")
      const d = new Date(datetime.timeISO);
      // Mostrar en zona local del navegador; el sitio está pensado para CH (Europe/Zurich)
      const fmt = new Intl.DateTimeFormat("de-CH", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return fmt.format(d);
    } catch {
      return null;
    }
  }, [datetime]);

  return (
    <div className="rounded-2xl border p-5 lg:p-6">
      <h3 className="text-lg font-semibold">Zusammenfassung</h3>

      {!service ? (
        <p className="mt-3 text-sm text-neutral-600">
          Bitte wähle zuerst einen Service.
        </p>
      ) : (
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <div className="text-neutral-500">Service</div>
            <div className="font-medium">{service.title}</div>
            {/* Subinfo con el mismo estilo que en las cards */}
            <div className="text-neutral-600">
              {service.modality ? service.modality : null}
              {service.modality && service.durationLabel ? " | " : null}
              {service.durationLabel}
            </div>
          </div>

          <div>
            <div className="text-neutral-500">Datum & Uhrzeit</div>
            <div className="font-medium">
              {whenLabel || "Bitte Datum & Uhrzeit wählen"}
            </div>
          </div>

          <div>
            <div className="text-neutral-500">Preis</div>
            <div className="font-medium">
              {service.priceLabel ?? "—"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
