import type { Locale } from 'use-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { getLocalizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: `${t('homepagePlan.title')} | ${t('title')}`,
    description: t('homepagePlan.intro'),
    openGraph: {
      title: t('homepagePlan.title'),
      description: t('homepagePlan.intro'),
    },
    alternates: getLocalizedAlternates('/services/homepage-plan', locale as Locale),
  };
}

const homepageProductionPlans = [
  {
    name: { ja: 'スタンダードプラン', en: 'Standard Plan' },
    recommended: true,
    description: {
      ja: '情報更新が多いサイト向け。月2回まで軽微な修正が無料、SEOコンサルも含みます。',
      en: 'For sites with frequent content updates. Includes up to 2 free minor edits per month plus SEO consulting.',
    },
    initialPrice: 100000,
    monthlyMaintenance: 15000,
  },
  {
    name: { ja: 'ライトプラン', en: 'Light Plan' },
    recommended: false,
    description: {
      ja: '更新頻度が低いサイト向けのシンプルなプランです。',
      en: 'A simple plan for sites that are updated infrequently.',
    },
    initialPrice: 180000,
    monthlyMaintenance: 7000,
  },
];

const homepageOptions = [
  { name: { ja: '追加言語（1言語につき）', en: 'Additional language (per language)' }, price: 30000 },
  { name: { ja: 'ロゴ制作', en: 'Logo design' }, price: 30000 },
  { name: { ja: 'お問い合わせフォーム追加', en: 'Additional contact form' }, price: 15000 },
  { name: { ja: '特急納品（最短1週間）', en: 'Rush delivery (as fast as 1 week)' }, price: 50000 },
];

const homepageFlowSteps = [
  {
    week: { ja: '1週目', en: 'Week 1' },
    title: { ja: 'ヒアリング', en: 'Discovery' },
    description: { ja: 'ご要望・目的の整理', en: 'Clarify goals and requirements' },
  },
  {
    week: { ja: '2週目', en: 'Week 2' },
    title: { ja: 'デザイン提案', en: 'Design proposal' },
    description: { ja: 'デザインカンプの作成', en: 'Create design mockups' },
  },
  {
    week: { ja: '3週目', en: 'Week 3' },
    title: { ja: '実装', en: 'Implementation' },
    description: { ja: 'コーディング・機能実装', en: 'Coding and feature development' },
  },
  {
    week: { ja: '4週目', en: 'Week 4' },
    title: { ja: '確認・公開', en: 'Review & launch' },
    description: { ja: '最終確認後に公開', en: 'Final review, then go live' },
  },
];

export default function HomepagePlanPage() {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const locale = useLocale() as 'ja' | 'en';

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-16">
      {/* Back */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-medium transition-colors mb-8"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {tc('backToList')}
      </Link>

      <SectionTitle title={t('homepagePlan.title')} description={t('homepagePlan.intro')} />

      <div className="mb-10 flex items-start gap-2 px-4 py-3 bg-accent/5 border border-accent/20 rounded-xl max-w-2xl">
        <SparklesIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-accent text-xs leading-relaxed">{t('homepagePlan.directNote')}</p>
      </div>

      {/* Production plans */}
      <h3 className="text-primary font-semibold text-lg mb-4">
        {t('homepagePlan.productionHeading')}
      </h3>
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        {homepageProductionPlans.map((plan) => (
          <div
            key={plan.name.en}
            className={`bg-surface-card rounded-2xl border p-6 ${
              plan.recommended ? 'border-accent/40' : 'border-white/5'
            }`}
          >
            <Badge variant="blue" className={`mb-3 ${plan.recommended ? '' : 'invisible'}`}>
              {t('homepagePlan.recommended')}
            </Badge>
            <h4 className="text-primary font-bold text-lg mb-1">{plan.name[locale]}</h4>
            <p className="text-secondary text-sm mb-5">{plan.description[locale]}</p>
            <div className="flex items-end gap-6">
              <div>
                <span className="text-primary text-3xl font-bold">
                  ¥{plan.initialPrice.toLocaleString()}
                </span>
                <p className="text-muted text-xs mt-1">{t('homepagePlan.initialCostLabel')}</p>
              </div>
              <div>
                <span className="text-secondary text-lg font-semibold">
                  ¥{plan.monthlyMaintenance.toLocaleString()}
                </span>
                <p className="text-muted text-xs mt-1">{t('homepagePlan.monthlyLabel')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Options */}
      <h3 className="text-primary font-semibold text-lg mb-4">{t('homepagePlan.optionsHeading')}</h3>
      <div className="bg-surface-card rounded-2xl border border-white/5 divide-y divide-white/5 mb-12">
        {homepageOptions.map((opt) => (
          <div
            key={opt.name.en}
            className="flex items-center justify-between px-5 py-3.5 text-sm"
          >
            <span className="text-secondary">{opt.name[locale]}</span>
            <span className="text-primary font-semibold">+¥{opt.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Flow */}
      <h3 className="text-primary font-semibold text-lg mb-4">{t('homepagePlan.flowHeading')}</h3>
      <div className="grid sm:grid-cols-4 gap-4 mb-12">
        {homepageFlowSteps.map((step) => (
          <div key={step.title.en} className="bg-surface-card rounded-xl border border-white/5 p-4">
            <span className="text-accent text-xs font-semibold">{step.week[locale]}</span>
            <p className="text-primary text-sm font-semibold mt-1">{step.title[locale]}</p>
            <p className="text-muted text-xs mt-1">{step.description[locale]}</p>
          </div>
        ))}
      </div>

      {/* Maintenance only */}
      <div className="bg-surface-subtle rounded-2xl border border-white/5 p-6 mb-6">
        <h3 className="text-primary font-semibold text-lg mb-2">
          {t('homepagePlan.maintenanceOnlyTitle')}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-3">
          {t('homepagePlan.maintenanceOnlyDesc')}
        </p>
        <p className="text-muted text-xs leading-relaxed">{t('homepagePlan.maintenanceOnlyNote')}</p>
      </div>

      <p className="text-muted text-xs leading-relaxed mb-16">
        {t('homepagePlan.responseTimeNote')}
      </p>

      {/* CTA */}
      <div className="p-8 bg-surface-subtle rounded-2xl border border-white/5 text-center">
        <h3 className="text-primary font-bold text-xl mb-2">{t('ctaTitle')}</h3>
        <p className="text-secondary text-sm mb-6">{t('ctaDescription')}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
        >
          {tc('contact')}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
