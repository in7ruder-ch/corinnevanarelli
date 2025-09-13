import { supabaseServer } from "@/lib/supabase";
export const dynamic = "force-dynamic";

/** POST { bookingId: string } -> status = CANCELED */
export async function POST(req) {
  try {
    const { bookingId } = await req.json();
    if (!bookingId) return Response.json({ error: "Missing bookingId" }, { status: 400 });

    const supabase = supabaseServer();
    const { error } = await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .eq("id", bookingId);

    if (error) throw error;
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
