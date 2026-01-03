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
  ctaLabel,
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

  // ✅ Solo el primer AltSection (id="s1") usa Allura
  const useScriptTitle = id === 's1';

  return (
    <section
      id={id}
      className={sectionPadY}
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-y-0 md:gap-0 min-h-[450px]">
          {/* TEXTO */}
          <div
            className={[
              'order-1',
              mediaLeft ? 'md:order-2' : 'md:order-1',
              'md:self-stretch flex flex-col',
              'py-20 px-6 sm:px-8 md:px-12 lg:px-16',
              'rounded-none'
            ].join(' ')}
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <h2
              className={[
                'leading-tight [text-wrap:balance] break-words whitespace-pre-line',
                useScriptTitle
                  ? 'text-[2.1rem] sm:text-[2.4rem] md:text-[2.7rem] lg:text-[3rem] xl:text-[3.2rem] font-normal'
                  : 'text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] font-normal',
              ].join(' ')}
              style={
                useScriptTitle
                  ? { fontFamily: 'var(--font-script)', color: 'var(--text)' }
                  : { color: 'var(--text)' }
              }
            >
              {title}
            </h2>

            {/* línea dorada sutil */}
            <hr
              className="mt-4 mb-6"
              style={{ borderTop: '1px solid color-mix(in srgb, var(--gold) 55%, transparent)' }}
            />

            {/* Centro vertical */}
            <div className="flex-1 flex flex-col justify-center items-start text-left">
              {kicker ? (
                <p className="font-semibold mb-3 whitespace-pre-line" style={{ color: 'var(--text)' }}>
                  {kicker}
                </p>
              ) : null}

              <div
                className="text-[15px] md:text-base leading-relaxed space-y-4 whitespace-pre-line"
                style={{ color: 'var(--muted)' }}
              >
                {typeof body === 'string' ? <p>{body}</p> : body}
              </div>

              {showCta && ctaHref ? (
                ctaVariant === 'link' ? (
                  <p className="mt-6">
                    <a
                      href={ctaHref}
                      className="inline-block align-middle font-semibold italic underline transition-transform duration-100 ease-out hover:scale-105 transform-gpu py-1.5 -my-1.5"
                      style={{
                        color: 'var(--brand)',
                        textDecorationColor: 'var(--brand)',
                      }}
                    >
                      {resolvedCtaLabel}
                    </a>
                  </p>
                ) : (
                  <a
                    href={ctaHref}
                    className="inline-block mt-6 px-6 py-3 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: 'var(--brand)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
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
              {/* Mobile */}
              {typeof imageSrc === 'object' && imageSrc.mobile && (
                <Image
                  src={imageSrc.mobile}
                  alt={imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover md:hidden"
                />
              )}

              {/* Desktop */}
              <Image
                src={typeof imageSrc === 'object' ? imageSrc.desktop : imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover hidden md:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
