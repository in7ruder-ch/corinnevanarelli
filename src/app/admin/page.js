// src/app/admin/page.js
"use client";

import { useEffect, useMemo, useState } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "Alle" },
  { value: "HOLD", label: "HOLD" },
  { value: "PENDING", label: "PENDING" },
  { value: "PAID", label: "PAID" },
  { value: "CANCELED", label: "CANCELED" },
];

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("de-CH", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function statusBadge(status) {
  const base = "px-2 py-1 text-xs rounded-full border";
  switch (status) {
    case "PAID":
      return `${base} border-green-600 text-green-700 bg-green-50`;
    case "PENDING":
      return `${base} border-amber-600 text-amber-700 bg-amber-50`;
    case "HOLD":
      return `${base} border-blue-600 text-blue-700 bg-blue-50`;
    case "CANCELED":
      return `${base} border-neutral-400 text-neutral-600 bg-neutral-50`;
    default:
      return `${base} border-neutral-300 text-neutral-700 bg-white`;
  }
}

function useAdminBookings(initialFrom, initialTo) {
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setErr(null);
      const url = new URL("/api/admin/bookings", window.location.origin);
      if (status) url.searchParams.set("status", status);
      if (from) url.searchParams.set("from", from);
      if (to) url.searchParams.set("to", to);
      url.searchParams.set("limit", "500");
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "HTTP " + res.status);
      setItems(Array.isArray(json?.items) ? json.items : []);
      setCount(Number(json?.count || 0));
    } catch (e) {
      console.error("[/admin] fetch error:", e);
      setErr("Fehler beim Laden.");
      setItems([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, from, to]);

  return {
    status,
    setStatus,
    from,
    setFrom,
    to,
    setTo,
    items,
    count,
    loading,
    err,
    refresh: fetchData,
  };
}

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export default function AdminPage() {
  // Rango por defecto: hoy → +14 días
  const todayISO = formatDateISO(new Date());
  const inTwoWeeksISO = formatDateISO(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));

  const {
    status,
    setStatus,
    from,
    setFrom,
    to,
    setTo,
    items,
    count,
    loading,
    err,
    refresh,
  } = useAdminBookings(todayISO, inTwoWeeksISO);

  const paidSum = useMemo(() => {
    return items
      .filter((i) => i.status === "PAID")
      .reduce((acc, i) => acc + (Number(i?.service?.price || 0) || 0), 0);
  }, [items]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin — Buchungen</h1>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
        >
          Aktualisieren
        </button>
      </div>

      {/* Filtros */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Von</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Bis</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Zusammenfassung</label>
          <div className="w-full border rounded-lg px-3 py-2 text-sm flex items-center justify-between">
            <span>{count} Einträge</span>
            <span className="font-medium">
              Summe (PAID): {paidSum > 0 ? `CHF ${paidSum}` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-neutral-50 text-neutral-600">
              <th className="text-left font-medium px-3 py-2">Datum / Uhrzeit</th>
              <th className="text-left font-medium px-3 py-2">Service</th>
              <th className="text-left font-medium px-3 py-2">Kunde</th>
              <th className="text-left font-medium px-3 py-2">Status</th>
              <th className="text-left font-medium px-3 py-2">Preis</th>
              <th className="text-left font-medium px-3 py-2">IDs</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-neutral-500">
                  Laden…
                </td>
              </tr>
            )}
            {!loading && err && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-red-600">
                  {err}
                </td>
              </tr>
            )}
            {!loading && !err && items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-neutral-600">
                  Keine Einträge gefunden.
                </td>
              </tr>
            )}
            {!loading &&
              !err &&
              items.map((b) => {
                const s = b.service || {};
                return (
                  <tr key={b.id} className="border-b hover:bg-neutral-50/50">
                    <td className="px-3 py-3 align-top">
                      <div className="font-medium">{formatDateTime(b.startAt)}</div>
                      <div className="text-neutral-500">
                        bis {formatDateTime(b.endAt)}
                      </div>
                      {b.holdUntil ? (
                        <div className="text-xs text-neutral-500 mt-1">
                          Hold bis: {formatDateTime(b.holdUntil)}
                        </div>
                      ) : null}
                    </td>

                    <td className="px-3 py-3 align-top">
                      <div className="font-medium">{s.title || "—"}</div>
                      <div className="text-neutral-600">
                        {s.modality ? s.modality : null}
                        {s.modality && s.durationLabel ? " | " : null}
                        {s.durationLabel || (s.durationMin ? `${s.durationMin} Min` : "—")}
                      </div>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <div className="font-medium">
                        {b.customerName || "—"}
                      </div>
                      <div className="text-neutral-600">
                        {b.customerEmail || "—"}
                      </div>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <span className={statusBadge(b.status)}>{b.status}</span>
                    </td>

                    <td className="px-3 py-3 align-top">
                      {s.price != null ? (s.price === 0 ? "Gratis" : `CHF ${s.price}`) : "—"}
                    </td>

                    <td className="px-3 py-3 align-top text-xs text-neutral-600">
                      <div>Booking: {b.id}</div>
                      {s.id ? <div>Service: {s.id}</div> : null}
                      {b.paypalOrderId ? <div>PayPal Order: {b.paypalOrderId}</div> : null}
                      {b.paypalCaptureId ? <div>PayPal Capture: {b.paypalCaptureId}</div> : null}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
