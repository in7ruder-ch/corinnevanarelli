import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero({
  title,                               // si no viene, usamos i18n
  imageSrc = '/img/Banner-Home-Mobile.webp',
  imageAlt                              // si no viene, i18n
}) {
  const t = useTranslations('Hero');

  const _title = title ?? t('title');
  const _imageAlt = imageAlt ?? t('imageAlt');

  return (
    <section
      aria-label={t('ariaLabel')}
      // usar svh para evitar el bug del viewport; fallback a vh
      className="relative w-full h-[calc(100svh-8rem)] md:h-[calc(100vh-8rem)]"
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

      {/* Center–center real con grid */}
      <div className="grid place-items-center h-full w-full px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="mt-20 whitespace-pre-line text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          {_title}
        </h1>
      </div>
    </section>
  );
}
