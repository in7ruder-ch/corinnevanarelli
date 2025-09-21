// src/components/booking/DateTimePicker.jsx
"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { de } from "date-fns/locale";

function formatTime(dt) {
  return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0); // fecha local (no UTC)
}
function toISODate(d) {
  // YYYY-MM-DD en LOCAL (sin UTC)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
const DE_FORMAT = { weekday: "short", day: "2-digit", month: "long", year: "numeric" };

export default function DateTimePicker({ onChange, service }) {
  // Hoy a medianoche LOCAL
  const todayLocal = (() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  })();
  const todayISO = toISODate(todayLocal);

  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openCal, setOpenCal] = useState(false);
  const anchorRef = useRef(null);
  const panelRef = useRef(null);

  // Posición del popover (fixed con portal)
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
    const panelH =
      (panelRef.current && panelRef.current.getBoundingClientRect().height) || 360;

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
  }, [openCal]);

  // Resetear hora seleccionada si cambia el servicio
  useEffect(() => {
    setTime(null);
    onChange?.({ date, timeISO: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.id]);

  // Cargar slots cuando cambia la fecha o el servicio
  useEffect(() => {
    let mounted = true;

    if (!service?.id) {
      setSlots([]);
      setLoading(false);
      return;
    }

    // ⛔ No pedir slots si la fecha es pasada
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
  }, [date, service?.id]);

  function handleSelect(iso) {
    setTime(iso);
    onChange?.({ date, timeISO: iso });
  }

  const serviceSelected = !!service?.id;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Datum &amp; Uhrzeit</label>

      <div className="grid gap-3 sm:grid-cols-[240px,1fr]">
        {/* Botón que abre/cierra el calendario (popover en portal; no empuja layout) */}
        <div>
          <button
            ref={anchorRef}
            type="button"
            onClick={() => setOpenCal((v) => !v)}
            className="w-full rounded-lg border px-3 py-2 text-left hover:bg-neutral-50"
            aria-haspopup="dialog"
            aria-expanded={openCal}
          >
            {parseISODate(date).toLocaleDateString("de-CH", DE_FORMAT)}
          </button>
        </div>

        {!serviceSelected ? (
          <div className="text-sm text-neutral-600 self-center">
            Bitte zuerst einen Service wählen.
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {loading && (
              <div className="col-span-full text-sm text-neutral-500">Laden…</div>
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

      {/* POPUP en portal: fijo, con clamp y scroll interno si hace falta */}
      {openCal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            data-calpanel="true"
            ref={panelRef}
            className="fixed z-[1000] rounded-lg border bg-white p-2 shadow-xl overflow-auto"
            style={{
              top: popPos.top,
              left: popPos.left,
              width: popPos.width,
              maxHeight: "min(80vh, 520px)",
            }}
            role="dialog"
            aria-label="Datum auswählen"
          >
            <DayPicker
              mode="single"
              locale={de}
              selected={parseISODate(date)}
              onSelect={(d) => {
                if (!d) return;
                const iso = toISODate(d);
                setDate(iso);
                setOpenCal(false);
              }}
              fromDate={todayLocal} // navegación mínima
              weekStartsOn={1}
              fixedWeeks
              showOutsideDays
              // ⛔ Deshabilitar Dom/Lun/Sáb + TODAS las fechas anteriores a hoy
              disabled={[{ dayOfWeek: [0, 1, 6] }, { before: todayLocal }]}
              onMonthChange={() => requestAnimationFrame(positionPopover)}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
