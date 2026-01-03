import { getTranslations, getLocale } from 'next-intl/server';

import Hero from "@/components/Hero";
import AltSection from "@/components/AltSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Metadata localizada
export async function generateMetadata() {
  const t = await getTranslations('Home');
  const locale = await getLocale();
  const ogLocale =
    locale === 'de' ? 'de_DE' :
      locale === 'en' ? 'en_US' : 'es_ES';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: { canonical: "https://www.corinnevanarelli.ch/" },
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      url: "https://www.corinnevanarelli.ch/",
      siteName: "Corinne Vanarelli",
      images: [
        {
          url: "https://www.corinnevanarelli.ch/img/Banner-Home-Mobile.webp",
          width: 1200,
          height: 630,
          alt: "Corinne Vanarelli – Soulcoaching"
        }
      ],
      locale: ogLocale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: ["https://www.corinnevanarelli.ch/img/Banner-Home-Mobile.webp"]
    }
  };
}

export default async function HomePage() {
  const t = await getTranslations('Home');

  // helpers para rich text
  const rich = (key) =>
    t.rich(key, {
      strong: (chunks) => <strong>{chunks}</strong>,
      em: (chunks) => <em>{chunks}</em>
    });
  const mkStrong = (k) => t.rich(k, { strong: (c) => <strong>{c}</strong> });

  return (
    <>
      <Hero />

      {/* S1 */}
      <AltSection
        title={rich('s1.title')}
        kicker={t('s1.kicker')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s1.p1')}</p>
            <p className="whitespace-pre-line">{rich('s1.p2')}</p>
            <p className="whitespace-pre-line">{rich('s1.p3')}</p>
            <p className="whitespace-pre-line">{rich('s1.p4')}</p>
            <p className="whitespace-pre-line">{rich('s1.p5')}</p>
            <p className="whitespace-pre-line">{rich('s1.p6')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/Ontologisches Coach - mobile.webp",
          desktop: "/img/Ontologisches Coach.webp"
        }}
        imageAlt={t('s1.imageAlt')}
        mediaLeft={true}
        showCta={false}
        padBottom={false}
      />

      {/* S2 */}
      <AltSection
        title={mkStrong('s2.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s2.p1')}</p>
            <p className="whitespace-pre-line">{rich('s2.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/Coaching.jpg",
          desktop: "/img/Coaching.jpg"
        }}
        imageAlt={t('s2.imageAlt')}
        mediaLeft={false}
        ctaHref="/angebote/ontologisches-coaching"
        ctaVariant="link"
        padTop={true}
      />

      {/* S3 */}
      <AltSection
        title={mkStrong('s3.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s3.p1')}</p>
            <p className="whitespace-pre-line">{rich('s3.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/akasha.webp",
          desktop: "/img/akasha.webp"
        }}
        imageAlt={t('s3.imageAlt')}
        mediaLeft={true}
        ctaHref="/angebote/akasha-chronik-lesung"
        ctaVariant="link"
        padTop={false}
      />

      {/* S4 */}
      <AltSection
        title={mkStrong('s4.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s4.p1')}</p>
            <p className="whitespace-pre-line">{rich('s4.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/hopi.webp",
          desktop: "/img/hopi.webp"
        }}
        imageAlt={t('s4.imageAlt')}
        mediaLeft={false}
        ctaHref="/angebote/hopi-herzheilung"
        ctaVariant="link"
        padTop={false}
      />

      {/* S5 */}
      <AltSection
        title={mkStrong('s5.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s5.p1')}</p>
            <p className="whitespace-pre-line">{rich('s5.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/Geistige.webp",
          desktop: "/img/Geistige.webp"
        }}
        imageAlt={t('s5.imageAlt')}
        mediaLeft={true}
        ctaHref="/angebote/chakra-clearing"
        ctaVariant="link"
        padTop={false}
      />

      {/* S6 */}
      <AltSection
        title={mkStrong('s6.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s6.p1')}</p>
            <p className="whitespace-pre-line">{rich('s6.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/Chakra clearing Dudingen.webp",
          desktop: "/img/Chakra clearing Dudingen.webp"
        }}
        imageAlt={t('s6.imageAlt')}
        mediaLeft={false}
        ctaHref="/angebote/gwa"
        ctaVariant="link"
        padTop={false}
      />

      {/* S7 */}
      <AltSection
        title={mkStrong('s7.title')}
        body={
          <>
            <p className="whitespace-pre-line">{rich('s7.p1')}</p>
            <p className="whitespace-pre-line">{rich('s7.p2')}</p>
          </>
        }
        imageSrc={{
          mobile: "/img/DoTerra Aromatouch.webp",
          desktop: "/img/DoTerra Aromatouch.webp"
        }}
        imageAlt={t('s7.imageAlt')}
        mediaLeft={true}
        ctaHref="/angebote/doterra-aromatouch"
        ctaVariant="link"
        padTop={false}
      />

      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
