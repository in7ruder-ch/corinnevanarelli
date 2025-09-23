export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBookingPaidEmail } from "@/lib/mailer";

const PAYPAL_ENV = process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox";
const PAYPAL_BASE =
  PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // opcional
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // fallback

const UUID_RX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getPaypalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    throw new Error("Faltan credenciales PayPal (CLIENT_ID o SECRET)");
  }
  const creds = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const r = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`[paypal token] ${r.status} ${t}`);
  }
  const j = await r.json();
  return j.access_token;
}

export async function POST(req) {
  try {
    const { orderId, bookingId } = await req.json();
    const _orderId = String(orderId || "").trim();
    const _bookingId = String(bookingId || "").trim();

    if (!_orderId || !_bookingId) {
      return NextResponse.json({ error: "orderId y bookingId requeridos" }, { status: 400 });
    }
    if (!UUID_RX.test(_bookingId)) {
      return NextResponse.json({ error: "bookingId no es UUID válido" }, { status: 400 });
    }
    if (!SUPABASE_URL) {
      return NextResponse.json({ error: "SUPABASE_URL ausente" }, { status: 500 });
    }
    if (!SUPABASE_ANON_KEY && !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Falta clave de Supabase (ANON o SERVICE_ROLE)" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY
    );

    // 0) Validar booking + servicio
    const { data: bk, error: be } = await supabase
      .from("bookings")
      .select("id, status, service_id, paypal_order_id, start_at, end_at, customer_name, customer_email")
      .eq("id", _bookingId)
      .maybeSingle();

    if (be) {
      console.error("[capture-order] supabase select bookings error:", be);
      return NextResponse.json({ error: "DB error (bookings)" }, { status: 500 });
    }
    if (!bk) {
      return NextResponse.json({ error: "Booking no encontrada" }, { status: 404 });
    }
    if (String(bk.status || "").toUpperCase() !== "PENDING") {
      return NextResponse.json(
        { error: `Estado inválido para capturar: ${bk.status}` },
        { status: 409 }
      );
    }

    const { data: svc, error: se } = await supabase
      .from("services")
      .select("id, title_de, price_chf, duration_min, active")
      .eq("id", bk.service_id)
      .maybeSingle();

    if (se) {
      console.error("[capture-order] supabase select services error:", se);
      return NextResponse.json({ error: "DB error (services)" }, { status: 500 });
    }
    if (!svc) {
      return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
    }

    const amount = Number(svc.price_chf || 0);
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Este servicio es gratis y no requiere captura." },
        { status: 400 }
      );
    }

    // 1) Capturar en PayPal
    const accessToken = await getPaypalAccessToken();
    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${_orderId}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      cache: "no-store",
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("[paypal capture-order] resp:", j);
      return NextResponse.json({ error: "No se pudo capturar la orden" }, { status: 502 });
    }

    const unit = j?.purchase_units?.[0];
    const cap = unit?.payments?.captures?.[0];
    const status = j?.status;
    const captureId = cap?.id;

    if (status !== "COMPLETED" || !captureId) {
      return NextResponse.json(
        { error: "Pago no completado", status, details: j },
        { status: 409 }
      );
    }

    // 2) Update booking
    const { data: upd, error: upErr } = await supabase
      .from("bookings")
      .update({
        status: "PAID",
        paypal_order_id: _orderId,
        paypal_capture_id: captureId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", _bookingId)
      .select("id, status")
      .single();

    if (upErr) {
      console.warn("[paypal capture-order] No se pudo actualizar booking:", upErr.message);
    }

    // 3) Enviar email de confirmación
    try {
      await sendBookingPaidEmail({
        booking: {
          id: bk.id,
          customer_name: bk.customer_name,
          customer_email: bk.customer_email,
          start_at: bk.start_at,
          end_at: bk.end_at,
        },
        service: {
          id: svc.id,
          title_de: svc.title_de,
          price_chf: svc.price_chf,
          duration_min: svc.duration_min,
        },
      });
    } catch (mailErr) {
      console.warn("[capture-order] Mailer error:", mailErr?.message || mailErr);
    }

    return NextResponse.json(
      { ok: true, orderId: _orderId, captureId, status },
      { status: 200 }
    );
  } catch (e) {
    console.error("[paypal/capture-order] unhandled:", e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
