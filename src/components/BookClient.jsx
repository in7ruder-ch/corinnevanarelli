'use client';

import { useMemo, useState } from "react";
import ServicePicker from "./booking/ServicePicker";
import DateTimePicker from "./booking/DateTimePicker";
import Summary from "./booking/Summary";

function getPriceNumber(service) {
  const price =
    service?.price ??
    service?.price_chf ??
    service?.priceChf ??
    service?.priceCHF ??
    0;
  return Number(price);
}

export default function BookClient({ initialSelectedId }) {
  const [service, setService] = useState(null);
  const [datetime, setDatetime] = useState({ date: null, timeISO: null });

  const isAutoBooking = useMemo(() => {
    if (!service) return false;

    const price = getPriceNumber(service);
    const dur = Number(service?.durationMin ?? service?.duration ?? 0);

    // ✅ Solo el "Kostenloses Gespräch" (0 CHF y 20 min) sigue con slots + hold/confirm
    return price === 0 && dur === 20;
  }, [service]);

  return (
    <div
      className="mt-8 grid lg:grid-cols-[1fr,360px] gap-8"
      style={{ color: "var(--text)" }}
    >
      <div className="space-y-8">
        {/* Preselección por query param ?serviceId=... */}
        <ServicePicker
          initialSelectedId={initialSelectedId}
          onChange={(s) => {
            setService(s);
            // Si pasamos a modo manual, limpiamos fecha/hora para evitar estado viejo
            if (s) setDatetime({ date: null, timeISO: null });
          }}
        />

        {/* El picker emite { date, timeISO } */}
        <DateTimePicker
          onChange={setDatetime}
          service={service}
          isAutoBooking={isAutoBooking}
        />
      </div>

      <aside>
        <Summary
          service={service}
          datetime={datetime}
          isAutoBooking={isAutoBooking}
        />
      </aside>
    </div>
  );
}
