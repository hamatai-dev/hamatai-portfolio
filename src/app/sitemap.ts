import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getAllArticleMeta } from '@/lib/microcms';

const STATIC_PATHS = [
  '/',
  '/about',
  '/works',
  '/services',
  '/services/homepage-plan',
  '/news',
  '/contact',
];

function absoluteUrl(pathname: string) {
  return `${SITE_URL}${pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(getPathname({ href: path, locale: routing.defaultLocale })),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          absoluteUrl(getPathname({ href: path, locale })),
        ]),
      ),
    },
  }));

  const articles = await getAllArticleMeta();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(
      getPathname({
        href: `/news/${article.id}`,
        locale: routing.defaultLocale,
      }),
    ),
    lastModified: article.revisedAt || article.updatedAt,
  }));

  return [...staticEntries, ...articleEntries];
}
