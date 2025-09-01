export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
    featured: boolean;
    readTime: number;
  }
  
  export interface BlogMeta {
    slug: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
    featured: boolean;
    readTime: number;
  }