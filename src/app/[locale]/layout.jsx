import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

const SUPPORTED_LOCALES = ["de", "en", "es"];

// Layout para todas las páginas dentro de [locale]
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Validación
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  // Cargar traducciones
  const messages = await getMessages();

  // ✅ NO retornar <html> ni <body> - eso lo hace el root layout
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}