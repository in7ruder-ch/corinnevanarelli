// src/app/[locale]/blog/[slug]/page.jsx
import Link from "next/link";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { getTranslations } from "next-intl/server";

import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/content/blog";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPost.meta" });

  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }

  const title = post.title?.[locale] ?? post.title?.de ?? "";
  const description = post.excerpt?.[locale] ?? post.excerpt?.de ?? "";
  
  // ✅ URLs absolutas
  const baseUrl = "https://www.corinnevanarelli.ch";
  const canonical = `${baseUrl}/${locale}/blog/${post.slug}`;
  const ogLocale = locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "es_ES";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        de: `${baseUrl}/de/blog/${post.slug}`,
        en: `${baseUrl}/en/blog/${post.slug}`,
        es: `${baseUrl}/es/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: ogLocale,
      siteName: "Corinne Vanarelli",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const t = await getTranslations("BlogPost");
  const { locale, slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Section
          className="pt-[12rem] pb-16"
          containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
        >
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
            {t("notFound.title")}
          </h1>
          <p className="mt-4" style={{ color: "var(--muted)" }}>
            {t("notFound.description")}
          </p>
          <div className="mt-8">
            <Link href={`/${locale}/blog`} className="hover:underline" style={{ color: "var(--brand)" }}>
              ← {t("backToBlog")}
            </Link>
          </div>
        </Section>
        <Footer />
      </>
    );
  }

  const title = post.title?.[locale] ?? post.title?.de ?? "";
  const excerpt = post.excerpt?.[locale] ?? post.excerpt?.de ?? "";
  const readingTime = post.readingTime?.[locale] ?? post.readingTime?.de ?? "";
  const blocks = post.content?.[locale] ?? post.content?.de ?? [];

  const { prev, next } = getAdjacentPosts(post.slug, { category: post.category });

  return (
    <>
      <Section
        className="pt-[12rem] pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
      >
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm hover:underline"
          style={{ color: "var(--muted)" }}
        >
          <span aria-hidden="true">←</span> {t("backToBlog")}
        </Link>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: "var(--muted)" }}>
            <span>{post.date}</span>
            {readingTime ? <span>• {readingTime}</span> : null}
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl leading-tight font-bold" style={{ color: "var(--text)" }}>
            {title}
          </h1>

          {excerpt ? (
            <p className="mt-5 text-lg md:text-xl" style={{ color: "var(--muted)" }}>
              {excerpt}
            </p>
          ) : null}
        </div>
      </Section>

      <Section
        className="pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
      >
        <article
          className="max-w-none"
          style={{ fontFamily: "var(--font-long)", fontSize: "1.0625rem", lineHeight: "1.7", color: "var(--muted)" }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                article a[data-inline-link="true"] {
                  color: var(--brand);
                  text-decoration: underline;
                  text-underline-offset: 0.16em;
                  transition: opacity 160ms ease;
                }
                article a[data-inline-link="true"]:hover { opacity: 0.8; }
              `,
            }}
          />

          {blocks.map((block, idx) => {
            if (!block) return null;

            switch (block.type) {
              case "h2":
                return (
                  <h2
                    key={idx}
                    className="mt-10 first:mt-0 text-2xl md:text-3xl font-semibold tracking-tight"
                    style={{ fontFamily: "var(--font-title)", color: "var(--text)" }}
                  >
                    {block.text}
                  </h2>
                );

              case "p": {
                const html = String(block.text ?? "").replace(
                  /<a\s+href=(["'])(.*?)\1>/g,
                  '<a href="$2" data-inline-link="true">'
                );
                return <p key={idx} className="mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
              }

              case "ul":
                return (
                  <ul key={idx} className="mt-4 list-disc pl-6 space-y-2" style={{ color: "var(--muted)" }}>
                    {block.items?.map((it, i) => (
                      <li key={i} className="leading-relaxed">{it}</li>
                    ))}
                  </ul>
                );

              case "quote":
                return (
                  <blockquote
                    key={idx}
                    className="mt-6 pl-4 italic"
                    style={{ borderLeft: "2px solid color-mix(in srgb, var(--gold) 40%, transparent)", color: "var(--muted)" }}
                  >
                    {block.text}
                  </blockquote>
                );

              case "image":
                return (
                  <figure key={idx} className="mt-8">
                    <img
                      src={block.src}
                      alt={block.alt || ""}
                      loading="lazy"
                      className="rounded-xl"
                      style={{ border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)" }}
                    />
                  </figure>
                );

              case "hr":
                return (
                  <hr
                    key={idx}
                    className="my-10"
                    style={{ borderTop: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)" }}
                  />
                );

              default:
                return null;
            }
          })}

          {prev || next ? (
            <nav
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid color-mix(in srgb, var(--brand) 18%, transparent)" }}
              aria-label={t("pagination.aria")}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  {next ? (
                    <Link
                      href={`/${locale}/blog/${next.slug}`}
                      className="group block rounded-xl p-5 transition-colors border border-[color-mix(in_srgb,var(--brand)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
                      style={{ backgroundColor: "var(--surface)" }}
                    >
                      <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
                        {t("pagination.next")}
                      </p>
                      <p className="mt-2 text-lg font-semibold group-hover:underline" style={{ color: "var(--text)" }}>
                        {next.title?.[locale] ?? next.title?.de ?? ""}
                      </p>
                    </Link>
                  ) : null}
                </div>

                <div className="md:text-right">
                  {prev ? (
                    <Link
                      href={`/${locale}/blog/${prev.slug}`}
                      className="group block rounded-xl p-5 transition-colors border border-[color-mix(in_srgb,var(--brand)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--brand)_40%,transparent)]"
                      style={{ backgroundColor: "var(--surface)" }}
                    >
                      <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
                        {t("pagination.prev")}
                      </p>
                      <p className="mt-2 text-lg font-semibold group-hover:underline" style={{ color: "var(--text)" }}>
                        {prev.title?.[locale] ?? prev.title?.de ?? ""}
                      </p>
                    </Link>
                  ) : null}
                </div>
              </div>
            </nav>
          ) : null}
        </article>
      </Section>

      <Footer />
    </>
  );
}