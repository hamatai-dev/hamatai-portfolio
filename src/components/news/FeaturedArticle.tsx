import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { NewsLink } from '@/components/news/NewsLink';
import { getNewsTag } from '@/lib/news';
import { formatDate } from '@/lib/utils';
import type { NewsListItem } from '@/types/news';

export function FeaturedArticle({ item, locale }: { item: NewsListItem; locale: string }) {
  const t = useTranslations('news');

  return (
    <NewsLink
      item={item}
      className="group grid gap-8 lg:grid-cols-[minmax(0,760fr)_minmax(0,496fr)] lg:gap-14"
    >
      <div className="relative aspect-[760/460] w-full overflow-hidden rounded-lg bg-ink-2">
        {item.thumbnailUrl && (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1440px) 760px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
        )}
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3.5 py-1.5 font-mono text-[11px] text-paper">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t('latest')}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted">
              {formatDate(item.publishedAt, locale === 'ja' ? 'ja-JP' : 'en-US')}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-paper">
              {getNewsTag(item)}
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-[1.45] text-paper transition-colors group-hover:text-accent lg:text-[32px]">
            {item.title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 self-start border-b border-paper pb-[5px] text-sm font-semibold text-paper transition-colors group-hover:border-accent group-hover:text-accent">
          {item.source === 'note' ? t('readOnNote') : t('readArticle')}
          <span aria-hidden>↗</span>
        </span>
      </div>
    </NewsLink>
  );
}
