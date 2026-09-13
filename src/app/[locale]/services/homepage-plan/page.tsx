import type { Locale } from 'use-intl';
import { getTranslations, getLocale } from 'next-intl/server';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { getLocalizedAlternates } from '@/lib/seo';
import { getExchangeRates } from '@/lib/exchangeRates';
import { CurrencyProvider } from '@/components/currency/CurrencyContext';
import { CurrencySwitcher } from '@/components/currency/CurrencySwitcher';
import { Price } from '@/components/currency/Price';

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
    name: { ja: 'ライト', en: 'Light' },
    recommended: false,
    price: 120000,
    features: {
      ja: [
        '5ページ / 日本語のみ',
        'スマートフォン最適化',
        'ブログ投稿機能',
        '無料サーバーへ移行',
        '既存記事の移行なし',
      ],
      en: [
        '5 pages / Japanese only',
        'Mobile-optimized',
        'Blog posting feature',
        'Migration to a free-tier server',
        'No existing article migration',
      ],
    },
    tagline: {
      ja: 'まず刷新を最小構成で',
      en: 'Start with the smallest footprint',
    },
  },
  {
    name: { ja: 'スタンダード', en: 'Standard' },
    recommended: true,
    price: 260000,
    features: {
      ja: [
        'ライトの全内容+',
        '拠点別プロジェクトページ',
        '静的ページの日英対応',
        'ヘッドレスCMS（コンテンツを自社で更新可能）',
        '記事移行 50記事まで無料（以降1記事¥500〜）',
      ],
      en: [
        'Everything in Light, plus',
        'Location-based project pages',
        'Bilingual (JP/EN) static pages',
        'Headless CMS (update content yourselves)',
        'Article migration — first 50 free (¥500/article after)',
      ],
    },
    tagline: {
      ja: '目的をすべて満たす標準案',
      en: 'The standard plan that covers everything you need',
    },
  },
  {
    name: { ja: 'プレミアム', en: 'Premium' },
    recommended: false,
    price: 420000,
    features: {
      ja: [
        'スタンダードの全内容+',
        '多言語自動翻訳対応（2言語まで、本来¥60,000相当を含む）',
        'SNS（Instagram, Facebook）自動反映',
        '公開後2年間の保守運用ベーシックプラン付き（本来¥216,000相当を¥183,600で提供）',
      ],
      en: [
        'Everything in Standard, plus',
        'Multi-language auto-translation (up to 2 languages, a ¥60,000 value)',
        'Automatic SNS sync (Instagram, Facebook)',
        '2 years of Basic maintenance included after launch (¥216,000 value for ¥183,600)',
      ],
    },
    tagline: {
      ja: '本来¥550,000相当を¥420,000で。+αの機能と2年保守込み',
      en: 'A ¥550,000 value for ¥420,000 — with 2 years of maintenance included',
    },
  },
];

const homepageMaintenancePlans = [
  {
    name: { ja: 'スポット', en: 'Spot' },
    recommended: false,
    price: 0,
    features: {
      ja: [
        '月額固定費なし',
        'エラー・攻撃時のみ都度対応',
        '作業は1件¥5,000〜の実費精算',
        'サーバー費用も無料枠で運用',
      ],
      en: [
        'No fixed monthly fee',
        'Response only when there is an error or attack',
        'Work billed at actual cost, from ¥5,000 per task',
        'Hosting run on free-tier infrastructure',
      ],
    },
    tagline: {
      ja: '普段は自主運用、いざという時だけ頼りたい方に',
      en: 'For those who self-manage day-to-day and just want backup for emergencies',
    },
  },
  {
    name: { ja: 'ベーシック', en: 'Basic' },
    recommended: true,
    price: 9000,
    features: {
      ja: [
        '月次バックアップと稼働監視',
        '緊急対応を月額内で優先受付',
        '軽微な修正 月1時間まで',
        'CMS・ライブラリの更新',
      ],
      en: [
        'Monthly backups and uptime monitoring',
        'Priority handling of urgent issues, within the monthly plan',
        'Minor fixes, up to 1 hour per month',
        'CMS and library updates',
      ],
    },
    tagline: {
      ja: '安心して運用を任せたい方の標準プラン',
      en: 'The standard plan for hands-off, worry-free operation',
    },
  },
  {
    name: { ja: 'アドバイザー', en: 'Advisor' },
    recommended: false,
    price: 30000,
    features: {
      ja: [
        'ベーシックの全内容+',
        '月2回・各30分のオンライン相談（SEO・技術相談）',
        '月次アクセスレポート',
      ],
      en: [
        'Everything in Basic, plus',
        'Two 30-minute online consultations per month (SEO / technical)',
        'Monthly traffic report',
      ],
    },
    tagline: {
      ja: '技術顧問のように使いたい方に',
      en: 'For those who want an ongoing technical advisor',
    },
  },
];

const homepageOptions = [
  { name: { ja: '追加言語（1言語につき）', en: 'Additional language (per language)' }, price: 30000 },
  { name: { ja: '追加の記事移行（51記事目以降、1記事につき）', en: 'Additional article migration (51st article onward, per article)' }, price: 500 },
  { name: { ja: 'ロゴ制作', en: 'Logo design' }, price: 30000 },
  { name: { ja: 'お問い合わせフォーム追加', en: 'Additional contact form' }, price: 15000 },
  { name: { ja: '特急納品（最短1週間）', en: 'Rush delivery (as fast as 1 week)' }, price: 50000 },
];

const homepageFlowSteps = [
  {
    week: { ja: '1〜2週目', en: 'Weeks 1–2' },
    title: { ja: 'じっくりヒアリング', en: 'In-depth discovery' },
    description: {
      ja: '事業内容・ユーザー像・本当に解決したい課題を対話しながら深掘り',
      en: 'Dig into your business, your users, and the problem you actually need solved',
    },
  },
  {
    week: { ja: '3〜5週目', en: 'Weeks 3–5' },
    title: { ja: '設計・デザイン提案', en: 'Structure & design proposal' },
    description: {
      ja: 'ワイヤーフレームとデザインカンプを提示し、フィードバックを重ねてすり合わせ',
      en: 'Present wireframes and design mockups, refining through rounds of feedback',
    },
  },
  {
    week: { ja: '6〜9週目', en: 'Weeks 6–9' },
    title: { ja: '実装', en: 'Implementation' },
    description: {
      ja: 'コーディング・機能実装。進捗をこまめに共有し、方向性のズレを都度確認',
      en: 'Coding and feature development, with frequent check-ins to stay aligned',
    },
  },
  {
    week: { ja: '10〜11週目', en: 'Weeks 10–11' },
    title: { ja: 'レビュー・改善', en: 'Review & refine' },
    description: {
      ja: '実際に触っていただきながら細部を調整。複数回のフィードバックサイクル',
      en: 'You try it hands-on while we fine-tune the details over several feedback cycles',
    },
  },
  {
    week: { ja: '12週目', en: 'Week 12' },
    title: { ja: '確認・公開', en: 'Final review & launch' },
    description: {
      ja: '最終確認後に公開。公開後の運用方法もあわせてご案内',
      en: 'Launch after final review, with guidance on running things afterward',
    },
  },
];

function PlanCard({
  name,
  recommended,
  price,
  priceLabel,
  features,
  tagline,
  locale,
  t,
}: {
  name: { ja: string; en: string };
  recommended: boolean;
  price: number;
  priceLabel?: string;
  features: { ja: string[]; en: string[] };
  tagline: { ja: string; en: string };
  locale: 'ja' | 'en';
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  return (
    <div
      className={`flex flex-col bg-surface-card rounded-2xl border p-6 ${
        recommended ? 'border-accent/40' : 'border-white/5'
      }`}
    >
      <Badge variant="blue" className={`mb-3 self-start ${recommended ? '' : 'invisible'}`}>
        {t('homepagePlan.recommended')}
      </Badge>
      <h4 className="text-primary font-bold text-lg mb-3">{name[locale]}</h4>
      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-primary text-3xl font-bold">
          <Price amountJPY={price} />
        </span>
        {priceLabel && (
          <span className="text-primary text-3xl font-bold">{priceLabel}</span>
        )}
      </div>
      <ul className="space-y-2 mb-5 flex-1">
        {features[locale].map((feature) => (
          <li key={feature} className="text-secondary text-sm leading-relaxed">
            {feature}
          </li>
        ))}
      </ul>
      <p className="text-accent text-xs font-semibold leading-relaxed">
        {tagline[locale]}
      </p>
    </div>
  );
}

export default async function HomepagePlanPage() {
  const t = await getTranslations('services');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as 'ja' | 'en';
  const rates = await getExchangeRates();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
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
        <p className="text-accent text-xs leading-relaxed">{t('homepagePlan.flexibleNote')}</p>
      </div>

      <CurrencyProvider rates={rates}>
        {/* Initial production plans */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-primary font-semibold text-lg">
            {t('homepagePlan.initialPlanHeading')}
          </h3>
          <CurrencySwitcher />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {homepageProductionPlans.map((plan) => (
            <PlanCard
              key={plan.name.en}
              name={plan.name}
              recommended={plan.recommended}
              price={plan.price}
              features={plan.features}
              tagline={plan.tagline}
              locale={locale}
              t={t}
            />
          ))}

          {/* Anchor tier: no fixed price, drives contact for larger scopes */}
          <div className="flex flex-col bg-surface-card rounded-2xl border border-white/5 border-dashed p-6">
            <Badge variant="gray" className="mb-3 invisible">
              {t('homepagePlan.recommended')}
            </Badge>
            <h4 className="text-primary font-bold text-lg mb-3">
              {t('homepagePlan.enterpriseName')}
            </h4>
            <p className="text-secondary text-sm leading-relaxed mb-5 flex-1">
              {t('homepagePlan.enterpriseDescription')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
            >
              {t('homepagePlan.enterpriseCta')}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Maintenance plans */}
        <h3 className="text-primary font-semibold text-lg mb-4">
          {t('homepagePlan.maintenancePlanHeading')}
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {homepageMaintenancePlans.map((plan) => (
            <PlanCard
              key={plan.name.en}
              name={plan.name}
              recommended={plan.recommended}
              price={plan.price}
              priceLabel={t('homepagePlan.monthlyLabel')}
              features={plan.features}
              tagline={plan.tagline}
              locale={locale}
              t={t}
            />
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
                <Price amountJPY={opt.price} prefix="+" />
              </span>
            </div>
          ))}
        </div>
      </CurrencyProvider>

      {/* Flow */}
      <h3 className="text-primary font-semibold text-lg mb-2">{t('homepagePlan.flowHeading')}</h3>
      <p className="text-secondary text-sm leading-relaxed mb-6 max-w-2xl">
        {t('homepagePlan.flowIntro')}
      </p>
      <div className="relative max-w-2xl mb-12">
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/8" />
        <div className="space-y-6">
          {homepageFlowSteps.map((step) => (
            <div key={step.title.en} className="relative pl-10">
              <div className="absolute left-0 top-1 w-7 h-7 rounded-full border-2 border-white/20 bg-surface-card flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-muted" />
              </div>
              <div className="bg-surface-card rounded-xl border border-white/5 p-4">
                <span className="text-accent text-xs font-semibold">{step.week[locale]}</span>
                <p className="text-primary text-sm font-semibold mt-1">{step.title[locale]}</p>
                <p className="text-muted text-xs mt-1">{step.description[locale]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance only */}
      <div className="bg-surface-subtle rounded-2xl border border-white/5 p-6 mb-16">
        <h3 className="text-primary font-semibold text-lg mb-2">
          {t('homepagePlan.maintenanceOnlyTitle')}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-3">
          {t('homepagePlan.maintenanceOnlyDesc')}
        </p>
        <p className="text-muted text-xs leading-relaxed">{t('homepagePlan.maintenanceOnlyNote')}</p>
      </div>

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
