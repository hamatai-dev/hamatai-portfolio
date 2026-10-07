import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getMergedNewsItems, getNewsTag, getNewsTagCounts } from '@/lib/news';
import { getLocalizedAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/config/site';
import { PageHero, PageHeroIntro } from '@/components/layout/PageHero';
import { FilterBar } from '@/components/ui/FilterBar';
import { FeaturedArticle } from '@/components/news/FeaturedArticle';
import { ArchiveRow } from '@/components/news/ArchiveRow';
import { NewsPagination } from '@/components/news/NewsPagination';
import { FollowSection } from '@/components/news/FollowSection';

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

const PAGE_SIZE = 9;
const pad = (n: number) => String(n).padStart(2, '0');

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam, tag: tagParam } = await searchParams;

  const t = await getTranslations({ locale, namespace: 'news' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const allItems = await getMergedNewsItems();
  const tagCounts = getNewsTagCounts(allItems);

  const activeTag = tagCounts.some((c) => c.tag === tagParam) ? tagParam : undefined;
  const items = activeTag ? allItems.filter((i) => getNewsTag(i) === activeTag) : allItems;

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = items.slice(startIndex, startIndex + PAGE_SIZE);
  // 先頭ページの先頭記事だけを注目記事として大きく見せる
  const featured = currentPage === 1 ? pageItems[0] : undefined;
  const archive = featured ? pageItems.slice(1) : pageItems;
  const archiveStart = startIndex + (featured ? 2 : 1);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: SITE_URL },
    { name: tNav('news'), url: `${SITE_URL}/news` },
  ]);

  const filterOptions = [
    {
      key: 'all',
      label: t('filterAll'),
      count: allItems.length,
      href: { pathname: '/news' as const },
    },
    ...tagCounts.map(({ tag, count }) => ({
      key: tag,
      label: tag,
      count,
      href: { pathname: '/news' as const, query: { tag } },
    })),
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        label={t('hero.label')}
        title={t('hero.title')}
        accent={t('hero.accent')}
        aside={<PageHeroIntro>{t('hero.intro')}</PageHeroIntro>}
        below={<FilterBar options={filterOptions} value={activeTag ?? 'all'} note={t('sort')} />}
        compact
      />

      <section className="bg-ink">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-20 px-6 pb-24 pt-4 lg:px-16 lg:pb-[120px] lg:pt-10">
          {items.length === 0 ? (
            <p className="py-16 text-center text-base text-muted">{t('noArticles')}</p>
          ) : (
            <>
              {featured && <FeaturedArticle item={featured} locale={locale} />}

              {archive.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex items-end justify-between pb-6">
                    <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('archive')}</p>
                    <p className="font-mono text-xs text-muted">
                      {pad(archiveStart)} — {pad(archiveStart + archive.length - 1)} / {pad(items.length)}
                    </p>
                  </div>
                  <ul className="border-t border-line">
                    {archive.map((item, i) => (
                      <ArchiveRow
                        key={`${item.source}-${item.id}`}
                        item={item}
                        no={archiveStart + i}
                        locale={locale}
                      />
                    ))}
                  </ul>
                </div>
              )}

              <NewsPagination currentPage={currentPage} totalPages={totalPages} tag={activeTag} />
            </>
          )}
        </div>
      </section>

      <FollowSection />
    </>
  );
}
