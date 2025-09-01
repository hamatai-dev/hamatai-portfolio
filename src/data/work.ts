import { Work } from "@/types/work";

// src/data/works.ts
export const works: Work[] = [
    {
        id: "portfolio-site",
        title: "ポートフォリオサイト",
        description: "Next.js + Tailwind CSSで作成したポートフォリオサイト兼ブログ",
        image: "/images/works/portfolio-site.png",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/yourusername/portfolio-site",
        liveUrl: "https://your-portfolio.com",
        createdAt: "2024-01-15",
        featured: true
    },
    {
        id: "sample-project-1",
        title: "サンプルプロジェクト 1",
        description: "React + Node.jsで作成したWebアプリケーション",
        image: "/images/works/sample-1.png",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        githubUrl: "https://github.com/yourusername/sample-project-1",
        liveUrl: "https://sample-project-1.com",
        createdAt: "2024-01-10",
        featured: true
    },
    {
        id: "sample-project-2",
        title: "サンプルプロジェクト 2",
        description: "TypeScript + Firebaseで作成したモバイルアプリ",
        image: "/images/works/sample-2.png",
        technologies: ["TypeScript", "Firebase", "React Native"],
        githubUrl: "https://github.com/yourusername/sample-project-2",
        createdAt: "2024-01-05",
        featured: false
    }
  ];