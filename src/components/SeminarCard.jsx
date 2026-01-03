// src/components/SeminarCard.jsx
import Link from "next/link";

export default function SeminarCard({ t, href }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
        {t("seminars.items.0.tag")}
      </p>

      <h3 className="mt-3 text-lg font-semibold text-neutral-900">
        {t("seminars.items.0.title")}
      </h3>

      <p className="mt-2 text-sm text-neutral-700 whitespace-pre-line">
        {t("seminars.items.0.body")}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
          {t("seminars.items.0.meta.0")}
        </span>
        <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
          {t("seminars.items.0.meta.1")}
        </span>
        <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
          {t("seminars.items.0.meta.2")}
        </span>
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex text-sm font-medium text-neutral-900 hover:text-neutral-700"
      >
        {t("seminars.items.0.cta")} →
      </Link>
    </article>
  );
}
