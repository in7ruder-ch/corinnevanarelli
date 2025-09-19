import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
    title: "Chakra Clearing | Corinne Vanarelli",
    description: "Chakra Clearing – Klarheit, Balance & neue Lebenskraft",
};

export default function ChakraClearingPage() {
    return (
        <>
            <ServiceBanner
                title="Chakra Clearing"
                imageSrc="/img/Banner.jpeg"
                imageAlt="Chakra Clearing — Banner"
            />

            {/* 1) Imagen derecha / Texto izquierda */}
            <AltSection
                title={<><strong>Chakra Clearing – Klarheit, Balance & neue Lebenskraft</strong></>}
                body={
                    <>
                        <p>Unsere sieben Hauptchakren sind feinstoffliche Energiezentren entlang der Wirbelsäule. Sie beeinflussen unser körperliches, emotionales und geistiges Wohlbefinden.</p>
                        <p>Wenn diese Chakren aus dem Gleichgewicht geraten – durch Stress, emotionale Belastungen oder äussere Einflüsse – kann das zu Unruhe, Erschöpfung oder einem Gefühl von innerer Leere führen.</p>
                        <p>Ein Chakra Clearing kann dich auf allen Ebenen stärken – energetisch, emotional und seelisch. Du wirst wieder mehr bei dir ankommen und spüren, was wirklich in dir lebendig ist.</p>
                        <p><strong>Deine Energie ist der Schlüssel. Chakra Clearing hilft dir, sie wieder frei fliessen zu lassen.</strong></p>
                    </>
                }
                imageSrc="/img/Chakra clearing Dudingen.webp"
                imageAlt="Chakra Clearing"
                mediaLeft={false}                      // ← imagen a la derecha
            />

            {/* 2) Imagen izquierda / Texto derecha */}
            <AltSection
                title={<><strong>
                    Chakra Clearing bringt deine Energie sanft zurück in den Fluss</strong></>}
                body={
                    <>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>mehr innere Ruhe & Ausgeglichenheit zu finden</li>
                            <li>ein klares, kraftvolles Energiegefühl zu erleben</li>
                            <li>deine Intuition & Selbstwahrnehmung zu stärken</li>
                            <li>emotionale Belastungen loszulassen</li>
                            <li>mehr Leichtigkeit in deinen Alltag zu bringen</li>
                            <li>dein Körper- und Seelenbewusstsein zu vertiefen</li>


                        </ul>
                    </>
                }
                imageSrc="/img/Chakra Clearing Sitzung.webp"
                imageAlt="Chakra Clearing in Dudingen"
                mediaLeft={true}
                padTop={false}
            />

            <StepsTriptych
                title={<><strong>Ablauf Chakra Clearing</strong></>}
                steps={[
                    {
                        title: "Vorbereitung",
                        body:
                            "Bevor wir beginnen, nimmst du dir Zeit, bei dir anzukommen. In einem kurzen Gespräch schauen wir gemeinsam, was dich gerade bewegt und welches Thema in den Raum darf. Du darfst dich innerlich öffnen für das, was gesehen, gefühlt und gelöst werden möchte – in deinem Tempo, auf deine Weise.Alles ist willkommen. Nichts muss.",
                    },
                    {
                        title: "Während der Sitzung",
                        body: (
                            <>
                                <p>In einem ruhigen, geschützten Raum darfst du zur Ruhe kommen – im Sitzen oder Liegen, ganz so, wie es sich für dich stimmig anfühlt.
                                    Ich arbeite achtsam entlang deiner sieben Hauptchakren und unterstütze den Energiefluss durch intuitive Wahrnehmung und sanfte energetische Impulse. Dabei können:</p>
                                <ul>
                                    <li>energetische Blockaden erkannt und gelöst werden</li>
                                    <li>deine Chakren in Balance kommen</li>
                                    <li>emotionale, mentale und körperliche Spannungen sanft entlastet werden.</li>

                                </ul>
                                <p className="mt-3">Diese Anwendung schenkt dir neue Klarheit, innere Weite und ein spürbares Gefühl von Verbundenheit mit dir selbst. Du kannst Wärme, Kribbeln, innere Bilder oder tiefe Ruhe spüren – jeder Mensch erlebt die Sitzung anders.</p>
                            </>
                        ),
                    },
                    {
                        title: "Nach der Sitzung",
                        body:
                            "Viele Menschen berichten danach von mehr Leichtigkeit, innerer Klarheit und einem tiefen Gefühl der Verbundenheit mit sich selbst. Nach dem Chakra Clearing wirkt die Energie noch weiter – sanft und in deinem eigenen Tempo. Energiearbeit setzt oft tiefere Prozesse in Gang, die sich auch in den folgenden Tagen zeigen können.",
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
