import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AltSection from "@/components/AltSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AltSection
          title="Sanft & kraftvoll"
          body="Hier geht es um Wahrhaftigkeit und Liebe. Ich begleite dich, ohne dich zu drängen."
          imageSrc="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Licht und Ruhe"
          mediaLeft={true}
          ctaHref="#angebote"
          ctaLabel="Zu den Angeboten"
        />
        <AltSection
          title="Sich erinnern"
          body="Heilung ist ein Erinnern. Du trägst alles bereits in dir. Wir schaffen Raum dafür."
          imageSrc="https://images.unsplash.com/photo-1523419409543-8a8c9c19d9f1?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Wasser und Stille"
          mediaLeft={false}
          ctaHref="#kontakt"
          ctaLabel="Kontakt aufnehmen"
        />
        <Services />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
