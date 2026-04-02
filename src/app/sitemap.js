// src/app/sitemap.js
import { getAllPosts } from "@/content/blog";

export default async function sitemap() {
  const baseUrl = "https://www.corinnevanarelli.ch";
  const locales = ["de", "en", "es"];

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/ueber-mich", priority: 0.8, changeFrequency: "monthly" },

    { path: "/angebote/akasha-chronik-lesung", priority: 0.8, changeFrequency: "monthly" },
    { path: "/angebote/hopi-herzheilung", priority: 0.8, changeFrequency: "monthly" },
    { path: "/angebote/ontologisches-coaching", priority: 0.8, changeFrequency: "monthly" },
    { path: "/angebote/chakra-clearing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/angebote/doterra-aromatouch", priority: 0.8, changeFrequency: "monthly" },
    { path: "/angebote/gwa", priority: 0.8, changeFrequency: "monthly" },

    { path: "/events", priority: 0.7, changeFrequency: "monthly" },
    { path: "/events/seminars", priority: 0.7, changeFrequency: "monthly" },
    { path: "/events/seminars/seminar-fruhling-2026", priority: 0.7, changeFrequency: "monthly" },
    { path: "/events/retreats/costa-rica", priority: 0.7, changeFrequency: "monthly" },

    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ];

  const blogPosts = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: post.date,
  }));

  const allRoutes = [...staticRoutes, ...blogPosts];

  return allRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: route.lastModified ?? new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          de: `${baseUrl}/de${route.path}`,
          en: `${baseUrl}/en${route.path}`,
          es: `${baseUrl}/es${route.path}`,
        },
      },
    }))
  );
}