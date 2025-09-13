import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/bookings/confirm
 * Body: { bookingId: string, name: string, email: string }
 * Cambia HOLD -> PENDING si el hold no expiró.
 */
export async function POST(req) {
  try {
    const { bookingId, name, email } = await req.json();

    if (!bookingId || !name || !email) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
    // validación mínima de email
    if (!/.+@.+\..+/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = supabaseServer();

    // 1) Buscar booking
    const { data: bk, error: selErr } = await supabase
      .from("bookings")
      .select("id, status, hold_until")
      .eq("id", bookingId)
      .maybeSingle();

    if (selErr) throw selErr;
    if (!bk) return Response.json({ error: "Booking not found" }, { status: 404 });

    // 2) Validar estado y hold vigente
    if (bk.status !== "HOLD") {
      return Response.json({ error: "Booking is not in HOLD" }, { status: 409 });
    }
    if (!bk.hold_until || new Date(bk.hold_until) <= new Date()) {
      return Response.json({ error: "Hold expired" }, { status: 410 });
    }

    // 3) Actualizar a PENDING + datos cliente
    const { data: upd, error: updErr } = await supabase
      .from("bookings")
      .update({
        status: "PENDING",
        customer_name: name,
        customer_email: email
      })
      .eq("id", bookingId)
      .select("id, status")
      .single();

    if (updErr) throw updErr;

    return Response.json({ ok: true, bookingId: upd.id, status: upd.status });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
