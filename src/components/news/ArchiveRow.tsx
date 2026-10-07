import Image from 'next/image';
import { NewsLink } from '@/components/news/NewsLink';
import { getNewsTag } from '@/lib/news';
import { formatDate } from '@/lib/utils';
import type { NewsListItem } from '@/types/news';

export function ArchiveRow({
  item,
  no,
  locale,
}: {
  item: NewsListItem;
  no: number;
  locale: string;
}) {
  return (
    <li>
      <NewsLink
        item={item}
        className="group flex items-center gap-4 border-b border-line py-6 sm:gap-6 lg:gap-8 lg:py-7"
      >
        <span className="hidden w-6 shrink-0 font-mono text-[11px] text-accent sm:block">
          {String(no).padStart(2, '0')}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <span className="font-mono text-xs text-muted lg:w-[120px] lg:shrink-0">
            {formatDate(item.publishedAt, locale === 'ja' ? 'ja-JP' : 'en-US')}
          </span>
          <span className="self-start rounded-full border border-line px-3 py-1 text-xs font-medium text-paper lg:w-[110px] lg:shrink-0 lg:self-auto lg:text-center">
            {getNewsTag(item)}
          </span>
          <span className="min-w-0 flex-1 text-base font-medium leading-snug text-paper transition-colors group-hover:text-accent lg:text-xl">
            {item.title}
          </span>
        </div>
        <div className="relative hidden h-[100px] w-[180px] shrink-0 overflow-hidden rounded-md bg-ink-2 sm:block">
          {item.thumbnailUrl && (
            <Image
              src={item.thumbnailUrl}
              alt=""
              fill
              sizes="180px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <span
          aria-hidden
          className="hidden text-xl text-muted transition-colors group-hover:text-accent lg:block"
        >
          ↗
        </span>
      </NewsLink>
    </li>
  );
}
