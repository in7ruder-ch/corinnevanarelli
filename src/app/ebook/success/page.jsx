import { getTranslations } from 'next-intl/server';
import { getSupabaseService } from '@/lib/supabaseService';
import Link from 'next/link';

export default async function EbookSuccessPage({ searchParams }) {
    const t = await getTranslations('EbookPage');

    const resolvedSearchParams = await searchParams;
    const sessionId = resolvedSearchParams?.session_id;

    let purchase = null;

    if (sessionId) {
        const supabase = getSupabaseService();

        const { data } = await supabase
            .from('ebook_purchases')
            .select('id, email, status, stripe_session_id')
            .eq('stripe_session_id', sessionId)
            .eq('status', 'paid')
            .maybeSingle();

        purchase = data;
    }

    return (
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-24">
            <div className="max-w-xl">
                <h1 className="text-2xl font-semibold">{t('success.title')}</h1>

                <p className="mt-4 text-sm text-neutral-600">
                    {t('success.text')}
                </p>

                <div className="mt-6 text-xs text-neutral-400">
                    session_id: {sessionId || 'missing'}
                </div>

                <div className="mt-3 text-xs text-neutral-400">
                    purchase: {purchase ? 'verified' : 'not found'}
                </div>

                {purchase ? (
                    <div className="mt-8">
                        <a
                            href={`/api/ebook/download?session_id=${encodeURIComponent(sessionId)}`}
                            className="inline-flex rounded-full px-6 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            {t('success.download')}
                        </a>
                    </div>
                ) : null}
            </div>
        </main>
    );
}