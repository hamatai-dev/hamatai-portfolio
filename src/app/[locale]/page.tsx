import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { works } from '@/data/work';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('siteTitle') };
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const t = useTranslations('hero');
  const tc = useTranslations('common');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.12), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div>
            {/* Available badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t('available')}
            </span>

            {/* Role */}
            <p className="text-secondary text-base font-medium mb-3">{t('role')}</p>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              Taishi
              <br />
              <span className="gradient-text">Hamano</span>
            </h1>

            {/* Description */}
            <p className="text-secondary text-lg leading-relaxed mb-8 max-w-lg">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors"
              >
                {t('ctaPrimary')}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-primary rounded-lg font-semibold hover:bg-white/5 transition-colors"
              >
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/8">
              {[
                { label: t('statLabel1'), value: t('statValue1'), accent: false },
                { label: t('statLabel2'), value: t('statValue2'), accent: true },
                { label: t('statLabel3'), value: t('statValue3'), accent: false },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-muted text-xs mb-0.5">{stat.label}</p>
                  <p
                    className={`text-sm font-semibold ${stat.accent ? 'text-success' : 'text-primary'}`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-6 bg-accent/15 rounded-3xl blur-3xl" />
              {/* Photo container */}
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Taishi Hamano"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative corner badge */}
              <div className="absolute -bottom-4 -left-4 bg-surface-card border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                <p className="text-muted text-xs">Freelance</p>
                <p className="text-primary text-sm font-bold">Web Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services Preview ──────────────────────────────────────────────────────────

const serviceIcons: Record<string, React.ElementType> = {
  webapp: CodeBracketIcon,
  homepage: GlobeAltIcon,
  notion: DocumentTextIcon,
  mobile: DevicePhoneMobileIcon,
  frontend: LightBulbIcon,
  consulting: BriefcaseIcon,
};

const featuredServices = ['webapp', 'homepage', 'consulting'];

function ServicesSection() {
  const t = useTranslations('services');
  const tc = useTranslations('common');

  return (
    <section className="py-24 bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          subtitle={t('subtitle')}
          title={t('title')}
          description={t('description')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredServices.map((id) => {
            const Icon = serviceIcons[id] ?? CodeBracketIcon;
            return (
              <div
                key={id}
                className="group bg-surface-card p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-300 hover:bg-surface-raised"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-primary font-semibold text-lg mb-2">
                  {t(`${id}.title`)}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {t(`${id}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
          >
            {t('viewAll')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Works Preview ─────────────────────────────────────────────────────────────

function WorksSection() {
  const t = useTranslations('works');
  const recentWorks = works.filter((w) => w.featured).slice(0, 3);

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle
            subtitle={t('subtitle')}
            title={t('title')}
            className="mb-0"
          />
          <Link
            href="/works"
            className="hidden sm:inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold transition-colors shrink-0 ml-8"
          >
            {t('viewAll')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentWorks.map((work) => (
            <div
              key={work.id}
              className="group bg-surface-card rounded-2xl border border-white/5 overflow-hidden hover:border-accent/20 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-surface-raised overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-primary font-semibold text-base mb-2">
                  {work.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {work.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {work.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="blue">
                      {tech}
                    </Badge>
                  ))}
                  {work.technologies.length > 3 && (
                    <Badge variant="gray">+{work.technologies.length - 3}</Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {work.liveUrl && (
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-light text-xs font-semibold transition-colors"
                    >
                      {t('viewSite')} ↗
                    </a>
                  )}
                  {work.githubUrl && (
                    <a
                      href={work.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary text-xs font-semibold transition-colors"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-accent text-sm font-semibold"
          >
            {t('viewAll')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Contact CTA ───────────────────────────────────────────────────────────────

function ContactCTASection() {
  const t = useTranslations('contact');
  const tc = useTranslations('common');

  return (
    <section className="py-24 bg-surface-subtle">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          受付中
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          お仕事のご依頼・<br className="sm:hidden" />ご相談はお気軽に
        </h2>
        <p className="text-secondary text-base leading-relaxed mb-8">
          {t('description')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold text-base hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
        >
          {tc('contact')}
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <ContactCTASection />
    </>
  );
}
