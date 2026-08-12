import { SITE_URL, SITE_NAME, AUTHOR_NAME_JA, socialLinks } from '@/config/site';
import type { MicroCMSArticle } from '@/types/microcms';

export function buildPersonWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: AUTHOR_NAME_JA,
        alternateName: SITE_NAME,
        url: SITE_URL,
        sameAs: socialLinks.map((s) => s.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'ja',
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(article: MicroCMSArticle, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.thumbnail ? [article.thumbnail.url] : undefined,
    url,
    datePublished: article.publishedAt,
    dateModified: article.revisedAt || article.updatedAt,
    inLanguage: 'ja',
    articleSection: article.category?.name,
    keywords: article.tags?.length ? article.tags.join(', ') : undefined,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
  };
}
