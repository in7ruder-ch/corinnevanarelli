import ServiceBanner from "@/components/ServiceBanner";
import AltSection from "@/components/AltSection";
import CenteredSection from "@/components/CenteredSection";
import StepsTriptych from "@/components/StepsTriptych";
import FreeConsultCallout from "@/components/FreeConsultCallout";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

// TODO: reemplazar por el UUID real del servicio "Ontologisches Coaching"
const COACHING_SERVICE_ID = "60749344-9ccb-40a1-ac12-abfb355883ce";
const FREE_CONSULTATION_SERVICE_ID = "a8f310fc-a08f-4b10-853c-01044ae5bd65";

// Metadata i18n
export async function generateMetadata() {
  const t = await getTranslations("Coaching.meta");
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

export default async function OntologischesCoachingPage() {
  const t = await getTranslations("Coaching");

  return (
    <>
      <ServiceBanner
        title={t("banner.title")}
        imageSrc="/img/Banner.jpeg"
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
            {t
              .rich("alt1.body", {
                p: (chunks) => <p>{chunks}</p>,
                strong: (chunks) => <strong>{chunks}</strong>
              })}
          </>
        }
        imageSrc="/img/Coaching.jpg"
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
          <ul className="list-disc pl-6 space-y-2 marker:text-neutral-900">
            {t
              .raw("alt2.items")
              .map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        }
        imageSrc="/img/Ontologisches Coaching.jpg"
        imageAlt={t("alt2.imageAlt")}
        mediaLeft={true}
        padTop={false}
      />

      {/* 3) Sección centrada */}
      <CenteredSection
        title={
          <>
            <strong>{t("centered.title")}</strong>
          </>
        }
        body={
          <>
            {t.rich("centered.body", {
              p: (chunks) => <p>{chunks}</p>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </>
        }
      />

      <StepsTriptych
        title={
          <>
            <strong>{t("steps.title")}</strong>
          </>
        }
        subtitle={
          <>
            <strong>{t("steps.subtitle")}</strong>
          </>
        }
        steps={[
          {
            title: t("steps.items.0.title"),
            body: t("steps.items.0.body")
          },
          {
            title: t("steps.items.1.title"),
            body: t("steps.items.1.body")
          },
          {
            title: t("steps.items.2.title"),
            body: t("steps.items.2.body")
          }
        ]}
        footer={
          <>
            {t.rich("steps.footer", {
              p: (chunks) => <p>{chunks}</p>,
              strong: (chunks) => <strong className="font-semibold">{chunks}</strong>
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
