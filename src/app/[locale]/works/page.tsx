import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { works } from '@/data/work';
import { getLocalizedAlternates } from '@/lib/seo';
import { PageHero, PageHeroIntro } from '@/components/layout/PageHero';
import { WorksExplorer } from '@/components/works/WorksExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'works' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
    alternates: getLocalizedAlternates('/works', locale as Locale),
  };
}

export default function WorksPage() {
  const t = useTranslations('works.hero');

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        accent={t('accent')}
        aside={<PageHeroIntro>{t('intro')}</PageHeroIntro>}
        compact
      />
      <WorksExplorer works={works} />
    </>
  );
}
