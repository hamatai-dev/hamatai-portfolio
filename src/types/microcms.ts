export interface MicroCMSArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}
