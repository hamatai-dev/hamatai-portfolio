import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import {
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CheckIcon,
  ArrowRightIcon,
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

const serviceFeatures: Record<string, string[]> = {
  webapp: [
    'フロントエンド・バックエンド両対応',
    'API 設計・実装',
    'DB 設計',
    'CI/CD 構築サポート',
    'パフォーマンス最適化',
  ],
  homepage: [
    'LP・コーポレートサイト',
    'レスポンシブデザイン対応',
    'SEO 対策',
    'CMS 連携',
    'ページスピード最適化',
  ],
  notion: [
    'データベース設計',
    'ページテンプレート作成',
    '社内 Wiki 構築',
    'マニュアル整備サポート',
    '運用レクチャー',
  ],
  mobile: [
    'iOS / Android 対応',
    'クロスプラットフォーム開発',
    'UI/UX 設計',
    'App Store / Play Store 申請サポート',
    'プッシュ通知対応',
  ],
  frontend: [
    'UI コンポーネント実装',
    '既存コードのリファクタリング',
    'パフォーマンス改善',
    'アクセシビリティ対応',
    'デザインシステム構築',
  ],
  consulting: [
    '技術選定アドバイス',
    'アーキテクチャ設計相談',
    'コードレビュー',
    '開発チーム立ち上げ支援',
    '採用基準・面接サポート',
  ],
};

function ServiceCard({
  service,
  t,
}: {
  service: (typeof services)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = serviceIcons[service.id] ?? CodeBracketIcon;
  const features = serviceFeatures[service.id] ?? [];

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
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {service.technologies.map((tech) => (
            <Badge key={tech} variant="blue">
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const tc = useTranslations('common');

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

      {/* CTA */}
      <div className="mt-16 p-8 bg-surface-subtle rounded-2xl border border-white/5 text-center">
        <h3 className="text-primary font-bold text-xl mb-2">
          ご不明な点はお気軽にご相談ください
        </h3>
        <p className="text-secondary text-sm mb-6">
          掲載サービス以外のご要望もお気軽にご相談いただけます。
        </p>
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
