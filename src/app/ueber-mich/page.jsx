// src/app/ueber-mich/page.jsx
import Image from "next/image";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Über mich | Corinne Vanarelli",
  description:
    "Mein Weg, meine Werte, meine Arbeit: Sozialarbeiterin & Coach – warum ich Menschen auf ihrem Weg zu Klarheit, Heilung und Selbstermächtigung begleite.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/ueber-mich" },
  openGraph: {
    title: "Über mich | Corinne Vanarelli",
    description:
      "Werdegang & Haltung: Herzheilung, Coaching und Akasha-Chronik – menschlich, klar, authentisch.",
    url: "https://www.corinnevanarelli.ch/ueber-mich",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Corinne Vanarelli - About me.jpg",
        width: 1200,
        height: 630,
        alt: "Corinne Vanarelli"
      }
    ],
    locale: "de_DE",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Über mich | Corinne Vanarelli",
    description:
      "Wer ich bin und wie ich arbeite – in Tiefe und Verbundenheit.",
    images: ["https://www.corinnevanarelli.ch/img/Corinne Vanarelli - About me.jpg"]
  }
};


export default function UeberMichPage() {
  return (
    <>
      {/* Intro: texto izq / imagen der */}
      <Section
        className="bg-white pt-[12rem] pb-10 md:pb-16"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <div className="grid items-stretch md:grid-cols-12">
          {/* Texto en “card” gris */}
          <div className="md:col-span-7">
            <div className="h-full bg-[#efefef] p-6 sm:p-8 md:p-12">
              <h1 className="text-[2.25rem] md:text-[3rem] leading-tight font-bold text-neutral-900">
                Über mich
              </h1>
              <p className="mt-3 text-xl text-neutral-800">
                Corinne Vanarelli<span className="text-neutral-500">- </span>
                <em className="italic">Coco</em>
              </p>

              <div className="mt-8 space-y-5 leading-relaxed text-neutral-800">
                <p>
                  Schon früh habe ich mich für den menschlichen Geist und
                  gesellschaftliche Ungleichheiten interessiert. Dieses
                  Interesse führte mich dazu, Soziale Arbeit zu studieren – mit
                  dem Wunsch, Menschen besser zu verstehen und sie auf ihrem Weg
                  zu mehr Gerechtigkeit und Selbstbestimmung zu unterstützen.
                  Als Sozialarbeiterin habe ich unter anderem mit unbegleiteten
                  minderjährigen Geflüchteten und Erwachsenen im Asylbereich,
                  mit suchtmittelabhängigen Menschen (Therapie sowie
                  Schadensminderung und Prävention) sowie mit Frauen, Kindern
                  und Jugendlichen in herausfordernden Lebensphasen gearbeitet.
                </p>
                <p>
                  Ich durfte viele Höhen und Tiefen erleben – persönliche Krisen,
                  Neubeginn, Entwicklungsschritte. Besonders prägend war meine
                  Zeit in Lateinamerika, wo ich fast acht Jahre lebte und
                  arbeitete. Diese Jahre haben mich als Mensch wie auch als
                  Fachkraft tief verändert. Mit der Zeit habe ich erkannt, dass
                  jeder Wunsch nach Veränderung im Aussen zuerst bei uns selbst
                  beginnt. Der Weg zur Selbsterkenntnis ist oft
                  herausfordernd – aber genau hier traten Coaching und
                  Energiearbeit in mein Leben. Sie wurden zu kraftvollen
                  Begleitern auf meiner eigenen inneren Reise. All diese
                  Erfahrungen fliessen heute in meine Arbeit ein: im Coaching,
                  Energiearbeiten und als Wegbegleiterin.
                </p>
                <p className="font-semibold">
                  Ich bin überzeugt: Jeder Mensch trägt die Kraft zur
                  Veränderung in sich – manchmal braucht es nur den richtigen
                  Raum, um sie zu entfalten.
                </p>

                {/* Instagram (opcional) */}
                <div className="pt-4">
                  <a
                    href="https://www.instagram.com/soulcoaching.coco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="md:col-span-5  overflow-hidden">
            <Image
              src="/img/Corinne Vanarelli - About me.jpg"
              alt="Corinne Vanarelli im Grünen"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </Section>

      {/* Ausbildung */}
      <Section
        className="bg-white pt-10 md:pt-14 pb-16 md:pb-24"
        containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
      >
        <h2 className="text-[2rem] md:text-[2.5rem] leading-tight font-semibold text-neutral-900">
          Ausbildung
        </h2>

        {/* Datos en filas: izquierda ↔ derecha */}
        {[
          {
            year: '2025',
            left: ['doTERRA AromaTouch®', 'Online, Schweiz'],
            right: ['doTERRA AromaTouch® Methode'],
          },
          {
            year: '2024-2025',
            left: ['Lebensmagie', 'Bern, Schweiz'],
            right: [
              'Energetische Heilarbeit',
              'Ausbildung: Hopi Herzheilung, Akasha Chronik Reading, Geistige Wirbelsäulenaufrichtung, Chakra Cleaning',
            ],
          },
          {
            year: '2022-2024',
            left: ['Escuela de Formación de Líderes, Buenos Aires, Argentina'],
            right: ['Ontologisches Coaching (International Coaching Federation)'],
          },
          {
            year: '2011-2015',
            left: ['Fachhochschule Soziale Arbeit', 'Bern, Schweiz'],
            right: ['Bachelor Soziale Arbeit'],
          },
        ].map((row, idx) => (
          <div key={idx} className="mt-10 first:mt-10">
            <div className="grid md:grid-cols-2 gap-y-3 items-start">
              {/* Columna izquierda */}
              <div>
                <div className="text-sm text-neutral-500">{row.year}</div>
                <div className="mt-2 space-y-1 text-neutral-800">
                  {row.left.map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </div>
              </div>

              {/* Columna derecha (correspondiente a la misma fila) */}
              <div>
                <div className="mt-6 md:mt-6 space-y-1 text-neutral-800">
                  {row.right.map((r, i) => (
                    <p key={i}>{r}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>
      <ContactForm />
      <Footer />
    </>
  );
}
