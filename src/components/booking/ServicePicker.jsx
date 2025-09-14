// src/components/booking/ServicePicker.jsx
"use client";

import { useEffect, useMemo, useState } from "react";

export default function ServicePicker({ value, initialSelectedId, onChange }) {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(value ?? null);
  const [loading, setLoading] = useState(true);

  // Carga desde la API (Supabase)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/services", { cache: "no-store" });
        const json = await res.json(); // { services: [...] }
        if (!mounted) return;
        const list = Array.isArray(json?.services) ? json.services : [];
        setServices(list);
      } catch (e) {
        console.error("ServicePicker: error cargando servicios", e);
        if (mounted) setServices([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Selección inicial una vez que hay datos
  useEffect(() => {
    if (loading || !services.length) return;

    const asStr = (v) => (v == null ? null : String(v));
    const controlled = asStr(value);
    const initial = asStr(initialSelectedId);

    let next = null;
    if (controlled && services.some((s) => String(s.id) === controlled)) {
      next = controlled;
    } else if (initial && services.some((s) => String(s.id) === initial)) {
      next = initial;
    } else {
      next = String(services[0].id);
    }

    setSelected(next);
    const svc = services.find((s) => String(s.id) === next) || null;
    onChange?.(svc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, services, value, initialSelectedId]);

  // Si el padre cambia `value`
  useEffect(() => {
    if (!services.length) return;
    if (value == null) return;
    const v = String(value);
    if (services.some((s) => String(s.id) === v)) {
      setSelected(v);
      const svc = services.find((s) => String(s.id) === v) || null;
      onChange?.(svc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, services]);

  const selectedService = useMemo(
    () => services.find((s) => String(s.id) === String(selected)) || null,
    [services, selected]
  );

  const handleSelect = (id) => {
    const v = String(id);
    setSelected(v);
    const svc = services.find((s) => String(s.id) === v) || null;
    onChange?.(svc);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium">Service</label>
        <div className="text-sm text-neutral-500">Laden…</div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium">Service</label>
        <div className="text-sm text-neutral-500">Zurzeit sind keine Services verfügbar.</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Service</label>

      <div className="grid sm:grid-cols-3 gap-3">
        {services.map((s) => {
          const active = String(selected) === String(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={`text-left rounded-xl border p-4 transition ${
                active ? "border-black bg-black text-white" : "hover:bg-neutral-50"
              }`}
              aria-pressed={active}
            >
              <div className="font-semibold">{s.title}</div>

              {/* Subinfo: modalidad | duración */}
              <div className={`text-sm mt-1 ${active ? "opacity-90" : "text-neutral-600"}`}>
                {s.modality ? s.modality : null}
                {s.modality && s.durationLabel ? " | " : null}
                {s.durationLabel}
              </div>


              {/* Precio al final */}
              {s.priceLabel ? (
                <div className={`text-sm mt-2 font-medium ${active ? "text-white" : "text-neutral-900"}`}>
                  {s.priceLabel}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Resumen de selección (opcional) */}
      {selectedService ? (
        <div className="text-sm">
          Ausgewählt: <strong>{selectedService.title}</strong>
        </div>
      ) : null}
    </div>
  );
}
