import { getBlogBySlug, getAllBlogs } from '@/lib/markdown';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  // Next.js 15では params が Promise になっている
  const { slug } = await params;
  
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* 戻るボタン */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            ブログ一覧に戻る
          </Link>
        </div>

        {/* 記事ヘッダー */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500">
              {format(new Date(blog.publishedAt), 'yyyy年M月d日', { locale: ja })}
            </span>
            {blog.updatedAt && (
              <span className="text-sm text-gray-400">
                更新: {format(new Date(blog.updatedAt), 'M月d日', { locale: ja })}
              </span>
            )}
            <span className="text-sm text-gray-400">
              {blog.readTime}分で読める
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {blog.description && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {blog.description}
            </p>
          )}
        </header>

        {/* タグ */}
        {blog.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 記事本文 */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* 記事フッター */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span>最終更新: {format(new Date(blog.updatedAt || blog.publishedAt), 'yyyy年M月d日', { locale: ja })}</span>
            </div>
            
            {/* <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                👍 いいね
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                📤 シェア
              </button>
            </div> */}
          </div>
        </footer>
      </div>
    </div>
  );
}