import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import CenteredSection from "@/components/CenteredSection"; // ⬅️ nuevo
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

// TODO: reemplazar por el UUID real del servicio "Ontologisches Coaching"
const COACHING_SERVICE_ID = "60749344-9ccb-40a1-ac12-abfb355883ce";
const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
  title: "Ontologisches Coaching | Corinne Vanarelli",
  description:
    "Klarheit, Fokus und echte Umsetzung: Coaching auf Augenhöhe für berufliche & persönliche Themen – in Zürich & online.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/angebote/ontologisches-coaching" },
  openGraph: {
    title: "Ontologisches Coaching | Corinne Vanarelli",
    description:
      "Von der Erkenntnis in die Handlung: Perspektiven weiten, Entscheidungen treffen, ins Tun kommen.",
    url: "https://www.corinnevanarelli.ch/angebote/ontologisches-coaching",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Ontologisches Coaching.jpg",
        width: 1200,
        height: 630,
        alt: "Ontologisches Coaching"
      }
    ],
    locale: "de_DE",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontologisches Coaching | Corinne Vanarelli",
    description:
      "Klarheit schaffen, Prioritäten setzen, ins Handeln kommen.",
    images: ["https://www.corinnevanarelli.ch/img/Ontologisches Coaching.jpg"]
  }
};


export default function OntologischesCoachingPage() {
  return (
    <>
      <ServiceBanner
        title="Ontologisches Coaching"
        imageSrc="/img/Banner.jpeg"
        imageAlt="Ontologisches Coaching — Banner"
      />

      {/* 1) Imagen derecha / Texto izquierda */}
      <AltSection
        title={<><strong>Ontologisches Coaching – Veränderung beginnt im Sein</strong></>}
        body={
          <>
            <p>Ontologisches Coaching begleitet dich auf einer tieferen Ebene – nicht nur dabei, was du tust, sondern wer du in deinem Kern bist.Im Mittelpunkt steht nicht das schnelle Lösen von Problemen, sondern die ehrliche Frage:</p>
            <p>Wer bin ich – und wie gestalte ich mein Leben aus dieser inneren Wahrheit heraus?</p>
            <p>Statt an der Oberfläche zu arbeiten, schauen wir gemeinsam auf dein Sein:</p>
            <p>Wie du denkst, sprichst, fühlst – und wie du die Welt wahrnimmst. Denn genau hier liegt der Schlüssel für echte, nachhaltige Veränderung.</p>
            <p>Ontologisches Coaching ist kein „Schnellprogramm“. Es ist eine bewusste Reise zu dir selbst – in deinem Tempo, in deiner Tiefe, in deinem eigenen Rhythmus.Es eröffnet dir neue Perspektiven, Klarheit und einen Zugang zu dem, was in dir angelegt ist, aber vielleicht noch im Verborgenen liegt.</p>
            <p><strong>Für Klarheit. Für Verbindung. Für dein authentisches Leben.</strong></p>
          </>
        }
        imageSrc="/img/Coaching.jpg"
        imageAlt="Coaching Raum"
        mediaLeft={false}                      // ← imagen a la derecha
      />

      {/* 2) Imagen izquierda / Texto derecha */}
      <AltSection
        title={<><strong>
          Coaching als Begleitung auf deinem Weg zu dir selbst:</strong></>}
        body={
          <>
            <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
              <li>Klarheit über den eigenen Weg zu gewinnen</li>
              <li>deine Stärken und Werte zu entdecken</li>
              <li>persönliche Blockaden zu lösen und Handlungsstrategien zu entwickeln</li>
              <li>nachhaltige Verändernungen zu bewirken</li>
              <li>innere und äussere Konflikte zu lösen</li>
              <li>deine eigenen Bewältigungsstrategien zu stärken</li>
              <li>dein persönliches Potenzial zu entfalten</li>
            </ul>
          </>
        }
        imageSrc="/img/Ontologisches Coaching.jpg"
        imageAlt="Gemeinsamer Weg"
        mediaLeft={true}                       // ← imagen a la izquierda
        padTop={false}                         // evita doble padding con la sección anterior
      />

      {/* 3) Sección centrada */}
      <CenteredSection
        title={<><strong>
          Coaching mit Klarheit – für echte Veränderung</strong></>}
        body={
          <>
            <p>Mein Coaching basiert auf tiefem Vertrauen – in deine Fähigkeiten, deine innere Weisheit und deinen ganz eigenen Weg. Ich bin überzeugt: Jeder Mensch trägt das Potenzial in sich, sich weiterzuentwickeln und sein Leben bewusst zu gestalten.</p>
            <p>In meiner Arbeit kombiniere ich wirkungsvolle emotionale und mentale Methoden aus verschiedenen Ansätzen – achtsam, individuell und lösungsorientiert. So entsteht Raum für neue Perspektiven, für klares Denken und bewusstes Handeln. Ein Weg, der dich näher zu dir selbst führt.</p>
            <p>Der Coaching-Prozess ist so einzigartig wie du – maßgeschneidert und abgestimmt auf deine Bedürfnisse. Wir schauen gemeinsam auf das, was dich innerlich blockiert, und entwickeln Wege, wie du wieder Klarheit gewinnst und in deine Kraft kommst. Oft braucht es nur einen neuen Blickwinkel, um weiterzusehen.</p>
            <p>Durch gezielte Fragen bringen wir Licht in dein Thema – besonders dort, wo du selbst vielleicht zu nah dran bist, um Antworten klar zu erkennen. Ich begleite dich mit Herz, Klarheit und einem sicheren Raum für echte Veränderung.</p>
            <p>Die einzige Voraussetzung: Die Bereitschaft, Altes loszulassen – und Neues zuzulassen.</p>
          </>
        }
      />

      <StepsTriptych
        title={<><strong>
          Der Coaching-Prozess – Was erwartet dich?</strong></>}
        subtitle={<><strong>Veränderung beginnt mit einem ersten Schritt. Hier erfährst du, wie der Coaching-Prozess bei mir abläuft:</strong></>}
        steps={[
          {
            title: "Kostenloses Erstgespräch",
            body:
              "Im ersten Gespräch lernen wir uns kennen (ca. 20 Minuten). Du erzählst mir, was dich bewegt – und wir klären, wie ich dich bestmöglich unterstützen kann. Dieses Kennenlernen ist unverbindlich und kostenfrei.",
          },
          {
            title: "Individuelle Coaching-Sessions",
            body:
              "In den Sitzungen arbeiten wir gezielt an deinen Themen. Wir entwickeln Lösungen und Strategien, die zu dir passen – und dich Schritt für Schritt in Richtung deiner Ziele bringen.",
          },
          {
            title: "Reflexion & Weiterentwicklung",
            body:
              "Am Ende des Prozesses schauen wir gemeinsam zurück: Was hat sich verändert? Was trägt dich weiter? Und wie kannst du auf deinem Weg in Verbindung mit dir bleiben?",
          },
        ]}
        footer={
          <>
            <p>Dieser Weg kann emotional bewegend sein – aber gerade darin liegt seine Kraft:</p>
            <p className="font-semibold">Am Ende entsteht oft ein tiefes Gefühl von Klarheit, Leichtigkeit und neuer Energie.</p>
          </>
        }
      />

      <FreeConsultCallout
        title="1:1 Kostenloses Gespräch für Klarheit"
        subtitle="Du bist neugierig, aber unsicher? Dann lade ich dich zu einem kostenlosen Kennenlerngespräch ein."
        duration="20 Min."
        price="Free"
        ctaHref={`/book?serviceId=${encodeURIComponent(FREE_CONSULTATION_SERVICE_ID)}`}
        ctaLabel="Buchung anfragen"
      />
      <Testimonials />
      <Footer />
    </>
  );
}
