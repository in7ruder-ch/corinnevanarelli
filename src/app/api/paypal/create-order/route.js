import { supabaseServer } from "@/lib/supabase";
import { paypalAccessToken, paypalBaseUrl } from "@/lib/paypal";

export const dynamic = "force-dynamic";

/**
 * POST /api/paypal/create-order
 * Body: { bookingId: string }
 * Requiere booking en PENDING. Crea Order en PayPal y guarda paypal_order_id.
 */
export async function POST(req) {
  try {
    const { bookingId } = await req.json();
    if (!bookingId) return Response.json({ error: "Missing bookingId" }, { status: 400 });

    const supabase = supabaseServer();

    // Traer booking + servicio
    const { data: bk, error: bkErr } = await supabase
      .from("bookings")
      .select("id, status, start_at, service_id, paypal_order_id")
      .eq("id", bookingId)
      .maybeSingle();
    if (bkErr) throw bkErr;
    if (!bk) return Response.json({ error: "Booking not found" }, { status: 404 });
    if (bk.status !== "PENDING")
      return Response.json({ error: "Booking not in PENDING" }, { status: 409 });

    // Si ya tenía order, devolvemos la misma (idempotencia simple)
    if (bk.paypal_order_id) {
      return Response.json({ orderID: bk.paypal_order_id });
    }

    const { data: svc } = await supabase
      .from("services")
      .select("title_de, price_chf")
      .eq("id", bk.service_id)
      .maybeSingle();

    const amount = Number(svc?.price_chf || 0).toFixed(2);
    const desc = `Buchung ${svc?.title_de || bk.service_id} — ${new Date(bk.start_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;

    const token = await paypalAccessToken();
    const res = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "CHF", value: amount },
            description: desc
          }
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW"
        }
      })
    });

    const json = await res.json();
    if (!res.ok) {
      return Response.json({ error: json || "PayPal create error" }, { status: 500 });
    }

    const orderID = json.id;

    // Guardar order ID en booking
    const { error: updErr } = await supabase
      .from("bookings")
      .update({ paypal_order_id: orderID })
      .eq("id", bookingId);
    if (updErr) throw updErr;

    return Response.json({ orderID });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
