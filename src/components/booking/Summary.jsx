"use client";
import PayPalButton from "./PayPalButton";
import { useState } from "react";

function PayPalSection({ holdInfo }) {
  const [paid, setPaid] = useState(null);

  if (!holdInfo?.bookingId) {
    return <p className="mt-2 text-sm text-neutral-600">Fehlende Buchung-ID.</p>;
  }
  if (paid?.ok) {
    return (
      <div className="mt-3 rounded bg-green-50 border border-green-200 p-3 text-green-800">
        Zahlung erhalten ✅ — Wir sehen uns zum Termin!
      </div>
    );
  }
  return <PayPalButton bookingId={holdInfo.bookingId} onPaid={setPaid} />;
}

export default function Summary({ service, datetime }) {
  const [loading, setLoading] = useState(false);
  const [holdInfo, setHoldInfo] = useState(null); // { bookingId, hold_until } | { error }
  const [form, setForm] = useState({ name: "", email: "" });
  const [confirmState, setConfirmState] = useState(null); // { ok, error }

  const hasAll = service && datetime?.timeISO;
  const hasHold = !!holdInfo?.bookingId;

  async function createHold() {
    if (!hasAll || loading) return;
    try {
      setLoading(true);
      setHoldInfo(null);
      setConfirmState(null);

      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          startISO: datetime.timeISO
        })
      });

      if (res.status === 409) {
        setHoldInfo({ error: "Dieser Termin wurde gerade belegt. Bitte wähle eine andere Uhrzeit." });
        return;
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("HOLD error:", t);
        setHoldInfo({ error: "Fehler beim Reservieren. Versuche es erneut." });
        return;
      }

      const json = await res.json();
      setHoldInfo({
        bookingId: json.bookingId,
        hold_until: json.hold_until
      });
    } finally {
      setLoading(false);
    }
  }

  async function confirmPending(e) {
    e?.preventDefault?.();
    if (!holdInfo?.bookingId || loading) return;

    // validación mínima
    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      setConfirmState({ error: "Bitte Name und eine gültige E-Mail eingeben." });
      return;
    }

    try {
      setLoading(true);
      setConfirmState(null);

      const res = await fetch("/api/bookings/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          bookingId: holdInfo.bookingId,
          name: form.name.trim(),
          email: form.email.trim()
        })
      });

      if (res.status === 410) {
        setConfirmState({ error: "Die Reservierung (HOLD) ist abgelaufen. Bitte wähle erneut." });
        return;
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("CONFIRM error:", t);
        setConfirmState({ error: "Bestätigung fehlgeschlagen. Versuche es erneut." });
        return;
      }

      const json = await res.json();
      if (json.ok) {
        setConfirmState({ ok: true });
      } else {
        setConfirmState({ error: "Unerwartete Antwort. Versuche es erneut." });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 bg-neutral-50">
      <div className="font-semibold mb-2">Zusammenfassung</div>
      {!hasAll && <p className="text-sm text-neutral-600">Wähle Service, Datum & Uhrzeit.</p>}

      {service && (
        <p className="text-sm">
          <span className="font-medium">Service:</span> {service.title} — {service.durationMin} Min • CHF {service.price}
        </p>
      )}
      {datetime?.timeISO && (
        <p className="text-sm mt-1">
          <span className="font-medium">Termin:</span>{" "}
          {new Date(datetime.timeISO).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
        </p>
      )}

      {holdInfo?.error && (
        <p className="mt-3 text-sm text-red-600">{holdInfo.error}</p>
      )}

      {!hasHold && (
        <button
          type="button"
          disabled={!hasAll || loading}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${hasAll ? "bg-black hover:opacity-90" : "bg-neutral-400 cursor-not-allowed"}`}
          onClick={createHold}
        >
          {loading ? "Bitte warten…" : "Weiter"}
        </button>
      )}

      {hasHold && !confirmState?.ok && (
        <div className="mt-4">
          <div className="text-sm text-green-700">
            Slot für dich reserviert (HOLD). Bitte in den nächsten Minuten fortfahren.
            <div className="mt-1 opacity-80">
              HOLD bis: {new Date(holdInfo.hold_until).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          <form className="mt-4 space-y-3" onSubmit={confirmPending}>
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="E-Mail"
              className="w-full border rounded-lg px-3 py-2"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            {confirmState?.error && (
              <p className="text-sm text-red-600">{confirmState.error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
            >
              {loading ? "Sende…" : "Bestätigen"}
            </button>
          </form>
        </div>
      )}

      {confirmState?.ok && (
        <div className="mt-4 rounded-lg border bg-white p-3 text-sm">
          <div className="font-medium">Bestätigt (PENDING) ✔</div>
          <p className="mt-1">Bitte fahre mit der Bezahlung fort.</p>

          {/* 👇 Agregamos PayPal */}
          {/* IMPORTANTE: pasamos bookingId desde holdInfo */}
          <PayPalSection holdInfo={holdInfo} />
        </div>
      )}
    </div>
  );
}
