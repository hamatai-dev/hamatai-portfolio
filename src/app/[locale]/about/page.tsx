import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getLocalizedAlternates } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { ProfileMeta } from '@/components/about/ProfileMeta';
import { ProfileSection } from '@/components/about/ProfileSection';
import { JourneySection } from '@/components/about/JourneySection';
import { DailyRhythm } from '@/components/about/DailyRhythm';
import { CareerSection } from '@/components/about/CareerSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('bio'),
    openGraph: { title: t('title'), description: t('bio') },
    alternates: getLocalizedAlternates('/about', locale as Locale),
  };
}

export default function AboutPage() {
  const t = useTranslations('about.hero');

  return (
    <>
      <PageHero
        size="large"
        label={t('label')}
        title={t('title')}
        accent={t('accent')}
        aside={<ProfileMeta />}
      />
      <ProfileSection />
      <JourneySection />
      <DailyRhythm />
      <CareerSection />
    </>
  );
}
