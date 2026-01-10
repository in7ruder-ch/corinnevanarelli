import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import { getTranslations } from "next-intl/server";

export default async function EventsSection() {
    const t = await getTranslations("Events");

    const seminar = {
        kicker: t("seminars.items.0.tag"),
        title: t("seminars.items.0.title"),
        meta: t.raw("seminars.items.0.meta"),
        body: t("seminars.items.0.body"),
        cta: t("seminars.items.0.cta"),
        href: "/events/seminars/seminar-fruhling-2026",
        image: {
            src: "/img/seminars/fruhling-2026/01.webp",
            alt: t("seminars.items.0.title"),
        },
    };

    const retreat = {
        kicker: t("retreats.items.0.tag"),
        title: t("retreats.items.0.title"),
        meta: t.raw("retreats.items.0.meta"),
        body: t("retreats.items.0.body"),
        cta: t("retreats.items.0.cta"),
        href: "/events/retreats/costa-rica",
        image: {
            src: "/img/retreats/costa-rica/retreat-home.png",
            alt: t("retreats.items.0.title"),
        },
    };

    const Card = ({ data, allHref, allLabel }) => (
        <div className="rounded-3xl border border-neutral-200 bg-[#fafafa] overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/10]">
                <Image
                    src={data.image.src}
                    alt={data.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                />
            </div>

            <div className="p-7">
                <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                    {data.kicker}
                </p>

                <h3 className="mt-3 text-xl md:text-2xl font-semibold text-neutral-900 whitespace-pre-line">
                    {data.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                    {(Array.isArray(data.meta) ? data.meta : [data.meta]).map((line, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-brand/15 px-3 py-1 text-neutral-700 text-xs font-medium"
                        >
                            {line}
                        </span>
                    ))}
                </div>

                <p className="mt-4 text-neutral-700 whitespace-pre-line">{data.body}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href={data.href}
                        className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                    >
                        {data.cta}
                    </Link>

                    <Link
                        href={allHref}
                        className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                    >
                        {allLabel}
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <Section
            className="bg-white pt-14 pb-20 md:pt-20 md:pb-28"
            containerClass="mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1400px]"
        >
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-[2.25rem] font-semibold text-neutral-900 whitespace-pre-line">
                    {t("intro.title")}
                </h2>
                <p className="mt-4 text-neutral-700 whitespace-pre-line">
                    {t("intro.body")}
                </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                <Card
                    data={seminar}
                    allHref="/events/seminars"
                    allLabel={t("cards.allSeminars")}
                />
                <Card data={retreat} allHref="/events" allLabel={t("cards.allRetreats")} />
            </div>
        </Section>
    );
}
