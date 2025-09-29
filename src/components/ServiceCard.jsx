// src/components/ServiceCard.jsx
import { useTranslations } from 'next-intl';

export default function ServiceCard({
  title,
  durationLabel,
  priceLabel,
  modality,
  notes,
  bullets = [],
  ctaHref = "/book",
  serviceId,
  ctaLabel,            // opcional: si viene, tiene prioridad sobre i18n
}) {
  const t = useTranslations('ServiceCard');

  const href = serviceId
    ? `${ctaHref}?serviceId=${encodeURIComponent(String(serviceId))}`
    : ctaHref;

  const _ctaLabel = ctaLabel ?? t('ctaLabel'); // <- i18n por defecto

  return (
    <div className="bg-[#ffffff] rounded-2xl border p-6 flex flex-col h-full">
      <h3 className="text-xl font-semibold">{title}</h3>

      {/* Subinfo: modalidad | duración */}
      <p className="mt-2 text-sm text-neutral-600">
        {modality ? `${modality}` : null}
        {modality && durationLabel ? " | " : null}
        {durationLabel}
      </p>

      {/* Notas adicionales con bullet */}
      {notes ? (
        <p className="mt-2 text-sm text-neutral-700">{notes}</p>
      ) : null}

      {/* Bullets opcionales */}
      {bullets?.length ? (
        <ul className="mt-4 space-y-2 list-disc list-inside text-neutral-700">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      {/* Footer fijo abajo: precio + CTA */}
      <div className="mt-auto pt-6">
        {priceLabel ? (
          <p className="text-sm font-medium text-neutral-900">{priceLabel}</p>
        ) : null}

        <a
          href={href}
          className="mt-3 inline-block px-4 py-2 rounded-lg bg-black text-white text-center hover:opacity-90"
        >
          {_ctaLabel}
        </a>
      </div>
    </div>
  );
}
