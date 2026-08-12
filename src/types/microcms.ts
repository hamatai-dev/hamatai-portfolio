export interface MicroCMSThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface MicroCMSCategory {
  id: string;
  name: string;
}

/** One item of the `tags` repeater field (repeater child text field id: `text`). */
export interface MicroCMSTagItem {
  fieldId: string;
  text: string;
}

interface MicroCMSArticleCommonFields {
  title: string;
  description?: string;
  content: string;
  category?: MicroCMSCategory;
  noindex?: boolean;
}

/** Shape returned directly by the microCMS `blogs` API (image field id is `eyecatch`). */
export interface MicroCMSArticleRaw extends MicroCMSArticleCommonFields {
  eyecatch?: MicroCMSThumbnail;
  tags?: MicroCMSTagItem[];
}

/** Normalized shape used throughout the app (`eyecatch`→`thumbnail`, tags flattened to strings). */
export interface MicroCMSArticle extends MicroCMSArticleCommonFields {
  id: string;
  thumbnail?: MicroCMSThumbnail;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}
