import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WorkCases } from '@/components/works/WorkCases';
import { works } from '@/data/work';

export function WorksSection() {
  const t = useTranslations('home.works');

  const cases = works
    .filter((w) => w.featured && w.caseStudy)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return (
    <section className="bg-ink-2">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-24 lg:gap-[88px] lg:px-16 lg:pb-40 lg:pt-[152px]">
        <SectionHeader
          label={t('label')}
          title={t('title1')}
          accent={t('title2')}
          aside={
            <Link
              href="/works"
              className="inline-flex items-center gap-2 border-b border-paper pb-1.5 text-[15px] font-medium text-paper transition-colors hover:border-accent hover:text-accent"
            >
              {t('viewAll')}
              <span aria-hidden>↗</span>
            </Link>
          }
          asideClassName="lg:w-auto lg:pb-3"
        />
        <WorkCases works={cases} />
      </div>
    </section>
  );
}
