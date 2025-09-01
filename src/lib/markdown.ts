import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogMeta } from '@/types/blog';

// src/data/blogs配下のファイルを全て取得
const blogsDirectory = path.join(process.cwd(), 'src/data/blogs');

// ファイル名から拡張子（.md）を除いた「スラッグ」を生成
export function getBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blogs directory:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // HTMLに変換
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags || [],
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      featured: data.featured || false,
      readTime: Math.ceil(content.split(' ').length / 200), // 200文字/分で計算
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

export function getAllBlogs(): BlogMeta[] {
  try {
    const slugs = getBlogSlugs();
    const blogs = slugs
      .map((slug) => {
        const fullPath = path.join(blogsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title,
          description: data.description,
          category: data.category,
          tags: data.tags || [],
          publishedAt: data.publishedAt,
          updatedAt: data.updatedAt,
          featured: data.featured || false,
          readTime: Math.ceil(fileContents.split(' ').length / 200),
        };
      })
      // 投稿日順でソート
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return blogs;
  } catch (error) {
    console.error('Error reading all blogs:', error);
    return [];
  }
}

export function getBlogsByCategory(category: string): BlogMeta[] {
  return getAllBlogs().filter(blog => blog.category === category);
}

export function getBlogsByTag(tag: string): BlogMeta[] {
  return getAllBlogs().filter(blog => blog.tags.includes(tag));
}