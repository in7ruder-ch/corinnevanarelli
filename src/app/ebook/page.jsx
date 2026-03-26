import { getTranslations, getLocale } from "next-intl/server";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata() {
  const t = await getTranslations("EbookPage.meta");
  const locale = await getLocale();

  const ogLocale =
    locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: t("canonical"),
    },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: t("og.url"),
      siteName: t("og.siteName"),
      images: [
        {
          url: t("og.image.url"),
          alt: t("og.image.alt"),
        },
      ],
      locale: ogLocale,
      type: "website",
    }
  };
}

export default async function EbookPage() {
    const t = await getTranslations("EbookPage");

    const introParagraphs = t.raw("intro.paragraphs");
    const mindfucksParagraphs = t.raw("mindfucks.paragraphs");
    const insideItems = t.raw("inside.items");
    const specialParagraphs = t.raw("special.paragraphs");
    const forWhomItems = t.raw("forWhom.items");
    const notExpectItems = t.raw("notExpect.items");
    const formatItems = t.raw("format.items");

    const h2Class =
        "text-3xl md:text-[2.25rem] font-semibold text-neutral-900 whitespace-pre-line";
    const h3Class =
        "text-xl md:text-2xl font-semibold text-neutral-900 whitespace-pre-line";

    return (
        <>
            {/* HERO */}
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

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                type="button"
                                className="rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                            >
                                {t("hero.primaryCta")}
                            </button>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                        <Image
                            src="/img/ebook/Mindfuck.webp"
                            alt="Mindfuck Detox Ebook"
                            fill
                            className="object-cover brightness-95 contrast-110"
                            sizes="(min-width: 768px) 50vw, 100vw"
                            priority
                        />
                    </div>
                </div>
            </Section>

            {/* INTRO */}
            <Section
                className="bg-white py-10 text-center"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className={h2Class}>{t("intro.title")}</h2>

                    <div className="mt-4 space-y-4 text-neutral-700 whitespace-pre-line">
                        {introParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </Section>

            <div className="my-8 flex justify-center">
                <span className="block h-px w-80 bg-neutral-200" />
            </div>

            {/* MINDFUCKS + INSIDE */}
            <Section
                className="bg-[#fafafa] py-10"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="grid gap-10 md:grid-cols-2 items-start">
                    <div className="max-w-xl">
                        <h2 className={h2Class}>{t("mindfucks.title")}</h2>

                        <div className="mt-4 space-y-4 text-neutral-700 whitespace-pre-line">
                            {mindfucksParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                        <h3 className={h3Class}>{t("inside.title")}</h3>

                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            {insideItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* SPECIAL + FOR WHOM */}
            <Section
                className="bg-white py-10"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h3 className={h3Class}>{t("special.title")}</h3>

                        <div className="mt-4 space-y-4 text-neutral-700 whitespace-pre-line">
                            {specialParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className={h3Class}>{t("forWhom.title")}</h3>

                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            {forWhomItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            <div className="my-8 flex justify-center">
                <span className="block h-px w-80 bg-neutral-200" />
            </div>

            {/* NOT EXPECT + FORMAT */}
            <Section
                className="bg-[#fafafa] py-10"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                        <h3 className={h3Class}>{t("notExpect.title")}</h3>

                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            {notExpectItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                        <h3 className={h3Class}>{t("format.title")}</h3>

                        <ul className="mt-4 space-y-3 list-disc pl-5 text-neutral-700">
                            {formatItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section
                className="bg-white pt-20 pb-20"
                containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
            >
                <div className="rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-10 md:px-10 md:py-14">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-xs tracking-[0.25em] uppercase text-white/60">
                            {t("hero.kicker")}
                        </p>

                        <h2 className="mt-3 text-[2rem] md:text-[2.6rem] leading-tight font-bold text-white whitespace-pre-line">
                            {t("cta.title")}
                        </h2>

                        <p className="mt-4 text-base md:text-lg text-white/80 whitespace-pre-line">
                            {t("cta.text")}
                        </p>

                        <div className="mt-8">
                            <button
                                type="button"
                                className="rounded-full px-6 py-2 bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors"
                            >
                                {t("cta.primary")}
                            </button>
                        </div>
                    </div>
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