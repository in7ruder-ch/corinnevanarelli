// src/app/[locale]/book/success/page.js
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function BookSuccessPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("Book");

  return (
    <main className="mt-32 mx-auto max-w-xl px-4 py-16 md:py-24 text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: "var(--text)" }}>
        {t("success.title")}
      </h1>
      <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
        {t("success.body")}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
        style={{ backgroundColor: "var(--brand)", color: "white" }}
      >
        {t("success.cta")}
      </Link>
    </main>
  );
}