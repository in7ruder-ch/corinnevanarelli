import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import CenteredSection from "@/components/CenteredSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65"

export const metadata = {
    title: "Geistige Wirbelsäulenaufrichtung | Corinne Vanarelli",
    description: "Wirbelsäulenaufrichtung –Dein Weg zu mehr Energie, Freiheit und innerem Gleichgewicht",
};

export default function GWAPage() {
    return (
        <>
            <ServiceBanner
                title="Geistige Wirbelsäulenaufrichtung"
                imageSrc="/img/Banner.jpeg"
                imageAlt="Geistige Wirbelsäulenaufrichtung — Banner"
            />

            {/* 1) Imagen derecha / Texto izquierda */}
            <AltSection
                title={<><strong>Geistige Wirbelsäulenaufrichtung – Veränderung beginnt im Sein</strong></>}
                body={
                    <>
                        <p>Die geistige Wirbelsäulenaufrichtung ist eine sanfte, zugleich tief wirksame Methode, die Körper, Geist und Seele wieder in Einklang bringt.</p>
                        <p>Sie basiert auf dem Verständnis, dass unser physischer Körper und unser Energiesystem untrennbar miteinander verbunden sind.</p>
                        <p>Unsere Wirbelsäule ist dabei weit mehr als nur das körperliche Zentrum unseres aufrechten Seins – sie ist ein zentraler Energiekanal, ein innerer Lebensbaum, durch den Kraft, Stabilität und Ausrichtung fließen.</p>
                        <p>Bei der geistigen Aufrichtung wird dein Energiesystem bewusst in Balance gebracht</p>
                        <p>Blockaden dürfen sich lösen, und die Wirbelsäule findet zurück in ihre natürliche Ordnung –
                            mit ihr auch dein gesamtes System.</p>
                    </>
                }
                imageSrc="/img/Geistige.webp"
                imageAlt="Geistige Wirbelsäulenaufrichtung"
                mediaLeft={false}                      // ← imagen a la derecha
            />

            {/* 2) Imagen izquierda / Texto derecha */}
            <AltSection
                title={<><strong>
                    Deine Wirbelsäule als Schlüssel zur inneren Ausrichtung</strong></>}
                body={
                    <>
                        <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
                            <li>unter körperlichen Beschwerden oder chronischen Verspannungen leiden</li>
                            <li>emotionale Blockaden oder alte Muster auflösen möchten</li>
                            <li>sich nach innerer Balance und Leichtigkeit sehnen</li>
                            <li>ihre Energie, Lebenskraft und Lebensfreude wieder spüren wollen</li>
                            <li>eine ganzheitliche Methode suchen, die Körper, Geist und Seele anspricht</li>

                        </ul>
                        <p>Durch innere Aufrichtung wird neue Lebensenergie freigesetzt –sie wirkt nicht nur auf deine Wirbelsäule, sondern auf jede einzelne Zelle deines Körpers.</p>
                    </>
                }
                imageSrc="/img/GWA.webp"
                imageAlt="Wirbelsäulenaufrichtung"
                mediaLeft={true}                       // ← imagen a la izquierda
                padTop={false}                         // evita doble padding con la sección anterior
            />

            <StepsTriptych
                title={<><strong>
                   Ablauf einer Sitzung – Geistige Wirbelsäulenaufrichtung</strong></>}
                subtitle={<><strong>Jede Sitzung findet in einem geschützten, achtsamen Raum statt – mit dem Fokus auf dein körperliches, seelisches und energetisches Gleichgewicht.</strong></>}
                steps={[
                    {
                        title: "Ankommen & Vorgespräch",
                        body:
                            "Zu Beginn nimmst du dir Zeit, bei dir selbst anzukommen.In einem kurzen Gespräch klären wir, was dich aktuell beschäftigt und ob es bestimmte Themen oder Beschwerden gibt, die in die Sitzung mit einfliessen dürfen.",
                    },
                    {
                        title: "Einstimmung & energetische Aufrichtung",
                        body:
                            "Du liegst oder sitzt entspannt, während ich mich mit deinem Energiesystem verbinde.Intuitiv und ohne Berührung arbeite ich entlang deiner Wirbelsäule und lenke die Energie dorthin, wo Blockaden spürbar sind. Dein System reagiert auf sanfte Weise – die Aufrichtung geschieht über das Bewusstsein, nicht über physische Manipulation.",
                    },
                    {
                        title: "Nach der Sitzung",
                        body:
                            "Im Anschluss an die Session nehmen wir uns Zeit für einen bewussten Ausklang.Du darfst nachfühlen, was sich bewegt hat – und wir besprechen, wie du das Erlebte in deinem Alltag behutsam integrieren kannst.Oft begleitet dich die Energie noch eine Weile – sanft, aber nachhaltig.",
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
