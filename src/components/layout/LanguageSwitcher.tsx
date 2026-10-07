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
      className="flex items-center font-mono text-[11px] tracking-[0.14em]"
      aria-label="Language switcher"
    >
      {(['ja', 'en'] as const).map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="text-muted mx-1.5 select-none">/</span>}
          <button
            onClick={() => switchLocale(loc)}
            disabled={isPending || locale === loc}
            className={`transition-colors ${
              locale === loc
                ? 'text-paper cursor-default'
                : 'text-muted hover:text-paper'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
