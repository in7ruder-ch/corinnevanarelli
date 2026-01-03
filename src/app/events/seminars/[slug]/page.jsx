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
                <strong key={idx} className="font-semibold text-neutral-900">
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
    // ✅ Next sync dynamic APIs: params puede venir como Promise
    const { slug } = await params;
    if (slug !== SEMINAR_SLUG) notFound();

    const t = await getTranslations("SeminarFruhling2026.meta");
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

export default async function SeminarDetailPage({ params }) {
    // ✅ Next sync dynamic APIs: params puede venir como Promise
    const { slug } = await params;
    if (slug !== SEMINAR_SLUG) notFound();

    const t = await getTranslations("SeminarFruhling2026");

    // Textos (reusamos tu contenido existente)
    const heroBody = `${t("s1.title")}\n\n${t("s1.body")}`;
    const detailsBody = [
        t("s2.body"),
        `• ${t("s2.points.0")}\n• ${t("s2.points.1")}\n• ${t("s2.points.2")}`,
    ].join("\n\n");

    const longTextStyle = {
        fontFamily: "var(--font-long)",
        fontSize: "1.0625rem",
        lineHeight: "1.7",
    };

    return (
        <>
            {/* HERO (igual patrón que Costa Rica) */}
            <Section
                className="bg-white pt-[12rem] pb-14"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="grid gap-10 md:grid-cols-2 items-center">
                    {/* Texto */}
                    <div className="max-w-xl">
                        <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                            {t("intro.kicker")}
                        </p>

                        <h1 className="mt-3 text-[2.4rem] md:text-[3rem] leading-tight font-bold text-neutral-900 whitespace-pre-line">
                            {t("intro.title")}
                        </h1>

                        <p className="mt-4 text-base md:text-lg text-neutral-700 whitespace-pre-line">
                            {t("intro.subtitle")}
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

                            <Link
                                href="/events/seminars"
                                className="rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
                            >
                                {t("nav.back")}
                            </Link>
                        </div>

                        {/* Badges */}
                        <div className="mt-8 flex flex-wrap gap-3 text-xs">
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("intro.meta.0")}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("intro.meta.1")}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                                {t("intro.meta.2")}
                            </span>
                        </div>

                        {/* Hero body (Wendepunkt...) */}
                        <div className="mt-8 text-neutral-700" style={longTextStyle}>
                            {renderParagraphsWithMarkdown(heroBody)}
                        </div>
                    </div>

                    {/* Hero Image (IMAGE 1) */}
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
                            <div className="h-full w-full rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                                <span className="text-sm text-neutral-400">
                                    {t("images.0.placeholder")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* DETAILS (2 cols + quote card, igual patrón) */}
            <Section
                id="details"
                className="bg-[#fafafa] py-14 scroll-mt-40"
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
                                <div className="h-full w-full rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                                    <span className="text-sm text-neutral-400">
                                        {t("images.1.placeholder")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Texto */}
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-semibold text-neutral-900">
                            {t("s2.title")}
                        </h2>

                        <div className="mt-4 text-neutral-700" style={longTextStyle}>
                            {splitParagraphs(detailsBody).map((p, i) => (
                                <p key={i} className={i === 0 ? "" : "mt-4 whitespace-pre-line"}>
                                    {p}
                                </p>
                            ))}
                        </div>

                        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
                            <p className="text-lg font-medium text-neutral-900 whitespace-pre-line">
                                {t("s2.outro")}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* FOR WHO / WHAT YOU GET (2 cols, listas) */}
            <Section
                className="bg-white py-14"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
            >
                <div className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            {t("s3.for.title")}
                        </h3>
                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            <li>{t("s3.for.items.0")}</li>
                            <li>{t("s3.for.items.1")}</li>
                            <li>{t("s3.for.items.2")}</li>
                            <li>{t("s3.for.items.3")}</li>
                        </ul>
                        <p className="mt-4 text-neutral-700 whitespace-pre-line" style={longTextStyle}>
                            {t("s3.for.note")}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            {t("s5.title")}
                        </h3>
                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            <li>{t("s5.items.0")}</li>
                            <li>{t("s5.items.1")}</li>
                            <li>{t("s5.items.2")}</li>
                            <li>{t("s5.items.3")}</li>
                            <li>{t("s5.items.4")}</li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* HOW WE WORK (cards, 3 pasos = 3 sesiones) */}
            <Section
                className="bg-[#fafafa] py-14"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
            >
                <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
                    {t("s4.title")}
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    {[0, 1, 2].map((idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-neutral-200 bg-white p-5"
                        >
                            <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                                {t(`s4.parts.${idx}.kicker`)}
                            </p>
                            <p className="mt-3 font-medium text-neutral-900">
                                {t(`s4.parts.${idx}.title`)}
                            </p>
                            <p className="mt-2 text-sm text-neutral-600 whitespace-pre-line">
                                {t(`s4.parts.${idx}.body`)}
                            </p>
                            {idx === 1 ? (
                                <p className="mt-3 text-sm text-neutral-600 whitespace-pre-line">
                                    {t("s4.parts.1.note")}
                                </p>
                            ) : null}
                        </div>
                    ))}
                </div>
            </Section>

            {/* GALLERY (2 imágenes para completar las 4) */}
            <Section
                className="bg-white py-14"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
            >
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                    {t("gallery.title")}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {[2, 3].map((idx) => {
                        const src = t(`images.${idx}.src`);
                        const alt = t(`images.${idx}.alt`);
                        const placeholder = t(`images.${idx}.placeholder`);

                        return (
                            <div
                                key={idx}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                            >
                                {src ? (
                                    <Image
                                        src={src}
                                        alt={alt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center text-sm text-neutral-400">
                                        {placeholder}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Section>

            {/* ORGANISATORISCHES + EINLADUNG (card + cierre) */}
            <Section
                className="bg-[#fafafa] py-14"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
            >
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-semibold text-neutral-900">
                        {t("s6.title")}
                    </h2>

                    <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
                        <h3 className="text-lg font-semibold text-neutral-900">
                            {t("s6.datesTitle")}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-700 whitespace-pre-line">
                            {t("s6.datesBody")}
                        </p>

                        <h3 className="mt-8 text-lg font-semibold text-neutral-900">
                            {t("s6.placeTitle")}
                        </h3>
                        <p className="mt-2 text-sm text-neutral-700 whitespace-pre-line">
                            {t("s6.placeBody")}
                        </p>
                    </div>

                    <p className="mt-4 text-neutral-700 whitespace-pre-line" style={longTextStyle}>
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