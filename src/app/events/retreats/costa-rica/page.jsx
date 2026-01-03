// src/app/events/retreats/costa-rica/page.jsx
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata() {
  const t = await getTranslations("EventsRetreatCostaRica.meta");
  const locale = await getLocale();

  const ogLocale =
    locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

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

export default async function CostaRicaRetreatPage() {
  const t = await getTranslations("EventsRetreatCostaRica");

  return (
    <>
      {/* HERO (activo) */}
      <Section
        className="bg-white pt-[12rem] pb-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Texto */}
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
              {t("hero.kicker")}
            </p>

            <h1 className="mt-3 text-[2.4rem] md:text-[3rem] leading-tight font-bold text-neutral-900 whitespace-pre-line">
              {t("hero.title")}
            </h1>

            {/* COMING SOON TEXT */}
            <p className="mt-4 text-base md:text-lg text-neutral-700 whitespace-pre-line">
              {t("hero.comingSoon")}
            </p>

            {/* CTA desactivado por ahora */}
            {/* 
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                {t("hero.ctaPrimary")}
              </a>
            </div>
            */}

            {/* Badges (siguen ok) */}
            <div className="mt-8 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                {t("hero.badges.0")}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                {t("hero.badges.1")}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                {t("hero.badges.2")}
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            {t("hero.image.src") ? (
              <Image
                src={t("hero.image.src")}
                alt={t("hero.image.alt")}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="h-full w-full rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                <span className="text-sm text-neutral-400">
                  {t("hero.image.placeholder")}
                </span>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* TODO: RESTO DEL CONTENIDO — TEMPORALMENTE DESACTIVADO */}
      {/*
        DETAILS
        FOR WHO / WHAT YOU GET
        HOW WE WORK
        GALLERY
        CONTACT
        FOOTER
      */}

      <Footer />
    </>
  );
}
