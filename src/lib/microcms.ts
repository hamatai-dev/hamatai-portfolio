import { createClient } from 'microcms-js-sdk';
import type { MicroCMSArticle } from '@/types/microcms';

const getClient = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    return null;
  }

  return createClient({ serviceDomain, apiKey });
};

const EMPTY_RESPONSE = {
  contents: [] as MicroCMSArticle[],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

export async function getArticles(limit = 9) {
  const client = getClient();
  if (!client) return EMPTY_RESPONSE;

  return client.getList<MicroCMSArticle>({
    endpoint: 'blogs',
    queries: { limit, orders: '-publishedAt' },
  });
}

export async function getArticle(
  contentId: string,
): Promise<MicroCMSArticle | null> {
  const client = getClient();
  if (!client) return null;

  return client.getListDetail<MicroCMSArticle>({
    endpoint: 'blogs',
    contentId,
  });
}

export async function getArticlePaths() {
  const client = getClient();
  if (!client) return [];

  const data = await client.getList<MicroCMSArticle>({
    endpoint: 'blogs',
    queries: { limit: 100, fields: 'id' },
  });

  return data.contents.map((article) => article.id);
}
