import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import { getArticle, getArticlePaths } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

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
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.thumbnail ? [article.thumbnail.url] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const article = await getArticle(slug);

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16">
      {/* Back */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-medium transition-colors mb-8"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {t('backToList')}
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {article.category && (
            <Badge variant="blue">{article.category.name}</Badge>
          )}
          <time className="text-muted text-sm">
            {t('publishedAt')}:{' '}
            {formatDate(
              article.publishedAt,
              locale === 'ja' ? 'ja-JP' : 'en-US',
            )}
          </time>
        </div>
        <h1 className="text-primary font-bold text-2xl sm:text-3xl leading-snug">
          {article.title}
        </h1>
        {article.description && (
          <p className="text-secondary text-base mt-3 leading-relaxed">
            {article.description}
          </p>
        )}
      </header>

      {/* Thumbnail */}
      {article.thumbnail && (
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/8 mb-10">
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            fill
            className="object-cover"
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
      <div className="mt-16 pt-8 border-t border-white/8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t('backToList')}
        </Link>
      </div>
    </div>
  );
}
