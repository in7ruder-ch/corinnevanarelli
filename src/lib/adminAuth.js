// src/lib/adminAuth.js
import { cookies } from "next/headers";

export function requireAdmin() {
  const ok = cookies().get("admin_auth")?.value === "ok";
  if (!ok) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
}
