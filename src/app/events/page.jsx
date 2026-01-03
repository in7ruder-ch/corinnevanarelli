// src/app/events/page.jsx
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import SeminarCard from "@/components/SeminarCard";

// Metadata i18n
export async function generateMetadata() {
    const t = await getTranslations("Events.meta");
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

export default async function EventsPage() {
    const t = await getTranslations("Events");

    return (
        <>
            {/* Intro */}
            <Section
                className="bg-white pt-[12rem] pb-10 md:pb-16"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="max-w-3xl">
                    <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                        {t("intro.kicker")}
                    </p>

                    <h1 className="mt-3 text-[2.25rem] md:text-[3rem] leading-tight font-bold text-neutral-900">
                        {t("intro.title")}
                    </h1>

                    <p className="mt-4 text-base md:text-lg text-neutral-700 whitespace-pre-line">
                        {t("intro.body")}
                    </p>

                    {/* Navegación interna */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#seminarios"
                            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                        >
                            {t("nav.seminars")}
                        </a>

                        <a
                            href="#retiros"
                            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                        >
                            {t("nav.retreats")}
                        </a>

                        <a
                            href="#kontakt"
                            className="rounded-full px-4 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            {t("nav.cta")}
                        </a>
                    </div>
                </div>
            </Section>

            {/* SEMINARIOS (overview) */}
            <Section
                id="seminarios"
                className="bg-white pb-10 md:pb-14 scroll-mt-40"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                        {t("seminars.title")}
                    </h2>
                    <p className="mt-2 text-neutral-700 whitespace-pre-line">
                        {t("seminars.subtitle")}
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {/* Card: Online Seminar REAL */}
                    <SeminarCard
                        t={t}
                        href="/events/seminars/seminar-fruhling-2026"
                    />  

                    {/* placeholders */}
                    <div className="hidden md:block" />
                    <div className="hidden md:block" />
                </div>
            </Section>

            {/* RETIROS (overview) */}
            <Section
                id="retiros"
                className="bg-[#fafafa] py-10 md:py-14 scroll-mt-40"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                        {t("retreats.title")}
                    </h2>
                    <p className="mt-2 text-neutral-700 whitespace-pre-line">
                        {t("retreats.subtitle")}
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {/* Card: Costa Rica Retreat */}
                    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                            {t("retreats.items.0.tag")}
                        </p>

                        <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                            {t("retreats.items.0.title")}
                        </h3>

                        <p className="mt-2 text-sm text-neutral-700 whitespace-pre-line">
                            {t("retreats.items.0.body")}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("retreats.items.0.meta.0")}
                            </span>
                            <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("retreats.items.0.meta.1")}
                            </span>
                            <span className="text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("retreats.items.0.meta.2")}
                            </span>
                        </div>

                        <Link
                            href="/events/retreats/costa-rica"
                            className="mt-6 inline-flex text-sm font-medium text-neutral-900 hover:text-neutral-700"
                        >
                            {t("retreats.items.0.cta")} →
                        </Link>
                    </article>

                    {/* placeholders */}
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
