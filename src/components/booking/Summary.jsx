"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const TEL_HREF = "tel:+41797167212";
const MAIL_HREF = "mailto:kontakt@corinnevanarelli.ch";

const PAID_BOOKINGS_ENABLED =
  (process.env.NEXT_PUBLIC_PAID_BOOKINGS_ENABLED ?? "").toString().trim() === "true";

export default function Summary({ service, datetime, isAutoBooking = true }) {
  const t = useTranslations("Booking.Summary");
  const locale = useLocale();

  const [loading, setLoading] = useState(false);
  const [holdInfo, setHoldInfo] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [confirmState, setConfirmState] = useState(null);
  const [formError, setFormError] = useState(null);

  const hasAll = Boolean(service && datetime?.timeISO);
  const hasHold = Boolean(holdInfo?.bookingId);

  const priceNumber = Number(
    service?.price ??
    service?.price_chf ??
    service?.priceChf ??
    service?.priceCHF ??
    0
  );

  const isPaidService = priceNumber > 0;

  useEffect(() => {
    setHoldInfo(null);
    setConfirmState(null);
    setFormError(null);
  }, [service?.id]);

  const priceFormatted = useMemo(() => {
    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 0,
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

      const serviceId = service?.id ?? service?._id ?? service;

      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ serviceId, startISO: datetime.timeISO }),
      });

      if (res.status === 409) { setHoldInfo({ error: t("errors.slotTaken") }); return; }
      if (!res.ok) { setHoldInfo({ error: t("errors.holdFail") }); return; }

      const json = await res.json();
      setHoldInfo({ bookingId: json.bookingId, hold_until: json.hold_until });
    } finally {
      setLoading(false);
    }
  }

  async function confirmPending(ev) {
    ev?.preventDefault?.();
    if (!holdInfo?.bookingId || loading) return;

    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      setConfirmState({ error: t("errors.invalidForm") });
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
          email: form.email.trim(),
        }),
      });

      if (!res.ok) { setConfirmState({ error: t("errors.confirmFail") }); return; }

      const json = await res.json();
      if (json.ok) setConfirmState({ ok: true });
    } finally {
      setLoading(false);
    }
  }

  async function redirectToStripe(ev) {
    ev?.preventDefault?.();
    if (!hasAll || loading) return;

    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      setFormError(t("errors.invalidForm"));
      return;
    }

    try {
      setLoading(true);
      setFormError(null);

      const res = await fetch("/api/stripe/checkout-booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          serviceId: service?.id,
          startISO: datetime.timeISO,
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });

      const json = await res.json();

      if (res.status === 409) { setFormError(t("errors.slotTaken")); return; }
      if (!res.ok || !json?.ok) { setFormError(t("errors.holdFail")); return; }

      window.location.href = json.url;
    } catch (err) {
      console.error("[Summary] redirectToStripe error:", err);
      setFormError(t("errors.holdFail"));
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
      }}
    >
      <div className="font-semibold mb-2" style={{ color: "var(--text)" }}>
        {t("title")}
      </div>

      {isAutoBooking && !hasAll && (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {t("hintSelect")}
        </p>
      )}

      {service && (
        <p className="text-sm" style={{ color: "var(--text)" }}>
          <strong>{t("labels.service")}</strong>{" "}
          {service.title} • {service.durationMin} {t("labels.min")} • {priceFormatted}
        </p>
      )}

      {isAutoBooking && datetime?.timeISO && (
        <p className="text-sm mt-1" style={{ color: "var(--text)" }}>
          <strong>{t("labels.appointment")}:</strong>{" "}
          {new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(datetime.timeISO))}
        </p>
      )}

      {!isAutoBooking && service && (
        <>
          <div
            className="mt-4 rounded-xl p-4 text-sm"
            style={{
              backgroundColor: "color-mix(in srgb, var(--brand) 8%, var(--surface))",
              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
              color: "var(--text)",
            }}
          >
            {t("manual.message")}
          </div>

          <a
            href={TEL_HREF}
            className="mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors inline-flex items-center justify-center"
            style={{ backgroundColor: "var(--brand)", color: "white", textDecoration: "none" }}
            data-summary-cta
          >
            {t("manual.ctaPhone")}
          </a>

          <a
            href={MAIL_HREF}
            className="mt-3 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors inline-flex items-center justify-center"
            style={{ backgroundColor: "var(--brand)", color: "white", textDecoration: "none" }}
            data-summary-cta
          >
            {t("manual.ctaMail")}
          </a>

          <style
            dangerouslySetInnerHTML={{
              __html: `a[data-summary-cta]:hover { background-color: color-mix(in srgb, var(--brand) 85%, black); }`,
            }}
          />
        </>
      )}

      {isAutoBooking && (
        <>
          {PAID_BOOKINGS_ENABLED && isPaidService && (
            <div className="mt-4 space-y-3">
              {["name", "email"].map((f) => (
                <input
                  key={f}
                  type={f === "email" ? "email" : "text"}
                  placeholder={t(`form.${f}`)}
                  className="w-full rounded-xl px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
                    color: "var(--text)",
                  }}
                  value={form[f]}
                  onChange={(e) => setForm((x) => ({ ...x, [f]: e.target.value }))}
                />
              ))}

              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}

              <button
                type="button"
                disabled={!hasAll || loading}
                onClick={redirectToStripe}
                className="w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: hasAll
                    ? "var(--brand)"
                    : "color-mix(in srgb, var(--brand) 25%, transparent)",
                  color: "white",
                }}
                data-summary-cta
              >
                {loading ? t("btn.wait") : `${t("btn.pay")} ${priceFormatted}`}
              </button>
            </div>
          )}

          {(!PAID_BOOKINGS_ENABLED || !isPaidService) && (
            <>
              {holdInfo?.error && (
                <p className="mt-3 text-sm text-red-600">{holdInfo.error}</p>
              )}

              {!hasHold && (
                <button
                  type="button"
                  disabled={!hasAll || loading}
                  onClick={createHold}
                  className="mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: hasAll
                      ? "var(--brand)"
                      : "color-mix(in srgb, var(--brand) 25%, transparent)",
                    color: "white",
                  }}
                  data-summary-cta
                >
                  {loading ? t("btn.wait") : t("btn.next")}
                </button>
              )}

              {hasHold && !confirmState?.ok && (
                <div className="mt-4">
                  <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                    {t("hold.info")} – {t("hold.until")}{" "}
                    {new Intl.DateTimeFormat(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(holdInfo.hold_until))}
                  </div>

                  <form className="space-y-3" onSubmit={confirmPending}>
                    {["name", "email"].map((f) => (
                      <input
                        key={f}
                        type={f === "email" ? "email" : "text"}
                        placeholder={t(`form.${f}`)}
                        className="w-full rounded-xl px-4 py-3 text-sm"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
                          color: "var(--text)",
                        }}
                        value={form[f]}
                        onChange={(e) => setForm((x) => ({ ...x, [f]: e.target.value }))}
                      />
                    ))}

                    {confirmState?.error && (
                      <p className="text-sm text-red-600">{confirmState.error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                      style={{ backgroundColor: "var(--brand)", color: "white" }}
                      data-summary-cta
                    >
                      {loading ? t("btn.sending") : t("btn.reserveFree")}
                    </button>
                  </form>
                </div>
              )}

              {confirmState?.ok && (
                <div
                  className="mt-4 rounded-xl p-3 text-sm"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--brand) 8%, var(--surface))",
                    border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
                  }}
                >
                  <div className="font-medium">{t("success.title")}</div>
                  <p className="mt-1">{t("success.body")}</p>
                </div>
              )}
            </>
          )}

          <style
            dangerouslySetInnerHTML={{
              __html: `button[data-summary-cta]:hover { background-color: color-mix(in srgb, var(--brand) 85%, black); }`,
            }}
          />
        </>
      )}
    </div>
  );
}