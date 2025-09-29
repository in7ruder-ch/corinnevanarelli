'use client';

import Section from '@/components/Section';
import { useTranslations } from 'next-intl';

export default function StepsDyad({ title, subtitle, steps, footer }) {
  const t = useTranslations('StepsDyad');
  const _title = title ?? t('title');

  return (
    <Section
      className="bg-[#f5f5f5] py-16 md:py-20 md:pb-24"
      containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal text-neutral-900 [text-wrap:balance] break-words">
          {_title}
        </h2>
        {subtitle && <p className="mt-2 text-neutral-600">{subtitle}</p>}
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
            className="
              relative rounded-2xl bg-white shadow-sm ring-1 ring-black/5 px-6 pt-10 pb-8 text-center
              w-full lg:w-[420px]
            "
          >
            {/* Badge número */}
            <div
              className="
                absolute -top-6 left-1/2 -translate-x-1/2
                h-12 w-12 grid place-items-center text-lg font-semibold
                rounded-full bg-white text-neutral-900
                border border-neutral-200
              "
            >
              {i + 1}
            </div>

            <h3 className="text-[1.5rem] font-semibold text-neutral-900">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl text-center mt-10">
        {typeof footer === 'string' ? <p>{footer}</p> : footer}
      </div>
    </Section>
  );
}
