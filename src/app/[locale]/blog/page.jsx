// src/app/[locale]/blog/page.jsx
import Link from "next/link";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ServiceBanner from "@/components/ServiceBanner";
import { getTranslations } from "next-intl/server";

import { getPostsByCategory } from "@/content/blog/posts";

// Orden fijo (jerárquico) + solo las categorías que queremos mostrar
const BLOG_CATEGORIES_ORDERED = ["transformation", "story", "inner-experience"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.meta" });

  const basePath = "/blog";
  const currentUrl = `https://www.corinnevanarelli.ch/${locale}${basePath}`;
  const ogLocale = locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: currentUrl,
      languages: {
        de: "https://www.corinnevanarelli.ch/de/blog",
        en: "https://www.corinnevanarelli.ch/en/blog",
        es: "https://www.corinnevanarelli.ch/es/blog",
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

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return (
    <>
      <ServiceBanner title={t("title")} imageSrc="/img/banner3.webp" imageAlt={t("title")} />

      <Section
        className="pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1200px]"
      >
        <div className="space-y-16 mt-20 md:space-y-20">
          {/* Intro */}
          <div className="max-w-3xl">
            <h2
              className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-bold [text-wrap:balance] break-words whitespace-pre-line"
              style={{ color: "var(--text)" }}
            >
              {t("lead")}
            </h2>
          </div>

          {/* Anchor nav */}
          <nav className="flex flex-wrap gap-2" aria-label={t("categoriesNavAria")}>
            {BLOG_CATEGORIES_ORDERED.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="rounded-full px-4 py-2 text-sm transition-colors"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
                  color: "var(--text)",
                }}
                data-blog-pill="soft"
              >
                {t(`categories.${cat}.label`)}
              </a>
            ))}
          </nav>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                a[data-blog-pill="soft"]:hover {
                  background-color: color-mix(in srgb, var(--brand) 12%, var(--surface));
                  border-color: color-mix(in srgb, var(--brand) 40%, transparent);
                }
                article[data-blog-card]:hover {
                  border-color: color-mix(in srgb, var(--brand) 40%, transparent);
                }

                .blog-row::-webkit-scrollbar { display: none; }
                .blog-row { scrollbar-width: none; }
              `,
            }}
          />

          {BLOG_CATEGORIES_ORDERED.map((cat) => {
            const posts = getPostsByCategory(cat);

            return (
              <section key={cat} id={cat} className="scroll-mt-40">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                    {t(`categories.${cat}.title`)}
                  </h2>

                  <p className="mt-2" style={{ color: "var(--muted)" }}>
                    {t(`categories.${cat}.description`)}
                  </p>
                </div>

                {posts.length === 0 ? (
                  <div
                    className="mt-6 rounded-lg p-6"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)",
                      color: "var(--muted)",
                    }}
                  >
                    {t("emptyCategory")}
                  </div>
                ) : (
                  <>
                    <div
                      className={[
                        "mt-8",
                        "blog-row flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scroll-px-4",
                        "md:mx-0 md:px-0 md:pb-0 md:grid md:gap-6 md:grid-cols-2 md:overflow-visible md:snap-none md:scroll-px-0",
                      ].join(" ")}
                    >
                      <div className="shrink-0 w-4 sm:w-6 md:hidden" aria-hidden="true" />

                      {posts.map((p) => {
                        const postTitle = p.title?.[locale] ?? p.title?.de ?? "";
                        const postExcerpt = p.excerpt?.[locale] ?? p.excerpt?.de ?? "";

                        return (
                          <article
                            key={p.slug}
                            className={[
                              "rounded-xl p-6 transition-colors",
                              "snap-start min-w-[85%] sm:min-w-[70%]",
                              "md:min-w-0",
                            ].join(" ")}
                            style={{
                              backgroundColor: "var(--surface)",
                              border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)",
                            }}
                            data-blog-card
                          >
                            <div className="flex items-center justify-between gap-3 text-sm" style={{ color: "var(--muted)" }}>
                              <span>{t(`categories.${cat}.label`)}</span>
                              <span>{p.date}</span>
                            </div>

                            <h3 className="mt-3 text-xl font-semibold" style={{ color: "var(--text)" }}>
                              {postTitle}
                            </h3>

                            <p className="mt-2" style={{ color: "var(--muted)" }}>
                              {postExcerpt}
                            </p>

                            <div className="mt-4">
                              <Link
                                href={`/blog/${p.slug}`}
                                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                                style={{ color: "var(--brand)" }}
                                aria-label={t("readMoreAria", { title: postTitle })}
                              >
                                {t("readMore")}
                                <span aria-hidden="true">→</span>
                              </Link>
                            </div>
                          </article>
                        );
                      })}

                      <div className="shrink-0 w-4 sm:w-6 md:hidden" aria-hidden="true" />
                    </div>

                    <p className="mt-3 text-sm md:hidden" style={{ color: "var(--muted)" }}>
                      {t("swipeHint")}
                    </p>
                  </>
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