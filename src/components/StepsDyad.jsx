'use client';

import Section from '@/components/Section';
import { useTranslations } from 'next-intl';

export default function StepsDyad({ title, subtitle, steps, footer }) {
  const t = useTranslations('StepsDyad');
  const _title = title ?? t('title');

  return (
    <Section
      className="py-16 md:py-20 md:pb-24"
      containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal [text-wrap:balance] break-words"
          style={{ color: 'var(--text)' }}
        >
          {_title}
        </h2>

        {subtitle && (
          <p className="mt-2" style={{ color: 'var(--muted)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* 2 tarjetas */}
      <div
        className="
          mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8
          lg:[grid-template-columns:repeat(2,420px)] lg:justify-center
        "
      >
        {steps?.slice(0, 2).map((s, i) => (
          <div
            key={i}
            className="relative rounded-2xl px-6 pt-10 pb-8 text-center w-full lg:w-[420px]"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid color-mix(in srgb, var(--brand) 28%, transparent)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
            }}
          >
            {/* Badge número */}
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 grid place-items-center text-lg font-semibold rounded-full"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid color-mix(in srgb, var(--brand) 30%, transparent)',
              }}
            >
              {i + 1}
            </div>

            <h3 className="text-[1.5rem] font-semibold" style={{ color: 'var(--text)' }}>
              {s.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl text-center mt-10" style={{ color: 'var(--muted)' }}>
        {typeof footer === 'string' ? <p>{footer}</p> : footer}
      </div>
    </Section>
  );
}
