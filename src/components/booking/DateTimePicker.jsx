// src/components/booking/DateTimePicker.jsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { de as dfde, enGB as dfen, es as dfes } from "date-fns/locale";
import { useTranslations, useLocale } from "next-intl";

function formatTime(dt) {
  return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0); // fecha local (no UTC)
}
function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const DATE_FORMAT = { weekday: "short", day: "2-digit", month: "long", year: "numeric" };

export default function DateTimePicker({ onChange, service, isAutoBooking = true }) {
  const t = useTranslations("Booking.DateTimePicker");
  const locale = useLocale();

  const dfLocale = useMemo(() => {
    if (locale.startsWith("en")) return dfen;
    if (locale.startsWith("es")) return dfes;
    return dfde;
  }, [locale]);

  const todayLocal = useMemo(() => {
    const tt = new Date();
    tt.setHours(0, 0, 0, 0);
    return tt;
  }, []);
  const todayISO = toISODate(todayLocal);

  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openCal, setOpenCal] = useState(false);
  const anchorRef = useRef(null);
  const panelRef = useRef(null);

  const [popPos, setPopPos] = useState({
    top: 0,
    left: 0,
    width: 320,
    placement: "bottom",
  });

  const positionPopover = () => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const panelW = 320;
    const panelH = (panelRef.current && panelRef.current.getBoundingClientRect().height) || 360;

    let left = Math.max(8, Math.min(rect.left, vw - panelW - 8));
    let top = rect.bottom + gap;
    let placement = "bottom";

    if (top + panelH > vh - 8) {
      const topAlt = rect.top - gap - panelH;
      if (topAlt >= 8) {
        top = topAlt;
        placement = "top";
      } else {
        top = Math.max(8, Math.min(top, vh - panelH - 8));
      }
    }

    setPopPos({ top, left, width: panelW, placement });
  };

  useLayoutEffect(() => {
    // ✅ Siempre se llama el hook; solo lo “apagamos” por condición interna
    if (!isAutoBooking) return;
    if (!openCal) return;

    positionPopover();

    const onResize = () => positionPopover();
    const onScroll = () => positionPopover();
    const onKey = (e) => e.key === "Escape" && setOpenCal(false);
    const onClick = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) {
        if (!(e.target?.closest && e.target.closest("[data-calpanel='true']"))) {
          setOpenCal(false);
        }
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCal, isAutoBooking]);

  useEffect(() => {
    // ✅ Si pasamos a modo manual, cerramos calendario, limpiamos hora/slots, y notificamos arriba
    if (isAutoBooking) return;
    setOpenCal(false);
    setSlots([]);
    setLoading(false);
    setTime(null);
    onChange?.({ date: null, timeISO: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoBooking]);

  useEffect(() => {
    if (!isAutoBooking) return;
    setTime(null);
    onChange?.({ date, timeISO: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.id]);

  useEffect(() => {
    if (!isAutoBooking) return;

    let mounted = true;

    if (!service?.id) {
      setSlots([]);
      setLoading(false);
      return;
    }

    if (date < todayISO) {
      setSlots([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const url = new URL("/api/slots", window.location.origin);
        url.searchParams.set("date", date);
        url.searchParams.set("serviceId", String(service.id));
        const res = await fetch(url.toString(), { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;

        const isoList = Array.isArray(json?.slots) ? json.slots : [];
        setSlots(isoList);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, service?.id, isAutoBooking]);

  function handleSelect(iso) {
    setTime(iso);
    onChange?.({ date, timeISO: iso });
  }

  const serviceSelected = !!service?.id;

  // ✅ Recién acá “apagamos” el render, después de declarar todos los hooks
  if (!isAutoBooking) return null;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {t("label")}
      </label>

      <div className="grid gap-3 sm:grid-cols-[240px,1fr]">
        {/* Botón fecha */}
        <div>
          <button
            ref={anchorRef}
            type="button"
            onClick={() => setOpenCal((v) => !v)}
            className="w-full rounded-2xl px-4 py-3 text-left transition-colors"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
              color: "var(--text)",
            }}
            data-dtp-datebtn
            aria-haspopup="dialog"
            aria-expanded={openCal}
          >
            {new Intl.DateTimeFormat(locale, DATE_FORMAT).format(parseISODate(date))}
          </button>
        </div>

        {!serviceSelected ? (
          <div className="text-sm self-center" style={{ color: "var(--muted)" }}>
            {t("selectServiceFirst")}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {loading && (
              <div className="col-span-full text-sm" style={{ color: "var(--muted)" }}>
                {t("loading")}
              </div>
            )}

            {!loading && slots.length === 0 && (
              <div className="md:mt-3 col-span-full text-sm" style={{ color: "var(--muted)" }}>
                {t("noSlots")}
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
                    className="rounded-full px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? "color-mix(in srgb, var(--brand) 14%, var(--surface))"
                        : "var(--surface)",
                      border: `1px solid ${
                        isActive
                          ? "color-mix(in srgb, var(--brand) 40%, transparent)"
                          : "color-mix(in srgb, var(--brand) 22%, transparent)"
                      }`,
                      color: "var(--text)",
                    }}
                    data-dtp-slot
                    data-active={isActive ? "true" : "false"}
                  >
                    {formatTime(dt)}
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* CSS-only hover */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            button[data-dtp-datebtn]:hover {
              background-color: color-mix(in srgb, var(--brand) 10%, var(--surface));
              border-color: color-mix(in srgb, var(--brand) 40%, transparent);
            }
            button[data-dtp-slot][data-active="false"]:hover {
              background-color: color-mix(in srgb, var(--brand) 10%, var(--surface));
              border-color: color-mix(in srgb, var(--brand) 40%, transparent);
            }
          `,
        }}
      />

      {/* POPUP calendario */}
      {openCal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            data-calpanel="true"
            ref={panelRef}
            className="fixed z-[1000] rounded-2xl p-3 shadow-xl overflow-auto"
            style={{
              top: popPos.top,
              left: popPos.left,
              width: popPos.width,
              maxHeight: "min(80vh, 520px)",
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
            }}
            role="dialog"
            aria-label={t("aria.calendar")}
          >
            <DayPicker
              mode="single"
              locale={dfLocale}
              selected={parseISODate(date)}
              onSelect={(d) => {
                if (!d) return;
                const iso = toISODate(d);
                setDate(iso);
                setOpenCal(false);
              }}
              fromDate={todayLocal}
              weekStartsOn={1}
              fixedWeeks
              showOutsideDays
              disabled={[{ dayOfWeek: [0, 1, 6] }, { before: todayLocal }]}
              onMonthChange={() => requestAnimationFrame(positionPopover)}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
