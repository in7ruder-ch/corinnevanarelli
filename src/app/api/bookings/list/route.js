import { supabaseServer } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function isAdmin() {
  const c = await cookies();
  return c.get("admin_auth")?.value === "ok";
}

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && service) {
    return createClient(url, service, { auth: { persistSession: false } });
  }
  // fallback a tu cliente server (ANON) si no hay service role configurado
  return supabaseServer();
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      const res = Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        id, status, start_at, end_at, customer_name, customer_email,
        paypal_order_id, paypal_capture_id, service_id,
        services ( id, title_de, duration_min, price_chf )
      `)
      .order("start_at", { ascending: true });

    if (error) throw error;

    const rows = (data || []).map((b) => ({
      id: b.id,
      status: b.status,
      start_at: b.start_at,
      end_at: b.end_at,
      name: b.customer_name,
      email: b.customer_email,
      paypal_order_id: b.paypal_order_id,
      paypal_capture_id: b.paypal_capture_id,
      service_id: b.service_id,
      service_title: b.services?.title_de || b.service_id,
      price: Number(b.services?.price_chf || 0),
      durationMin: b.services?.duration_min || null,
    }));

    const res = Response.json({ ok: true, bookings: rows }, { status: 200 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (e) {
    console.error(e);
    const res = Response.json({ ok: false, bookings: [] }, { status: 200 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}
