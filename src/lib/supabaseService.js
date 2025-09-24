// src/lib/supabaseService.js
import { createClient } from "@supabase/supabase-js";

/** Usar SOLO en server: crea cliente con Service Role (bypassa RLS) */
export function getSupabaseService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!url) throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRole) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY (service role)");
  return createClient(url, serviceRole, { auth: { persistSession: false } });
}
