import { supabaseServer } from "@/lib/supabase";
import { paypalAccessToken, paypalBaseUrl } from "@/lib/paypal";
import { sendBookingPaidEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/**
 * POST /api/paypal/capture-order
 * Body: { orderID: string }
 * Captura en PayPal y pasa booking a PAID + envía mail de confirmación.
 */
export async function POST(req) {
  try {
    const { orderID } = await req.json();
    if (!orderID) return Response.json({ error: "Missing orderID" }, { status: 400 });

    const token = await paypalAccessToken();

    // Importante: PayPal quiere JSON (aunque sea vacío)
    const captureRes = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const captureJson = await captureRes.json();

    if (!captureRes.ok) {
      const debugId = captureJson?.debug_id;
      return Response.json({ error: captureJson || "PayPal capture error", debugId }, { status: 500 });
    }

    // Datos de captura (si disponibles)
    const captureId =
      captureJson?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;
    const status =
      captureJson?.status ||
      captureJson?.purchase_units?.[0]?.payments?.captures?.[0]?.status;

    const supabase = supabaseServer();

    // Actualizamos booking -> PAID por paypal_order_id
    const { data: updated, error: updErr } = await supabase
      .from("bookings")
      .update({ status: "PAID", paypal_capture_id: captureId })
      .eq("paypal_order_id", orderID)
      .select("id, service_id, start_at, customer_name, customer_email")
      .maybeSingle();

    if (updErr) throw updErr;
    if (!updated) return Response.json({ error: "Booking not found for order" }, { status: 404 });

    // Traemos el servicio para el email
    const { data: svc, error: svcErr } = await supabase
      .from("services")
      .select("id, title_de, duration_min, price_chf")
      .eq("id", updated.service_id)
      .maybeSingle();

    if (svcErr) throw svcErr;

    // Enviar email de confirmación (no bloquear respuesta si falla)
    let emailPreview = null;
    try {
      const { previewUrl } = await sendBookingPaidEmail({ booking: updated, service: svc || {} });
      emailPreview = previewUrl || null;
    } catch (e) {
      console.error("Email send error:", e);
    }

    return Response.json({ ok: true, status, captureId, emailPreview });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
