import Section from "@/components/Section";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomeEbookSection() {
  const t = await getTranslations("Home.ebook");

  return (
    <Section
      className="bg-white py-10 md:py-14"
      containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      {/* Banner container */}
      <div className="border border-neutral-200 px-6 py-10 md:px-12 md:py-14 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Kicker */}
          <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
            {t("kicker")}
          </p>

          {/* Headline */}
          <h2 className="mt-6 text-[2.2rem] md:text-[3rem] leading-tight font-semibold text-neutral-900 whitespace-pre-line">
            {t("title")}
          </h2>

          {/* Text */}
          <p className="mt-6 text-lg md:text-xl text-neutral-700 whitespace-pre-line">
            {t("text")}
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/ebook"
              className="inline-flex rounded-full px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              {t("primaryCta")}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}