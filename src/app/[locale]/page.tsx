import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/seo';
import { HeroSection } from '@/components/home/HeroSection';
import { Marquee } from '@/components/home/Marquee';
import { AboutSection } from '@/components/home/AboutSection';
import { WorksSection } from '@/components/home/WorksSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { NewsSection } from '@/components/home/NewsSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('siteTitle'),
    alternates: getLocalizedAlternates('/', locale as Locale),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <AboutSection />
      <WorksSection />
      <ServicesSection />
      <NewsSection />
    </>
  );
}
