import { supabaseServer } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function isAdmin() {
  const c = await cookies();
  return c.get("admin_auth")?.value === "ok";
}

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && service) {
    return createClient(url, service, { auth: { persistSession: false } });
  }
  return supabaseServer();
}

/** POST { bookingId: string } -> status = CANCELED */
export async function POST(req) {
  try {
    if (!(await isAdmin())) {
      const res = Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const { bookingId } = await req.json();
    if (!bookingId) {
      const res = Response.json({ ok: false, error: "Missing bookingId" }, { status: 400 });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("bookings")
      .update({ status: "CANCELED" })
      .eq("id", bookingId);

    if (error) throw error;

    const res = Response.json({ ok: true }, { status: 200 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (e) {
    console.error(e);
    const res = Response.json({ ok: false, error: "Server error" }, { status: 500 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}
