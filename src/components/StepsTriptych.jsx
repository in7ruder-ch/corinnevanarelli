export default function StepsTriptych({
  id,
  title = "",
  subtitle,
  steps = [], // [{ title, body }]
  footer,
  padTop = true,
  padBottom = true,
  gray = true, // mantenemos prop por compatibilidad, pero el fondo ahora es el sistema
}) {
  const padY = [
    padTop ? 'pt-16 md:pt-24' : 'pt-0',
    padBottom ? 'pb-16 md:pb-24' : 'pb-0',
  ].join(' ');

  return (
    <section
      id={id}
      className={padY}
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* mismo “site container” que AltSections */}
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        {/* encabezado */}
        <div className="text-center mb-20 md:mb-22">
          <h2
            className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal [text-wrap:balance] break-words"
            style={{ color: 'var(--text)' }}
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className="mt-3 text-sm md:text-base"
              style={{ color: 'var(--muted)' }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* grid de tarjetas */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-8 pt-14 text-center flex flex-col h-full"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid color-mix(in srgb, var(--brand) 28%, transparent)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.05)',
              }}
            >
              {/* badge con el número */}
              <div className="absolute left-1/2 -top-7 -translate-x-1/2">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid color-mix(in srgb, var(--brand) 30%, transparent)',
                  }}
                >
                  {i + 1}
                </span>
              </div>

              <h3
                className="text-[1.5rem] font-semibold"
                style={{ color: 'var(--text)' }}
              >
                {s.title}
              </h3>

              {typeof s.body === 'string' ? (
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {s.body}
                </p>
              ) : (
                <div
                  className="mt-4 text-sm leading-relaxed
                    [&>p+ul]:mt-3
                    [&_ul]:list-disc
                    [&_ul]:pl-5
                    [&_ul]:text-left
                    [&_ul>li]:mt-2
                  "
                  style={{ color: 'var(--muted)' }}
                >
                  {s.body}
                </div>
              )}

              {Array.isArray(s.points) && s.points.length > 0 && (
                <ul
                  className="mt-3 list-disc pl-5 space-y-2 text-sm leading-relaxed text-left"
                  style={{ color: 'var(--muted)' }}
                >
                  {s.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* pie opcional */}
        {footer ? (
          <div
            className="mt-10 text-center text-sm md:text-base space-y-1"
            style={{ color: 'var(--muted)' }}
          >
            {typeof footer === 'string' ? <p>{footer}</p> : footer}
          </div>
        ) : null}
      </div>
    </section>
  );
}
