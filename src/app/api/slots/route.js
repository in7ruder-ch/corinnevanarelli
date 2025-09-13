import { supabaseServer } from "@/lib/supabase";
export const dynamic = "force-dynamic";

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date"); // YYYY-MM-DD

  if (!dateStr) {
    return Response.json({ error: "Missing date param (YYYY-MM-DD)" }, { status: 400 });
  }

  const day = new Date(dateStr + "T00:00:00");
  const weekday = day.getDay();

  try {
    const supabase = supabaseServer();

    // 0) Excepción del día (cerrado)
    const { data: ex } = await supabase
      .from("exceptions")
      .select("is_closed")
      .eq("date", dateStr)
      .maybeSingle();

    if (ex?.is_closed) {
      return Response.json({ slots: [] });
    }

    // 1) Regla para ese weekday
    const { data: rule, error: ruleErr } = await supabase
      .from("availability_rules")
      .select("start_time, end_time, step_min, active")
      .eq("weekday", weekday)
      .eq("active", true)
      .maybeSingle();

    if (ruleErr) throw ruleErr;
    if (!rule) return Response.json({ slots: [] });

    // 2) Construir slots base
    const start = new Date(day);
    const [sh, sm] = String(rule.start_time).split(":").map(Number);
    start.setHours(sh, sm || 0, 0, 0);

    const end = new Date(day);
    const [eh, em] = String(rule.end_time).split(":").map(Number);
    end.setHours(eh, em || 0, 0, 0);

    const stepMin = rule.step_min || 30;

    const now = new Date();
    const todayISO = toISODate(now);
    const base = [];
    for (let t = new Date(start); t < end; t = new Date(t.getTime() + stepMin * 60000)) {
      if (toISODate(t) === todayISO && t <= now) continue; // evitar pasados de hoy
      base.push(t);
    }

    // 3) Traer bookings activos del día (HOLD vigente, PENDING, PAID)
    const dayStartISO = new Date(day);
    const dayEndISO = new Date(day);
    dayEndISO.setHours(23, 59, 59, 999);

    const { data: bks, error: bkErr } = await supabase
      .from("bookings")
      .select("start_at, status, hold_until")
      .gte("start_at", dayStartISO.toISOString())
      .lte("start_at", dayEndISO.toISOString());

    if (bkErr) throw bkErr;

    const blocked = new Set(
      (bks || [])
        .filter(b => {
          if (b.status === "PAID" || b.status === "PENDING") return true;
          if (b.status === "HOLD" && b.hold_until && new Date(b.hold_until) > new Date()) return true;
          return false;
        })
        .map(b => new Date(b.start_at).getTime())
    );

    // 4) Filtrar slots bloqueados
    const available = base
      .filter(dt => !blocked.has(dt.getTime()))
      .map(dt => dt.toISOString());

    return Response.json({ slots: available });
  } catch (e) {
    console.error(e);
    return Response.json({ slots: [] });
  }
}
