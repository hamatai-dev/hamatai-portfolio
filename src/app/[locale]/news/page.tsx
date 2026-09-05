import type { Locale } from 'use-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getMergedNewsItems } from '@/lib/news';
import { cn } from '@/lib/utils';
import { getLocalizedAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL, socialLinks } from '@/config/site';
import { SnsIconChip } from '@/components/icons/SocialIcons';
import { NewsCard } from '@/components/news/NewsCard';

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
};

const snsLinks = NEWS_SNS_ORDER.map((id) => {
  const social = socialLinks.find((s) => s.id === id)!;
  return {
    id,
    name: social.label,
    href: social.href,
    ...SNS_VISUALS[id],
  };
});

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  t,
}: {
  currentPage: number;
  totalPages: number;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => ({ pathname: '/news' as const, query: { page } });

  const navButtonClass =
    'inline-flex items-center justify-center h-10 px-4 rounded-lg border text-sm font-semibold transition-colors';
  const enabledNavClass =
    'border-white/10 text-secondary hover:border-white/20 hover:text-primary';
  const disabledNavClass = 'border-white/5 text-muted opacity-40 cursor-not-allowed';

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="pagination">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} className={cn(navButtonClass, enabledNavClass)}>
          {t('prevPage')}
        </Link>
      ) : (
        <span className={cn(navButtonClass, disabledNavClass)}>{t('prevPage')}</span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              'inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-semibold transition-colors',
              page === currentPage
                ? 'bg-accent text-white'
                : 'border border-white/10 text-secondary hover:border-white/20 hover:text-primary',
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} className={cn(navButtonClass, enabledNavClass)}>
          {t('nextPage')}
        </Link>
      ) : (
        <span className={cn(navButtonClass, disabledNavClass)}>{t('nextPage')}</span>
      )}
    </nav>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 9;

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;

  const t = await getTranslations({ locale, namespace: 'news' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const allItems = await getMergedNewsItems();

  const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const articles = allItems.slice(startIndex, startIndex + PAGE_SIZE);

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
            {articles.map((item) => (
              <NewsCard key={`${item.source}-${item.id}`} item={item} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-card rounded-2xl border border-white/5">
            <p className="text-muted text-base">📝 {t('noArticles')}</p>
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} t={t} />
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
              <SnsIconChip
                id={sns.id}
                color={sns.color}
                size={40}
                className="transition-transform group-hover:scale-110"
              />
              <div className="flex-1 min-w-0">
                <p className="text-primary text-sm font-semibold truncate">{sns.name}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-muted group-hover:text-secondary transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
