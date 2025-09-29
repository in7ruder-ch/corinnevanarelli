// src/lib/i18n.js

// Carga mensajes por locale con fallback a 'de'
export async function getMessages(locale = "de") {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default || {};
  } catch {
    const fallback = await import("../../messages/de.json");
    return fallback.default || {};
  }
}
