import { useLocale, useTranslations } from 'next-intl';
import { career } from '@/data/career';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function CareerSection() {
  const t = useTranslations('about.career');
  const locale = useLocale() as 'ja' | 'en';

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-24 lg:gap-20 lg:px-16 lg:pb-40 lg:pt-[152px]">
        <SectionHeader label={t('label')} title={t('title')} accent={t('accent')} />

        <ol className="border-t border-accent">
          {career.map((item) => (
            <li
              key={item.from}
              className="grid gap-4 border-b border-line py-9 lg:grid-cols-[280px_440px_minmax(0,1fr)] lg:gap-8"
            >
              <div className="flex flex-col items-start gap-3">
                <span
                  className={`font-mono text-[13px] ${item.current ? 'text-accent' : 'text-muted'}`}
                >
                  {item.from} — {item.to ?? ''}
                </span>
                {item.current && (
                  <span className="rounded bg-accent px-2 py-[3px] font-mono text-[10px] font-semibold text-ink">
                    {t('now')}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-xl font-bold text-paper lg:text-2xl">{item.role[locale]}</h3>
                <p className="text-sm text-muted">{item.company[locale]}</p>
              </div>
              <p className="text-[15px] leading-[1.9] text-paper-dim">{item.description[locale]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
