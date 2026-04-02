// src/app/api/bookings/confirm/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getSupabaseService } from "@/lib/supabaseService";
import { sendBookingPaidEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { bookingId, name, email } = await req.json();

    if (!bookingId || !name?.trim() || !/.+@.+\..+/.test(email)) {
      return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const supabase = getSupabaseService();

    // Verificamos que el HOLD existe y no está expirado
    const { data: booking, error: fetchErr } = await supabase
      .from("bookings")
      .select("id, status, hold_until, start_at, service_id")
      .eq("id", bookingId)
      .maybeSingle();

    if (fetchErr) throw fetchErr;
    if (!booking) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }
    if (booking.status !== "HOLD") {
      return Response.json({ error: "Booking is no longer on hold" }, { status: 409 });
    }
    if (booking.hold_until && new Date(booking.hold_until) < new Date()) {
      return Response.json({ error: "Hold expired" }, { status: 409 });
    }

    // Confirmamos: HOLD → CONFIRMED con datos del cliente
    const { error: updateErr } = await supabase
      .from("bookings")
      .update({
        status: "CONFIRMED",
        hold_until: null,
        customer_name: name.trim(),
        customer_email: email.trim(),
      })
      .eq("id", bookingId)
      .eq("status", "HOLD");

    if (updateErr) throw updateErr;

    // Cargamos el servicio para el email
    const { data: service } = await supabase
      .from("services")
      .select("id, title_de, duration_min, price_chf")
      .eq("id", booking.service_id)
      .maybeSingle();

    // Enviamos el email de confirmación (no bloqueamos si falla)
    try {
      await sendBookingPaidEmail({
        booking: {
          ...booking,
          customer_name: name.trim(),
          customer_email: email.trim(),
        },
        service: service || { title_de: booking.service_id, duration_min: 60, price_chf: 0 },
      });
    } catch (mailErr) {
      console.error("[/api/bookings/confirm] email error (non-fatal):", mailErr);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[/api/bookings/confirm] fatal:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}