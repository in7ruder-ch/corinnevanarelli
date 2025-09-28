// src/app/admin/logout/route.js
import { cookies } from "next/headers";
import { revokeAdminSession } from "@/lib/adminSession";
import { NextResponse } from "next/server";

export async function POST(req) {
  const url = new URL(req.url);
  const next = url.searchParams.get("next") || "/";

  const cookieStore = await cookies(); // Next 15: async
  const token = cookieStore.get("admin_auth_token")?.value;

  if (token) {
    await revokeAdminSession(token);
  } else {
    // limpieza defensiva
    cookieStore.set("admin_auth_token", "", { path: "/", maxAge: 0 });
  }

  // Redirigir (303 para post-redirect-get)
  return NextResponse.redirect(new URL(next, req.url), 303);
}
