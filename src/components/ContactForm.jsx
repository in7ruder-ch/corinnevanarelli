import Section from "./Section";

export default function ContactForm() {
  return (
    <Section id="kontakt">
      <h2 className="text-2xl md:text-3xl font-semibold">Kontakt</h2>
      <form className="mt-6 grid md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Name" className="border rounded-lg px-4 py-3" />
        <input type="email" name="email" placeholder="E-Mail" className="border rounded-lg px-4 py-3" />
        <textarea name="message" placeholder="Nachricht" rows={5} className="md:col-span-2 border rounded-lg px-4 py-3" />
        <button type="button" className="md:col-span-2 px-5 py-3 rounded-lg bg-black text-white w-fit">
          Senden
        </button>
      </form>
    </Section>
  );
}
