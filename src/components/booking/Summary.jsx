// src/components/booking/Summary.jsx
"use client";
import PayPalButton from "./PayPalButton";
import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

// Flag de build-time (cliente). false => pagos apagados.
const PAYMENTS_ENABLED =
  (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED ?? "").toString().trim() === "true";

function PayPalSection({ holdInfo, isFree, paymentsEnabled }) {
  const t = useTranslations("Booking.Summary.paypal");
  const [paid, setPaid] = useState(null);

  // Servicios gratis o pagos apagados: no mostrar PayPal
  if (isFree || !paymentsEnabled) return null;

  if (!holdInfo?.bookingId) {
    return <p className="mt-2 text-sm text-neutral-600">{t("missingId")}</p>;
  }
  if (paid?.ok) {
    return (
      <div className="mt-3 rounded bg-green-50 border border-green-200 p-3 text-green-800">
        {t("paid")} ✅ — {t("seeYou")}
      </div>
    );
  }
  return (
    <PayPalButton
      bookingId={holdInfo.bookingId}
      onPaid={setPaid}
      isFree={isFree}
    />
  );
}

export default function Summary({ service, datetime }) {
  const t = useTranslations("Booking.Summary");
  const locale = useLocale();

  const [loading, setLoading] = useState(false);
  const [holdInfo, setHoldInfo] = useState(null); // { bookingId, hold_until } | { error }
  const [form, setForm] = useState({ name: "", email: "" });
  const [confirmState, setConfirmState] = useState(null); // { ok, error }

  const hasAll = Boolean(service && datetime?.timeISO);
  const hasHold = Boolean(holdInfo?.bookingId);

  // ✅ Calcular si el servicio es gratis (UI). El server valida de verdad.
  const isFree = useMemo(() => {
    const price =
      service?.price ??
      service?.price_chf ??
      service?.priceChf ??
      service?.priceCHF ??
      0;
    const n = Number(price);
    return Number.isFinite(n) && n === 0;
  }, [service]);

  // ✅ Si pagos están apagados, tratamos todo como "gratis" a nivel de UI
  const isFreeOrNoPay = isFree || !PAYMENTS_ENABLED;

  // ✅ Si cambio de servicio, limpio estados de hold/confirm para evitar inconsistencias
  useEffect(() => {
    setHoldInfo(null);
    setConfirmState(null);
  }, [service?.id]);

  const priceNumber =
    Number(
      service?.price ??
        service?.price_chf ??
        service?.priceChf ??
        service?.priceCHF ??
        0
    ) || 0;

  const priceFormatted = useMemo(() => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 0
      }).format(priceNumber);
    } catch {
      return `CHF ${priceNumber}`;
    }
  }, [locale, priceNumber]);

  async function createHold() {
    if (!hasAll || loading) return;
    try {
      setLoading(true);
      setHoldInfo(null);
      setConfirmState(null);

      const serviceId =
        service?.id ?? service?._id ?? service?.value ?? service;

      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId,
          startISO: datetime.timeISO
        })
      });

      if (res.status === 409) {
        setHoldInfo({
          error: t("errors.slotTaken")
        });
        return;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error("HOLD error:", txt);
        setHoldInfo({ error: t("errors.holdFail") });
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

    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      setConfirmState({
        error: t("errors.invalidForm")
      });
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
        setConfirmState({
          error: t("errors.holdExpired")
        });
        return;
      }
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error("CONFIRM error:", txt);
        setConfirmState({
          error: t("errors.confirmFail")
        });
        return;
      }

      const json = await res.json();
      if (json.ok) {
        setConfirmState({ ok: true });
      } else {
        setConfirmState({
          error: t("errors.unexpected")
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border p-4 bg-neutral-50">
      <div className="font-semibold mb-2">{t("title")}</div>

      {!hasAll && (
        <p className="text-sm text-neutral-600">{t("hintSelect")}</p>
      )}

      {service && (
        <p className="text-sm">
          <span className="font-medium">{t("labels.service")}</span>{" "}
          {service.title} — {service.durationMin} {t("labels.min")} •{" "}
          {priceFormatted}
        </p>
      )}

      {datetime?.timeISO && (
        <p className="text-sm mt-1">
          <span className="font-medium">{t("labels.appointment")}</span>{" "}
          {new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short"
          }).format(new Date(datetime.timeISO))}
        </p>
      )}

      {holdInfo?.error && (
        <p className="mt-3 text-sm text-red-600">{holdInfo.error}</p>
      )}

      {/* STEP 1: CTA Weiter → crea HOLD */}
      {!hasHold && (
        <button
          type="button"
          disabled={!hasAll || loading}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${
            hasAll
              ? "bg-black hover:opacity-90"
              : "bg-neutral-400 cursor-not-allowed"
          }`}
          onClick={createHold}
        >
          {loading ? t("btn.wait") : t("btn.next")}
        </button>
      )}

      {/* STEP 2: Datos cliente (antes de confirmación o pago) */}
      {hasHold && !confirmState?.ok && (
        <div className="mt-4">
          <div className="text-sm text-green-700">
            {t("hold.info")}
            <div className="mt-1 opacity-80">
              {t("hold.until")}{" "}
              {new Intl.DateTimeFormat(locale, {
                hour: "2-digit",
                minute: "2-digit"
              }).format(new Date(holdInfo.hold_until))}
            </div>
          </div>

          <form className="mt-4 space-y-3" onSubmit={confirmPending}>
            <input
              type="text"
              placeholder={t("form.name")}
              className="w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <input
              type="email"
              placeholder={t("form.email")}
              className="w-full border rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            {confirmState?.error && (
              <p className="text-sm text-red-600">{confirmState.error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
            >
              {loading
                ? t("btn.sending")
                : isFreeOrNoPay
                ? t("btn.reserveFree")
                : t("btn.confirm")}
            </button>
          </form>
        </div>
      )}

      {/* STEP 3A: Éxito directo si es gratis O pagos apagados */}
      {confirmState?.ok && isFreeOrNoPay && (
        <div className="mt-4 rounded-lg border bg-white p-3 text-sm">
          <div className="font-medium">{t("success.title")}</div>
          <p className="mt-1">{t("success.body")}</p>
        </div>
      )}

      {/* STEP 3B: Pago (PayPal) solo si NO es gratis y pagos están activos */}
      {confirmState?.ok && !isFreeOrNoPay && (
        <div className="mt-4 rounded-lg border bg-white p-3 text-sm">
          <div className="font-medium">{t("payPending.title")}</div>
          <p className="mt-1">{t("payPending.body")}</p>
          <PayPalSection
            holdInfo={holdInfo}
            isFree={isFree}
            paymentsEnabled={PAYMENTS_ENABLED}
          />
        </div>
      )}
    </div>
  );
}
