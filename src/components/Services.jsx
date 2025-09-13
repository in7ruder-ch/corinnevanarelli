import Section from "./Section";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Coaching 60’ (online)",
    duration: "60 Minuten",
    price: "CHF 120",
    bullets: ["Klarheit & Ausrichtung", "Sanfte, kraftvolle Begleitung"]
  },
  {
    title: "Akasha Lesung 90’",
    duration: "90 Minuten",
    price: "CHF 180",
    bullets: ["Seelenperspektive", "Fragen & Antworten"]
  },
  {
    title: "Herz-Heilung 60’",
    duration: "60 Minuten",
    price: "CHF 140",
    bullets: ["Emotionale Entlastung", "Integration & Erdung"]
  }
];

export default function Services() {
  return (
    <Section id="angebote">
      <h2 className="text-2xl md:text-3xl font-semibold">Angebote</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => <ServiceCard key={i} {...s} />)}
      </div>
    </Section>
  );
}
