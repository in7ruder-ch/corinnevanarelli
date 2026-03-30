import { getRequestConfig } from 'next-intl/server';

const SUPPORTED = ['de', 'en', 'es'];
const DEFAULT_LOCALE = 'de';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !SUPPORTED.includes(locale)) {
    locale = DEFAULT_LOCALE;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: 'Europe/Zurich',
  };
});