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

  const _ctaLabel = ctaLabel ?? t('ctaLabel');

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col h-full"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
        {title}
      </h3>

      {/* Subinfo: modalidad | duración */}
      <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
        {modality ? `${modality}` : null}
        {modality && durationLabel ? " | " : null}
        {durationLabel}
      </p>

      {/* Notas adicionales */}
      {notes ? (
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          {notes}
        </p>
      ) : null}

      {/* Bullets opcionales */}
      {bullets?.length ? (
        <ul className="mt-4 space-y-2 list-disc list-inside" style={{ color: 'var(--muted)' }}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      {/* Footer fijo abajo: precio + CTA */}
      <div className="mt-auto pt-6">
        {priceLabel ? (
          <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            {priceLabel}
          </p>
        ) : null}

        <a
          href={href}
          className="mt-3 inline-block px-4 py-2 rounded-lg text-white text-center transition-colors"
          style={{ backgroundColor: 'var(--brand)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--brand)')}
        >
          {_ctaLabel}
        </a>
      </div>
    </div>
  );
}
