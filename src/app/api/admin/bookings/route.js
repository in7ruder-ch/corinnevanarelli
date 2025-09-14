// src/app/api/admin/bookings/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_ANON_KEY.");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STATUS = new Set(["HOLD", "PENDING", "PAID", "CANCELED"]);

export async function GET(req) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status"); // opcional
    const from = searchParams.get("from");     // YYYY-MM-DD opcional
    const to = searchParams.get("to");         // YYYY-MM-DD opcional
    const limitParam = parseInt(searchParams.get("limit") || "200", 10);
    const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(limitParam, 1000)) : 200;

    // base query
    let query = supabase
      .from("bookings")
      .select(
        `
        id,
        service_id,
        start_at,
        end_at,
        hold_until,
        status,
        customer_name,
        customer_email,
        paypal_order_id,
        paypal_capture_id,
        created_at,
        updated_at,
        services:service_id (
          id,
          title_de,
          modality_de,
          duration_label_de,
          duration_min,
          price_chf
        )
        `
      )
      .order("start_at", { ascending: false })
      .limit(limit);

    if (status && STATUS.has(status)) {
      query = query.eq("status", status);
    }
    // filtros de fecha sobre start_at (en UTC de la DB)
    if (from && DATE_RE.test(from)) {
      query = query.gte("start_at", `${from}T00:00:00Z`);
    }
    if (to && DATE_RE.test(to)) {
      // exclusivo al final del día
      query = query.lt("start_at", `${to}T23:59:59Z`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[/api/admin/bookings] Supabase error:", error);
      return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
    }

    const items = (data || []).map((row) => {
      const svc = row.services || {};
      const price = Number(svc.price_chf ?? 0);
      return {
        id: row.id,
        status: row.status,
        startAt: row.start_at,
        endAt: row.end_at,
        holdUntil: row.hold_until,
        customerName: row.customer_name,
        customerEmail: row.customer_email,
        paypalOrderId: row.paypal_order_id,
        paypalCaptureId: row.paypal_capture_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        service: {
          id: svc.id,
          title: svc.title_de,
          modality: svc.modality_de,
          durationLabel: svc.duration_label_de,
          durationMin: svc.duration_min,
          price,
          priceLabel: price === 0 ? "Gratis" : `CHF ${price}`,
        },
      };
    });

    return NextResponse.json({ items, count: items.length }, { status: 200 });
  } catch (e) {
    console.error("[/api/admin/bookings] Fatal:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
