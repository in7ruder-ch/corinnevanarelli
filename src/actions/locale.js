"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SUPPORTED = ["de", "en", "es"];
const DEFAULT_LOCALE = "de";

export async function changeLocale(formData) {
  const locale = formData.get("locale")?.toString() || DEFAULT_LOCALE;
  const redirectTo = formData.get("redirectTo")?.toString() || "/";

  const safeLocale = SUPPORTED.includes(locale) ? locale : DEFAULT_LOCALE;

  // Delete the old cookie-based locale so it doesn't interfere
  const cookieStore = await cookies();
  cookieStore.delete("NEXT_LOCALE");

  // Strip any existing locale prefix from the current path
  const localePrefix = SUPPORTED.find(l => redirectTo === `/${l}` || redirectTo.startsWith(`/${l}/`));
  const pathWithoutLocale = localePrefix
    ? redirectTo.slice(`/${localePrefix}`.length) || "/"
    : redirectTo;

  redirect(`/${safeLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`);
}