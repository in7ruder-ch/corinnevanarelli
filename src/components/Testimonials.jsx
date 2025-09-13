import Section from "./Section";

const items = [
  { name: "Livia", text: "Die Session hat mir so viel Ruhe gegeben. Ich habe mich gesehen gefühlt." },
  { name: "Marcel", text: "Sehr feinfühlig und klar. Genau die Begleitung, die ich gebraucht habe." },
  { name: "Elena", text: "Tiefe, Echtheit, Liebe. Ich komme wieder." }
];

export default function Testimonials() {
  return (
    <Section id="stimmen" className="bg-neutral-50">
      <h2 className="text-2xl md:text-3xl font-semibold">Stimmen</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="rounded-2xl border bg-white p-6">
            <p className="text-neutral-800">“{t.text}”</p>
            <p className="mt-4 text-sm text-neutral-600">— {t.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
