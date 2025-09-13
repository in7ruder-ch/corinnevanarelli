import Section from "./Section";

export default function Hero() {
  return (
    <Section className="pt-20 md:pt-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-500">Soulcoaching • Heilung • Klarheit</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
            Dein Weg zurück zu dir.
          </h1>
          <p className="mt-4 text-neutral-700">
            Tiefe statt Smalltalk. Räume, in denen du dich erinnerst, wer du bist.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/book" className="px-5 py-3 rounded-lg bg-black text-white">Jetzt buchen</a>
            <a href="#angebote" className="px-5 py-3 rounded-lg border">Angebote ansehen</a>
          </div>
        </div>
        <div className="aspect-[4/3] w-full rounded-2xl bg-neutral-100 overflow-hidden">
          {/* Placeholder imagen */}
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
            alt="Ruhiger Raum"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
