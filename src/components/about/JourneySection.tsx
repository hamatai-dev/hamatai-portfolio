import { useLocale, useTranslations } from 'next-intl';
import { WorldMapHero } from '@/components/home/WorldMapHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getRouteLog, plannedCountries, type RouteLogCountry } from '@/data/journey';

type Locale = 'ja' | 'en';

function CountryRow({
  index,
  country,
  locale,
}: {
  index: number;
  country: RouteLogCountry;
  locale: Locale;
}) {
  const t = useTranslations('about.journey');
  const planned = country.status === 'planned';
  const current = country.status === 'current';
  const sub = locale === 'ja' ? country.en : country.ja;

  return (
    <li className="flex items-center gap-4 border-b border-line py-4 lg:gap-5">
      <span className={`w-8 shrink-0 font-mono text-xs ${current ? 'text-accent' : 'text-muted'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className={`min-w-0 flex-1 font-display text-2xl leading-none lg:text-[28px] ${
          current ? 'italic text-accent' : planned ? 'text-muted' : 'text-paper'
        }`}
      >
        {country.en}
      </span>
      <span
        className={`hidden w-[120px] shrink-0 text-[13px] sm:block ${
          planned ? 'text-muted' : 'text-paper-dim'
        }`}
      >
        {sub}
      </span>
      <span className="flex w-[76px] shrink-0 justify-end">
        {current ? (
          <span className="rounded bg-accent px-2 py-[3px] font-mono text-[10px] font-semibold text-ink">
            {t('now')}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted">
            {planned ? t('statusPlanned') : t('statusVisited')}
          </span>
        )}
      </span>
    </li>
  );
}

export function JourneySection() {
  const t = useTranslations('about.journey');
  const locale = useLocale() as Locale;

  const log = getRouteLog();
  const visitedCount = log.filter((c) => c.status !== 'planned').length;
  const half = Math.ceil(log.length / 2);
  const columns = [log.slice(0, half), log.slice(half)];

  const nextFrom = plannedCountries[0];
  const nextTo = plannedCountries[plannedCountries.length - 1];

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 lg:px-16 lg:pb-[72px]">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          accent={t('accent')}
          aside={<p className="text-[15px] leading-[1.9] text-paper-dim">{t('intro')}</p>}
        />
      </div>

      <WorldMapHero />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 pb-24 pt-14 lg:gap-14 lg:px-16 lg:pb-40 lg:pt-[72px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">
            {t('logTitle', { total: log.length, visited: visitedCount })}
          </p>
          <div className="flex items-center gap-7 text-xs text-paper-dim">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {t('legendVisited')}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-paper-dim" />
              {t('legendPlanned')}
            </span>
          </div>
        </div>

        <div className="grid gap-x-16 border-t border-line lg:grid-cols-2">
          {columns.map((col, ci) => (
            <ul key={ci}>
              {col.map((country, i) => (
                <CountryRow
                  key={country.en}
                  index={ci * half + i}
                  country={country}
                  locale={locale}
                />
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="font-mono text-xs text-accent">{t('next')}</span>
          <span className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper">
            {nextFrom[locale]}
          </span>
          <span className="text-sm text-muted">→</span>
          <span className="text-sm text-paper-dim">{t('nextVia')}</span>
          <span className="text-sm text-muted">→</span>
          <span className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper">
            {nextTo[locale]}
          </span>
          <span className="font-mono text-xs text-muted">{t('until')}</span>
        </div>
      </div>
    </section>
  );
}
