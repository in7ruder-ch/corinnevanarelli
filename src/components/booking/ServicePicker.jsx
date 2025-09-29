// src/components/booking/ServicePicker.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function ServicePicker({ value, initialSelectedId, onChange }) {
  const t = useTranslations("Booking.ServicePicker");
  const locale = useLocale();

  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(value ?? null);
  const [loading, setLoading] = useState(true);

  // Carga desde la API (con locale para i18n)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/services?locale=${locale}`, { cache: "no-store" });
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
  }, [locale]);

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

  const formatDuration = (s) => {
    const n = Number(s?.durationMin);
    if (Number.isFinite(n) && n > 0) return t("durationFmt", { min: n });
    // fallback a lo que viene de DB si no hay durationMin
    return s?.durationLabel || "";
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-neutral-500">{t("loading")}</div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-neutral-500">{t("empty")}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        {services.map((s) => {
          const active = String(selected) === String(s.id);
          const durText = formatDuration(s);
          const hasMod = Boolean(s.modality);
          const hasDur = Boolean(durText);

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

              {/* Subinfo: modalidad | duración (i18n) */}
              {(hasMod || hasDur) && (
                <div className={`text-sm mt-1 ${active ? "opacity-90" : "text-neutral-600"}`}>
                  {hasMod ? s.modality : null}
                  {hasMod && hasDur ? " | " : null}
                  {hasDur ? durText : null}
                </div>
              )}

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
          {t("selected")} <strong>{selectedService.title}</strong>
        </div>
      ) : null}
    </div>
  );
}
