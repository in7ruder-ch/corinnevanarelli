// src/app/api/admin/bookings/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { validateAdminSession } from "@/lib/adminSession";

// --- helpers ---
function getSupabaseService() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !key) throw new Error("Supabase service credentials missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

function json(payload, init = {}) {
  const res = Response.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

// GET /api/admin/bookings?status=&from=YYYY-MM-DD&to=YYYY-MM-DD&limit=500
export async function GET(req) {
  // 🔐 guardia: requiere sesión admin válida (usa cookie admin_auth_token)
  const session = await validateAdminSession();
  if (!session) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseService();

  const { searchParams } = new URL(req.url);
  const status = (searchParams.get("status") || "").trim();
  const from = (searchParams.get("from") || "").trim();
  const to = (searchParams.get("to") || "").trim();
  const limit = Math.min(Number(searchParams.get("limit") || 500), 1000);

  // base query (vista o join que ya uses)
  let q = supabase
    .from("admin_bookings_view") // ⬅️ si no la tenés, cambia a tu tabla + joins
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
      service:service_id (
        id,
        title_de,
        price_chf,
        modality,
        duration_min
      )
    `,
      { count: "exact" }
    )
    .order("start_at", { ascending: true })
    .limit(limit);

  if (status) q = q.eq("status", status);
  if (from) q = q.gte("start_at", `${from}T00:00:00.000Z`);
  if (to) q = q.lte("start_at", `${to}T23:59:59.999Z`);

  const { data, error, count } = await q;
  if (error) {
    console.error("[/api/admin/bookings] supabase error:", error);
    return json({ error: "Query error" }, { status: 500 });
  }

  // mapear al shape que espera AdminPage
  const items = (data || []).map((r) => ({
    id: r.id,
    status: r.status,
    startAt: r.start_at,
    endAt: r.end_at,
    holdUntil: r.hold_until,
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    paypalOrderId: r.paypal_order_id || null,
    paypalCaptureId: r.paypal_capture_id || null,
    service: r.service
      ? {
          id: r.service.id,
          title: r.service.title_de,
          price: r.service.price_chf,
          modality: r.service.modality || null,
          durationMin: r.service.duration_min || null,
          durationLabel: r.service.duration_min ? `${r.service.duration_min} Min` : null,
        }
      : null,
  }));

  return json({ items, count: count ?? items.length });
}
