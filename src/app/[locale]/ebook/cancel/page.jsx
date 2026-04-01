import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function EbookCancelPage() {
  const t = await getTranslations('EbookPage');

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-24">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold">{t('cancel.title')}</h1>

        <p className="mt-4 text-sm text-neutral-600">{t('cancel.text')}</p>

        <div className="mt-8">
          <Link
            href="/ebook"
            className="inline-flex rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            {t('cancel.retry')}
          </Link>
        </div>
      </div>
    </main>
  );
}