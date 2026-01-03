// src/app/book/page.js
import Footer from "../../components/Footer";
import BookClient from "../../components/BookClient";
import { getTranslations } from "next-intl/server";

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

export default async function BookPage({ searchParams }) {
  const t = await getTranslations("Book");

  // ✅ Next sync dynamic APIs: searchParams puede venir como Promise
  const sp = await searchParams;

  const initialSelectedId =
    typeof sp?.serviceId === "string" ? sp.serviceId : null;

  return (
    <>
      {/* Si tu layout NO compensa la navbar, dejá este mt-32.
          Si el layout ya usa pt-32, remové este mt-32. */}
      <main className="mt-32 mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1
          className="text-3xl md:text-4xl font-semibold"
          style={{ color: "var(--text)" }}
        >
          {t("title")}
        </h1>

        <p className="mt-3" style={{ color: "var(--muted)" }}>
          {t("lead")}
        </p>

        <BookClient initialSelectedId={initialSelectedId} />
      </main>

      <Footer />
    </>
  );
}
