// src/app/api/slots/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseService";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidDateYYYYMMDD(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !isNaN(d.getTime());
}

function todayISOInTZ(timeZone = "Europe/Zurich") {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

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

    const todayCH = todayISOInTZ("Europe/Zurich");
    if (date < todayCH) {
      return NextResponse.json(
        { date, serviceId, slots: [] },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    const supabase = getSupabaseService();

    const { data, error } = await supabase.rpc("get_available_slots", {
      p_date: date,
      p_service_id: serviceId,
    });

    if (error) {
      console.error("[/api/slots] supabase.rpc error:", error);
      return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
    }

    const slots = (Array.isArray(data) ? data : [])
      .map((row) => {
        const v = row?.start_at ?? row;
        const d = new Date(v);
        return isNaN(d.getTime()) ? null : d.toISOString();
      })
      .filter(Boolean);

    return NextResponse.json(
      { date, serviceId, slots },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("[/api/slots] fatal:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}