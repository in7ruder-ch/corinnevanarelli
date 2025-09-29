import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600 flex flex-col md:flex-row items-center justify-center gap-4">
        <p>{t('copyright', { year })}</p>
      </div>
    </footer>
  );
}
