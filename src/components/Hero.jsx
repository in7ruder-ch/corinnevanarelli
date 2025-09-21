import Image from 'next/image';

export default function Hero({
  title = 'Coaching & Energiearbeit\nfür Heilung, Selbstfindung\nund Klarheit',
  imageSrc = '/img/Banner-Home-Mobile.webp',
  imageAlt = 'Natur & Ruhe — Hero'
}) {
  return (
    <section
      aria-label="Hero"
      // usar svh para evitar el bug del viewport; fallback a vh
      className="relative w-full h-[calc(100svh-8rem)] md:h-[calc(100vh-8rem)]"
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
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
          {title}
        </h1>
      </div>
    </section>
  );
}
