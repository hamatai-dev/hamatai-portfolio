import type { Locale } from 'use-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { getLocalizedAlternates } from '@/lib/seo';
import { socialLinks } from '@/config/site';
import { socialIconComponents } from '@/components/icons/SocialIcons';

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

// ── Social ────────────────────────────────────────────────────────────────────
// href/labelは src/config/site.ts の socialLinks を単一の情報源とし、
// 見た目(色・アイコン)のみこのページ固有で保持する。

const PROFILE_SNS_ORDER = ['github', 'x', 'note', 'youtube', 'instagram', 'facebook', 'linkedin', 'coconala', 'upwork', 'standfm', 'spotify', 'applepodcast', 'substack'] as const;

const PROFILE_SNS_VISUALS: Record<(typeof PROFILE_SNS_ORDER)[number], { color: string }> = {
  github: { color: '#6E40C9' },
  x: { color: '#1DA1F2' },
  note: { color: '#41C9B4' },
  youtube: { color: '#FF0000' },
  instagram: { color: '#E1306C' },
  facebook: { color: '#1877F2' },
  linkedin: { color: '#0A66C2' },
  coconala: { color: '#FC6674' },
  upwork: { color: '#14A800' },
  standfm: { color: '#4D77FF' },
  spotify: { color: '#1DB954' },
  applepodcast: { color: '#A855F7' },
  substack: { color: '#FF6719' },
};

const profileSnsLinks = PROFILE_SNS_ORDER.map((id) => {
  const social = socialLinks.find((s) => s.id === id)!;
  return {
    id,
    name: social.label,
    href: social.href,
    Icon: socialIconComponents[id],
    ...PROFILE_SNS_VISUALS[id],
  };
});

// ── Skills ────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Vue.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'HTML/CSS' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Spring Boot' },
      { name: 'REST API' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'Swift', basic: true },
      { name: 'Kotlin', basic: true },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Vercel' },
      { name: 'Figma' },
      { name: 'Notion' },
      { name: 'Docker' },
    ],
  },
];

// ── Career ────────────────────────────────────────────────────────────────────

const career = [
  {
    period: { ja: '2026年4月〜', en: 'Since Apr 2026' },
    role: { ja: 'フリーランス Webエンジニア', en: 'Freelance Web Engineer' },
    company: { ja: '個人事業主', en: 'Self-Employed' },
    description: {
      ja: '独立してフリーランスエンジニアとして活動を開始。Webアプリケーションやホームページ制作、技術顧問など幅広く対応中。現在は世界を旅しながらノマドとして活動しています。',
      en: 'Went independent as a freelance engineer, working broadly across web application development, website creation, and technical consulting. Currently working as a digital nomad while traveling the world.',
    },
    current: true,
  },
  {
    period: { ja: '2024年4月〜2026年3月', en: 'Apr 2024 – Mar 2026' },
    role: { ja: 'Webエンジニア', en: 'Web Engineer' },
    company: { ja: 'アルサーガパートナーズ株式会社', en: 'Arsaga Partners Inc.' },
    description: {
      ja: '金融系Webアプリのバックエンド・インフラ構築およびAndroidアプリ開発に従事。アジャイル開発におけるスクラム、ウォーターフォールでのプロジェクト管理まで一貫して経験し、幅広い技術を習得しました。',
      en: 'Worked on backend and infrastructure development for a fintech web application, as well as Android app development. Gained end-to-end experience in both Scrum-based agile development and waterfall project management, building a broad technical skill set.',
    },
    current: false,
  },
  {
    period: { ja: '2022年11月〜2024年3月', en: 'Nov 2022 – Mar 2024' },
    role: { ja: 'Webエンジニア', en: 'Web Engineer' },
    company: { ja: '株式会社SEアシスト', en: 'SE Assist Co., Ltd.' },
    description: {
      ja: '中小企業向けのWebデザインおよびWebアプリのフロントエンド開発を担当。UI/UXを意識した実装経験を積みました。',
      en: 'Handled web design and frontend development of web applications for small and medium-sized businesses, gaining hands-on experience with a strong focus on UI/UX.',
    },
    current: false,
  },
  {
    period: { ja: '2022年4月〜2022年10月', en: 'Apr 2022 – Oct 2022' },
    role: { ja: 'コンサルタント', en: 'Consultant' },
    company: { ja: '株式会社公文教育研究会', en: 'Kumon Institute of Education Co., Ltd.' },
    description: {
      ja: '教室の新規開設や既存教室の運営をサポートするコンサルタントとして勤務。',
      en: 'Worked as a consultant supporting the launch of new classrooms and the operation of existing ones.',
    },
    current: false,
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function ProfileCard() {
  const t = useTranslations('about');
  const tc = useTranslations('common');
  const locale = useLocale() as 'ja' | 'en';

  return (
    <div className="bg-surface-card rounded-2xl border border-white/5 p-8 sticky top-24">
      {/* Photo + Social */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/profile.jpg"
            alt="Taishi Hamano"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {profileSnsLinks.map((sns) => (
            <a
              key={sns.id}
              href={sns.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sns.name}
              title={sns.name}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-transform hover:scale-110"
              style={{ backgroundColor: `${sns.color}20`, border: `1px solid ${sns.color}30`, color: sns.color }}
            >
              <sns.Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Name */}
      <h1 className="text-primary font-bold text-xl mb-0.5">{t('name')}</h1>
      <p className="text-muted text-xs mb-3">{t('nameEn')}</p>

      {/* Role badge */}
      <Badge variant="blue" className="mb-4">
        {t('role')}
      </Badge>

      {/* Info */}
      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-2 text-secondary text-sm">
          <MapPinIcon className="h-4 w-4 text-muted shrink-0" />
          {t('location')}
        </div>
        <div className="flex items-center gap-2 text-secondary text-sm">
          <CalendarIcon className="h-4 w-4 text-muted shrink-0" />
          {career[0].period[locale]}
        </div>
      </div>

      {/* Available badge */}
      <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl mb-6">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
        <span className="text-success text-sm font-medium">{t('available')}</span>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-colors"
      >
        {t('contactCta')}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

function BioSection() {
  const t = useTranslations('about');

  return (
    <div>
      <SectionTitle subtitle={t('subtitle')} title={t('title')} />
      <p className="text-secondary text-base leading-relaxed">{t('bio')}</p>
    </div>
  );
}

function SkillsSection() {
  const t = useTranslations('about');

  return (
    <div className="mt-14">
      <h2 className="text-primary font-bold text-2xl mb-6">{t('skills')}</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="bg-surface-card rounded-2xl border border-white/5 p-5"
          >
            <h3 className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill.name} variant="gray">
                  {skill.name}
                  {skill.basic && ` (${t('basic')})`}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerSection() {
  const t = useTranslations('about');
  const locale = useLocale() as 'ja' | 'en';

  return (
    <div className="mt-14">
      <h2 className="text-primary font-bold text-2xl mb-6">{t('career')}</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/8" />

        <div className="space-y-8">
          {career.map((item) => (
            <div key={item.period.en} className="relative pl-10">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                  item.current
                    ? 'border-accent bg-accent/20'
                    : 'border-white/20 bg-surface-card'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${item.current ? 'bg-accent animate-pulse' : 'bg-muted'}`}
                />
              </div>

              {/* Content */}
              <div className="bg-surface-card rounded-2xl border border-white/5 p-5">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-accent text-xs font-semibold">
                    {item.period[locale]}
                  </span>
                  {item.current && (
                    <Badge variant="green">{t('current')}</Badge>
                  )}
                </div>
                <h3 className="text-primary font-semibold text-base mb-0.5">
                  {item.role[locale]}
                </h3>
                <p className="text-muted text-xs mb-2">{item.company[locale]}</p>
                <p className="text-secondary text-sm leading-relaxed">
                  {item.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <ProfileCard />
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2">
          <BioSection />
          <SkillsSection />
          <CareerSection />
        </div>
      </div>
    </div>
  );
}
