import Hero from "@/components/Hero";
import AltSection from "@/components/AltSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Akasha Chronik Lesung, Herzheilung & Coaching | Corinne Vanarelli",
  description:
    "Zurück zu dir: Herzheilung, ontologisches Coaching und Akasha-Chronik Lesungen – einfühlsam, klar und auf Augenhöhe in Zürich & online.",
  alternates: { canonical: "https://www.corinnevanarelli.ch/" },
  openGraph: {
    title: "Akasha Chronik Lesung, Herzheilung & Coaching | Corinne Vanarelli",
    description:
      "Begleitung mit Tiefgang: Herzheilung, Coaching und Akasha-Chronik für Klarheit, Balance und echte Veränderung.",
    url: "https://www.corinnevanarelli.ch/",
    siteName: "Corinne Vanarelli",
    images: [
      {
        url: "https://www.corinnevanarelli.ch/img/Banner-Home-Mobile.webp",
        width: 1200,
        height: 630,
        alt: "Corinne Vanarelli – Soulcoaching"
      }
    ],
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akasha Chronik Lesung, Herzheilung & Coaching | Corinne Vanarelli",
    description:
      "Herzheilung, Coaching & Akasha-Chronik in Zürich & online.",
    images: ["https://www.corinnevanarelli.ch/img/Banner-Home-Mobile.webp"]
  }
};


export default function HomePage() {
  return (
    <>
      <Hero />
      <AltSection
        title={<><strong>Willkommen auf deiner Reise <em>zurück zu dir</em></strong></>}
        kicker="Ich begleite dich auf deinem Weg zu innerer Klarheit und Selbstermächtigung"
        body={
          <>
            <p>Vielleicht spürst du schon lange diese leise Sehnsucht in dir. Die Sehnsucht nach Klarheit. Nach Ankommen. Nach dir selbst.</p>
            <p>Ich begleite dich auf deiner inneren Reise – mit ontologischem Coaching und Energiearbeit. Gemeinsam lösen wir Blockaden, klären alte Muster und schaffen Raum für Veränderung, Heilung und neue Möglichkeiten. Für mehr Klarheit, innere Stärke und ein Leben im Einklang mit deiner Essenz.</p>
            <p>In meiner Arbeit geht es nicht um höher, schneller, weiter – sondern um Tiefe, Echtheit und Bewusstsein. In deinem Tempo, auf deine Weise.</p>
            <p>Ich unterstütze dich dabei, inneren Ballast loszulassen, Vertrauen in dich selbst zurückzugewinnen und deine eigene Wahrheit zu leben.</p>
            <p>Du bist willkommen. Genau so, wie du bist. Und vielleicht beginnt genau hier deine Reise <em>zurück zu dir</em>.</p>
          </>
        }
        imageSrc="/img/Ontologisches Coach.webp"
        imageAlt="Corinne Vanarelli"
        mediaLeft={true}
        showCta={false}
        padBottom={false}      
      />

      <AltSection
        title={<><strong>Ontologisches Coaching – zurück zu deinem wahren Sein</strong></>}
        body={
          <>
            <p>Ontologisches Coaching geht tiefer als klassisches Coaching:</p>
            <p>Es stellt nicht nur die Frage: „Was will ich tun?“, sondern „Wer bin ich – und wie will ich leben?“</p>
            <p>Im Mittelpunkt steht dein Sein: deine innere Haltung, deine Sprache, dein Denken und Fühlen.</p>
            <p>Denn echte Veränderung entsteht nicht durch mehr Tun – sondern durch Bewusstheit.</p>
            <p><strong>Veränderung beginnt nicht im Aussen – sondern in dir</strong>.</p>
          </>
        }
        imageSrc="/img/Ontologisches Coaching.jpg"
        imageAlt="Praxisraum"
        mediaLeft={false}
        ctaHref="/angebote/ontologisches-coaching"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"  
        padTop={true}     
      />

      <AltSection
        title={<><strong>Akasha Reading – Botschaften deiner Seele</strong></>}
        body={
          <>
            <p>Manchmal stehen wir im Leben an einem Wendepunkt – und spüren: Es braucht Klarheit. Eine Akasha-Lesung öffnet dir den Raum, tiefer zu verstehen, wer du bist und was deine Seele wirklich will.​</p>
            <p>Du erhältst Einblicke in die Ursprünge deiner Ängste, Muster und Blockaden – und erkennst, warum bestimmte Erfahrungen in deinem Leben geschehen.</p>
            <p>So wird sichtbar, was dich wirklich bewegt – und was dich jetzt in deine Kraft bringen kann.​</p>
            <p><strong>Die Seelenlesung schenkt dir Orientierung, Bewusstsein und Vertrauen. Für deinen Weg. Für deine Entscheidung. Für dich.</strong></p>
          </>
        }
        imageSrc="/img/Akasha Lesung.jpg" 
        imageAlt="Corinne Vanarelli"
        mediaLeft={true}
        ctaHref="/angebote/akasha-chronik-lesung"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"
        padTop={false}       
      />

      <AltSection
        title={<><strong>Hopi Herzheilung – Dein Herz kennt den Weg</strong></>}
        body={
          <>
            <p>Die Hopi Herzheilung ist eine kraftvolle und zugleich sehr sanfte Form der Energiearbeit, die aus der Weisheit der Hopi-Indianer stammt.  Alte Erfahrungen, Enttäuschungen oder tiefe seelische Wunden können uns daran hindern, in Verbindung mit uns selbst zu sein.​</p>
            <p>Du kommst wieder in Kontakt mit deinem inneren Frieden, deiner Selbstliebe und deiner Herzenskraft. Diese tiefe Verbindung ermöglicht dir einen Neuanfang – in dir selbst, mit dir selbst.</p>
            <p><strong>Diese Herzarbeit öffnet Räume: für Heilung, für Verbindung, für Vertrauen – und für deinen ganz eigenen Weg.</strong>.</p>
          </>
        }
        imageSrc="/img/Hopi.jpeg"
        imageAlt="Praxisraum"
        mediaLeft={false}
        ctaHref="/angebote/hopi-herzheilung"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"  
        padTop={false}     
      />

      <AltSection
        title={<><strong>Chakra Clearing – bring deine Energie ins Gleichgewicht</strong></>}
        body={
          <>
            <p>Deine sieben Chakren sind die Energiezentren deines Körpers – sie beeinflussen, wie du fühlst, denkst und dich erlebst. Stress, alte Emotionen oder innere Unruhe können diese Zentren blockieren.</p>
            <p>Beim Chakra Cleaning werden deine Chakren sanft gereinigt, aktiviert und wieder ins Gleichgewicht gebracht. So kann deine Energie wieder frei fliessen – für mehr Klarheit, Leichtigkeit und innere Harmonie.</p>
            <p><strong>Spüre, wie es sich anfühlt, wieder ganz bei dir zu sein.</strong></p>
          </>
        }
        imageSrc="/img/Chakra clearing Dudingen.webp" 
        imageAlt="Corinne Vanarelli"
        mediaLeft={true}
        ctaHref="/angebote/chakra-clearing"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"
        padTop={false}        
      />

      <AltSection
        title={<><strong>Geistige Wirbelsäulenaufrichtung – zurück in deine Mitte, zurück in deine Kraft</strong></>}
        body={
          <>
            <p>Finde zurück in deine natürliche Ausrichtung – für Balance in Körper, Geist und Seele. Die geistige Wirbelsäulenaufrichtung unterstützt dich dabei, in deine volle Kraft zu kommen – körperlich, emotional und energetisch.</p>
            <p>Deine Wirbelsäule ist das Zentrum deines Seins – sie trägt dich, richtet dich aus und lässt deine Lebensenergie fliessen. Wenn dieser Energiefluss blockiert ist, können Beschwerden auf körperlicher und seelischer Ebene entstehen.</p>
            <p><strong>Diese Methode bringt deine Energie wieder in Fluss – sanft, ganzheitlich und tief wirksam. Erlebe Aufrichtung, Klarheit und innere Heilung.</strong>.</p>
          </>
        }
        imageSrc="/img/Geistige.webp"
        imageAlt="Praxisraum"
        mediaLeft={false}
        ctaHref="/angebote/gwa"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"  
        padTop={false}     
      />

      <AltSection
        title={<><strong>doTERRA AromaTouch® – Tiefenentspannung mit ätherischen Ölen</strong></>}
        body={
          <>
            <p>Sanfte Berührung trifft auf die Kraft reiner Pflanzenessenzen. Die doTERRA AromaTouch® kombiniert achtsame Berührungen mit 100 % reinen ätherischen Ölen von doTERRA.</p>
            <p>Dabei werden gezielt Körperzonen stimuliert, um Stress abzubauen, das Immunsystem zu stärken und das innere Gleichgewicht wiederherzustellen. Diese Methode wirkt nicht nur körperlich, sondern auch emotional – und bringt dich spürbar in eine tiefe Entspannung.</p>
            <p><strong>Ein wohltuendes Erlebnis für Körper, Geist und Seele. Loslassen. Auftanken. Ankommen – bei dir selbst.</strong></p>
          </>
        }
        imageSrc="/img/DoTerra Aromatouch.webp" 
        imageAlt="Corinne Vanarelli"
        mediaLeft={true}
        ctaHref="/angebote/doterra-aromatouch"
        ctaLabel="Mehr erfahren"
        ctaVariant="link"
        padTop={false}        
      />

      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
