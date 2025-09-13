import { supabaseServer } from "@/lib/supabase";
import { paypalAccessToken, paypalBaseUrl } from "@/lib/paypal";

export const dynamic = "force-dynamic";

/**
 * POST /api/paypal/capture-order
 * Body: { orderID: string }
 * Captura en PayPal y pasa booking a PAID.
 */
export async function POST(req) {
  try {
    const { orderID } = await req.json();
    if (!orderID) return Response.json({ error: "Missing orderID" }, { status: 400 });

    const token = await paypalAccessToken();

    // 👇 FIX: enviar JSON vacío y header content-type
    const captureRes = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    const captureJson = await captureRes.json();

    if (!captureRes.ok) {
      // opcional: exponer debug_id si viene
      const debugId = captureJson?.debug_id;
      return Response.json(
        { error: captureJson || "PayPal capture error", debugId },
        { status: 500 }
      );
    }

    // Tomamos el id de la captura (si disponible)
    const captureId =
      captureJson?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;
    const status =
      captureJson?.status ||
      captureJson?.purchase_units?.[0]?.payments?.captures?.[0]?.status;

    // Actualizamos booking por paypal_order_id
    const supabase = supabaseServer();
    const { error: updErr } = await supabase
      .from("bookings")
      .update({ status: "PAID", paypal_capture_id: captureId })
      .eq("paypal_order_id", orderID);

    if (updErr) throw updErr;

    return Response.json({ ok: true, status, captureId });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
