import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ backgroundColor: 'var(--brand-dark)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm flex flex-col md:flex-row items-center justify-center gap-4">
        <p
          className="text-white/90 transition-colors"
        >
          {t('copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
