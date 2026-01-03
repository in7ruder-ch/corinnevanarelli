import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ServiceBanner({
  title,                 // si no viene, i18n
  imageSrc = "",
  imageAlt,              // si no viene, i18n
}) {
  const t = useTranslations("ServiceBanner");

  const _title = title ?? t("title");
  const _imageAlt = imageAlt ?? t("imageAlt");

  return (
    <section
      className="relative w-full h-[23svh] md:h-[28svh] lg:h-[31svh] mt-32 overflow-hidden"
      aria-label={t("ariaLabel")}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={_imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        {/* Overlay coherente con Hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246,244,239,0.12) 0%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.36) 100%)",
          }}
        />

        {/* Tinte salvia ultra sutil */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--brand) 10%, transparent)",
            opacity: 0.16,
          }}
        />
      </div>

      {/* Contenido centrado */}
      <div className="h-full w-full grid place-items-center text-center px-4 sm:px-6 md:px-12 lg:px-16">
        <h1 className="whitespace-pre-line text-white/95 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]">
          {_title}
        </h1>
      </div>
    </section>
  );
}
