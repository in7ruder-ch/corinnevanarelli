"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function changeLocale(formData) {
  const locale = (formData.get("locale") || "de").toString();
  const redirectTo = (formData.get("redirectTo") || "/").toString();

  // Next 15: cookies() es async -> hay que await
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 año
    sameSite: "lax"
  });

  // Redirige para rehidratar con el nuevo locale
  redirect(redirectTo);
}
