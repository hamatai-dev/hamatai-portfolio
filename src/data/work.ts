import { Work } from '@/types/work';

export const works: Work[] = [
  {
    id: 'portfolio-site',
    title: 'ポートフォリオサイト',
    description:
      'Next.js + Tailwind CSS で構築した個人サイト。日英バイリンガル対応、microCMS 連携のブログ機能付き。',
    image: '/images/works/portfolio-site.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'microCMS'],
    githubUrl: 'https://github.com/hamatai-dev/hamatai-portfolio',
    liveUrl: 'https://hamatai-portfolio.vercel.app/',
    createdAt: '2025-09-01',
    featured: true,
  },
  {
    id: 'pomodoro-timer',
    title: 'ポモドーロタイマー',
    description:
      '作業時間と休憩時間を設定し、ポモドーロテクニックを実践できるタイマーアプリ。ペアプログラミング時に活用。',
    image: '/images/works/pomodoro-timer.png',
    technologies: ['Vue.js', 'TypeScript', 'Pinia'],
    githubUrl: 'https://github.com/hamatai-dev/pomodoro-timer',
    liveUrl: 'https://pomodoro-timer-six-lovat.vercel.app/',
    createdAt: '2025-09-06',
    featured: true,
  },
];
