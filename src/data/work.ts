import { Work } from '@/types/work';

export const works: Work[] = [
  {
    id: 'portfolio-site',
    title: { ja: 'ポートフォリオサイト', en: 'Portfolio Site' },
    description: {
      ja: 'Next.js + Tailwind CSS で構築した個人サイト。日英バイリンガル対応、microCMS 連携のブログ機能付き。',
      en: 'Personal site built with Next.js + Tailwind CSS. Bilingual (Japanese/English) support with a blog powered by microCMS.',
    },
    image: '/images/works/portfolio-site.jpg',
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'microCMS'],
    githubUrl: 'https://github.com/hamatai-dev/hamatai-portfolio',
    liveUrl: 'https://hamatai.com',
    createdAt: '2025-09-01',
    featured: true,
  },
  {
    id: 'bar-kan',
    title: { ja: 'バーカン(売上/顧客/シフト管理)', en: 'Bar-kan (Sales / Customer / Shift Management)' },
    description: {
      ja: '小規模のバーやスナックを対象にした売上管理、顧客管理、シフト管理アプリ。データを複数端末でリアルタイム同期させ、オーナーが外出していても店舗の状況が即座に分かる。将来的にはAIを活用した顧客分析、売上促進の提案をアプリ上で実装予定。',
      en: 'A sales, customer, and shift management app for small bars and snack bars. Data syncs in real time across multiple devices, so owners can instantly check store status even while away. AI-powered customer analysis and sales promotion suggestions are planned for the future.',
    },
    image: '/images/works/bar-kan.png',
    category: 'webapp',
    technologies: ['Next.js', 'Supabase', 'Vercel'],
    liveUrl: 'https://bar-kan.com/',
    createdAt: '2026-08-11',
    featured: true,
  },
];
