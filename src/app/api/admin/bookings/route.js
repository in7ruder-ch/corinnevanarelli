// src/app/api/admin/bookings/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateAdminSession } from "@/lib/adminSession";

function json(payload, init = {}) {
  const res = NextResponse.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function getSupabaseService() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url) throw new Error("Falta SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY (o SUPABASE_SERVICE_ROLE)");
  return createClient(url, key, { auth: { persistSession: false } });
}

function startOfDayISO(dStr) {
  return new Date(`${dStr}T00:00:00.000Z`).toISOString();
}
function endOfDayISO(dStr) {
  return new Date(`${dStr}T23:59:59.999Z`).toISOString();
}

// GET /api/admin/bookings?status=&from=YYYY-MM-DD&to=YYYY-MM-DD&limit=500
export async function GET(req) {
  try {
    // 🔐 Nueva auth basada en token de sesión (cookie admin_auth_token)
    const session = await validateAdminSession();
    if (!session) return json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = (searchParams.get("status") || "").toUpperCase();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = Math.min(parseInt(searchParams.get("limit") || "500", 10), 1000);

    const supabase = getSupabaseService();

    let query = supabase
      .from("bookings")
      .select(
        `
        id,
        status,
        start_at,
        end_at,
        hold_until,
        customer_name,
        customer_email,
        paypal_order_id,
        paypal_capture_id,
        service_id,
        services:service_id (
          id,
          title_de,
          modality_de,
          duration_label_de,
          duration_min,
          price_chf
        )
      `,
        { count: "exact" }
      )
      .order("start_at", { ascending: true })
      .limit(limit);

    if (status) query = query.eq("status", status);
    if (from) query = query.gte("start_at", startOfDayISO(from));
    if (to) query = query.lte("start_at", endOfDayISO(to));

    const { data, error, count } = await query;

    if (error) {
      console.error("[/api/admin/bookings] supabase error:", error);
      return json({ ok: false, error: error.message }, { status: 500 });
    }

    const items = (data || []).map((b) => {
      const s = b.services || {};
      return {
        id: b.id,
        status: b.status,
        startAt: b.start_at,
        endAt: b.end_at,
        holdUntil: b.hold_until,
        customerName: b.customer_name,
        customerEmail: b.customer_email,
        paypalOrderId: b.paypal_order_id || null,
        paypalCaptureId: b.paypal_capture_id || null,
        service: {
          id: s.id,
          title: s.title_de,
          modality: s.modality_de || null,
          durationLabel: s.duration_label_de || (s.duration_min ? `${s.duration_min} Min` : null),
          durationMin: s.duration_min ?? null,
          price: s.price_chf ?? null,
        },
      };
    });

    return json({ ok: true, items, count: count ?? items.length });
  } catch (e) {
    console.error("[/api/admin/bookings] fatal:", e);
    return json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
  }
}
