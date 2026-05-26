import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

// ── Skills ────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'REST API', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Mobile',
    skills: ['React Native', 'Expo', 'Swift (基礎)', 'Kotlin (基礎)'],
  },
  {
    category: 'Tools & Others',
    skills: ['Git', 'GitHub', 'Vercel', 'Figma', 'Notion', 'Docker (基礎)'],
  },
];

// ── Career ────────────────────────────────────────────────────────────────────

const career = [
  {
    period: '2026年4月〜',
    role: 'フリーランス Webエンジニア',
    company: '個人事業主',
    description:
      '独立してフリーランスエンジニアとして活動を開始。WebアプリケーションやLP制作、技術顧問など幅広く対応中。',
    current: true,
  },
  // 追加の経歴はここに記入してください
];

// ── Components ────────────────────────────────────────────────────────────────

function ProfileCard() {
  const t = useTranslations('about');
  const tc = useTranslations('common');

  return (
    <div className="bg-surface-card rounded-2xl border border-white/5 p-8 sticky top-24">
      {/* Photo */}
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-5 border border-white/10">
        <Image
          src="/images/profile.jpg"
          alt="Taishi Hamano"
          fill
          className="object-cover object-top"
        />
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
          2026年4月〜 独立
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
                <Badge key={skill} variant="gray">
                  {skill}
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

  return (
    <div className="mt-14">
      <h2 className="text-primary font-bold text-2xl mb-6">{t('career')}</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/8" />

        <div className="space-y-8">
          {career.map((item) => (
            <div key={item.period} className="relative pl-10">
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
                    {item.period}
                  </span>
                  {item.current && (
                    <Badge variant="green">現在</Badge>
                  )}
                </div>
                <h3 className="text-primary font-semibold text-base mb-0.5">
                  {item.role}
                </h3>
                <p className="text-muted text-xs mb-2">{item.company}</p>
                <p className="text-secondary text-sm leading-relaxed">
                  {item.description}
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
