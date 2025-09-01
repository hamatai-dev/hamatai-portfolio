import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hamatai</h3>
            <p className="text-gray-300 text-sm">
              フルスタックエンジニアとして、Webアプリケーションの開発に携わっています。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/works" className="text-gray-300 hover:text-white transition-colors">Works</Link></li>
              <li><Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/hamatai-dev" className="text-gray-300 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/bigambitiooon/" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/hamatai_7109" className="text-gray-300 hover:text-white transition-colors">X(旧Twitter)</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-300">
          <p>&copy; 2025 Hamatai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}