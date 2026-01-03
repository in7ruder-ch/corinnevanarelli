// src/app/events/page.jsx
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SeminarCard from "@/components/SeminarCard";

export async function generateMetadata() {
  const t = await getTranslations("Events.meta");
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

export default async function EventsPage() {
  const t = await getTranslations("Events");

  const seminar = {
    href: "/events/seminars/seminar-fruhling-2026",
    tag: t("seminars.items.0.tag"),
    title: t("seminars.items.0.title"),
    body: t("seminars.items.0.body"),
    cta: t("seminars.items.0.cta"),
    meta: [0, 1, 2].map((i) => t(`seminars.items.0.meta.${i}`)),
  };

  const retreat = {
    href: "/events/retreats/costa-rica",
    tag: t("retreats.items.0.tag"),
    title: t("retreats.items.0.title"),
    body: t("retreats.items.0.body"),
    cta: t("retreats.items.0.cta"),
    meta: [0, 1, 2].map((i) => t(`retreats.items.0.meta.${i}`)),
  };

  return (
    <>
      <Section
        className="pt-[12rem] pb-10 md:pb-16"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
            {t("intro.kicker")}
          </p>

          <h1
            className="mt-3 text-[2.25rem] md:text-[3rem] leading-tight font-bold"
            style={{ color: "var(--text)" }}
          >
            {t("intro.title")}
          </h1>

          <p className="mt-4 text-base md:text-lg whitespace-pre-line" style={{ color: "var(--muted)" }}>
            {t("intro.body")}
          </p>

          {/* Navegación interna */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#seminarios"
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              data-events-pill="soft"
            >
              {t("nav.seminars")}
            </a>

            <a
              href="#retiros"
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              data-events-pill="soft"
            >
              {t("nav.retreats")}
            </a>

            <a
              href="#kontakt"
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              data-events-pill="brand"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* ✅ Base + hover en CSS (sin inline, ahora sí funciona) */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                a[data-events-pill="soft"]{
                  background-color: var(--surface);
                  border: 1px solid color-mix(in srgb, var(--brand) 22%, transparent);
                  color: var(--text);
                }
                a[data-events-pill="soft"]:hover{
                  background-color: color-mix(in srgb, var(--brand) 12%, var(--surface));
                  border-color: color-mix(in srgb, var(--brand) 40%, transparent);
                }
                a[data-events-pill="brand"]{
                  background-color: var(--brand);
                  border: 1px solid color-mix(in srgb, var(--brand) 35%, transparent);
                  color: white;
                }
                a[data-events-pill="brand"]:hover{
                  background-color: color-mix(in srgb, var(--brand) 85%, black);
                }

                /* Optional: retreat link hover without inline */
                a[data-retreat-link]{
                  color: var(--brand);
                }
                a[data-retreat-link]:hover{
                  color: color-mix(in srgb, var(--brand) 85%, black);
                }
              `,
            }}
          />
        </div>
      </Section>

      {/* SEMINARIOS */}
      <Section
        id="seminarios"
        className="pb-10 md:pb-14 scroll-mt-40"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {t("seminars.title")}
          </h2>
          <p className="mt-2 whitespace-pre-line" style={{ color: "var(--muted)" }}>
            {t("seminars.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <SeminarCard
            href={seminar.href}
            tag={seminar.tag}
            title={seminar.title}
            body={seminar.body}
            cta={seminar.cta}
            meta={seminar.meta}
          />
          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>
      </Section>

      {/* RETIROS */}
      <Section
        id="retiros"
        className="py-10 md:py-14 scroll-mt-40"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {t("retreats.title")}
          </h2>
          <p className="mt-2 whitespace-pre-line" style={{ color: "var(--muted)" }}>
            {t("retreats.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article
            className="rounded-2xl p-6 transition-colors"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
            }}
            data-retreat-card
          >
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
              {retreat.tag}
            </p>

            <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
              {retreat.title}
            </h3>

            <p className="mt-2 text-sm whitespace-pre-line" style={{ color: "var(--muted)" }}>
              {retreat.body}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {retreat.meta.map((m, idx) => (
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

            <Link
              href={retreat.href}
              className="mt-6 inline-flex text-sm font-medium transition-colors"
              data-retreat-link
            >
              {retreat.cta} →
            </Link>

            <style
              dangerouslySetInnerHTML={{
                __html: `
                  article[data-retreat-card]:hover {
                    border-color: color-mix(in srgb, var(--brand) 40%, transparent);
                  }
                `,
              }}
            />
          </article>

          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>
      </Section>

      <div id="kontakt" className="scroll-mt-40">
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}
