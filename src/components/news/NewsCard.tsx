import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import type { NewsListItem } from '@/types/news';

export function NewsCard({ item, locale }: { item: NewsListItem; locale: string }) {
  const cardClassName =
    'group block bg-surface-card rounded-2xl border border-white/5 overflow-hidden hover:border-accent/20 transition-all duration-300';

  const cardContent = (
    <>
      {/* Thumbnail */}
      {item.thumbnailUrl ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
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
          {item.source === 'microcms' && item.category && (
            <Badge variant="blue">{item.category.name}</Badge>
          )}
          {item.source === 'note' && (
            <Badge variant="gray" className="inline-flex items-center gap-1">
              <Image
                src="/images/sns-icon/note.png"
                alt=""
                width={12}
                height={12}
                className="rounded-[2px]"
              />
              note <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </Badge>
          )}
          <span className="text-muted text-xs">
            {formatDate(item.publishedAt, locale === 'ja' ? 'ja-JP' : 'en-US')}
          </span>
        </div>
        <h3 className="text-primary font-semibold text-base leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>
    </>
  );

  if (item.source === 'note') {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/news/${item.slug}`} className={cardClassName}>
      {cardContent}
    </Link>
  );
}
