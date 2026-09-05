import type { MicroCMSCategory } from '@/types/microcms';

interface NewsListItemBase {
  id: string;
  title: string;
  thumbnailUrl?: string;
  publishedAt: string;
}

export interface MicroCMSNewsItem extends NewsListItemBase {
  source: 'microcms';
  slug: string;
  category?: MicroCMSCategory;
}

export interface NoteNewsItem extends NewsListItemBase {
  source: 'note';
  url: string;
}

export type NewsListItem = MicroCMSNewsItem | NoteNewsItem;
