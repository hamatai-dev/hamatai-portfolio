import { useTranslations } from 'next-intl';

const KEYS = ['NAME', 'NICKNAME', 'ROLE', 'FROM', 'MODE', 'FOOD', 'HOBBY', 'STATUS'] as const;

export function ProfileMeta() {
  const t = useTranslations('about.meta');

  return (
    <dl className="flex flex-col">
      {KEYS.map((key) => (
        <div
          key={key}
          className="flex items-baseline gap-5 border-b border-line py-3.5 first:border-t lg:first:border-t-0"
        >
          <dt className="w-[72px] shrink-0 font-mono text-[11px] tracking-[0.05em] text-muted">
            {key}
          </dt>
          <dd className="text-sm text-paper">
            {key === 'STATUS' ? (
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                {t(key)}
              </span>
            ) : (
              t(key)
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
