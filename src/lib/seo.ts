import type { Locale } from 'use-intl';
import { routing } from '@/i18n/routing';
import { getPathname } from '@/i18n/navigation';

type LocalizedAlternatesOptions = {
  /** When set, canonical is pinned to this locale and no hreflang alternates are emitted. */
  canonicalLocale?: Locale;
};

export function getLocalizedAlternates(
  href: string,
  currentLocale: Locale,
  options?: LocalizedAlternatesOptions,
) {
  if (options?.canonicalLocale) {
    return {
      canonical: getPathname({ href, locale: options.canonicalLocale }),
    };
  }

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, getPathname({ href, locale })]),
  );
  languages['x-default'] = getPathname({
    href,
    locale: routing.defaultLocale,
  });

  return {
    canonical: getPathname({ href, locale: currentLocale }),
    languages,
  };
}
