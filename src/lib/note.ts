import { NOTE_USERNAME } from '@/config/site';

export interface NoteArticle {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl?: string;
  url: string;
}

/**
 * note.com's unofficial, undocumented API. Verified by manual curl on 2026-09-05 against
 * https://note.com/api/v2/creators/{username}/contents?kind=note&page=1 — re-verify at
 * schema-change time since this contract can change without notice.
 */
interface NoteApiContent {
  key?: unknown;
  name?: unknown;
  publishAt?: unknown;
  eyecatch?: unknown;
  noteUrl?: unknown;
}

interface NoteApiResponse {
  data?: { contents?: unknown; isLastPage?: unknown };
}

function isValidContent(
  content: NoteApiContent,
): content is NoteApiContent & { key: string; name: string; publishAt: string; noteUrl: string } {
  return (
    typeof content.key === 'string' &&
    typeof content.name === 'string' &&
    typeof content.publishAt === 'string' &&
    typeof content.noteUrl === 'string'
  );
}

function toNoteArticle(
  content: NoteApiContent & { key: string; name: string; publishAt: string; noteUrl: string },
): NoteArticle {
  return {
    id: content.key,
    title: content.name,
    publishedAt: content.publishAt,
    thumbnailUrl: typeof content.eyecatch === 'string' && content.eyecatch ? content.eyecatch : undefined,
    url: content.noteUrl,
  };
}

// note.comのページングが万一終端フラグを返し続けない場合の安全弁(現状39件・7ページ程度なので十分な余裕)。
const MAX_PAGES = 50;

/** note.com非公式APIを全ページ走査し、公開済み記事を全件取得する。 */
export async function getAllNoteArticles(): Promise<NoteArticle[]> {
  const results: NoteArticle[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const res = await fetch(
        `https://note.com/api/v2/creators/${NOTE_USERNAME}/contents?kind=note&page=${page}`,
        { next: { revalidate: 86400 } },
      );
      if (!res.ok) break;

      const data = (await res.json()) as NoteApiResponse;
      const contents = data.data?.contents;
      if (!Array.isArray(contents) || contents.length === 0) break;

      results.push(...(contents as NoteApiContent[]).filter(isValidContent).map(toNoteArticle));

      if (data.data?.isLastPage !== false) break;
    }
  } catch {
    // ネットワークエラー時も、それまでに取得できたページ分は返す。
    return results;
  }

  return results;
}
