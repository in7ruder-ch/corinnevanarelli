// src/app/[locale]/book/cancel/page.js
"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function BookCancelPage() {
  const t = useTranslations("Book");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const released = useRef(false);

  useEffect(() => {
    if (!bookingId || released.current) return;
    released.current = true;

    // Liberamos el HOLD silenciosamente
    fetch("/api/bookings/cancel-hold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    }).catch((e) => console.error("[book/cancel] release hold error:", e));
  }, [bookingId]);

  return (
    <main className="mt-32 mx-auto max-w-xl px-4 py-16 md:py-24 text-center">
      <div className="text-5xl mb-6">↩️</div>
      <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: "var(--text)" }}>
        {t("cancel.title")}
      </h1>
      <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
        {t("cancel.body")}
      </p>
      <Link
        href={`/${locale}/book`}
        className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
        style={{ backgroundColor: "var(--brand)", color: "white" }}
      >
        {t("cancel.cta")}
      </Link>
    </main>
  );
}