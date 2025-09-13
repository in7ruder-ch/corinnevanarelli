import Section from "./Section";

export default function AltSection({ id, title, body, imageSrc, imageAlt, mediaLeft = false, ctaLabel, ctaHref }) {
  return (
    <Section id={id}>
      <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${mediaLeft ? "md:[&>div:first-child]:order-none md:[&>div:last-child]:order-none" : "md:[&>div:first-child]:order-last"}`}>
        <div className="aspect-[4/3] w-full rounded-2xl bg-neutral-100 overflow-hidden">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          <p className="mt-4 text-neutral-700">{body}</p>
          {ctaHref && (
            <a href={ctaHref} className="mt-6 inline-block px-5 py-3 rounded-lg border hover:bg-neutral-50">
              {ctaLabel ?? "Mehr erfahren"}
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
