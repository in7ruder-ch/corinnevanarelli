// src/components/booking/DateTimePicker.jsx
"use client";
import { useEffect, useMemo, useState } from "react";

function formatTime(dt) {
  return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export default function DateTimePicker({ onChange, service }) {
  const todayISO = formatDateISO(new Date());
  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Resetear hora seleccionada si cambia el servicio
  useEffect(() => {
    setTime(null);
    onChange?.({ date, timeISO: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.id]);

  // Cargar slots cuando cambia la fecha o el servicio (usa serviceId requerido por la API)
  useEffect(() => {
    let mounted = true;

    // Si no hay servicio seleccionado aún, no pedimos slots
    if (!service?.id) {
      setSlots([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const url = new URL("/api/slots", window.location.origin);
        url.searchParams.set("date", date);
        url.searchParams.set("serviceId", String(service.id)); // ⬅️ clave: la API requiere serviceId (uuid)
        const res = await fetch(url.toString(), { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;

        const isoList = Array.isArray(json?.slots) ? json.slots : [];
        setSlots(isoList);

        // Si la hora actual no está en la nueva lista, reseteamos
        if (time && !isoList.includes(time)) {
          setTime(null);
          onChange?.({ date, timeISO: null });
        }
      } catch (e) {
        console.error("DateTimePicker: error cargando slots", e);
        if (mounted) setSlots([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // Dependencias: fecha y servicio seleccionado
  }, [date, service?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelect(iso) {
    setTime(iso);
    onChange?.({ date, timeISO: iso });
  }

  const serviceSelected = !!service?.id;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Datum & Uhrzeit</label>
      <div className="grid gap-3 sm:grid-cols-[240px,1fr]">
        <input
          type="date"
          value={date}
          min={todayISO}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          className="border rounded-lg px-3 py-2"
        />

        {!serviceSelected ? (
          <div className="text-sm text-neutral-600 self-center">
            Bitte zuerst einen Service wählen.
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {loading && (
              <div className="col-span-full text-sm text-neutral-500">
                Laden…
              </div>
            )}
            {!loading && slots.length === 0 && (
              <div className="col-span-full text-sm text-neutral-500">
                Kein Termin verfügbar für dieses Datum.
              </div>
            )}
            {!loading &&
              slots.map((iso, i) => {
                const dt = new Date(iso);
                const isActive = time === iso;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(iso)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-black bg-black text-white"
                        : "hover:bg-neutral-50"
                    }`}
                  >
                    {formatTime(dt)}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
