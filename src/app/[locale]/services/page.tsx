import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import {
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { services } from '@/data/services';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title') };
}

const serviceIcons: Record<string, React.ElementType> = {
  webapp: CodeBracketIcon,
  homepage: GlobeAltIcon,
  notion: DocumentTextIcon,
  mobile: DevicePhoneMobileIcon,
  frontend: LightBulbIcon,
  consulting: BriefcaseIcon,
};

// ── ホームページ制作 詳細プラン ──────────────────────────────────────────────
// 当サイトから直接依頼した場合の特別価格。

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

function ServiceCard({
  service,
  t,
}: {
  service: (typeof services)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = serviceIcons[service.id] ?? CodeBracketIcon;
  const features = t.raw(`${service.id as 'webapp'}.features`) as string[];

  return (
    <div className="group bg-surface-card rounded-2xl border border-white/5 p-7 hover:border-accent/20 transition-all duration-300 flex flex-col">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
        <Icon className="h-6 w-6 text-accent" />
      </div>

      {/* Title */}
      <h2 className="text-primary font-bold text-xl mb-2">
        {t(`${service.id as 'webapp'}.title`)}
      </h2>

      {/* Description */}
      <p className="text-secondary text-sm leading-relaxed mb-5">
        {t(`${service.id as 'webapp'}.description`)}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-5 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-secondary">
            <CheckIcon className="h-4 w-4 text-success shrink-0 mt-0.5" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      {service.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-4">
          {service.technologies.map((tech) => (
            <Badge key={tech} variant="blue">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {/* Pricing note */}
      {service.id === 'homepage' ? (
        <a
          href="#homepage-plan"
          className="inline-flex items-center gap-1 text-accent hover:text-accent-light text-xs font-semibold transition-colors"
        >
          {t('viewPlanDetails')}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </a>
      ) : (
        <p className="text-muted text-xs">{t('priceOnRequest')}</p>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const locale = useLocale() as 'ja' | 'en';

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <SectionTitle
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} t={t} />
        ))}
      </div>

      {/* Homepage Plan Detail */}
      <div id="homepage-plan" className="mt-20 scroll-mt-24">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            {t('homepagePlan.title')}
          </h2>
          <p className="text-secondary text-sm leading-relaxed max-w-2xl">
            {t('homepagePlan.intro')}
          </p>
          <div className="mt-4 flex items-start gap-2 px-4 py-3 bg-accent/5 border border-accent/20 rounded-xl max-w-2xl">
            <SparklesIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p className="text-accent text-xs leading-relaxed">
              {t('homepagePlan.directNote')}
            </p>
          </div>
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
              <span className="text-primary font-semibold">
                +¥{opt.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Flow */}
        <h3 className="text-primary font-semibold text-lg mb-4">
          {t('homepagePlan.flowHeading')}
        </h3>
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {homepageFlowSteps.map((step) => (
            <div
              key={step.title.en}
              className="bg-surface-card rounded-xl border border-white/5 p-4"
            >
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
          <p className="text-muted text-xs leading-relaxed">
            {t('homepagePlan.maintenanceOnlyNote')}
          </p>
        </div>

        <p className="text-muted text-xs leading-relaxed">
          {t('homepagePlan.responseTimeNote')}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 bg-surface-subtle rounded-2xl border border-white/5 text-center">
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
