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
    return s?.durationLabel || "";
  };

  if (loading) {
    return <div className="text-sm" style={{ color: "var(--muted)" }}>{t("loading")}</div>;
  }

  if (!services.length) {
    return <div className="text-sm" style={{ color: "var(--muted)" }}>{t("empty")}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
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
              aria-pressed={active}
              className="text-left rounded-2xl p-4 transition-colors"
              style={{
                backgroundColor: active
                  ? "color-mix(in srgb, var(--brand) 14%, var(--surface))"
                  : "var(--surface)",
                border: `1px solid ${
                  active
                    ? "color-mix(in srgb, var(--brand) 40%, transparent)"
                    : "color-mix(in srgb, var(--brand) 22%, transparent)"
                }`,
              }}
              data-service-tile
              data-active={active ? "true" : "false"}
            >
              <div className="font-semibold" style={{ color: "var(--text)" }}>
                {s.title}
              </div>

              {(hasMod || hasDur) && (
                <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {hasMod ? s.modality : null}
                  {hasMod && hasDur ? " | " : null}
                  {hasDur ? durText : null}
                </div>
              )}

              {s.priceLabel ? (
                <div className="text-sm mt-3 font-medium" style={{ color: "var(--text)" }}>
                  {s.priceLabel}
                </div>
              ) : null}

              {/* Hover (CSS-only) */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    button[data-service-tile][data-active="false"]:hover {
                      background-color: color-mix(in srgb, var(--brand) 10%, var(--surface));
                      border-color: color-mix(in srgb, var(--brand) 40%, transparent);
                    }
                  `,
                }}
              />
            </button>
          );
        })}
      </div>

      {selectedService ? (
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          {t("selected")}{" "}
          <strong style={{ color: "var(--text)" }}>{selectedService.title}</strong>
        </div>
      ) : null}
    </div>
  );
}
