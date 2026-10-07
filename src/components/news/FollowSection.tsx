import { useTranslations } from 'next-intl';
import { socialLinks } from '@/config/site';

const FOLLOW_ORDER = [
  'x',
  'youtube',
  'instagram',
  'facebook',
  'linkedin',
  'github',
  'coconala',
  'standfm',
  'spotify',
  'applepodcast',
  'substack',
  'note',
] as const;

export function FollowSection() {
  const t = useTranslations('news.follow');
  const links = FOLLOW_ORDER.map((id) => socialLinks.find((s) => s.id === id)).filter(
    (s): s is (typeof socialLinks)[number] => Boolean(s),
  );

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:pb-[120px] lg:pt-20">
        <div className="flex shrink-0 flex-col gap-6 lg:w-[380px]">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('label')}</p>
          <h2 className="flex flex-wrap items-baseline gap-x-3.5 font-display text-5xl leading-none tracking-[-0.02em] text-paper lg:text-[64px]">
            {t('title')}
            <span className="italic text-accent">{t('accent')}</span>
          </h2>
        </div>
        <ul className="flex flex-1 flex-wrap gap-3">
          {links.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
                <span aria-hidden className="text-xs text-muted">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
