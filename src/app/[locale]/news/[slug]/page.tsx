import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link, getPathname } from '@/i18n/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import { getArticle, getArticlePaths } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import { getLocalizedAlternates } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/config/site';

export async function generateStaticParams() {
  const paths = await getArticlePaths();
  return paths.flatMap((id) => [
    { locale: 'ja', slug: id },
    { locale: 'en', slug: id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    ...(article.description ? { description: article.description } : {}),
    openGraph: {
      title: article.title,
      ...(article.description ? { description: article.description } : {}),
      images: article.thumbnail ? [article.thumbnail.url] : [],
    },
    alternates: getLocalizedAlternates(`/news/${slug}`, locale as Locale, {
      canonicalLocale: 'ja',
    }),
    ...(article.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const article = await getArticle(slug);

  if (!article) notFound();

  const articleUrl = `${SITE_URL}${getPathname({ href: `/news/${slug}`, locale: 'ja' })}`;
  const articleJsonLd = buildArticleJsonLd(article, articleUrl);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tNav('home'), url: SITE_URL },
    { name: tNav('news'), url: `${SITE_URL}/news` },
    { name: article.title, url: articleUrl },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-20">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Back */}
      <Link
        href="/news"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.05em] text-muted transition-colors hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {t('backToList')}
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-5 flex items-center gap-4">
          {article.category && (
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-paper">
              {article.category.name}
            </span>
          )}
          <time className="font-mono text-xs text-muted">
            {formatDate(
              article.publishedAt,
              locale === 'ja' ? 'ja-JP' : 'en-US',
            )}
          </time>
        </div>
        <h1 className="text-2xl font-bold leading-snug text-paper sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-4 text-base leading-[1.9] text-paper-dim">
            {article.description}
          </p>
        )}
      </header>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="relative mb-12 overflow-hidden rounded-lg border border-line">
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            width={article.thumbnail.width}
            height={article.thumbnail.height}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Footer */}
      <div className="mt-16 border-t border-line pt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 border-b border-paper pb-1.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t('backToList')}
        </Link>
      </div>
    </div>
  );
}
