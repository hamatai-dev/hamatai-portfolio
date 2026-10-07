import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Locale } from 'next-intl';
import { getLocalizedAlternates } from '@/lib/seo';
import { PageHero, PageHeroIntro } from '@/components/layout/PageHero';
import { ServiceSection, type ServiceContent } from '@/components/services/ServiceSection';
import { ProcessSection } from '@/components/services/ProcessSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
    alternates: getLocalizedAlternates('/services', locale as Locale),
  };
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const list = t.raw('list') as ServiceContent[];

  const index = (
    <nav
      aria-label="Services"
      className="flex flex-wrap gap-3 border-t border-line pt-6"
    >
      {list.map((service, i) => (
        <a
          key={service.id}
          href={`#${service.id}`}
          className="inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-paper"
        >
          <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
          {service.titleEn}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        accent={t('hero.accent')}
        aside={<PageHeroIntro>{t('hero.intro')}</PageHeroIntro>}
        below={index}
      />
      {list.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} total={list.length} />
      ))}
      <ProcessSection />
    </>
  );
}
