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

// Layout del segmento /admin con gate simple por cookie
export default function AdminLayout({ children }) {
  const cookieStore = cookies();
  const authed = cookieStore.get("admin_auth")?.value === "ok";
  if (authed) return <>{children}</>;
  return <GateForm />;
}

// Server Action para autenticar con ADMIN_KEY y setear cookie
async function authenticate(formData) {
  "use server";
  const key = formData.get("key");
  const ADMIN_KEY = process.env.ADMIN_KEY;
  const ok = ADMIN_KEY && key === ADMIN_KEY;

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
        <label className="block text-sm font-medium">Zugangsschlüssel</label>
        <input
          name="key"
          type="password"
          required
          className="w-full rounded-xl border px-3 py-2 outline-none"
          placeholder="••••••••••••"
        />
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
