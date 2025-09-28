import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
  title: "Hopi Herzheilung | Corinne Vanarelli",
  description:
    "Sanfte Herzheilung für innere Ruhe, Verbundenheit und emotionale Klarheit – in Zürich & online.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/angebote/hopi-herzheilung" },
  openGraph: {
    title: "Hopi Herzheilung | Corinne Vanarelli",
    description:
      "Das Herz öffnen, das Nervensystem beruhigen, wieder bei dir ankommen.",
    url: "https://www.corinnevanarelli.ch/angebote/hopi-herzheilung",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Hopi Herzheilung 2.webp",
        width: 1200,
        height: 630,
        alt: "Hopi Herzheilung"
      }
    ],
    locale: "de_DE",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Hopi Herzheilung | Corinne Vanarelli",
    description:
      "Mehr Ruhe, Liebe und Klarheit – aus dem Herzen heraus.",
    images: ["https://www.corinnevanarelli.ch/img/Hopi Herzheilung 2.webp"]
  }
};


export default function HopiHerzHeilungPage() {
    return (
        <>
            <ServiceBanner
                title="Hopi Herzheilung"
                imageSrc="/img/Banner.jpeg"
                imageAlt="Hopi Herzheilung — Banner"
            />

            {/* 1) Imagen derecha / Texto izquierda */}
            <AltSection
                title={<><strong>Hopi Herzheilung - dein Herz kennt dein Weg</strong></>}
                body={
                    <>
                        <p>Die Hopi-Herzheilung ist eine sanfte, zugleich tief wirkende Methode aus dem alten Wissen der Hopi-Indianer. Sie berührt dein Herz – und damit die Ebene deiner Seele und deines feinstofflichen Körpers. Dort, wo sich oft die tiefsten Wunden, aber auch die größte innere Kraft befinden, setzt die Herzheilung an.</p>
                        <p>Schritt für Schritt darfst du dein Herz wieder öffnen – frei von alten Verletzungen, Ängsten oder Blockaden, die dich unbewusst davon abhalten, Liebe, Fülle und echte Verbindung in dein Leben zu lassen.</p>
                        <p>Diese energetische Arbeit unterstützt dich dabei, emotionale Belastungen zu lösen – nicht nur deine eigenen, sondern auch übernommene Muster aus deiner Ahnenlinie.</p>
                        <p><strong>So entsteht Raum für Klarheit, Leichtigkeit und echte Herzensverbindung – zu dir selbst und zu anderen.</strong></p>
                    </>
                }
                imageSrc="/img/Hopi.jpeg"
                imageAlt="Hopi Herzheilung"
                mediaLeft={false}                      // ← imagen a la derecha
            />

            {/* 2) Imagen izquierda / Texto derecha */}
            <AltSection
                title={<><strong>
                    Wenn dein Herz nach Heilung ruft</strong></>}
                body={
                    <>
                        <p>Diese Heilarbeit ist für alle, die sich auf Herzensebene berühren und unterstützen lassen möchten – besonders in Zeiten der Veränderung, innerer Unruhe oder emotionaler Belastung. Sie eignet sich besonders für Menschen, die:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>sich innerlich blockiert oder emotional erschöpft fühlen</li>
                            <li>alte Verletzungen, Trauer oder Ängste in Liebe loslassen möchten</li>
                            <li>wieder in Verbindung mit ihrer Herzenergie kommen wollen</li>
                            <li>Frieden mit sich selbst und ihrer Vergangenheit schließen möchten</li>
                            <li>sich nach emotionaler Heilung und innerem Frieden sehnen</li>
                            <li>Bindungsthemen, Beziehungsschmerzen oder alte Verletzungen klären möchten</li>
                            <li>sich eine tiefere Verbindung zu sich selbst und zu anderen wünschen</li>
                            <li>unter Burnout, Depression, Trauer oder unerklärlichen Beschwerden leiden</li>
                            <li>sich in einer Phase des Wandels, der Krise oder Neuorientierung befinden</li>
                            <li>als Kind (oder für ihr Kind) emotionale Sicherheit stärken möchten – z. B. nach Trennung der Eltern</li>

                        </ul>
                    </>
                }
                imageSrc="/img/Hopi Herzheilung 2.webp"
                imageAlt="Heart Healing"
                mediaLeft={true}                       // ← imagen a la izquierda
                padTop={false}                         // evita doble padding con la sección anterior
            />

            <StepsTriptych
                title={<><strong>
                    Ablauf einer Hopi-Herzheilung</strong></>}
                steps={[
                    {
                        title: "Ankommen & Einstimmen",
                        body:
                            "Zu Beginn nimmst du dir Zeit, in deinem eigenen Tempo zur Ruhe zu kommen und bei dir selbst anzukommen. In einem kurzen Vorgespräch schauen wir gemeinsam auf das, was dich im Moment bewegt – emotional, seelisch oder körperlich. So entsteht ein achtsamer Raum, in dem alles da sein darf.",
                    },
                    {
                        title: "Herzarbeit & energetische Begleitung",
                        body:
                            "Du darfst dich entspannt hinlegen oder sitzen – und einfach empfangen. Ich verbinde mich mit der Quelle der Hopi-Energie und arbeite intuitiv über dein Herzzentrum. Die Energie fliesst genau dorthin, wo sie gebraucht wird – liebevoll, klar und oft tief berührend. Alte Verletzungen, Blockaden oder übernommene Muster können sich sanft lösen.",
                    },
                    {
                        title: "Nach der Sitzung",
                        body:
                            "Im Anschluss an die Sitzung hast du Raum, in Ruhe nachzuspüren – ganz bei dir, ohne Eile. In einem achtsamen Austausch reflektieren wir, was sich gezeigt hat. Du erhältst Impulse, wie du das Erlebte in deinen Alltag einfließen lassen und die Wirkung der Herzheilung weitertragen kannst. Die Energie wirkt oft noch Tage danach – leise, aber tief. Viele Menschen spüren danach mehr inneren Frieden, eine weite, offene Herzensverbindung und ein liebevolleres Gefühl sich selbst gegenüber.",
                    },
                ]}
                footer={
                    <>
                        <p><strong>Gib dir selbst Zeit.</strong> Trinke ausreichend Wasser, gönne dir Ruhe und höre auf deinen Körper.</p> 
                        <p> Heilung geschieht nicht unter Druck – sie entfaltet sich, wenn du ihr Raum gibst</p>
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
