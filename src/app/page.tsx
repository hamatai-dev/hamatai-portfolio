import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { works } from "@/data/work";

export default function Home() {
  // 最近の作品を3つ取得（featured: trueのもの、または最新のもの）
  const recentWorks = works
    .filter(work => work.featured) // おすすめ作品を優先
    .slice(0, 3); // 最大3つまで

  // おすすめ作品が3つ未満の場合は、最新の作品で補完
  if (recentWorks.length < 3) {
    const remainingWorks = works
      .filter(work => !work.featured)
      .slice(0, 3 - recentWorks.length);
    recentWorks.push(...remainingWorks);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Hi, I am <span className="text-blue-600">Hamatai</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                フルスタックエンジニアとして、Webアプリケーションの開発に携わっています。
                3年の実務経験を活かし、ユーザーに価値を提供するサービスを作り続けています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Worksを見る
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  お問い合わせ
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-6xl font-bold">H</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Works Preview */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Works</h2>
            <Link
              href="/works"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              すべて見る
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          
          {recentWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentWorks.map((work) => (
                <div key={work.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    {/* 実際の画像がある場合は以下を使用 */}
                    {/* <img src={work.image} alt={work.title} className="w-full h-full object-cover" /> */}
                    <span className="text-gray-500">{work.title}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
                    <p className="text-gray-600 mb-4">{work.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {work.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {work.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          +{work.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">まだ作品がありません。</p>
              <Link
                href="/works"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                作品を作成する
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}