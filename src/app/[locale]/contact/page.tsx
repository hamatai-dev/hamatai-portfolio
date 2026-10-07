import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getLocalizedAlternates } from '@/lib/seo';
import { PageHero, PageHeroIntro } from '@/components/layout/PageHero';
import { ContactForm } from './ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
    alternates: getLocalizedAlternates('/contact', locale as Locale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const info = [
    { label: t('infoReplyTitle'), value: t('infoReplyDesc') },
    { label: t('infoEmailTitle'), value: t('infoEmailDesc') },
    { label: t('infoSnsTitle'), value: t('infoSnsDesc') },
  ];

  return (
    <>
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        aside={<PageHeroIntro>{t('description')}</PageHeroIntro>}
        compact
      />

      <section className="border-t border-line bg-ink">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-24 pt-14 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-24 lg:px-16 lg:pb-[140px] lg:pt-16">
          <dl className="flex flex-col">
            {info.map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col gap-2.5 border-b border-line py-6 first:pt-0 lg:first:pt-6"
              >
                <dt className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] font-medium text-muted">{item.label}</span>
                </dt>
                <dd className="text-lg font-medium text-paper">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ContactForm locale={locale} />
        </div>
      </section>
    </>
  );
}
