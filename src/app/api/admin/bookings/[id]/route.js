// src/app/api/admin/bookings/[id]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function isAdmin() {
  const c = await cookies(); // 👈 importante
  return c.get("admin_auth")?.value === "ok";
}

function getSupabaseService() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url) throw new Error("Falta SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL");
  if (!service) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY (o SUPABASE_SERVICE_ROLE)");
  return createClient(url, service, { auth: { persistSession: false } });
}

export async function DELETE(_req, ctx) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // En Dynamic I/O, ctx.params puede ser async
    const p = (ctx?.params && typeof ctx.params.then === "function")
      ? await ctx.params
      : ctx.params;
    const id = p?.id;
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing booking id" }, { status: 400 });
    }

    const supabase = getSupabaseService();
    const { error } = await supabase.from("bookings").delete().eq("id", id).limit(1);
    if (error) {
      console.error("[admin/bookings DELETE] supabase error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/bookings DELETE] fatal:", e);
    const msg = e?.message || "Internal error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
