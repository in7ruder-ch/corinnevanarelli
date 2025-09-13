import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/bookings/hold
 * Body JSON: { serviceId: string, startISO: string, holdMinutes?: number, name?: string, email?: string }
 */
export async function POST(req) {
  try {
    const { serviceId, startISO, holdMinutes = 10, name, email } = await req.json();

    if (!serviceId || !startISO) {
      return Response.json({ error: "Missing serviceId or startISO" }, { status: 400 });
    }

    const startAt = new Date(startISO);
    if (isNaN(startAt.getTime())) {
      return Response.json({ error: "Invalid startISO" }, { status: 400 });
    }

    const supabase = supabaseServer();

    // 0) Limpieza de HOLDs vencidos (evita conflictos con el índice parcial)
    await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .lt("hold_until", new Date().toISOString())
      .eq("status", "HOLD");

    // 1) Traer servicio (para calcular end_at)
    const { data: svc, error: svcErr } = await supabase
      .from("services")
      .select("id, duration_min")
      .eq("id", serviceId)
      .maybeSingle();

    if (svcErr) throw svcErr;
    if (!svc) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }

    const endAt = new Date(startAt.getTime() + (svc.duration_min || 60) * 60000);
    const holdUntil = new Date(Date.now() + holdMinutes * 60000).toISOString();

    // 2) Intentar insertar HOLD
    const { data: inserted, error: insErr } = await supabase
      .from("bookings")
      .insert({
        service_id: serviceId,
        start_at: startAt.toISOString(),
        end_at: endAt.toISOString(),
        status: "HOLD",
        hold_until: holdUntil,
        customer_name: name || null,
        customer_email: email || null
      })
      .select("id, start_at, hold_until")
      .single();

    // Conflicto por índice único (slot ya tomado)
    if (insErr && String(insErr.code) === "23505") {
      return Response.json({ error: "Slot already taken" }, { status: 409 });
    }
    if (insErr) throw insErr;

    return Response.json({
      bookingId: inserted.id,
      start_at: inserted.start_at,
      hold_until: inserted.hold_until
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
