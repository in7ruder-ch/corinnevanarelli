import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import CenteredSection from "@/components/CenteredSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
  title: "doTERRA AromaTouch | Corinne Vanarelli",
  description:
    "AromaTouch-Technik: achtsame Anwendung mit ätherischen Ölen zur Entspannung, Regeneration und Balance des Nervensystems.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/angebote/doterra-aromatouch" },
  openGraph: {
    title: "doTERRA AromaTouch | Corinne Vanarelli",
    description:
      "Wohltuende Auszeit für Körper, Geist und Sinne – sanft, tief, ausgleichend.",
    url: "https://www.corinnevanarelli.ch/angebote/doterra-aromatouch",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Doterra Aromatouch Technik.jpg",
        width: 1200,
        height: 630,
        alt: "doTERRA AromaTouch"
      }
    ],
    locale: "de_DE",
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "doTERRA AromaTouch | Corinne Vanarelli",
    description:
      "Entspannen, regenerieren, ins Gleichgewicht kommen.",
    images: ["https://www.corinnevanarelli.ch/img/Doterra Aromatouch Technik.jpg"]
  }
};


export default function DoterraAromaTouchPage() {
    return (
        <>
            <ServiceBanner
                title="doTERRA AromaTouch"
                imageSrc="/img/Banner.jpeg"
                imageAlt="doTERRA AromaTouch — Banner"
            />

            {/* 1) Imagen derecha / Texto izquierda */}
            <AltSection
                title={<><strong>AromaTouch-Technik – eine achtsame Anwendung für Körper und Sinne</strong></>}
                body={
                    <>
                        <p>Die doTERRA AromaTouch™-Technik wirkt ganzheitlich – auf körperlicher, emotionaler und energetischer Ebene. Durch die Kombination aus hochwertigen ätherischen Ölen und achtsamer Berührung wird dein gesamtes System in einen Zustand tiefer Regeneration versetzt.</p>
                        <p>Sie wurde entwickelt, um Körper, Geist und Seele auf natürliche Weise zu entspannen, zu regenerieren und in Balance zu bringen.</p>
                        <p>Bei der Anwendung werden acht speziell ausgewählte ätherische Öle von doTERRA sanft entlang der Wirbelsäule und auf den Fussreflexzonen aufgetragen.​  Mit gezielten Berührungen werden die Öle in das System eingearbeitet – um Stress abzubauen, das Immunsystem zu stärken und das emotionale Gleichgewicht zu fördern.</p>
                        <p><strong>Eine wohltuende Auszeit für dein Nervensystem – tief entspannend, stärkend und harmonisierend.</strong></p>
                    </>
                }
                imageSrc="/img/DoTerra Aromatouch.webp"
                imageAlt="AromaTouch-Technik"
                mediaLeft={false}                      // ← imagen a la derecha
            />

            {/* 2) Imagen izquierda / Texto derecha */}
            <AltSection
                title={<><strong>
                    Zurück in deine Balance – mit der Kraft ätherischer Öle</strong></>}
                body={
                    <>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>Ausgleich des vegetativen Nervensystems</li>
                            <li>Stärkung des Immunsystems</li>
                            <li>Vorbeugung bzw. Minderung von Entzündungsreaktionen im Körper</li>
                            <li>Regeneration durch geistige und körperliche Tiefenentspannung</li>
                            <li>Bringt Körper, Geist und Seele wieder in Balance</li>

                        </ul>
                        <p><strong>Viele empfinden die Behandlung als zutiefst entspannend, klärend und zugleich energetisierend.</strong></p>
                    </>
                }
                imageSrc="/img/DoTerra Öl.webp"
                imageAlt="Gemeinsamer Weg"
                mediaLeft={true}
                padTop={false}
            />

            {/* 3) Sección centrada */}
            <CenteredSection
                title={<><strong>
                    Ablauf der AromaTouch Technik</strong></>}
                body={
                    <>
                        <p>Die Anwendung findet in einer ruhigen, geschützten Atmosphäre statt. Du bleibst dabei bekleidet; lediglich Rücken und Füsse werden sanft freigelegt. In einer festen Abfolge werden acht ausgewählte doTERRA-Öle sanft entlang der Wirbelsäule sowie auf den Fussreflexzonen aufgetragen. Verwendet werden unter anderem Öle wie:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>Balance – für Erdung und innere Stabilität</li>
                            <li>Lavendel – beruhigend und entspannend</li>
                            <li>Melaleuca (Teebaum) – reinigend und stärkend</li>
                            <li>On Guard – unterstützend für dein Immunsystem</li>
                            <li>Aromatouch – entspannend für Muskeln und Geist</li>
                            <li>Deep Blue – lindernd bei Verspannungen</li>
                            <li>Wild Orange – belebend und stimmungsaufhellend</li>
                            <li>Peppermint – klärend und erfrischend</li>

                        </ul>
                        <p><strong>Die einzige Voraussetzung: Die Bereitschaft, Altes loszulassen – und Neues zuzulassen.</strong></p>
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
