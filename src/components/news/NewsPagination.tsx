import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function NewsPagination({
  currentPage,
  totalPages,
  tag,
}: {
  currentPage: number;
  totalPages: number;
  /** 絞り込み中のタグ。ページ移動時も維持する */
  tag?: string;
}) {
  const t = useTranslations('news');
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => ({
    pathname: '/news' as const,
    query: { ...(tag ? { tag } : {}), ...(page > 1 ? { page } : {}) },
  });
  const pill =
    'inline-flex h-10 items-center justify-center rounded-full border px-5 text-sm font-semibold transition-colors';

  return (
    <nav
      aria-label="pagination"
      className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="font-mono text-[11px] tracking-[0.05em] text-muted">
        {t('pageStatus', {
          current: String(currentPage).padStart(2, '0'),
          total: String(totalPages).padStart(2, '0'),
        })}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {currentPage > 1 && (
          <Link
            href={hrefFor(currentPage - 1)}
            className={cn(pill, 'border-line text-paper hover:border-paper')}
          >
            {t('prevPage')}
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={hrefFor(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs transition-colors',
              page === currentPage
                ? 'border-accent bg-accent text-ink'
                : 'border-line text-paper hover:border-paper',
            )}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={hrefFor(currentPage + 1)}
            className={cn(pill, 'gap-2 border-line text-paper hover:border-paper')}
          >
            {t('nextPage')}
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
