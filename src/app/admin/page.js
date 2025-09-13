"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/bookings/list", { cache: "no-store" });
      const json = await res.json();
      setRows(json.bookings || []);
    } catch (e) {
      setErr("No se pudo cargar la lista.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function cancel(id) {
    if (!confirm("¿Cancelar esta reserva?")) return;
    try {
      setBusyId(id);
      const res = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ bookingId: id })
      });
      if (!res.ok) {
        const t = await res.text();
        alert("Error al cancelar: " + t);
        return;
      }
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Admin — Bookings</h1>
      <p className="text-sm text-neutral-600 mt-1">Temporal (sin auth).</p>

      {err && <p className="text-sm text-red-600 mt-3">{err}</p>}
      {loading && <p className="mt-4 text-neutral-600">Cargando…</p>}

      {!loading && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border px-3 py-2 text-left">Fecha</th>
                <th className="border px-3 py-2 text-left">Hora</th>
                <th className="border px-3 py-2 text-left">Servicio</th>
                <th className="border px-3 py-2 text-left">Cliente</th>
                <th className="border px-3 py-2 text-left">Estado</th>
                <th className="border px-3 py-2 text-left">Pago</th>
                <th className="border px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => {
                const dt = new Date(r.start_at);
                const dateStr = dt.toLocaleDateString([], { dateStyle: "medium" });
                const timeStr = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                const paid = r.status === "PAID";
                return (
                  <tr key={r.id}>
                    <td className="border px-3 py-2">{dateStr}</td>
                    <td className="border px-3 py-2">{timeStr}</td>
                    <td className="border px-3 py-2">
                      {r.service_title} — CHF {r.price}
                    </td>
                    <td className="border px-3 py-2">
                      {r.name || "—"}<br />
                      <span className="text-neutral-500">{r.email || "—"}</span>
                    </td>
                    <td className="border px-3 py-2">{r.status}</td>
                    <td className="border px-3 py-2">
                      {paid ? "Pagado" : (r.paypal_order_id ? "Orden creada" : "—")}
                    </td>
                    <td className="border px-3 py-2">
                      <button
                        className="px-3 py-1 rounded border hover:bg-neutral-50 disabled:opacity-50"
                        onClick={() => cancel(r.id)}
                        disabled={busyId === r.id}
                      >
                        {busyId === r.id ? "Cancelando…" : "Cancelar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="border px-3 py-6 text-center text-neutral-600">
                    No hay reservas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
