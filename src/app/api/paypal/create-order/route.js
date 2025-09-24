// src/app/api/paypal/create-order/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PAYPAL_ENV = process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox";
const PAYPAL_BASE =
  PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID; // público (SDK)
const PAYPAL_SECRET = process.env.PAYPAL_SECRET; // privado (server)

const DEFAULT_CURRENCY = (process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "CHF").toUpperCase();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE; // <- fallback

const UUID_RX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function fmtAmount(n) {
  return (Math.round(Number(n) * 100) / 100).toFixed(2);
}

function json(payload, init = {}) {
  const res = NextResponse.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function getSupabaseService() {
  if (!SUPABASE_URL) throw new Error("SUPABASE_URL ausente");
  if (!SERVICE_ROLE_KEY)
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY (o SUPABASE_SERVICE_ROLE)");
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
}

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
    const { bookingId } = await req.json();
    const _bookingId = String(bookingId || "").trim();

    if (!_bookingId) return json({ error: "bookingId requerido" }, { status: 400 });
    if (!UUID_RX.test(_bookingId)) return json({ error: "bookingId no es UUID válido" }, { status: 400 });

    const supabase = getSupabaseService();

    // 1) Traer booking
    const { data: booking, error: be } = await supabase
      .from("bookings")
      .select("id, status, hold_until, service_id")
      .eq("id", _bookingId)
      .maybeSingle();

    if (be) {
      console.error("[create-order] supabase select bookings error:", be);
      return json({ error: "DB error (bookings)", code: be.code, message: be.message }, { status: 500 });
    }
    if (!booking) return json({ error: "Booking no encontrada", bookingId: _bookingId }, { status: 404 });

    const status = String(booking.status || "").toUpperCase();
    if (status !== "PENDING") {
      return json({ error: `Estado inválido para pagar: ${booking.status}` }, { status: 409 });
    }

    // 2) Traer precio desde services
    const { data: svc, error: se } = await supabase
      .from("services")
      .select("price_chf, active")
      .eq("id", booking.service_id)
      .maybeSingle();

    if (se) {
      console.error("[create-order] supabase select services error:", se);
      return json({ error: "DB error (services)", code: se.code, message: se.message }, { status: 500 });
    }
    if (!svc) return json({ error: "Servicio no encontrado" }, { status: 404 });
    if (svc.active === false) return json({ error: "Servicio inactivo" }, { status: 409 });

    const amount = Number(svc.price_chf || 0);
    const currency = DEFAULT_CURRENCY;

    // Gratis -> no crear orden
    if (!amount || amount <= 0) {
      return json({ error: "Este servicio es gratis y no requiere pago." }, { status: 400 });
    }

    // 3) Crear orden PayPal
    const accessToken = await getPaypalAccessToken();
    const orderBody = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: currency, value: fmtAmount(amount) },
          custom_id: _bookingId,
        },
      ],
      application_context: { user_action: "PAY_NOW", shipping_preference: "NO_SHIPPING" },
    };

    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(orderBody),
      cache: "no-store",
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j?.id) {
      console.error("[paypal create-order] resp:", j);
      return json({ error: "No se pudo crear la orden" }, { status: 502 });
    }

    // 4) Guardar paypal_order_id
    const { error: upErr } = await supabase
      .from("bookings")
      .update({ paypal_order_id: j.id, updated_at: new Date().toISOString() })
      .eq("id", _bookingId);

    if (upErr) {
      console.warn("[paypal create-order] No se pudo guardar paypal_order_id:", upErr.message);
    }

    // Front espera { id }
    return json({ id: j.id }, { status: 200 });
  } catch (e) {
    console.error("[paypal/create-order] unhandled:", e);
    return json({ error: String(e?.message || e) }, { status: 500 });
  }
}
