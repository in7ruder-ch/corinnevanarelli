// src/app/api/admin/slot-overrides/[id]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabaseService";
import { validateAdminSession } from "@/lib/adminSession";

export async function DELETE(_req, ctx) {
  try {
    const session = await validateAdminSession();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const p = ctx?.params && typeof ctx.params.then === "function"
      ? await ctx.params
      : ctx.params;

    const id = p?.id;
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }

    const supabase = getSupabaseService();
    const { error } = await supabase
      .from("slot_overrides")
      .delete()
      .eq("id", id)
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/slot-overrides DELETE]", e);
    return NextResponse.json({ ok: false, error: e?.message || "Internal error" }, { status: 500 });
  }
}