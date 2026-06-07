// src/app/[locale]/events/retreats/costa-rica/page.jsx
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getTranslations, getMessages } from "next-intl/server";
import Image from "next/image";
import GalleryLightbox from "@/components/GalleryLightbox";
import FAQAccordion from "@/components/FAQAccordion";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EventsRetreatCostaRica.meta" });

  const basePath = "/events/retreats/costa-rica";
  const currentUrl = `https://www.corinnevanarelli.ch/${locale}${basePath}`;
  const ogLocale =
    locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: currentUrl,
      languages: {
        de: "https://www.corinnevanarelli.ch/de/events/retreats/costa-rica",
        en: "https://www.corinnevanarelli.ch/en/events/retreats/costa-rica",
        es: "https://www.corinnevanarelli.ch/es/events/retreats/costa-rica",
      },
    },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: currentUrl,
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

export default async function CostaRicaRetreatPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EventsRetreatCostaRica" });
  const messages = await getMessages({ locale });

  // Helper: safely get questions array for a step (returns [] if not defined)
  const getStepQuestions = (stepIdx) => {
    try {
      const step = messages?.EventsRetreatCostaRica?.process?.steps?.[stepIdx];
      const questions = step?.questions;
      return Array.isArray(questions) ? questions : [];
    } catch {
      return [];
    }
  };

  const h2Class =
    "text-3xl md:text-[2.25rem] font-semibold text-neutral-900 whitespace-pre-line";
  const h3Class =
    "text-xl md:text-2xl font-semibold text-neutral-900 whitespace-pre-line";

  return (
    <>
      {/* ── HERO ── */}
      <Section
        className="bg-white pt-[12rem] pb-14"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
              {t("hero.kicker")}
            </p>

            <h1 className="mt-3 text-[2.4rem] md:text-[3rem] leading-tight font-bold text-neutral-900 whitespace-pre-line">
              {t("hero.title")}
            </h1>

            <p className="mt-4 text-base md:text-lg text-neutral-700 whitespace-pre-line">
              {t("hero.subtitle")}
            </p>

            <p className="mt-6 text-base md:text-lg text-neutral-700 whitespace-pre-line">
              {t("hero.body")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                {t("hero.ctaPrimary")}
              </a>

              <a
                href="#details"
                className="rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-brand/15 px-3 py-1 text-neutral-700"
                >
                  {t(`hero.badges.${idx}`)}
                </span>
              ))}
            </div>
          </div>

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

      {/* ── DETAILS ── */}
      <Section
        id="details"
        className="bg-[#fafafa] py-10 scroll-mt-40"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-stretch">
          <div className="h-full">
            <div className="relative h-full min-h-[260px] md:min-h-[320px] rounded-3xl overflow-hidden">
              {t("details.image.src") ? (
                <Image
                  src={t("details.image.src")}
                  alt={t("details.image.alt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                  <span className="text-sm text-neutral-400">
                    {t("details.image.placeholder")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-xl justify-center flex flex-col">
            <h2 className={h2Class}>{t("details.title")}</h2>

            <p className="mt-4 text-neutral-700 whitespace-pre-line">
              {t("details.body")}
            </p>

            <p className="mt-4 text-neutral-700 whitespace-pre-line">
              {t("details.body2")}
            </p>

            <p className="mt-4 text-neutral-700 whitespace-pre-line">
              {t("details.body3")}
            </p>
          </div>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── PROCESS ── */}
      <Section
        className="bg-white py-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl text-center mx-auto">
          <h2 className={h2Class}>{t("process.title")}</h2>
          <p className="mt-2 text-neutral-600 whitespace-pre-line">
            {t("process.subtitle")}
          </p>
          {/* NEW: process name / methodology label */}
          <p className="mt-6 text-sm font-semibold tracking-widest uppercase text-neutral-400">
            {t("process.processName")}
          </p>
          <p className="mt-4 text-neutral-700 whitespace-pre-line">
            {t("process.intro")}
          </p>
          <p className="mt-4 text-neutral-700 whitespace-pre-line">
            {t("process.intro2")}
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5"
              >
                <p className="text-sm font-semibold text-neutral-900 whitespace-pre-line">
                  {t(`process.steps.${idx}.title`)}
                </p>
                <p className="mt-2 text-xs text-neutral-600 whitespace-pre-line">
                  {t(`process.steps.${idx}.subtitle`)}
                </p>
                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">
                  {t(`process.steps.${idx}.body`)}
                </p>
                {/* Optional questions block — only renders if questions exist in JSON */}
                {getStepQuestions(idx).map((question, qIdx) => (
                  <p key={qIdx} className="mt-2 text-sm text-neutral-500 italic whitespace-pre-line">
                    {question}
                  </p>
                ))}
                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">
                  {t(`process.steps.${idx}.body2`)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:max-w-3xl md:mx-auto">
            {[3, 4].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5"
              >
                <p className="text-sm font-semibold text-neutral-900 whitespace-pre-line">
                  {t(`process.steps.${idx}.title`)}
                </p>
                <p className="mt-2 text-xs text-neutral-600 whitespace-pre-line">
                  {t(`process.steps.${idx}.subtitle`)}
                </p>
                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">
                  {t(`process.steps.${idx}.body`)}
                </p>
                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">
                  {t(`process.steps.${idx}.body2`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOR WHO ── */}
      <Section
        className="bg-[#fafafa] pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className={h3Class}>{t("forWho.title")}</h3>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <li key={idx}>{t(`forWho.items.${idx}`)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={h3Class}>{t("forWho.notTitle")}</h3>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
              {[0, 1, 2, 3].map((idx) => (
                <li key={idx}>{t(`forWho.notItems.${idx}`)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* NEW: closing line after both lists */}
        <div className="mt-10 max-w-2xl mx-auto text-center">
          <p className="text-neutral-900 font-medium whitespace-pre-line">
            {t("forWho.closing")}
          </p>
        </div>
      </Section>

      {/* ── WHAT TO EXPECT ── */}
      <Section
        className="bg-white pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="max-w-xl">
            <h3 className={h3Class}>{t("whatToExpect.title")}</h3>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
              {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                <li key={idx}>{t(`whatToExpect.items.${idx}`)}</li>
              ))}
            </ul>
            <p className="mt-6 text-neutral-700 whitespace-pre-line">
              {t("whatToExpect.note")}
            </p>
          </div>

          <div>
            <GalleryLightbox
              title={t("gallery.title")}
              images={Array.from({ length: 5 }).map((_, idx) => ({
                src: t(`gallery.images.${idx}.src`),
                alt: t(`gallery.images.${idx}.alt`),
                placeholder: t(`gallery.images.${idx}.placeholder`),
              }))}
            />
          </div>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── NEW: WHY COSTA RICA ── */}
      <Section
        className="bg-[#fafafa] py-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={h2Class}>{t("whyCR.title")}</h2>
          <p className="mt-6 text-neutral-700 whitespace-pre-line">
            {t("whyCR.body")}
          </p>
          <p className="mt-6 text-neutral-900 font-medium whitespace-pre-line">
            {t("whyCR.closing")}
          </p>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── GUIDANCE ── */}
      <Section
        className="bg-white pt-4 pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={h2Class}>{t("guidance.title")}</h2>

          <p className="mt-6 text-neutral-700 whitespace-pre-line">
            {t("guidance.intro")}
          </p>

          <p className="mt-8 text-neutral-700 whitespace-pre-line">
            {t("guidance.body")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/5] w-full">
              {t("guidance.corinne.image.src") ? (
                <Image
                  src={t("guidance.corinne.image.src")}
                  alt={t("guidance.corinne.image.alt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full border-b border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                  <span className="text-sm text-neutral-400">
                    {t("guidance.corinne.image.placeholder")}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className={h3Class}>{t("guidance.corinne.title")}</h3>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("guidance.corinne.body")}
              </p>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("guidance.corinne.body2")}
              </p>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("guidance.corinne.body3")}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <div className="relative aspect-[4/5] w-full">
              {t("guidance.nina.image.src") ? (
                <Image
                  src={t("guidance.nina.image.src")}
                  alt={t("guidance.nina.image.alt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ) : (
                <div className="h-full w-full border-b border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                  <span className="text-sm text-neutral-400">
                    {t("guidance.nina.image.placeholder")}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className={h3Class}>{t("guidance.nina.title")}</h3>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("guidance.nina.body")}
              </p>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("guidance.nina.body2")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="text-neutral-900 font-medium whitespace-pre-line">
            {t("guidance.closing")}
          </p>
        </div>

        <div className="mt-10">
          <div className="relative aspect-[16/7] rounded-3xl overflow-hidden">
            {t("guidance.placeImage.src") ? (
              <Image
                src={t("guidance.placeImage.src")}
                alt={t("guidance.placeImage.alt")}
                fill
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div className="h-full w-full rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                <span className="text-sm text-neutral-400">
                  {t("guidance.placeImage.placeholder")}
                </span>
              </div>
            )}
          </div>

          <p className="mt-6 max-w-3xl mx-auto text-center text-neutral-700 whitespace-pre-line">
            {t("guidance.placeCaption")}
          </p>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── TRANSFORMATION ── */}
      <Section
        className="bg-white pt-4 pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={h2Class}>{t("transformation.title")}</h2>

          <p className="mt-6 text-neutral-700 whitespace-pre-line">
            {t("transformation.intro")}
          </p>

          <ul className="mt-8 space-y-3 text-neutral-700">
            {[0, 1, 2, 3, 4].map((idx) => (
              <li key={idx}>{t(`transformation.items.${idx}`)}</li>
            ))}
          </ul>

          <p className="mt-8 text-neutral-700 whitespace-pre-line">
            {t("transformation.body")}
          </p>

          <p className="mt-4 text-neutral-700 whitespace-pre-line">
            {t("transformation.body2")}
          </p>

          <p className="mt-4 text-neutral-900 font-medium whitespace-pre-line">
            {t("transformation.closing")}
          </p>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── BOOKING ── */}
      <Section
        className="bg-[#fafafa] pt-4 pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`${h2Class} text-center`}>{t("booking.title")}</h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6">
              <h3 className={h3Class}>{t("booking.included.title")}</h3>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-neutral-700">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <li key={idx}>{t(`booking.included.items.${idx}`)}</li>
                ))}
              </ul>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("booking.included.optional")}
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200 p-6">
              <h3 className={h3Class}>{t("booking.cancellation.title")}</h3>
              <p className="mt-3 text-neutral-700 whitespace-pre-line">
                {t("booking.cancellation.body")}
              </p>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("booking.cancellation.body2")}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6">
              <h3 className={h3Class}>{t("booking.notes.title")}</h3>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-neutral-700">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx}>{t(`booking.notes.items.${idx}`)}</li>
                ))}
              </ul>
              <p className="mt-4 text-neutral-700 whitespace-pre-line">
                {t("booking.notes.footer")}
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200 p-6 flex flex-col">
              <h3 className={h3Class}>{t("booking.closing.title")}</h3>
              <p className="mt-3 text-neutral-700 whitespace-pre-line">
                {t("booking.closing.body")}
              </p>
              <p className="mt-4 text-neutral-900 font-medium whitespace-pre-line">
                {t("booking.closing.cta")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="my-8 flex justify-center">
        <span className="block h-px w-80 bg-neutral-200" />
      </div>

      {/* ── FAQ ── */}
      <Section
        className="bg-white"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <FAQAccordion
          title={t("faq.title")}
          items={[
            { q: t("faq.items.0.q"), a: t("faq.items.0.a") },
            { q: t("faq.items.1.q"), a: t("faq.items.1.a") },
            { q: t("faq.items.2.q"), a: t("faq.items.2.a") },
            { q: t("faq.items.3.q"), a: t("faq.items.3.a") },
            { q: t("faq.items.4.q"), a: t("faq.items.4.a") },
            { q: t("faq.items.5.q"), a: t("faq.items.5.a") },
            { q: t("faq.items.6.q"), a: t("faq.items.6.a") },
            { q: t("faq.items.7.q"), a: t("faq.items.7.a") },
          ]}
        />
      </Section>

      <div id="kontakt" className="scroll-mt-40">
        <ContactForm />
      </div>

      <Footer />
    </>
  );
}