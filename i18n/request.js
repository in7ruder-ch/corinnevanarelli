import { getRequestConfig } from "next-intl/server";

const SUPPORTED = ["de", "en", "es"];
const DEFAULT = "de";

export default getRequestConfig(async ({ requestLocale }) => {
  const candidate = await requestLocale;
  const locale = SUPPORTED.includes(candidate) ? candidate : DEFAULT;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});