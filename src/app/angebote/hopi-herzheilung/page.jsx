import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65";

// Metadata i18n
export async function generateMetadata() {
  const t = await getTranslations("Hopi.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: t("canonical") },
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      url: t("og.url"),
      siteName: t("og.siteName"),
      images: [
        {
          url: t("og.images.0.url"),
          width: 1200,
          height: 630,
          alt: t("og.images.0.alt")
        }
      ],
      locale: t("og.locale"),
      type: t("og.type")
    },
    twitter: {
      card: t("twitter.card"),
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: [t("twitter.images.0")]
    }
  };
}

export default async function HopiHerzHeilungPage() {
  const t = await getTranslations("Hopi");

  return (
    <>
      <ServiceBanner
        title={t("banner.title")}
        imageSrc="/img/banner3.webp"
        imageAlt={t("banner.imageAlt")}
      />

      {/* 1) Imagen derecha / Texto izquierda */}
      <AltSection
        title={
          <>
            <strong>{t("alt1.title")}</strong>
          </>
        }
        body={
          <>
            {t.rich("alt1.body", {
              p: (chunks) => <p>{chunks}</p>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </>
        }
        imageSrc="/img/hopi.webp"
        imageAlt={t("alt1.imageAlt")}
        mediaLeft={false}
      />

      {/* 2) Imagen izquierda / Texto derecha */}
      <AltSection
        title={
          <>
            <strong>{t("alt2.title")}</strong>
          </>
        }
        body={
          <>
            {t.rich("alt2.bodyIntro", { p: (c) => <p>{c}</p> })}
            <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
              {t.raw("alt2.items").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {t.rich("alt2.bodyOutro", {
              p: (chunks) => <p className="whitespace-pre-line">{chunks}</p>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </>
        }

        imageSrc="/img/newbanner.webp"
        imageAlt={t("alt2.imageAlt")}
        mediaLeft={true}
        padTop={false}
      />

      <StepsTriptych
        title={
          <>
            <strong>{t("steps.title")}</strong>
          </>
        }
        steps={[
          { title: t("steps.items.0.title"), body: t("steps.items.0.body") },
          { title: t("steps.items.1.title"), body: t("steps.items.1.body") },
          { title: t("steps.items.2.title"), body: t("steps.items.2.body") }
        ]}
        footer={
          <>
            {t.rich("steps.footer", {
              p: (chunks) => <p>{chunks}</p>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </>
        }
      />

      <FreeConsultCallout
        title={t("freeConsult.title")}
        subtitle={t("freeConsult.subtitle")}
        duration={t("freeConsult.duration")}
        price={t("freeConsult.price")}
        ctaHref={`/book?serviceId=${encodeURIComponent(FREE_CONSULTATION_SERVICE_ID)}`}
        ctaLabel={t("freeConsult.ctaLabel")}
      />

      <Testimonials />
      <Footer />
    </>
  );
}
