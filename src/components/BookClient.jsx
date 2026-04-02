'use client';

import { useMemo, useState } from "react";
import ServicePicker from "./booking/ServicePicker";
import DateTimePicker from "./booking/DateTimePicker";
import Summary from "./booking/Summary";

const PAID_BOOKINGS_ENABLED =
  (process.env.NEXT_PUBLIC_PAID_BOOKINGS_ENABLED ?? "").toString().trim() === "true";

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

    // Free consultation: siempre auto-booking
    if (price === 0 && dur === 20) return true;

    // Servicios pagos: auto-booking solo si el flag está activo
    if (price > 0 && PAID_BOOKINGS_ENABLED) return true;

    return false;
  }, [service]);

  return (
    <div
      className="mt-8 grid lg:grid-cols-[1fr,360px] gap-8"
      style={{ color: "var(--text)" }}
    >
      <div className="space-y-8">
        <ServicePicker
          initialSelectedId={initialSelectedId}
          onChange={(s) => {
            setService(s);
            if (s) setDatetime({ date: null, timeISO: null });
          }}
        />

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