import { getAllArticles } from '@/lib/microcms';
import { getAllNoteArticles, type NoteArticle } from '@/lib/note';
import type { MicroCMSArticle } from '@/types/microcms';
import type { MicroCMSNewsItem, NewsListItem, NoteNewsItem } from '@/types/news';

function toMicroCMSNewsItem(article: MicroCMSArticle): MicroCMSNewsItem {
  return {
    source: 'microcms',
    id: article.id,
    slug: article.id,
    title: article.title,
    thumbnailUrl: article.thumbnail?.url,
    publishedAt: article.publishedAt,
    category: article.category,
  };
}

function toNoteNewsItem(article: NoteArticle): NoteNewsItem {
  return {
    source: 'note',
    id: article.id,
    title: article.title,
    thumbnailUrl: article.thumbnailUrl,
    publishedAt: article.publishedAt,
    url: article.url,
  };
}

function mergeNewsItems(
  microcmsArticles: MicroCMSArticle[],
  noteArticles: NoteArticle[],
): NewsListItem[] {
  return [
    ...microcmsArticles.map(toMicroCMSNewsItem),
    ...noteArticles.map(toNoteNewsItem),
  ].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** microCMSとnote.comの記事を公開日降順で1つにマージした一覧を返す。 */
export async function getMergedNewsItems(): Promise<NewsListItem[]> {
  const [microcmsArticles, noteArticles] = await Promise.all([
    getAllArticles(),
    getAllNoteArticles(),
  ]);
  return mergeNewsItems(microcmsArticles, noteArticles);
}
