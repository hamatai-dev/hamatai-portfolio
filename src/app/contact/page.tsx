import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Contact</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center space-y-8">
            {/* メッセージ */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                お気軽にお問い合わせください
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ご質問やご相談がございましたら、以下の方法でお気軽にお問い合わせください。<br />
                お仕事のご依頼や技術的な相談など、何でもお待ちしております。
              </p>
            </div>

            {/* 連絡方法 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* メール */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">📧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">メール</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    詳細なご相談やお仕事のご依頼はこちら
                  </p>
                  <a
                    href="mailto:thdev7109@gmail.com"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    thdev7109@gmail.com
                  </a>
                </div>
              </div>

              {/* X (Twitter) */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">𝕏</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">X (Twitter)</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    気軽なご質問やDMでのお問い合わせ
                  </p>
                  <a
                    href="https://x.com/hamatai_7109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    @hamatai_7109
                  </a>
                </div>
              </div>
            </div>

            {/* 追加情報 */}
            <div className="mt-4 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                通常、メールは24時間以内、XのDMは数時間以内に返信いたします。<br />
                お急ぎの場合は、XのDMでお知らせください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}