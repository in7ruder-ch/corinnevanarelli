export default function FreeConsultCallout({
  id,
  title = "1:1 Kostenloses Gespräch für Klarheit",
  subtitle = "Du bist neugierig, aber unsicher? Dann lade ich dich zu einem kostenlosen Kennenlerngespräch ein.",
  duration = "20 Min.",
  price = "Free",
  ctaHref = "/book",
  ctaLabel = "Buchung anfragen",
  padTop = true,
  padBottom = true,
  gray = true, // fondo gris como en la referencia
}) {
  const padY = [
    padTop ? "pt-14 md:pt-0" : "pt-0",
    padBottom ? "pb-16 md:pb-24" : "pb-0",
  ].join(" ");
  const bg = gray ? "bg-[#f5f5f5]" : "bg-white";

  return (
    <section id={id} className={`${bg} ${padY}`}>
      {/* mismo ancho que AltSections */}
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <div className="mx-auto max-w-4xl">
          {/* marco exterior */}
          <div className="bg-white border rounded-none p-5 md:p-8">
            {/* tarjeta interior con borde fino */}
            <div className="border p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900">
                {title}
              </h3>

              {subtitle ? (
                <p className="mt-4 text-neutral-700">
                  {subtitle}
                </p>
              ) : null}

              <hr className="my-8 border-t border-neutral-200" />

              <div className="text-neutral-800 space-y-1">
                <div className="text-sm">{duration}</div>
                <div className="text-sm">{price}</div>
              </div>

              <a
                href={ctaHref}
                className="mt-6 inline-block px-6 py-3 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
