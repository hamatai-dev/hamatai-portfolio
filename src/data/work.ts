import { Work } from "@/types/work";

// src/data/works.ts
export const works: Work[] = [
    {
        id: "portfolio-site",
        title: "ポートフォリオサイト",
        description: "Next.js + Tailwind CSSで作成したポートフォリオサイト兼ブログ",
        image: "/images/works/portfolio-site.jpg",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/hamatai-dev/hamatai-portfolio",
        liveUrl: "https://hamatai-portfolio.vercel.app/",
        createdAt: "2025-09-01",
        featured: true
    },
    {
        id: "pomodoro-timer",
        title: "ポモドーロタイマー",
        description: "作業時間と休憩時間を設定し、ポモドーロを実践できるタイマーアプリ。仕事でペアプロミングをしているときに使っています。",
        image: "/images/works/pomodoro-timer.png",
        technologies: ["Vue.js", "TypeScript", "Pinia"],
        githubUrl: "https://github.com/hamatai-dev/pomodoro-timer",
        liveUrl: "https://pomodoro-timer-six-lovat.vercel.app/",
        createdAt: "2025-09-06",
        featured: true
    }
  ];