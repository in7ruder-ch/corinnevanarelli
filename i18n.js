// i18n.js (raíz)
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const SUPPORTED = ["de", "en", "es"];
const DEFAULT_LOCALE = "de";

export default getRequestConfig(async () => {
  // Prioridad: cookie NEXT_LOCALE (seteada por la Server Action)
  const store = await cookies();
  const cookieLocale = store.get("NEXT_LOCALE")?.value;

  const active = SUPPORTED.includes(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  const messages = (await import(`./messages/${active}.json`)).default;

  return {
    locale: active,
    messages
  };
});
