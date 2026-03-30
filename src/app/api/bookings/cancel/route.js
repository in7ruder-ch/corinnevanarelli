// src/app/api/bookings/cancel/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getSupabaseService } from "@/lib/supabaseService";
import { validateAdminSession } from "@/lib/adminSession";

function json(payload, init = {}) {
  const res = Response.json(payload, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req) {
  try {
    const session = await validateAdminSession();
    if (!session) return json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { bookingId } = await req.json();
    if (!bookingId) return json({ ok: false, error: "Missing bookingId" }, { status: 400 });

    const supabase = getSupabaseService();
    const { error } = await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .eq("id", bookingId);

    if (error) throw error;

    return json({ ok: true });
  } catch (e) {
    console.error("[/api/bookings/cancel] fatal:", e);
    return json({ ok: false, error: "Server error" }, { status: 500 });
  }
}