import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getMergedNewsItems, getNewsTag } from '@/lib/news';
import { formatDateDotted } from '@/lib/utils';
import type { NewsListItem } from '@/types/news';

function NewsRow({ item }: { item: NewsListItem }) {
  const tag = getNewsTag(item);
  const content = (
    <>
      <span className="font-mono text-[13px] text-muted lg:w-[108px] lg:shrink-0">
        {formatDateDotted(item.publishedAt)}
      </span>
      <span className="self-start rounded-full border border-line px-3 py-1 text-xs text-paper-dim lg:w-[72px] lg:shrink-0 lg:text-center">
        {tag}
      </span>
      <span className="min-w-0 flex-1 text-lg font-medium leading-snug text-paper transition-colors group-hover:text-accent lg:text-[22px]">
        {item.title}
      </span>
      <span aria-hidden className="hidden text-2xl text-muted transition-colors group-hover:text-accent lg:block">
        ↗
      </span>
    </>
  );
  const className =
    'group flex flex-col gap-3 border-b border-line py-8 lg:flex-row lg:items-center lg:gap-8';

  if (item.source === 'note') {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={`/news/${item.slug}`} className={className}>
      {content}
    </Link>
  );
}

export async function NewsSection() {
  const t = await getTranslations('home.news');
  const items = (await getMergedNewsItems()).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="bg-ink-2">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-24 lg:gap-14 lg:px-16 lg:py-[136px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('label')}</p>
            <h2 className="font-display text-[clamp(48px,6.7vw,96px)] leading-none tracking-[-0.02em] text-paper">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-2 self-start border-b border-paper pb-1.5 text-[15px] font-medium text-paper transition-colors hover:border-accent hover:text-accent sm:self-auto"
          >
            {t('viewAll')}
            <span aria-hidden>↗</span>
          </Link>
        </div>

        <div className="border-t border-line">
          {items.map((item) => (
            <NewsRow key={`${item.source}-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
