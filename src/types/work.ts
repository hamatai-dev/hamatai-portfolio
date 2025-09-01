export interface Work {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    createdAt: string;
    featured: boolean;
}