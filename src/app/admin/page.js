// src/app/admin/page.js
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "Alle" },
  { value: "HOLD", label: "HOLD" },
  { value: "PENDING", label: "PENDING" },
  { value: "CONFIRMED", label: "CONFIRMED" },
  { value: "PAID", label: "PAID" },
  { value: "CANCELED", label: "CANCELED" },
];

const PAYMENTS_ENABLED = (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED ?? "").toString().trim() === "true";

function formatDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("de-CH", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function formatDateShort(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("de-CH", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

function statusBadge(status) {
  const base = "px-2 py-1 text-xs rounded-full border";
  switch (status) {
    case "PAID": return `${base} border-green-600 text-green-700 bg-green-50`;
    case "PENDING": return `${base} border-amber-600 text-amber-700 bg-amber-50`;
    case "HOLD": return `${base} border-blue-600 text-blue-700 bg-blue-50`;
    case "CANCELED": return `${base} border-neutral-400 text-neutral-600 bg-neutral-50`;
    case "CONFIRMED": return `${base} border-teal-600 text-teal-700 bg-teal-50`;
    default: return `${base} border-neutral-300 text-neutral-700 bg-white`;
  }
}

function overrideBadge(type) {
  const base = "px-2 py-1 text-xs rounded-full border font-medium";
  return type === "OPEN"
    ? `${base} border-green-600 text-green-700 bg-green-50`
    : `${base} border-red-500 text-red-700 bg-red-50`;
}

function formatDateISO(d) {
  const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
  return iso.slice(0, 10);
}

// ─── Hook: bookings ───────────────────────────────────────────────────────────

function useAdminBookings(initialFrom, initialTo) {
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(async () => {
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
  }, [status, from, to]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { status, setStatus, from, setFrom, to, setTo, items, count, loading, err, refresh: fetchData, setItems };
}

// ─── Hook: slot overrides ─────────────────────────────────────────────────────

function useSlotOverrides() {
  const [overrides, setOverrides] = useState([]);
  const [loadingOv, setLoadingOv] = useState(true);
  const [errOv, setErrOv] = useState(null);

  const fetchOverrides = useCallback(async () => {
    try {
      setLoadingOv(true);
      setErrOv(null);
      const res = await fetch("/api/admin/slot-overrides", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "HTTP " + res.status);
      setOverrides(Array.isArray(json?.items) ? json.items : []);
    } catch (e) {
      console.error("[/admin] overrides fetch error:", e);
      setErrOv("Fehler beim Laden.");
      setOverrides([]);
    } finally {
      setLoadingOv(false);
    }
  }, []);

  useEffect(() => { fetchOverrides(); }, [fetchOverrides]);

  return { overrides, loadingOv, errOv, refreshOverrides: fetchOverrides, setOverrides };
}

// ─── Componente: gestión de slot overrides ────────────────────────────────────

function SlotOverridesPanel({ services }) {
  const { overrides, loadingOv, errOv, refreshOverrides, setOverrides } = useSlotOverrides();

  const todayISO = formatDateISO(new Date());
  const [form, setForm] = useState({ serviceId: "", date: todayISO, time: "09:00", type: "OPEN" });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null); // { ok, text }
  const [deletingId, setDeletingId] = useState(null);

  const handleCreate = useCallback(async () => {
    if (!form.date || !form.time || !form.type) return;
    try {
      setSaving(true);
      setSaveMsg(null);
      const res = await fetch("/api/admin/slot-overrides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: form.serviceId || null,
          date: form.date,
          time: form.time,
          type: form.type,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        setSaveMsg({ ok: false, text: json?.error || "Fehler beim Speichern." });
        return;
      }
      setSaveMsg({
        ok: true,
        text: json.warning
          ? `Gespeichert. Hinweis: ${json.warning}`
          : "Override erfolgreich erstellt.",
      });
      await refreshOverrides();
    } catch (e) {
      console.error("[/admin] create override error:", e);
      setSaveMsg({ ok: false, text: "Serverfehler." });
    } finally {
      setSaving(false);
    }
  }, [form, refreshOverrides]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Override löschen?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/slot-overrides/${id}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Fehler");
      setOverrides((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      console.error("[/admin] delete override error:", e);
      alert("Der Override konnte nicht gelöscht werden.");
    } finally {
      setDeletingId(null);
    }
  }, [setOverrides]);

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold">Verfügbarkeit verwalten</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Öffne zusätzliche Slots (OPEN) oder blockiere bestehende (BLOCKED) — unabhängig von den Standardregeln.
      </p>

      {/* Formulario */}
      <div className="mt-5 rounded-xl border p-5 bg-neutral-50 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">

          <div className="space-y-1">
            <label className="text-xs text-neutral-500">Service (optional)</label>
            <select
              value={form.serviceId}
              onChange={(e) => setForm((f) => ({ ...f, serviceId: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">Alle Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-500">Datum</label>
            <input
              type="date"
              value={form.date}
              min={todayISO}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-500">Uhrzeit</label>
            <div className="flex gap-2">
              <select
                value={form.time.split(":")[0]}
                onChange={(e) => setForm((f) => ({ ...f, time: `${e.target.value}:${f.time.split(":")[1] || "00"}` }))}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              >
                {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <select
                value={form.time.split(":")[1]}
                onChange={(e) => setForm((f) => ({ ...f, time: `${f.time.split(":")[0] || "09"}:${e.target.value}` }))}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-500">Typ</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="OPEN">OPEN — Slot öffnen</option>
              <option value="BLOCKED">BLOCKED — Slot blockieren</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleCreate}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium bg-white hover:bg-neutral-100 disabled:opacity-50"
          >
            {saving ? "Speichern…" : "Override erstellen"}
          </button>
          {saveMsg && (
            <span className={`text-sm ${saveMsg.ok ? "text-green-700" : "text-red-600"}`}>
              {saveMsg.text}
            </span>
          )}
        </div>
      </div>

      {/* Tabla de overrides */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-neutral-50 text-neutral-600">
              <th className="text-left font-medium px-3 py-2">Datum</th>
              <th className="text-left font-medium px-3 py-2">Uhrzeit</th>
              <th className="text-left font-medium px-3 py-2">Typ</th>
              <th className="text-left font-medium px-3 py-2">Service</th>
              <th className="text-left font-medium px-3 py-2">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {loadingOv && (
              <tr><td colSpan={5} className="px-3 py-6 text-center text-neutral-500">Laden…</td></tr>
            )}
            {!loadingOv && errOv && (
              <tr><td colSpan={5} className="px-3 py-6 text-center text-red-600">{errOv}</td></tr>
            )}
            {!loadingOv && !errOv && overrides.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-6 text-center text-neutral-500">Keine Overrides vorhanden.</td></tr>
            )}
            {!loadingOv && !errOv && overrides.map((ov) => (
              <tr key={ov.id} className="border-b hover:bg-neutral-50/50">
                <td className="px-3 py-3">{formatDateShort(ov.date)}</td>
                <td className="px-3 py-3">{ov.time?.slice(0, 5) || "-"}</td>
                <td className="px-3 py-3">
                  <span className={overrideBadge(ov.type)}>{ov.type}</span>
                </td>
                <td className="px-3 py-3 text-neutral-600">
                  {ov.serviceTitle || <span className="italic text-neutral-400">Alle</span>}
                </td>
                <td className="px-3 py-3">
                  <button
                    disabled={deletingId === ov.id}
                    onClick={() => handleDelete(ov.id)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-red-600 text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === ov.id ? "…" : "Löschen"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [defaultFrom, setDefaultFrom] = useState("");
  const [defaultTo, setDefaultTo] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const today = new Date();
    const inTwoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    setDefaultFrom(formatDateISO(today));
    setDefaultTo(formatDateISO(inTwoWeeks));
    setReady(true);

    // Cargamos servicios para el selector de overrides
    fetch("/api/services")
      .then((r) => r.json())
      .then((json) => setServices(Array.isArray(json?.services) ? json.services : []))
      .catch(() => setServices([]));
  }, []);

  const {
    status, setStatus,
    from, setFrom,
    to, setTo,
    items, count, loading, err,
    refresh, setItems,
  } = useAdminBookings(defaultFrom, defaultTo);

  const [actingId, setActingId] = useState(null);

  const paidSum = useMemo(() => {
    return items
      .filter((i) => i.status === "PAID")
      .reduce((acc, i) => acc + (Number(i?.service?.price || 0) || 0), 0);
  }, [items]);

  const cancelBooking = useCallback(async (bookingId) => {
    if (!bookingId) return;
    if (!window.confirm("Buchung stornieren?\n\nDies markiert die Buchung als CANCELED.")) return;
    try {
      setActingId(bookingId);
      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Fehler beim Stornieren");
      await refresh();
    } catch (e) {
      console.error("[/admin] cancel error:", e);
      alert("Die Buchung konnte nicht storniert werden.");
    } finally {
      setActingId(null);
    }
  }, [refresh]);

  const deleteBooking = useCallback(async (bookingId) => {
    if (!bookingId) return;
    if (!window.confirm("Buchung löschen?\n\nDiese Aktion ist DAUERHAFT und entfernt die Buchung aus der Datenbank.")) return;
    try {
      setActingId(bookingId);
      const res = await fetch(`/api/admin/bookings/${bookingId}`, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Fehler beim Löschen");
      setItems((prev) => prev.filter((x) => x.id !== bookingId));
    } catch (e) {
      console.error("[/admin] delete error:", e);
      alert("Die Buchung konnte nicht gelöscht werden.");
    } finally {
      setActingId(null);
    }
  }, [setItems]);

  return (
    <main className="mt-32 mx-auto max-w-6xl px-4 py-8 md:py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">Admin - Buchungen</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            Aktualisieren
          </button>

          <form method="POST" action="/admin/logout?next=/admin" className="inline">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
              title="Logout"
            >
              Logout
            </button>
          </form>
        </div>
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
              <option key={o.value || "all"} value={o.value}>{o.label}</option>
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
            placeholder={!ready ? "…" : undefined}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Bis</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder={!ready ? "…" : undefined}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-neutral-500">Zusammenfassung</label>
          <div className="w-full border rounded-lg px-3 py-2 text-sm flex items-center justify-between">
            <span>{count} Einträge</span>
            <span className="font-medium">Summe (PAID): {paidSum > 0 ? `CHF ${paidSum}` : "-"}</span>
          </div>
        </div>
      </div>

      {/* Tabla bookings */}
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
              <th className="text-left font-medium px-3 py-2">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-neutral-500">Laden…</td></tr>
            )}
            {!loading && err && (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-red-600">{err}</td></tr>
            )}
            {!loading && !err && items.length === 0 && (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-neutral-600">Keine Einträge gefunden.</td></tr>
            )}
            {!loading && !err && items.map((b) => {
              const s = b.service || {};
              const isCancelDisabled = b.status === "CANCELED";
              const busy = actingId === b.id;
              return (
                <tr key={b.id} className="border-b hover:bg-neutral-50/50">
                  <td className="px-3 py-3 align-top">
                    <div className="font-medium">{formatDateTime(b.startAt)}</div>
                    <div className="text-neutral-500">bis {formatDateTime(b.endAt)}</div>
                    {b.holdUntil ? (
                      <div className="text-xs text-neutral-500 mt-1">
                        Hold bis: {formatDateTime(b.holdUntil)}
                      </div>
                    ) : null}
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="font-medium">{s.title || "-"}</div>
                    <div className="text-neutral-600">
                      {s.modality ? s.modality : null}
                      {s.modality && s.durationLabel ? " | " : null}
                      {s.durationLabel || (s.durationMin ? `${s.durationMin} Min` : "-")}
                    </div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="font-medium">{b.customerName || "-"}</div>
                    <div className="text-neutral-600">{b.customerEmail || "-"}</div>
                  </td>

                  <td className="px-3 py-3 align-top">
                    <span className={statusBadge(b.status)}>{b.status}</span>
                  </td>

                  <td className="px-3 py-3 align-top">
                    {s.price != null ? (s.price === 0 ? "Gratis" : `CHF ${s.price}`) : "-"}
                  </td>

                  <td className="px-3 py-3 align-top text-xs text-neutral-600">
                    <div>Buchung: {b.id}</div>
                    {s.id ? <div>Service: {s.id}</div> : null}
                    {PAYMENTS_ENABLED && b.paypalOrderId ? <div>PayPal Order: {b.paypalOrderId}</div> : null}
                    {PAYMENTS_ENABLED && b.paypalCaptureId ? <div>PayPal Capture: {b.paypalCaptureId}</div> : null}
                  </td>

                  <td className="px-3 py-3 align-top">
                    <div className="flex gap-2">
                      <button
                        disabled={isCancelDisabled || busy}
                        onClick={() => cancelBooking(b.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg border ${isCancelDisabled || busy ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-50"}`}
                        title={isCancelDisabled ? "Bereits storniert" : "Stornieren (Status=CANCELED)"}
                      >
                        {busy ? "…" : "Stornieren"}
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => deleteBooking(b.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg border border-red-600 text-red-700 ${busy ? "opacity-50 cursor-not-allowed" : "hover:bg-red-50"}`}
                        title="Endgültig löschen"
                      >
                        {busy ? "…" : "Löschen"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sección overrides */}
      <SlotOverridesPanel services={services} />

    </main>
  );
}