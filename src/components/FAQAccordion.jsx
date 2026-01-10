"use client";

import { useState } from "react";

export default function FAQAccordion({ title, items }) {
  // items: [{ q: string, a: string | string[], bullets?: string[] }]
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-[2.25rem] font-semibold text-neutral-900 text-center whitespace-pre-line">
          {title}
        </h2>

        <div className="mt-10 mx-auto max-w-6xl grid gap-4 md:grid-cols-2">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden h-fit"
              >
                <button
                  type="button"
                  className="w-full px-6 py-5 flex items-start justify-between gap-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="text-lg md:text-xl text-neutral-900">
                    {item.q}
                  </span>

                  <span
                    className={`mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                    title={isOpen ? "Close" : "Open"}
                  >
                    +
                  </span>
                </button>

                {isOpen ? (
                  <div className="px-6 pb-6 text-neutral-700">
                    {Array.isArray(item.a) ? (
                      <div className="space-y-3 whitespace-pre-line">
                        {item.a.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{item.a}</p>
                    )}

                    {item.bullets?.length ? (
                      <ul className="mt-4 list-disc pl-5 space-y-2">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="whitespace-pre-line">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
