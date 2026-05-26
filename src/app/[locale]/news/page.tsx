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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return { title: t('title') };
}

// ── SNS links ─────────────────────────────────────────────────────────────────

const snsLinks = [
  {
    name: 'note',
    description: '技術記事・エッセイ',
    href: 'https://note.com/', // ← あなたのnote URLを設定してください
    color: '#41C9B4',
    icon: '✏️',
  },
  {
    name: 'X (Twitter)',
    description: '日々の気づき・開発ログ',
    href: 'https://x.com/hamatai_7109',
    color: '#1DA1F2',
    icon: '𝕏',
  },
  {
    name: 'Instagram',
    description: 'ライフスタイル・作業風景',
    href: 'https://instagram.com/', // ← あなたのInstagram URLを設定してください
    color: '#E1306C',
    icon: '📸',
  },
  {
    name: 'Facebook',
    description: 'ビジネス情報・お知らせ',
    href: 'https://facebook.com/', // ← あなたのFacebook URLを設定してください
    color: '#1877F2',
    icon: '📘',
  },
  {
    name: 'LinkedIn',
    description: 'キャリア・職歴',
    href: 'https://www.linkedin.com/in/bigambitiooon/',
    color: '#0A66C2',
    icon: '💼',
  },
  {
    name: 'GitHub',
    description: 'ソースコード・OSS活動',
    href: 'https://github.com/hamatai-dev',
    color: '#6E40C9',
    icon: '🐙',
  },
];

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

  const { contents: articles } = await getArticles(9);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
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
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${sns.color}20`, border: `1px solid ${sns.color}30` }}
              >
                {sns.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-primary text-sm font-semibold">{sns.name}</p>
                <p className="text-muted text-xs truncate">{sns.description}</p>
              </div>
              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-muted group-hover:text-secondary transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
