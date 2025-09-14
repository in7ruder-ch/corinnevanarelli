// src/app/api/services/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_ANON_KEY en el entorno.");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

export async function GET() {
  try {
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

    const services = (data || []).map((row) => {
      const price = Number(row.price_chf ?? 0);
      return {
        id: row.id,
        // etiquetas legibles para UI (DE como definimos)
        title: row.title_de,
        modality: row.modality_de,             // "1:1 online" | "vor Ort"
        durationLabel: row.duration_label_de,  // "ca. 60 Minuten"
        durationMin: row.duration_min,         // para lógica de agenda
        notes: row.notes_de || null,           // textos extra (e.g., Kennenlerngespräch)
        price,                                 // numérico para lógica
        priceLabel: price === 0 ? "Gratis" : `CHF ${price}`, // presentación
        active: !!row.active,
      };
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (e) {
    console.error("[/api/services] Fatal:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
