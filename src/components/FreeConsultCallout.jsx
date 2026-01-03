'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function FreeConsultCallout({
  id,
  title,
  subtitle,
  duration,
  price,
  ctaHref = "/book",
  ctaLabel,
  padTop = true,
  padBottom = true,
  gray = true,
}) {
  const t = useTranslations("FreeConsultCallout");

  const padY = [
    padTop ? "pt-14 md:pt-0" : "pt-0",
    padBottom ? "pb-16 md:pb-24" : "pb-0",
  ].join(" ");

  const sectionBgStyle = gray
    ? { backgroundColor: "color-mix(in srgb, var(--brand) 6%, var(--surface))" }
    : { backgroundColor: "transparent" };

  const _title = title ?? t("title");
  const _subtitle = subtitle ?? t("subtitle");
  const _duration = duration ?? t("duration");
  const _price = price ?? t("price");
  const _ctaLabel = ctaLabel ?? t("ctaLabel");

  return (
    <section id={id} className={padY} style={sectionBgStyle}>
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-2xl p-6 sm:p-8 md:p-12"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
            }}
          >
            <div className="text-center">
              <h3
                className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] leading-tight font-semibold [text-wrap:balance]"
                style={{ color: "var(--text)" }}
              >
                {_title}
              </h3>

              {_subtitle ? (
                <p className="mt-4 whitespace-pre-line" style={{ color: "var(--muted)" }}>
                  {_subtitle}
                </p>
              ) : null}

              <hr
                className="my-8"
                style={{
                  borderTop: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
                }}
              />

              <div className="flex flex-wrap items-center justify-center gap-2">
                <span
                  className="text-sm rounded-full px-4 py-2"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--brand) 10%, var(--surface))",
                    border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  {_duration}
                </span>

                <span
                  className="text-sm rounded-full px-4 py-2"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--brand) 10%, var(--surface))",
                    border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  {_price}
                </span>
              </div>

              {/* ✅ CTA: sin inline para que hover funcione */}
              <Link
                href={ctaHref}
                className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors"
                data-freeconsult-cta
              >
                {_ctaLabel}
              </Link>

              {/* ✅ CSS define base + hover */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    a[data-freeconsult-cta]{
                      background-color: var(--brand);
                      border: 1px solid color-mix(in srgb, var(--brand) 35%, transparent);
                      color: white;
                    }
                    a[data-freeconsult-cta]:hover{
                      background-color: color-mix(in srgb, var(--brand) 85%, black);
                    }
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
