// src/components/SeminarCard.jsx
import Link from "next/link";

export default function SeminarCard({ href, tag, title, body, meta = [], cta }) {
  return (
    <article
      className="rounded-2xl p-6 transition-shadow"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid color-mix(in srgb, var(--brand) 28%, transparent)",
      }}
      data-seminar-card
    >
      <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
        {tag}
      </p>

      <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
        {title}
      </h3>

      <p className="mt-2 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
        {body}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {meta.map((m, idx) => (
          <span
            key={idx}
            className="text-xs rounded-full px-3 py-1"
            style={{
              backgroundColor: "color-mix(in srgb, var(--brand) 10%, var(--surface))",
              border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
              color: "var(--text)",
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* ✅ sin inline color → hover funciona */}
      <Link
        href={href}
        className="mt-6 inline-flex text-sm font-medium transition-colors"
        data-seminar-link
      >
        {cta} →
      </Link>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            article[data-seminar-card]:hover {
              box-shadow: 0 8px 20px rgba(0,0,0,0.06);
              border-color: color-mix(in srgb, var(--brand) 45%, transparent);
            }

            a[data-seminar-link]{
              color: var(--brand);
            }
            a[data-seminar-link]:hover{
              color: color-mix(in srgb, var(--brand) 85%, black);
            }
          `,
        }}
      />
    </article>
  );
}
