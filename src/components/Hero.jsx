import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero({
  title,
  subtitle,
  imageSrc = "/img/Banner-Home-Mobile.webp",
  imageAlt
}) {
  const t = useTranslations("Hero");

  const _title = title ?? t("title");
  const _subtitle = subtitle ?? t("subtitle");
  const _imageAlt = imageAlt ?? t("imageAlt");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative w-full h-[calc(100svh-8rem)] md:h-[calc(100vh-8rem)] overflow-hidden mt-32 md:mt-0"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={_imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        {/* ✅ overlay más “calma/premium” (no negro plano) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246,244,239,0.10) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.32) 100%)",
          }}
        />

        {/* ✅ tinte salvia ultra sutil para coherencia */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "color-mix(in srgb, var(--brand) 10%, transparent)",
            opacity: 0.18,
          }}
        />
      </div>

      <div className="grid h-full w-full place-content-center px-4 sm:px-6 lg:px-8 text-center gap-4">
        <h1 className="whitespace-pre-line text-white/95 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]">
          {_title}
        </h1>

        <h2 className="text-white/90 text-xl italic sm:text-2xl md:text-3xl font-light leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]">
          {_subtitle}
        </h2>
      </div>
    </section>
  );
}
