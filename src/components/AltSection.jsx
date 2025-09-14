import Image from 'next/image';

export default function AltSection({
  title,
  kicker,
  body,
  imageSrc = '',
  imageAlt = '',
  mediaLeft = true,
  ctaHref,
  ctaLabel = 'Mehr erfahren',
  ctaVariant = 'button',     // 'button' | 'link'
  showCta = true,
  padTop = true,             // ⬅️ controla padding superior de la sección
  padBottom = true,          // ⬅️ controla padding inferior de la sección
  id
}) {
  const sectionPadY = [
    padTop ? 'pt-16 md:pt-24' : 'pt-0',
    padBottom ? 'pb-16 md:pb-24' : 'pb-0',
  ].join(' ');

  return (
    <section id={id} className={`bg-[#ffffff] ${sectionPadY}`}>
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        {/* Mobile: gap vertical; Desktop: sin gap horizontal, alturas iguales */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-y-10 md:gap-0">
          {/* TEXTO */}
          <div
            className={[
              'order-1',                              // mobile: primero
              mediaLeft ? 'md:order-2' : 'md:order-1',
              'md:self-stretch flex flex-col',
              'py-20 md:px-12 lg:px-16', 'bg-[#f5f5f5]'               // aire interno
            ].join(' ')}
          >
            <h2 className="text-[2rem] md:text-[2.75rem] leading-tight font-normal text-neutral-900">
              {title}
            </h2>

            <hr className="mt-4 mb-6 border-t border-neutral-300/80" />

            {kicker ? (
              <p className="font-semibold text-neutral-900 mb-3">{kicker}</p>
            ) : null}

            <div className="text-[15px] md:text-base leading-relaxed space-y-4">
              {typeof body === 'string' ? <p>{body}</p> : body}
            </div>

            {showCta && ctaHref ? (
              ctaVariant === 'link' ? (
                <p className="mt-6">
                  <a
                    href={ctaHref}
                    className="inline-block align-middle font-semibold italic underline decoration-neutral-800 transition-transform duration-100 ease-out hover:scale-105 transform-gpu py-1.5 -my-1.5"


                  >
                    {ctaLabel}
                  </a>
                </p>
              ) : (
                <a
                  href={ctaHref}
                  className="inline-block mt-6 px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
                >
                  {ctaLabel}
                </a>
              )
            ) : null}
          </div>

          {/* IMAGEN */}
          <div className={['order-2', mediaLeft ? 'md:order-1' : 'md:order-2'].join(' ')}>
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
