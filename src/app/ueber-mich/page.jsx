// src/app/ueber-mich/page.jsx
import Image from "next/image";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getTranslations } from "next-intl/server";

// Metadata i18n
export async function generateMetadata() {
  const t = await getTranslations("About.meta");
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
      locale: t("og.locale"),
      type: t("og.type"),
    },
    twitter: {
      card: t("twitter.card"),
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: [t("twitter.images.0")],
    },
  };
}

export default async function UeberMichPage() {
  const t = await getTranslations("About");

  const rows = [
    {
      year: t("education.rows.0.year"),
      left: [t("education.rows.0.left.0"), t("education.rows.0.left.1")],
      right: [t("education.rows.0.right.0")],
    },
    {
      year: t("education.rows.1.year"),
      left: [t("education.rows.1.left.0"), t("education.rows.1.left.1")],
      right: [t("education.rows.1.right.0"), t("education.rows.1.right.1")],
    },
    {
      year: t("education.rows.2.year"),
      left: [t("education.rows.2.left.0")],
      right: [t("education.rows.2.right.0")],
    },
    {
      year: t("education.rows.3.year"),
      left: [t("education.rows.3.left.0"), t("education.rows.3.left.1")],
      right: [t("education.rows.3.right.0")],
    },
  ];

  return (
    <>
      {/* Intro: texto izq / imagen der */}
      <Section
        className="bg-white pt-[12rem] pb-10 md:pb-16"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid items-stretch md:grid-cols-12">
          {/* Texto en “card” gris */}
          <div className="md:col-span-7">
            <div className="h-full bg-[#efefef] p-6 sm:p-8 md:p-12">
              <h1 className="text-[2.25rem] md:text-[3rem] leading-tight font-bold text-neutral-900">
                {t("intro.title")}
              </h1>
              <p className="mt-3 text-xl text-neutral-800">
                {/* contiene <em> */}
                {t.rich("intro.nameLine", {
                  em: (chunks) => <em className="italic">{chunks}</em>,
                })}
              </p>

              <div className="mt-8 space-y-5 leading-relaxed text-neutral-800">
                <p>{t("intro.p1")}</p>
                <p>{t("intro.p2")}</p>
                <p className="font-semibold">{t("intro.p3")}</p>

                {/* Instagram (opcional) */}
                <div className="pt-4">
                  <a
                    href="https://www.instagram.com/soulcoaching.coco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="md:col-span-5 overflow-hidden">
            <Image
              src="/img/Corinne Vanarelli - About me.jpg"
              alt={t("intro.imageAlt")}
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Ausbildung */}
      <Section
        className="bg-white pt-10 md:pt-14 pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <h2 className="text-[2rem] md:text-[2.5rem] leading-tight font-semibold text-neutral-900">
          {t("education.title")}
        </h2>

        {rows.map((row, idx) => (
          <div key={idx} className="mt-10 first:mt-10">
            <div className="grid md:grid-cols-2 gap-y-3 items-start">
              {/* Columna izquierda */}
              <div>
                <div className="text-sm text-neutral-500">{row.year}</div>
                <div className="mt-2 space-y-1 text-neutral-800">
                  {row.left.map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>

              {/* Columna derecha (correspondiente a la misma fila) */}
              <div>
                <div className="mt-6 md:mt-6 space-y-1 text-neutral-800">
                  {row.right.map((r, i) => (
                    <p key={i}>{r}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>

      <ContactForm />
      <Footer />
    </>
  );
}
