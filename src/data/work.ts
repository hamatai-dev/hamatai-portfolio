import { Work } from '@/types/work';

export const works: Work[] = [
  {
    id: 'portfolio-site',
    title: 'ポートフォリオサイト',
    description:
      'Next.js + Tailwind CSS で構築した個人サイト。日英バイリンガル対応、microCMS 連携のブログ機能付き。',
    image: '/images/works/portfolio-site.jpg',
    category: 'website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'microCMS'],
    githubUrl: 'https://github.com/hamatai-dev/hamatai-portfolio',
    liveUrl: 'https://hamatai.com',
    createdAt: '2025-09-01',
    featured: true,
  },
  {
    id: 'pomodoro-timer',
    title: 'ポモドーロタイマー',
    description:
      '作業時間と休憩時間を設定し、ポモドーロテクニックを実践できるタイマーアプリ。ペアプログラミング時に活用。',
    image: '/images/works/pomodoro-timer.png',
    category: 'webapp',
    technologies: ['Vue.js', 'TypeScript', 'Pinia'],
    githubUrl: 'https://github.com/hamatai-dev/pomodoro-timer',
    liveUrl: 'https://pomodoro-timer-six-lovat.vercel.app/',
    createdAt: '2025-09-06',
    featured: true,
  },
  {
    id: 'bar-kan',
    title: 'バーカン(売上/顧客/シフト管理)',
    description:
      '小規模のバーやスナックを対象にした売上管理、顧客管理、シフト管理アプリ。データを複数端末でリアルタイム同期させ、オーナーが外出していても店舗の状況が即座に分かる。将来的にはAIを活用した顧客分析、売上促進の提案をアプリ上で実装予定。',
    image: '/images/works/bar-kan.png',
    category: 'webapp',
    technologies: ['Next.js', 'Supabase', 'Vercel'],
    liveUrl: 'https://bar-kan.com/',
    createdAt: '2026-08-11',
    featured: true,
  },
];
