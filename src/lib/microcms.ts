import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSContentId,
  MicroCMSDate,
} from 'microcms-js-sdk';
import type { MicroCMSArticle, MicroCMSArticleRaw } from '@/types/microcms';

const getClient = () => {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    return null;
  }

  return createClient({ serviceDomain, apiKey });
};

/** microCMS's image field id is `eyecatch`; normalize it to `thumbnail` for app-wide use. */
function toArticle(
  raw: MicroCMSArticleRaw & MicroCMSContentId & MicroCMSDate,
): MicroCMSArticle {
  const { eyecatch, tags, ...rest } = raw;
  return {
    ...rest,
    thumbnail: eyecatch,
    tags: tags?.map((tag) => tag.text),
    publishedAt: raw.publishedAt ?? raw.createdAt,
    revisedAt: raw.revisedAt ?? raw.updatedAt,
  };
}

const EMPTY_RESPONSE = {
  contents: [] as MicroCMSArticle[],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

export async function getArticles(limit = 9) {
  const client = getClient();
  if (!client) return EMPTY_RESPONSE;

  const data = await client.getList<MicroCMSArticleRaw>({
    endpoint: 'blogs',
    queries: { limit, orders: '-publishedAt' },
  });

  return { ...data, contents: data.contents.map(toArticle) };
}

export async function getArticle(
  contentId: string,
): Promise<MicroCMSArticle | null> {
  const client = getClient();
  if (!client) return null;

  const raw = await client.getListDetail<MicroCMSArticleRaw>({
    endpoint: 'blogs',
    contentId,
  });

  return toArticle(raw);
}

const LIST_PAGE_SIZE = 100;

export async function getAllArticleMeta(): Promise<
  Pick<MicroCMSArticle, 'id' | 'updatedAt' | 'revisedAt'>[]
> {
  const client = getClient();
  if (!client) return [];

  const results: Pick<MicroCMSArticle, 'id' | 'updatedAt' | 'revisedAt'>[] =
    [];
  let offset = 0;

  while (true) {
    const data = await client.getList<MicroCMSArticle>({
      endpoint: 'blogs',
      queries: {
        limit: LIST_PAGE_SIZE,
        offset,
        fields: 'id,updatedAt,revisedAt',
      },
    });
    results.push(...data.contents);
    offset += LIST_PAGE_SIZE;
    if (offset >= data.totalCount) break;
  }

  return results;
}

export async function getArticlePaths() {
  const articles = await getAllArticleMeta();
  return articles.map((article) => article.id);
}
