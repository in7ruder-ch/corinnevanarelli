// src/content/blog/index.js
//
// Para agregar un nuevo post:
// 1. Crear src/content/blog/posts/[slug].js
// 2. Importarlo aquí y agregarlo al array blogPosts

export const BLOG_LOCALES = ["de", "en", "es"];

export const BLOG_CATEGORIES = [
  "coaching",
  "beliefs",
  "transformation",
  "development",
  "mindfuck",
];

/**
 * @typedef {Object} BlogPost
 * @property {string} slug
 * @property {typeof BLOG_CATEGORIES[number]} category
 * @property {string} date                               - YYYY-MM-DD
 * @property {{de:string,en:string,es:string}} title
 * @property {{de:string,en:string,es:string}} excerpt
 * @property {{de:string,en:string,es:string}} readingTime
 * @property {{de:string[],en:string[],es:string[]}} content
 * @property {{de?:string[],en?:string[],es?:string[]}} [tags]
 * @property {string} [cover]
 */

import wennDeinTiefpunkt from "./posts/wenn-dein-tiefpunkt-dein-wendepunkt-wird.js";
import derWendepunkt from "./posts/der-wendepunkt-beginnt-leise.js";
import wasIchGelernt from "./posts/was-ich-uber-mich-gelernt-habe-als-alles-still-wurde.js";
import wennAntworten from "./posts/wenn-antworten-nicht-aus-dem-kopf-kommen.js";
import wasGeschieht from "./posts/was-geschieht-wenn-dein-herz-wirklich-loslassen-darf.js";

const blogPosts = /** @type {BlogPost[]} */ ([
  wennDeinTiefpunkt,
  derWendepunkt,
  wasIchGelernt,
  wennAntworten,
  wasGeschieht,
]);

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentPosts(slug, { category } = {}) {
  const all = getAllPosts();
  const list = category ? all.filter((p) => p.category === category) : all;

  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;

  return { prev, next };
}