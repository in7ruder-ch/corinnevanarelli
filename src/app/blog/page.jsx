// src/app/blog/page.jsx
import Link from "next/link";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ServiceBanner from "@/components/ServiceBanner";
import { getTranslations, getLocale } from "next-intl/server";

import { getPostsByCategory } from "@/content/blog/posts";

// Orden fijo (jerárquico) + solo las categorías que queremos mostrar
const BLOG_CATEGORIES_ORDERED = ["transformation", "coaching"];

export async function generateMetadata() {
  const t = await getTranslations("Blog.meta");
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

export default async function BlogPage() {
  const t = await getTranslations("Blog");
  const locale = await getLocale();

  return (
    <>
      <ServiceBanner
        title={t("title")}
        imageSrc="/img/banner3.webp"
        imageAlt={t("title")}
      />

      <Section
        className="bg-white pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <div className="space-y-16 mt-20 md:space-y-20">
          {/* Intro */}
          <div className="max-w-3xl">
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-bold text-neutral-900 [text-wrap:balance] break-words whitespace-pre-line">
              {t("lead")}
            </h2>
          </div>

          {/* Anchor nav (solo 2 categorías, orden fijo) */}
          <nav className="flex flex-wrap gap-2" aria-label={t("categoriesNavAria")}>
            {BLOG_CATEGORIES_ORDERED.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="
                  rounded-full
                  border border-neutral-300
                  px-4 py-2
                  text-sm
                  text-neutral-800
                  transition-colors
                  hover:bg-neutral-900
                  hover:text-white
                  hover:border-neutral-900
                "
              >
                {t(`categories.${cat}.label`)}
              </a>
            ))}
          </nav>

          {/* Secciones por categoría (solo 2, orden fijo) */}
          {BLOG_CATEGORIES_ORDERED.map((cat) => {
            const posts = getPostsByCategory(cat);

            return (
              <section key={cat} id={cat} className="scroll-mt-40">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                    {t(`categories.${cat}.title`)}
                  </h2>
                  <p className="mt-2 text-neutral-700">
                    {t(`categories.${cat}.description`)}
                  </p>
                </div>

                {posts.length === 0 ? (
                  <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
                    {t("emptyCategory")}
                  </div>
                ) : (
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {posts.map((p) => {
                      const postTitle = p.title?.[locale] ?? p.title?.de ?? "";
                      const postExcerpt =
                        p.excerpt?.[locale] ?? p.excerpt?.de ?? "";

                      return (
                        <article
                          key={p.slug}
                          className="rounded-xl border border-neutral-200 bg-white p-6 hover:border-neutral-300"
                        >
                          <div className="flex items-center justify-between gap-3 text-sm text-neutral-500">
                            <span>{t(`categories.${cat}.label`)}</span>
                            <span>{p.date}</span>
                          </div>

                          <h3 className="mt-3 text-xl font-semibold text-neutral-900">
                            {postTitle}
                          </h3>

                          <p className="mt-2 text-neutral-700">{postExcerpt}</p>

                          <div className="mt-4">
                            <Link
                              href={`/blog/${p.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:underline"
                              aria-label={t("readMoreAria", { title: postTitle })}
                            >
                              {t("readMore")}
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Section>

      <Footer />
    </>
  );
}
