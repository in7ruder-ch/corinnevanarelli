// src/app/api/bookings/confirm/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase";
import { sendBookingPaidEmail } from "@/lib/mailer";

/** Cliente con SERVICE ROLE (bypassa RLS) con fallback a supabaseServer() si no hay service key */
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url) throw new Error("Falta SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL");
  if (serviceKey) {
    return createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return supabaseServer();
}

function json(payload, init = {}) {
  const res = Response.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

/**
 * POST /api/bookings/confirm
 * Body: { bookingId: string, name: string, email: string }
 *
 * Gratis  -> status 'PAID' (confirmado sin pago) + email al cliente (BCC admin)
 * Pago    -> status 'PENDING' (seguirá PayPal); no enviamos email aún
 */
export async function POST(req) {
  try {
    const { bookingId, name, email } = await req.json();

    if (!bookingId || !name || !email) {
      return json({ error: "Missing fields" }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(email)) {
      return json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabase();

    // 1) Booking (necesitamos service_id y fechas)
    const { data: bk, error: selErr } = await supabase
      .from("bookings")
      .select("id, status, hold_until, service_id, start_at, end_at")
      .eq("id", bookingId)
      .maybeSingle();

    if (selErr) throw selErr;
    if (!bk) return json({ error: "Booking not found" }, { status: 404 });

    // 2) Validaciones de HOLD
    if (bk.status !== "HOLD") {
      return json({ error: "Booking is not in HOLD" }, { status: 409 });
    }
    if (!bk.hold_until || new Date(bk.hold_until) <= new Date()) {
      return json({ error: "Hold expired" }, { status: 410 });
    }
    if (!bk.service_id) {
      return json({ error: "Booking without service" }, { status: 400 });
    }

    // 3) Servicio (fuente de verdad del precio)
    const { data: svc, error: svcErr } = await supabase
      .from("services")
      .select("id, title_de, price_chf, duration_min")
      .eq("id", bk.service_id)
      .maybeSingle();

    if (svcErr) throw svcErr;
    if (!svc) return json({ error: "Service not found" }, { status: 404 });

    const price = Number(svc.price_chf ?? 0);
    const isFree = Number.isFinite(price) && price === 0;

    // 4A) Gratis => marcamos como 'PAID' (equivale a confirmado en tu esquema actual)
    if (isFree) {
      const { data: upd, error: updErr } = await supabase
        .from("bookings")
        .update({
          status: "PAID", // usamos PAID como “confirmado”
          customer_name: name.trim(),
          customer_email: email.trim(),
          hold_until: null,
        })
        .eq("id", bookingId)
        .select("id, status")
        .single();

      if (updErr) throw updErr;

      // Enviar email de confirmación (no romper si falla)
      try {
        await sendBookingPaidEmail({
          booking: {
            id: upd.id,
            customer_name: name.trim(),
            customer_email: email.trim(),
            start_at: bk.start_at,
            end_at: bk.end_at,
          },
          service: {
            id: svc.id,
            title_de: svc.title_de,
            price_chf: price,
            duration_min: svc.duration_min,
          },
        });
      } catch (mailErr) {
        console.warn("[/api/bookings/confirm] email error:", mailErr?.message || mailErr);
      }

      return json({ ok: true, bookingId: upd.id, status: upd.status });
    }

    // 4B) Pago requerido => 'PENDING' (seguirá PayPal)
    const { data: upd, error: updErr } = await supabase
      .from("bookings")
      .update({
        status: "PENDING",
        customer_name: name.trim(),
        customer_email: email.trim(),
      })
      .eq("id", bookingId)
      .select("id, status")
      .single();

    if (updErr) throw updErr;

    return json({ ok: true, bookingId: upd.id, status: upd.status });
  } catch (e) {
    console.error("[/api/bookings/confirm] error:", e);
    return json({ error: "Server error" }, { status: 500 });
  }
}
