'use client';

export default function ContactForm() {
  return (
    <section id="kontakt" className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[2rem] md:text-[2.75rem] leading-tight font-bold text-neutral-900 text-center">
          Kontakt
        </h2>

        <form
          className="mt-6 grid md:grid-cols-2 gap-4"
          autoComplete="off"
          noValidate
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border rounded-lg px-4 py-3"
            suppressHydrationWarning
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            className="border rounded-lg px-4 py-3"
            suppressHydrationWarning
          />
          <textarea
            name="message"
            placeholder="Nachricht"
            rows={5}
            className="md:col-span-2 border rounded-lg px-4 py-3"
            suppressHydrationWarning
          />

          <button
            type="button"
            className="md:col-span-2 px-5 py-3 rounded-lg bg-black text-white w-fit justify-self-center"
            suppressHydrationWarning
          >
            Senden
          </button>
        </form>
      </div>
    </section>
  );
}
