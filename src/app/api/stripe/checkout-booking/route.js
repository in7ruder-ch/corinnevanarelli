// src/app/api/stripe/checkout-booking/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { getSupabaseService } from "@/lib/supabaseService";

const PAID_BOOKINGS_ENABLED =
  (process.env.NEXT_PUBLIC_PAID_BOOKINGS_ENABLED ?? "").toString().trim() === "true";

function json(payload, init = {}) {
  const res = NextResponse.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req) {
  if (!PAID_BOOKINGS_ENABLED) {
    return json({ ok: false, error: "Paid bookings not enabled" }, { status: 403 });
  }

  try {
    const { serviceId, startISO, name, email } = await req.json();

    if (!serviceId || !startISO || !name?.trim() || !/.+@.+\..+/.test(email)) {
      return json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
    }

    const supabase = getSupabaseService();

    // Limpiamos HOLDs expirados
    await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .lt("hold_until", new Date().toISOString())
      .eq("status", "HOLD");

    // Cargamos el servicio
    const { data: svc, error: svcErr } = await supabase
      .from("services")
      .select("id, title_de, duration_min, price_chf")
      .eq("id", serviceId)
      .maybeSingle();

    if (svcErr) throw svcErr;
    if (!svc) return json({ ok: false, error: "Service not found" }, { status: 404 });
    if (!svc.price_chf || svc.price_chf === 0) {
      return json({ ok: false, error: "Use free booking flow for this service" }, { status: 400 });
    }

    const startAt = new Date(startISO);
    if (isNaN(startAt.getTime())) {
      return json({ ok: false, error: "Invalid startISO" }, { status: 400 });
    }

    const endAt = new Date(startAt.getTime() + (svc.duration_min || 60) * 60000);
    // HOLD por 30 min — suficiente para completar el pago en Stripe
    const holdUntil = new Date(Date.now() + 30 * 60000).toISOString();

    // Creamos el HOLD
    const { data: booking, error: insErr } = await supabase
      .from("bookings")
      .insert({
        service_id: serviceId,
        start_at: startAt.toISOString(),
        end_at: endAt.toISOString(),
        status: "HOLD",
        hold_until: holdUntil,
        customer_name: name.trim(),
        customer_email: email.trim(),
      })
      .select("id")
      .single();

    if (insErr) {
      if (String(insErr.code) === "23505") {
        return json({ ok: false, error: "Slot already taken" }, { status: 409 });
      }
      throw insErr;
    }

    // Creamos la Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email.trim(),
      metadata: {
        product: "booking",
        bookingId: booking.id,
        serviceId,
      },
      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: svc.title_de,
            },
            unit_amount: Math.round(svc.price_chf * 100), // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      success_url: `${env.siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}/book/cancel?bookingId=${booking.id}`,
    });

    return json({ ok: true, url: session.url });
  } catch (e) {
    console.error("[/api/stripe/checkout-booking] fatal:", e);
    return json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
  }
}