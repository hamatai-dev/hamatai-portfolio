'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: 'ja' | 'en') => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="flex items-center gap-0.5 text-xs font-semibold"
      aria-label="Language switcher"
    >
      {(['ja', 'en'] as const).map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span className="text-muted mx-1 select-none">/</span>
          )}
          <button
            onClick={() => switchLocale(loc)}
            disabled={isPending || locale === loc}
            className={`px-1 py-0.5 rounded transition-colors ${
              locale === loc
                ? 'text-primary cursor-default'
                : 'text-muted hover:text-secondary'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
