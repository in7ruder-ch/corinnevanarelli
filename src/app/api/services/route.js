// src/app/api/services/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getMessages } from "next-intl/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_ANON_KEY en el entorno.");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

function detectLocale(req) {
  const url = new URL(req.url);
  const qp = url.searchParams.get("locale");
  if (qp) return qp.toLowerCase();

  // next-intl suele setear cookie NEXT_LOCALE
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/i);
  if (m?.[1]) return decodeURIComponent(m[1]).toLowerCase();

  // fallback a Accept-Language
  const al = req.headers.get("accept-language") || "";
  const first = al.split(",")[0]?.trim();
  if (first) return first.toLowerCase();

  return "de";
}

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET(req) {
  try {
    const locale = detectLocale(req);

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("services")
      .select(
        "id, title_de, modality_de, duration_label_de, duration_min, notes_de, price_chf, active"
      )
      .eq("active", true)
      .order("title_de", { ascending: true });

    if (error) {
      console.error("[/api/services] Supabase error:", error);
      return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
    }

    // base (DE desde DB)
    const base = (data || []).map((row) => {
      const price = Number(row.price_chf ?? 0);
      return {
        id: row.id,
        title: row.title_de,
        teaser: "",
        image: null,
        imageAlt: row.title_de,
        slug: null,
        href: null,
        modality: row.modality_de,
        durationLabel: row.duration_label_de,
        durationMin: row.duration_min,
        notes: row.notes_de || null,
        price,
        priceLabel: price === 0 ? "Gratis" : `CHF ${price}`,
        active: !!row.active
      };
    });

    // overlay i18n
    let dict = {};
    try {
      const messages = await getMessages({ locale });
      dict = messages?.ServicesIndex || {};
    } catch (e) {
      dict = {};
    }
    const common = dict.__common || {};
    const byTitleMap = dict.__map || {}; // <-- opcional (ver abajo)
    // Pre-normalizamos byTitleMap para match por título
    const byTitleNorm = {};
    for (const [title, key] of Object.entries(byTitleMap)) {
      byTitleNorm[normalize(title)] = key;
    }

    const services = base.map((row) => {
      // intento 1: por id exacto (UUID)
      let i18n = dict[row.id];
      // intento 2: por clave mapeada a partir del título DE
      if (!i18n) {
        const k = byTitleNorm[normalize(row.title)] || null;
        if (k && dict[k]) i18n = dict[k];
      }

      // aplica overlay si lo hay
      const title = i18n?.title || row.title;
      const teaser = i18n?.teaser ?? row.teaser;
      const image = i18n?.image ?? row.image;
      const imageAlt = i18n?.imageAlt || row.imageAlt || title;
      const slug = i18n?.slug ?? row.slug;
      const href = slug ? `/angebote/${slug}` : row.href;
      const notes = (i18n?.notes ?? row.notes) || null;

      return {
        ...row,
        title,
        teaser,
        image,
        imageAlt,
        slug,
        href,
        notes,
        ctaLabel: common.ctaLabel || "Mehr erfahren"
      };
    });

    return NextResponse.json({ services, locale }, { status: 200 });
  } catch (e) {
    console.error("[/api/services] Fatal:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
