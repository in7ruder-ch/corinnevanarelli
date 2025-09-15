export default function StepsTriptych({
  id,
  title = "",
  subtitle, // opcional, texto bajo el título
  steps = [], // [{ title, body }]
  footer,     // opcional: JSX o string centrado debajo del grid
  padTop = true,
  padBottom = true,
  gray = true, // fondo gris como la referencia
}) {
  const padY = [
    padTop ? 'pt-16 md:pt-24' : 'pt-0',
    padBottom ? 'pb-16 md:pb-24' : 'pb-0',
  ].join(' ');
  const bg = gray ? 'bg-[#f5f5f5]' : 'bg-white';

  return (
    <section id={id} className={`${bg} ${padY}`}>
      {/* mismo “site container” que AltSections */}
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        {/* encabezado */}
        <div className="text-center mb-20 md:mb-22">
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal text-neutral-900 [text-wrap:balance] break-words">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-neutral-700 text-sm md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* grid de tarjetas */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-white border rounded-2xl p-8 pt-14 text-center flex flex-col h-full">
              {/* badge con el número */}
              <div className="absolute left-1/2 -top-7 -translate-x-1/2">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 text-xl font-bold ring-1 ring-neutral-200">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-semibold text-neutral-900">{s.title}</h3>
              <p className="mt-4 text-neutral-700 text-sm leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* pie opcional */}
        {footer ? (
          <div className="mt-10 text-center text-neutral-800 text-sm md:text-base space-y-1">
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </div>
        ) : null}
      </div>
    </section>
  );
}
