import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { NewsListItem } from '@/types/news';

/** note は外部リンク、microCMS は記事ページへの内部リンクとして描画する。 */
export function NewsLink({
  item,
  className,
  children,
}: {
  item: NewsListItem;
  className?: string;
  children: ReactNode;
}) {
  if (item.source === 'note') {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/news/${item.slug}`} className={className}>
      {children}
    </Link>
  );
}
