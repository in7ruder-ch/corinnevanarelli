// src/app/api/bookings/cancel-hold/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getSupabaseService } from "@/lib/supabaseService";

export async function POST(req) {
  try {
    const { bookingId } = await req.json();
    if (!bookingId) {
      return Response.json({ ok: false, error: "Missing bookingId" }, { status: 400 });
    }

    const supabase = getSupabaseService();

    // Solo cancelamos si sigue en HOLD — nunca tocamos PAID o PENDING
    const { error } = await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .eq("id", bookingId)
      .eq("status", "HOLD");

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[/api/bookings/cancel-hold] fatal:", e);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}