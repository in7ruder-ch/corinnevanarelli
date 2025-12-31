import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AltSection({
  title,
  kicker,
  body,
  imageSrc = '',
  imageAlt = '',
  mediaLeft = true,
  ctaHref,
  ctaLabel,                 // sin default literal
  ctaVariant = 'button',    // 'button' | 'link'
  showCta = true,
  padTop = true,
  padBottom = true,
  id
}) {
  const t = useTranslations('AltSection');

  const sectionPadY = [
    padTop ? 'pt-16 md:pt-24' : 'pt-0',
    padBottom ? 'pb-16 md:pb-24' : 'pb-0',
  ].join(' ');

  const resolvedCtaLabel = ctaLabel ?? t('ctaLabel');

  return (
    <section id={id} className={`bg-[#ffffff] ${sectionPadY}`}>
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-y-0 md:gap-0 min-h-[450px]">
          {/* TEXTO */}
          <div
            className={[
              'order-1',
              mediaLeft ? 'md:order-2' : 'md:order-1',
              'md:self-stretch flex flex-col',
              'py-20 px-6 sm:px-8 md:px-12 lg:px-16',
              'bg-[#f5f5f5]'
            ].join(' ')}
          >
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal text-neutral-900 [text-wrap:balance] break-words whitespace-pre-line">
              {title}
            </h2>

            <hr className="mt-4 mb-6 border-t border-neutral-300/80" />

            {/* ✅ Debajo del hr: centro vertical, alineado a la izquierda */}
            <div className="flex-1 flex flex-col justify-center items-start text-left">
              {kicker ? (
                <p className="font-semibold text-neutral-900 mb-3 whitespace-pre-line">{kicker}</p>
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
                      {resolvedCtaLabel}
                    </a>
                  </p>
                ) : (
                  <a
                    href={ctaHref}
                    className="inline-block mt-6 px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 transition"
                  >
                    {resolvedCtaLabel}
                  </a>
                )
              ) : null}
            </div>
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
