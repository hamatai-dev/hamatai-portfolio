import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { Work } from '@/types/work';

type Locale = 'ja' | 'en';

/** `スマロア(福岡の…)` のような括弧付きタイトルから、括弧以降を除いた見出しを作る。 */
const shortTitle = (title: string) => title.replace(/[(（].*$/, '');

function VisitLink({ href }: { href: string }) {
  const t = useTranslations('works.case');
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 self-start border-b border-paper pb-[5px] text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
    >
      {t('visit')}
      <span aria-hidden>↗</span>
    </a>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-line px-3 py-1.5 text-xs text-paper-dim"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function CaseDetails({ work, locale }: { work: Work; locale: Locale }) {
  const t = useTranslations('works.case');
  const study = work.caseStudy;
  if (!study) return null;

  const rows = [
    { key: t('challenge'), value: study.challenge[locale] },
    { key: t('solution'), value: study.solution[locale] },
    { key: t('role'), value: study.role[locale] },
    { key: t('result'), value: study.result[locale] },
  ];

  return (
    <dl className="flex flex-col">
      {rows.map((row) => (
        <div key={row.key} className="flex gap-5 border-t border-line py-4 last:border-b">
          <dt className="w-10 shrink-0 text-sm font-bold text-accent">{row.key}</dt>
          <dd className="text-sm leading-[1.8] text-paper">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseImage({
  work,
  index,
  locale,
  large,
}: {
  work: Work;
  index: number;
  locale: Locale;
  large?: boolean;
}) {
  const study = work.caseStudy;
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-ink-2 ${
        large ? 'aspect-[16/10] lg:aspect-[1312/640]' : 'aspect-[8/5]'
      }`}
    >
      <Image
        src={work.image}
        alt={work.title[locale]}
        fill
        sizes={large ? '(min-width: 1440px) 1312px, 100vw' : '(min-width: 1024px) 640px, 100vw'}
        className="object-cover object-top"
      />
      {study && (
        <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3.5 py-1.5 font-mono text-[11px] text-paper">
          {String(index + 1).padStart(2, '0')} / {study.kind}
        </span>
      )}
    </div>
  );
}

/** 先頭1件を大きく、残りを2カラムで並べるケーススタディ一覧(トップ・Works 共通)。 */
export function WorkCases({ works }: { works: Work[] }) {
  const locale = useLocale() as Locale;
  const [first, ...rest] = works;

  return (
    <div className="flex flex-col gap-16 lg:gap-[88px]">
      {first && (
        <article className="flex flex-col gap-8 lg:gap-10">
          <CaseImage work={first} index={0} locale={locale} large />
          <div className="grid gap-10 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24">
            <div className="flex flex-col gap-5">
              <h3 className="text-4xl font-bold text-paper lg:text-[40px]">
                {shortTitle(first.title[locale])}
              </h3>
              <p className="text-base text-paper-dim">{first.caseStudy?.subtitle[locale]}</p>
              <Tags items={first.technologies} />
              {first.liveUrl && <VisitLink href={first.liveUrl} />}
            </div>
            <CaseDetails work={first} locale={locale} />
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
          {rest.map((work, i) => (
            <article key={work.id} className="flex flex-col gap-8">
              <CaseImage work={work} index={i + 1} locale={locale} />
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[28px] font-bold leading-tight text-paper">
                    {shortTitle(work.title[locale])}
                  </h3>
                  <p className="text-sm text-paper-dim">{work.caseStudy?.subtitle[locale]}</p>
                </div>
                {work.liveUrl && <VisitLink href={work.liveUrl} />}
              </div>
              <Tags items={work.technologies} />
              <CaseDetails work={work} locale={locale} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
