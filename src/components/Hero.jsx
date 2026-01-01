import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero({
  title,
  subtitle,
  imageSrc = '/img/Banner-Home-Mobile.webp',
  imageAlt
}) {
  const t = useTranslations('Hero');

  const _title = title ?? t('title');
  const _subtitle = subtitle ?? t('subtitle');
  const _imageAlt = imageAlt ?? t('imageAlt');

  return (
    <section
      aria-label={t('ariaLabel')}
      className="relative w-full pt-32 overflow-hidden"
      style={{ height: '100svh' }}   // 👈 evita el “zoom” por cambios de vh
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={_imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Área visible real (sin navbar) */}
      <div className="flex h-[calc(100svh-8rem)] flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center gap-4">
        <h1 className="whitespace-pre-line text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          {_title}
        </h1>
        <h2 className="text-white text-xl italic sm:text-2xl md:text-3xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          {_subtitle}
        </h2>
      </div>
    </section>
  );
}