import type { Locale } from 'use-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { getArticles } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import type { MicroCMSArticle } from '@/types/microcms';
import { getLocalizedAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL, socialLinks } from '@/config/site';
import { socialIconComponents } from '@/components/icons/SocialIcons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
    alternates: getLocalizedAlternates('/news', locale as Locale),
  };
}

// ── SNS links ─────────────────────────────────────────────────────────────────
// href/labelは src/config/site.ts の socialLinks を単一の情報源とし、
// 見た目(色・アイコン)のみこのページ固有で保持する。

const NEWS_SNS_ORDER = [
  'note',
  'x',
  'youtube',
  'instagram',
  'facebook',
  'linkedin',
  'github',
  'coconala',
  'upwork',
  'standfm',
  'spotify',
  'applepodcast',
  'substack',
] as const;

const SNS_VISUALS: Record<(typeof NEWS_SNS_ORDER)[number], { color: string }> = {
  note: { color: '#41C9B4' },
  x: { color: '#1DA1F2' },
  youtube: { color: '#FF0000' },
  instagram: { color: '#E1306C' },
  facebook: { color: '#1877F2' },
  linkedin: { color: '#0A66C2' },
  standfm: { color: '#4D77FF' },
  spotify: { color: '#1DB954' },
  applepodcast: { color: '#A855F7' },
  substack: { color: '#FF6719' },
  github: { color: '#6E40C9' },
  coconala: { color: '#FC6674' },
  upwork: { color: '#14A800' },
};

const snsLinks = NEWS_SNS_ORDER.map((id) => {
  const social = socialLinks.find((s) => s.id === id)!;
  return {
    id,
    name: social.label,
    href: social.href,
    Icon: socialIconComponents[id],
    ...SNS_VISUALS[id],
  };
});

// ── Article card ──────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  locale,
  t,
}: {
  article: MicroCMSArticle;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <Link
      href={`/news/${article.id}`}
      className="group block bg-surface-card rounded-2xl border border-white/5 overflow-hidden hover:border-accent/20 transition-all duration-300"
    >
      {/* Thumbnail */}
      {article.thumbnail ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-44 bg-surface-raised flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {article.category && (
            <Badge variant="blue">{article.category.name}</Badge>
          )}
          <span className="text-muted text-xs">
            {formatDate(article.publishedAt, locale === 'ja' ? 'ja-JP' : 'en-US')}
          </span>
        </div>
        <h3 className="text-primary font-semibold text-base leading-snug line-clamp-2 mb-2">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-secondary text-xs leading-relaxed line-clamp-2">
            {article.description}
          </p>
        )}
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const { contents: articles } = await getArticles(9);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: SITE_URL },
    { name: tNav('news'), url: `${SITE_URL}/news` },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Header */}
      <SectionTitle
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      {/* Articles */}
      <section className="mb-20">
        <h2 className="text-primary font-bold text-xl mb-6">{t('articles')}</h2>

        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                locale={locale}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-card rounded-2xl border border-white/5">
            <p className="text-muted text-base">📝 {t('noArticles')}</p>
          </div>
        )}
      </section>

      {/* SNS Hub */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-primary font-bold text-xl">{t('followMe')}</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {snsLinks.map((sns) => (
            <a
              key={sns.name}
              href={sns.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-surface-card rounded-xl border border-white/5 hover:border-white/15 transition-all duration-200 hover:bg-surface-raised"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${sns.color}20`, border: `1px solid ${sns.color}30`, color: sns.color }}
              >
                <sns.Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-primary text-sm font-semibold">{sns.name}</p>
                <p className="text-muted text-xs truncate">{t(`sns.${sns.id}` as 'sns.note')}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-muted group-hover:text-secondary transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
