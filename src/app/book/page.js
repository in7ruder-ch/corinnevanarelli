import Footer from "../../components/Footer";
import BookClient from "../../components/BookClient";

export default async function BookPage({ searchParams }) {
  const sp = await searchParams;
  const initialSelectedId =
    typeof sp?.serviceId === "string" ? sp.serviceId : null;

  return (
    <>
      {/* Si tu layout NO compensa la navbar, dejá este mt-32.
          Si el layout ya usa pt-32, remové este mt-32. */}
      <main className="mt-32 mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold">Buchung</h1>
        <p className="mt-3 text-neutral-700">
          Wähle deinen Service sowie Datum und Uhrzeit.
        </p>

        <BookClient initialSelectedId={initialSelectedId} />
      </main>
      <Footer />
    </>
  );
}
