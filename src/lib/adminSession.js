// src/lib/adminSession.js
import { getSupabaseService } from "@/lib/supabaseService";
import { cookies, headers } from "next/headers";

export async function createAdminSession({ user_name }) {
  const supabase = getSupabaseService();
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = hdrs.get("user-agent") || "unknown";
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("admin_sessions")
    .insert({ user_name, ip, user_agent: ua, expires_at: expiresAt })
    .select("token, expires_at")
    .single();

  if (error) throw error;
  return { token: data.token, expiresAt: data.expires_at };
}

export async function validateAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth_token")?.value;
  if (!token) return null;

  const supabase = getSupabaseService();
  const { data } = await supabase
    .from("admin_sessions")
    .select("token, user_name, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (!data) return null;
  if (new Date(data.expires_at) <= new Date()) {
    cookieStore.set("admin_auth_token", "", { path: "/", maxAge: 0 });
    return null;
  }
  return { token: data.token, userName: data.user_name, expiresAt: data.expires_at };
}

export async function revokeAdminSession(token) {
  const supabase = getSupabaseService();
  await supabase.from("admin_sessions").delete().eq("token", token);
  const cookieStore = await cookies();
  cookieStore.set("admin_auth_token", "", { path: "/", maxAge: 0 });
}

export async function setAdminCookie(token, expiresAtISO) {
  const cookieStore = await cookies();
  const maxAge = Math.max(1, Math.floor((new Date(expiresAtISO).getTime() - Date.now()) / 1000));
  cookieStore.set("admin_auth_token", String(token), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function rateLimitAdminLogin({ user_name, maxAttempts = 5, windowMin = 10 }) {
  const supabase = getSupabaseService();
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const since = new Date(Date.now() - windowMin * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("admin_login_attempts")
    .select("id, ok, attempted_at")
    .gte("attempted_at", since)
    .eq("ip", ip)
    .eq("user_name", user_name || null);

  if (error) throw error;
  const attempts = data?.length || 0;
  return { allowed: attempts < maxAttempts, ip, sinceISO: since };
}

export async function recordLoginAttempt({ user_name, ok }) {
  const supabase = getSupabaseService();
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  await supabase.from("admin_login_attempts").insert({
    user_name: user_name || null,
    ip,
    ok: !!ok,
  });
}