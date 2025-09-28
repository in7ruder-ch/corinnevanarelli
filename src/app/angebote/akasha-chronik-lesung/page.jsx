import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CenteredTopics from "@/components/CenteredTopics";
import StepsDyad from "@/components/StepsDyad";

const AKASHA_SERVICE_ID = "946a36c7-29c0-4ff8-a892-da6143c2d15f";
const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
  title: "Akasha Chronik Lesung | Corinne Vanarelli",
  description:
    "Klarheit zu Blockaden, Mustern und nächsten Schritten: einfühlsame Akasha-Chronik Lesungen in Zürich & online.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/angebote/akasha-chronik-lesung" },
  openGraph: {
    title: "Akasha Chronik Lesung | Corinne Vanarelli",
    description:
      "Antworten mit Tiefgang: Akasha-Chronik Lesung für Orientierung, Heilung und innere Ausrichtung.",
    url: "https://www.corinnevanarelli.ch/angebote/akasha-chronik-lesung",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Akasha Chronik Lesung.jpg",
        width: 1200,
        height: 630,
        alt: "Akasha Chronik Lesung"
      }
    ],
    locale: "de_DE",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akasha Chronik Lesung | Corinne Vanarelli",
    description:
      "Erkenne Zusammenhänge, löse Blockaden, finde deinen Weg.",
    images: ["https://www.corinnevanarelli.ch/img/Akasha Chronik Lesung.jpg"]
  }
};


export default function AkashaChronikLesungPage() {
    return (
        <>
            <ServiceBanner
                title="Akasha Chronik Lesung"
                imageSrc="/img/Banner.jpeg"
                imageAlt="Akasha Chronik Lesung — Banner"
            />

            {/* 1) Imagen derecha / Texto izquierda */}
            <AltSection
                title={<><strong>Akasha Chronik - Klarheit über deinen Weg und deine Blockaden</strong></>}
                body={
                    <>
                        <p>Die Akasha-Chronik ist ein feinstoffliches, energetisches Feld – oft auch als das „universelle Gedächtnis“ bezeichnet. Darin ist alles gespeichert, was eine Seele jemals erlebt, gefühlt und gelernt hat – über Raum und Zeit hinweg.​​​ In vielen spirituellen Traditionen gilt die Akasha-Chronik als Quelle tiefer Weisheit, Klarheit und Heilung. Wenn wir uns mit ihr verbinden, erhalten wir Zugang zu höherem Wissen – jenseits des Verstandes.</p>
                        <p>Die Botschaften aus der Akasha sind immer liebevoll, präzise und unterstützend. Sie helfen uns, Muster zu verstehen, Blockaden zu lösen und wieder in Kontakt mit unserer inneren Wahrheit zu kommen.</p>
                        <p><strong>Die Akasha-Chronik erinnert dich daran, wer du wirklich bist – auf Seelenebene.</strong></p>
                    </>
                }
                imageSrc="/img/Akasha Lesung.jpg"
                imageAlt="Akasha Lesung"
                mediaLeft={false}                      // ← imagen a la derecha
            />

            {/* 2) Imagen izquierda / Texto derecha */}
            <AltSection
                title={<><strong>
                    Erkenntnisse, die dich erinnern – und weiterführen</strong></>}
                body={
                    <>
                        <p>Eine Akasha-Lesung kann dir tiefe Einsichten und neue Perspektiven schenken – genau dort, wo du gerade im Leben stehst. Sie öffnet dir einen Raum, in dem du dich selbst auf Seelenebene erkennen und verstehen darfst. Du kannst:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>ein tieferes Verständnis für dein aktuelles Lebensgefühl gewinnen</li>
                            <li>deine Lebensaufgabe und seelischen Weg klarer erkennen</li>
                            <li>wiederkehrende Muster verstehen und auflösen</li>
                            <li>Verstrickungen, Blockaden oder Ängste sanft transformieren</li>
                            <li>neue Sichtweisen auf innere und äußere Herausforderungen entwickeln</li>
                            <li>mehr innere Klarheit und energetische Ausrichtung finden</li>
                            <li>die Verbindung zu deiner Seele stärken und ihr wieder vertrauen</li>
                        </ul>
                        <p>Für Menschen, die spüren: Es gibt mehr – und ich bin bereit, es zu erkennen.</p>
                    </>
                }
                imageSrc="/img/Akasha Chronik Lesung.jpg"
                imageAlt="Akasha Chronik Lesung"
                mediaLeft={true}                       // ← imagen a la izquierda
                padTop={false}                         // evita doble padding con la sección anterior
            />

            <CenteredTopics
                title={<><strong>Mögliche Themen einer Akasha-Lesung</strong></>}
                subtitle={<><strong>Hier findest du einige Themen, die in einer Lesung angesprochen werden können:</strong></>}
                columns={[
                    {
                        title: "Liebe & Partnerschaft",
                        items: [
                            "Karmische Verstrickungen erkennen und lösen",
                            "Ursachen und Muster in Beziehungskonflikten verstehen",
                            "Fremdeinflüsse klären",
                            "Gemeinsame Seelenziele erkennen",
                            "Vertrauen und Respekt in der Partnerschaft stärken",
                            "Seelenpartner erkennen",
                        ],
                    },
                    {
                        title: "Beruf & Berufung",
                        items: [
                            "Die eigene Berufung finden",
                            "Ziele klarer sehen und erreichen",
                            "Karmische Muster im Arbeitsumfeld erkennen",
                            "Blockierende Einflüsse aus dem Umfeld aufdecken",
                            "Entscheidungen mit innerer Klarheit treffen",
                        ],
                    },
                    {
                        title: "Familie & Ahnen",
                        items: [
                            "Ahnenthemen und generationsübergreifende Muster erkennen",
                            "Verstrickungen mit Eltern oder Kindern lösen",
                            "Lernaufgaben innerhalb der Familie verstehen",
                            "Fremdeinflüsse erkennen und abgrenzen",
                        ],
                    },
                    {
                        title: "Gesundheit & Körperbewusstsein",
                        items: [
                            "Sensibilisierung für die Botschaften des Körpers",
                            "Emotionale und energetische Ursachen",
                            "Körperlicher Beschwerden erkennen",
                            "Fremdeinflüsse energetisch lösen",
                        ],
                    },
                    {
                        title: "Finanzen & Fülle",
                        items: [
                            "Karmische Themen in Bezug auf Geld und Erfolg verstehen",
                            "Ursachen für finanzielle Blockaden erkennen",
                            "Energetische Fülle bewusst aktivieren",
                        ],
                    },
                    {
                        title: "Spiritualität & Seelenverbindung",
                        items: [
                            "Spirituelle Fähigkeiten und Potenziale erkennen",
                            "Verbindung zu geistigen Begleitern vertiefen",
                            "Mediale Wahrnehmung stärken",
                        ],
                    },
                ]}
            />
            <StepsDyad
                title={<><strong>Ablauf einer Akasha-Chronik Lesung</strong></>}
                subtitle={<><strong>Jede Lesung ist einzigartig – so wie du. Hier erfährst du, wie ich arbeite und was dich erwartet:</strong></>}
                steps={[
                    {
                        title: "Vorbereitung auf die Lesung",
                        body:
                            "Vor jeder Lesung stimme ich mich durch eine meditative Verbindung auf deine Seele und deine energetische Ebene ein. Ich verbinde mich mit deiner Seelenenergie sowie deinen geistigen Begleitern – immer im Einklang mit deinem höchsten Wohl.",
                    },
                    {
                        title: "Empfang der Botschaften",
                        body:
                            "Während der Lesung empfange ich intuitive, mediale Botschaften aus deiner Akasha-Chronik. Diese zeigen dir tiefergehende Zusammenhänge deines Lebenswegs und geben dir Antworten, die dir helfen, klarer zu sehen und deinem Weg mit mehr Vertrauen zu folgen.",
                    },
                ]}
                footer={
          <>
            <p>Deine Seele bringt in der Lesung genau die Themen ins Licht, die jetzt wichtig sind. Ich bin dabei die Übermittlerin – klar, achtsam und zugewandt. So entsteht ein Raum für Erkenntnis, Heilung und tiefe Verbindung mit dir selbst.</p>
        
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
