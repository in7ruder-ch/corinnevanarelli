// src/app/events/seminars/[slug]/page.jsx
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SEMINAR_SLUG = "seminar-fruhling-2026";

function splitParagraphs(text) {
  return String(text || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

function renderInlineMarkdown(text) {
  // Soporta **bold** y *italic* (simple, sin nesting complejo)
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    // **bold**
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        const content = text.slice(i + 2, end);
        tokens.push({ type: "bold", content });
        i = end + 2;
        continue;
      }
    }

    // *italic*
    if (text[i] === "*") {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        const content = text.slice(i + 1, end);
        tokens.push({ type: "italic", content });
        i = end + 1;
        continue;
      }
    }

    // plain text until next *
    const next = text.indexOf("*", i);
    const end = next === -1 ? text.length : next;
    tokens.push({ type: "text", content: text.slice(i, end) });
    i = end;
  }

  return tokens.map((tok, idx) => {
    if (tok.type === "bold") {
      return (
        <strong key={idx} className="font-semibold" style={{ color: "var(--text)" }}>
          {tok.content}
        </strong>
      );
    }
    if (tok.type === "italic") {
      return (
        <em key={idx} className="italic">
          {tok.content}
        </em>
      );
    }
    return <span key={idx}>{tok.content}</span>;
  });
}

function renderParagraphsWithMarkdown(text) {
  return splitParagraphs(text).map((p, i) => (
    <p key={i} className={i === 0 ? "" : "mt-4"}>
      {p.split("\n").map((line, li) => (
        <span key={li}>
          {renderInlineMarkdown(line)}
          {li < p.split("\n").length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  ));
}

export async function generateStaticParams() {
  return [{ slug: SEMINAR_SLUG }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug !== SEMINAR_SLUG) notFound();

  const t = await getTranslations("SeminarFruhling2026.meta");
  const locale = await getLocale();

  const ogLocale = locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: t("canonical") },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: t("og.url"),
      siteName: t("og.siteName"),
      images: [
        {
          url: t("og.images.0.url"),
          width: 1200,
          height: 630,
          alt: t("og.images.0.alt"),
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: [t("twitter.images.0")],
    },
  };
}

export default async function SeminarDetailPage({ params }) {
  const { slug } = await params;
  if (slug !== SEMINAR_SLUG) notFound();

  const t = await getTranslations("SeminarFruhling2026");

  const heroBody = `${t("s1.title")}\n\n${t("s1.body")}`;
  const detailsBody = [
    t("s2.body"),
    `• ${t("s2.points.0")}\n• ${t("s2.points.1")}\n• ${t("s2.points.2")}`,
  ].join("\n\n");

  const longTextStyle = {
    fontFamily: "var(--font-long)",
    fontSize: "1.0625rem",
    lineHeight: "1.7",
    color: "var(--muted)",
  };

  // botones “soft”
  const softPill = {
    backgroundColor: "var(--surface)",
    border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
    color: "var(--text)",
  };

  // CTA principal (salvia)
  const brandPill = {
    backgroundColor: "var(--brand)",
    border: "1px solid color-mix(in srgb, var(--brand) 35%, transparent)",
    color: "white",
  };

  // badges/chips suaves (dorado solo “detalle”)
  const chipStyle = {
    backgroundColor: "color-mix(in srgb, var(--brand) 10%, var(--surface))",
    border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
    color: "var(--text)",
  };

  return (
    <>
      {/* HERO */}
      <Section
        className="pt-[12rem] pb-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Texto */}
          <div className="max-w-xl">
            <p
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              {t("intro.kicker")}
            </p>

            <h1
              className="mt-3 text-[2.4rem] md:text-[3rem] leading-tight font-bold whitespace-pre-line"
              style={{ color: "var(--text)" }}
            >
              {t("intro.title")}
            </h1>

            <p className="mt-4 text-base md:text-lg whitespace-pre-line" style={{ color: "var(--muted)" }}>
              {t("intro.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-full px-6 py-2 text-sm font-medium transition-colors"
                data-seminarhero-pill="brand"
              >
                {t("hero.ctaPrimary")}
              </a>

              <a
                href="#details"
                className="rounded-full px-6 py-2 text-sm font-medium transition-colors"
                data-seminarhero-pill="soft"
              >
                {t("hero.ctaSecondary")}
              </a>

              <Link
                href="/events/seminars"
                className="rounded-full px-6 py-2 text-sm font-medium transition-colors"
                data-seminarhero-pill="soft"
              >
                {t("nav.back")}
              </Link>
            </div>

            <style
              dangerouslySetInnerHTML={{
                __html: `
      a[data-seminarhero-pill="soft"]{
        background-color: var(--surface);
        border: 1px solid color-mix(in srgb, var(--brand) 22%, transparent);
        color: var(--text);
      }
      a[data-seminarhero-pill="soft"]:hover{
        background-color: color-mix(in srgb, var(--brand) 12%, var(--surface));
        border-color: color-mix(in srgb, var(--brand) 40%, transparent);
      }

      a[data-seminarhero-pill="brand"]{
        background-color: var(--brand);
        border: 1px solid color-mix(in srgb, var(--brand) 35%, transparent);
        color: white;
      }
      a[data-seminarhero-pill="brand"]:hover{
        background-color: color-mix(in srgb, var(--brand) 85%, black);
      }
    `,
              }}
            />


            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full px-3 py-1" style={chipStyle}>
                {t("intro.meta.0")}
              </span>
              <span className="rounded-full px-3 py-1" style={chipStyle}>
                {t("intro.meta.1")}
              </span>
              <span className="rounded-full px-3 py-1" style={chipStyle}>
                {t("intro.meta.2")}
              </span>
            </div>

            {/* Hero body */}
            <div className="mt-8" style={longTextStyle}>
              {renderParagraphsWithMarkdown(heroBody)}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            {t("images.0.src") ? (
              <Image
                src={t("images.0.src")}
                alt={t("images.0.alt")}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            ) : (
              <div
                className="h-full w-full rounded-3xl border border-dashed flex items-center justify-center"
                style={{
                  borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {t("images.0.placeholder")}
                </span>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* DETAILS */}
      <Section
        id="details"
        className="py-14 scroll-mt-40"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-stretch">
          {/* Image 2 */}
          <div className="h-full">
            <div className="relative h-full min-h-[260px] md:min-h-[320px] rounded-3xl overflow-hidden">
              {t("images.1.src") ? (
                <Image
                  src={t("images.1.src")}
                  alt={t("images.1.alt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div
                  className="h-full w-full rounded-3xl border border-dashed flex items-center justify-center"
                  style={{
                    borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
                    backgroundColor: "var(--surface)",
                  }}
                >
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {t("images.1.placeholder")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Texto */}
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
              {t("s2.title")}
            </h2>

            <div className="mt-4" style={longTextStyle}>
              {splitParagraphs(detailsBody).map((p, i) => (
                <p key={i} className={i === 0 ? "" : "mt-4 whitespace-pre-line"}>
                  {p}
                </p>
              ))}
            </div>

            <div
              className="mt-8 rounded-2xl p-6"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
              }}
            >
              <p className="text-lg font-medium whitespace-pre-line" style={{ color: "var(--text)" }}>
                {t("s2.outro")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FOR WHO / WHAT YOU GET */}
      <Section
        className="py-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              {t("s3.for.title")}
            </h3>
            <ul className="mt-4 space-y-3 list-disc pl-5" style={{ color: "var(--muted)" }}>
              <li>{t("s3.for.items.0")}</li>
              <li>{t("s3.for.items.1")}</li>
              <li>{t("s3.for.items.2")}</li>
              <li>{t("s3.for.items.3")}</li>
              <li>{t("s3.for.items.4")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              {t("s5.title")}
            </h3>
            <ul className="mt-4 space-y-3 list-disc pl-5" style={{ color: "var(--muted)" }}>
              <li>{t("s5.items.0")}</li>
              <li>{t("s5.items.1")}</li>
              <li>{t("s5.items.2")}</li>
              <li>{t("s5.items.3")}</li>
              <li>{t("s5.items.4")}</li>
            </ul>
          </div>
        </div>

            <div
              className="mt-8 rounded-2xl p-6"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
              }}
            >
              <p className="text-center text-lg font-medium whitespace-pre-line" style={{ color: "var(--text)" }}>
                {t("s3.for.note")}
              </p>
            </div>
      </Section>

      {/* HOW WE WORK */}
      <Section
        className="py-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <h2 className="text-2xl font-semibold mb-8" style={{ color: "var(--text)" }}>
          {t("s4.title")}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
              }}
            >
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: "var(--muted)" }}
              >
                {t(`s4.parts.${idx}.kicker`)}
              </p>
              <p className="mt-3 font-medium" style={{ color: "var(--text)" }}>
                {t(`s4.parts.${idx}.title`)}
              </p>
              <p className="mt-2 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
                {t(`s4.parts.${idx}.body`)}
              </p>
              {idx === 1 ? (
                <p className="mt-3 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
                  {t("s4.parts.1.note")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section
        className="py-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--text)" }}>
          {t("gallery.title")}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[2, 3].map((idx) => {
            const src = t(`images.${idx}.src`);
            const alt = t(`images.${idx}.alt`);
            const placeholder = t(`images.${idx}.placeholder`);

            return (
              <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                {src ? (
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                ) : (
                  <div
                    className="h-full w-full rounded-2xl border border-dashed flex items-center justify-center text-sm"
                    style={{
                      borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)",
                      backgroundColor: "var(--surface)",
                      color: "var(--muted)",
                    }}
                  >
                    {placeholder}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ORGANISATORISCHES + EINLADUNG */}
      <Section
        className="py-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {t("s6.title")}
          </h2>

          <div
            className="mt-8 rounded-2xl p-6"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
            }}
          >
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              {t("s6.datesTitle")}
            </h3>
            <p className="mt-2 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
              {t("s6.datesBody")}
            </p>

            <div
              className="my-8 h-px"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 45%, transparent)" }}
            />

            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              {t("s6.placeTitle")}
            </h3>
            <p className="mt-2 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
              {t("s6.placeBody")}
            </p>
          </div>

          <p className="mt-4 whitespace-pre-line" style={longTextStyle}>
            {t("s6.inviteBody")}
          </p>
        </div>
      </Section>

      {/* CONTACT */}
      <div id="kontakt" className="scroll-mt-40">
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}
