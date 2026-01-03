'use client';

import Section from '@/components/Section';

export default function CenteredTopics({ title, subtitle, columns }) {
  return (
    <Section
      className="py-16 md:py-20"
      style={{ backgroundColor: 'var(--bg)' }}
      containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-tight font-normal [text-wrap:balance] break-words"
          style={{ color: 'var(--text)' }}
        >
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2" style={{ color: 'var(--muted)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Grid de 3 columnas (1 en mobile, 2 en md, 3 en lg) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {columns?.map((col, idx) => (
          <div key={idx} className="text-left">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              {col.title}
            </h3>

            <ul
              className="mt-3 list-disc pl-5 space-y-2"
              style={{ color: 'var(--muted)' }}
            >
              {col.items?.map((item, i) => (
                <li key={i}>
                  <span style={{ color: 'var(--muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
