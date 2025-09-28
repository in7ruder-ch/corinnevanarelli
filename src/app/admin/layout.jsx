// src/app/admin/layout.jsx
import { redirect } from "next/navigation";
import {
  createAdminSession,
  validateAdminSession,
  setAdminCookie,
  rateLimitAdminLogin,
  recordLoginAttempt,
} from "@/lib/adminSession";

export const metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default async function AdminLayout({ children }) {
  const session = await validateAdminSession();
  if (session) return <>{children}</>;
  return <GateForm />;
}

async function authenticate(formData) {
  "use server";
  const user = (formData.get("user") || "").toString().trim();
  const pass = (formData.get("pass") || "").toString();
  const key  = (formData.get("key")  || "").toString();

  const ADMIN_USER = process.env.ADMIN_USER || "";
  const ADMIN_PASS = process.env.ADMIN_PASS || "";
  const ADMIN_KEY  = process.env.ADMIN_KEY  || "";

  const { allowed } = await rateLimitAdminLogin({ user_name: ADMIN_USER ? user : null });
  if (!allowed) {
    await recordLoginAttempt({ user_name: ADMIN_USER ? user : null, ok: false });
    redirect("/admin?blocked=1");
  }

  let ok = false;
  let loggedAs = "admin";

  if (ADMIN_USER && ADMIN_PASS) {
    ok = user === ADMIN_USER && pass === ADMIN_PASS;
    loggedAs = user || "admin";
  } else if (ADMIN_KEY) {
    ok = key === ADMIN_KEY || pass === ADMIN_KEY;
  }

  await recordLoginAttempt({ user_name: ADMIN_USER ? user : null, ok });

  if (ok) {
    const { token, expiresAt } = await createAdminSession({ user_name: loggedAs });
    await setAdminCookie(token, expiresAt); // ⬅️ ahora async
  }

  redirect("/admin");
}

function GateForm() {
  return (
    <div className="mt-32 min-h-[60vh] flex items-center justify-center p-6">
      <form action={authenticate} className="w-full max-w-sm rounded-2xl border p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Admin Zugang</h1>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Benutzername</label>
          <input name="user" type="text" autoComplete="username" className="w-full rounded-xl border px-3 py-2" placeholder="admin" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Passwort</label>
          <input name="pass" type="password" autoComplete="current-password" className="w-full rounded-xl border px-3 py-2" placeholder="••••••••••••" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Key (optional)</label>
          <input name="key" type="password" className="w-full rounded-xl border px-3 py-2" placeholder="Nur falls du einen Key verwendest" />
        </div>
        <button type="submit" className="w-full rounded-xl bg-black text-white py-2 font-medium">Enter</button>
        <p className="text-xs text-center opacity-60">Zugriff nur für autorisierte Personen.</p>
      </form>
    </div>
  );
}
