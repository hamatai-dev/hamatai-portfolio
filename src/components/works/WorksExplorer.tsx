'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FilterBar } from '@/components/ui/FilterBar';
import { WorkCases } from '@/components/works/WorkCases';
import type { Work, WorkCategory } from '@/types/work';

type Filter = 'all' | WorkCategory;

/** Works ページの本体。フィルタ帯と、絞り込んだケース一覧を表示する。 */
export function WorksExplorer({ works }: { works: Work[] }) {
  const t = useTranslations('works');
  const [filter, setFilter] = useState<Filter>('all');

  const sorted = [...works].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const count = (c: WorkCategory) => sorted.filter((w) => w.category === c).length;
  const visible = filter === 'all' ? sorted : sorted.filter((w) => w.category === filter);

  const options = [
    { key: 'all' as const, label: t('filterAll'), count: sorted.length },
    { key: 'webapp' as const, label: t('categoryWebapp'), count: count('webapp') },
    { key: 'website' as const, label: t('categoryWebsite'), count: count('website') },
  ].filter((o) => o.key === 'all' || o.count > 0);

  return (
    <>
      <div className="bg-ink">
        <div className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-16 lg:pb-14">
          <FilterBar options={options} value={filter} onChange={setFilter} note={t('sort')} />
        </div>
      </div>
      <section className="bg-ink">
        <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-4 lg:px-16 lg:pb-40 lg:pt-10">
          <WorkCases key={filter} works={visible} />
        </div>
      </section>
    </>
  );
}
