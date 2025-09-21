// src/app/api/slots/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_ANON_KEY.");
  return createClient(url, anon, { auth: { persistSession: false } });
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidDateYYYYMMDD(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !isNaN(d.getTime());
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");          // YYYY-MM-DD
    const serviceId = searchParams.get("serviceId"); // uuid

    if (!date || !isValidDateYYYYMMDD(date)) {
      return NextResponse.json(
        { error: "MALFORMED_DATE", message: "date=YYYY-MM-DD requerido." },
        { status: 400 }
      );
    }
    if (!serviceId || !UUID_RE.test(serviceId)) {
      return NextResponse.json(
        { error: "MALFORMED_SERVICE_ID", message: "serviceId (uuid) requerido." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // RPC debe devolver filas { start_at: timestamptz } o array de strings ISO
    const { data, error } = await supabase.rpc("get_available_slots", {
      p_date: date,
      p_service_id: serviceId,
    });

    if (error) {
      console.error("[/api/slots] supabase.rpc error:", error);
      return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
    }

    const normalizeIso = (v) => {
      // Acepta Date-parsable y devuelve ISO estandarizado
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d.toISOString();
    };

    const slots = (Array.isArray(data) ? data : [])
      .map((row) => normalizeIso(row?.start_at ?? row))
      .filter(Boolean)
      .sort();

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "CDN-Cache-Control": "no-store",
      "Vercel-CDN-Cache-Control": "no-store",
    };

    return NextResponse.json({ date, serviceId, slots }, { status: 200, headers });
  } catch (e) {
    console.error("[/api/slots] fatal:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
