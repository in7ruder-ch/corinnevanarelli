// src/app/admin/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

// Layout del segmento /admin con gate por cookie
export default function AdminLayout({ children }) {
  const cookieStore = cookies();
  const authed = cookieStore.get("admin_auth")?.value === "ok";
  if (authed) return <>{children}</>;
  return <GateForm />;
}

// Server Action para autenticar con ADMIN_USER/ADMIN_PASS o ADMIN_KEY
async function authenticate(formData) {
  "use server";

  const user = (formData.get("user") || "").toString().trim();
  const pass = (formData.get("pass") || "").toString();
  const key  = (formData.get("key")  || "").toString();

  const ADMIN_USER = process.env.ADMIN_USER || "";
  const ADMIN_PASS = process.env.ADMIN_PASS || "";
  const ADMIN_KEY  = process.env.ADMIN_KEY  || "";

  // Prioridad: si hay USER+PASS configurados, se requiere ese esquema.
  let ok = false;
  if (ADMIN_USER && ADMIN_PASS) {
    ok = user === ADMIN_USER && pass === ADMIN_PASS;
  } else if (ADMIN_KEY) {
    // Modo "clave única": acepta que la escriban en pass o en key.
    ok = key === ADMIN_KEY || pass === ADMIN_KEY;
  }

  const cookieStore = cookies();
  if (ok) {
    cookieStore.set("admin_auth", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
  }

  // Redirige siempre para no filtrar estado
  redirect("/admin");
}

function GateForm() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <form
        action={authenticate}
        className="w-full max-w-sm rounded-2xl border p-6 shadow-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Admin Zugang</h1>

        {/* Usuario + Password */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">Benutzername</label>
          <input
            name="user"
            type="text"
            autoComplete="username"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            placeholder="admin"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Passwort</label>
          <input
            name="pass"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            placeholder="••••••••••••"
          />
        </div>

        {/* Clave única (fallback si usas ADMIN_KEY) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">Key (optional)</label>
          <input
            name="key"
            type="password"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            placeholder="Nur falls du einen Key verwendest"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black text-white py-2 font-medium"
        >
          Enter
        </button>

        <p className="text-xs text-center opacity-60">
          Zugriff nur für autorisierte Personen.
        </p>
      </form>
    </div>
  );
}
