// src/app/blog/[slug]/page.jsx
import Link from "next/link";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { getLocale, getTranslations } from "next-intl/server";

import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/content/blog/posts";

export async function generateStaticParams() {
  // genera rutas /blog/<slug> para todos los posts locales
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const t = await getTranslations("BlogPost.meta");
  const locale = await getLocale();

  // ✅ Next sync dynamic APIs: params puede venir como Promise
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }

  const title = post.title?.[locale] ?? post.title?.de ?? "";
  const description = post.excerpt?.[locale] ?? post.excerpt?.de ?? "";

  const canonical = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }) {
  const t = await getTranslations("BlogPost");
  const locale = await getLocale();

  // ✅ Next sync dynamic APIs: params puede venir como Promise
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Section
          className="bg-white pt-[12rem] pb-16"
          containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {t("notFound.title")}
          </h1>
          <p className="mt-4 text-neutral-700">{t("notFound.description")}</p>
          <div className="mt-8">
            <Link href="/blog" className="text-neutral-900 hover:underline">
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

  // NUEVO: bloques (h2, p, ul, image, quote, hr)
  const blocks = post.content?.[locale] ?? post.content?.de ?? [];

  // Prev/Next dentro de la misma categoría (serie por categoría + fecha)
  const { prev, next } = getAdjacentPosts(post.slug, { category: post.category });

  return (
    <>
      <Section
        className="bg-white pt-[12rem] pb-10"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900 hover:underline"
        >
          <span aria-hidden="true">←</span> {t("backToBlog")}
        </Link>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">
            <span>{post.date}</span>
            {readingTime ? <span>• {readingTime}</span> : null}
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl leading-tight font-bold text-neutral-900">
            {title}
          </h1>

          {excerpt ? (
            <p className="mt-5 text-lg md:text-xl text-neutral-700">{excerpt}</p>
          ) : null}
        </div>
      </Section>

      <Section
        className="bg-white pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[900px]"
      >
        {/* IMPORTANTE: dejamos de usar "prose" para que el estilo sea consistente con el sitio */}
        <article
          className="max-w-none text-neutral-800"
          style={{
            fontFamily: "var(--font-long)",
            fontSize: "1.0625rem", // ≈ +6%
            lineHeight: "1.7",
          }}
        >
          {blocks.map((block, idx) => {
            if (!block) return null;

            switch (block.type) {
              case "h2":
                return (
                  <h2
                    key={idx}
                    className="mt-10 first:mt-0 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900"
                  >
                    {block.text}
                  </h2>
                );

              case "p":
                return (
                  <p key={idx} className="mt-4 leading-relaxed text-neutral-700">
                    {block.text}
                  </p>
                );

              case "ul":
                return (
                  <ul
                    key={idx}
                    className="mt-4 list-disc pl-6 space-y-2 text-neutral-700"
                  >
                    {block.items?.map((it, i) => (
                      <li key={i} className="leading-relaxed">
                        {it}
                      </li>
                    ))}
                  </ul>
                );

              case "quote":
                return (
                  <blockquote
                    key={idx}
                    className="mt-6 border-l-2 border-neutral-300 pl-4 italic text-neutral-700"
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
                      className="rounded-xl border border-neutral-200"
                    />
                  </figure>
                );

              case "hr":
                return <hr key={idx} className="my-10 border-neutral-200" />;

              default:
                return null;
            }
          })}

          {/* Prev / Next (misma categoría) */}
          {prev || next ? (
            <nav
              className="mt-12 border-t border-neutral-200 pt-8"
              aria-label={t("pagination.aria")}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {/* Prev (más nuevo) */}
                <div>
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group block rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300"
                    >
                      <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                        {t("pagination.prev")}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-neutral-900 group-hover:underline">
                        {prev.title?.[locale] ?? prev.title?.de ?? ""}
                      </p>
                    </Link>
                  ) : null}
                </div>

                {/* Next (más viejo) */}
                <div className="md:text-right">
                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group block rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300"
                    >
                      <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                        {t("pagination.next")}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-neutral-900 group-hover:underline">
                        {next.title?.[locale] ?? next.title?.de ?? ""}
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
