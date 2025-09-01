import { getAllBlogs } from '@/lib/markdown';
import { BlogMeta } from '@/types/blog';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';

export default function Blogs() {
  const blogs = getAllBlogs();

  // ブログが存在しない場合
  if (blogs.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Blogs</h1>
          <p className="text-gray-600 text-center">まだブログ記事がありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Blogs</h1>
        
        {/* カテゴリフィルター（オプション） */}
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap">
            {Array.from(new Set(blogs.map(blog => blog.category))).map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* ブログ一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((blog: BlogMeta) => (
            <article key={blog.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(blog.publishedAt), 'yyyy年M月d日', { locale:ja })}
                </span>
                <span className="text-sm text-gray-400">
                  {blog.readTime}分で読める
                </span>
              </div>
              
              <Link href={`/blogs/${blog.slug}`}>
                <h2 className="text-xl font-semibold mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                  {blog.title}
                </h2>
              </Link>
              
              <p className="text-gray-600 mb-4">
                {blog.description}
              </p>
              
              <div className="flex gap-2 flex-wrap">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}