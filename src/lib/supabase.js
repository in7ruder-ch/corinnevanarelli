import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.SUPABASE_ANON_KEY;

// Cliente sólo para usar en el **servidor** (Route Handlers).
export function supabaseServer() {
  if (!url || !anon) {
    throw new Error("Supabase env vars missing.");
  }
  return createClient(url, anon, {
    auth: { persistSession: false },
  });
}
