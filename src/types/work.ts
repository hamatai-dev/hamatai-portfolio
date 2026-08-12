export type WorkCategory = 'website' | 'webapp';

export interface Work {
    id: string;
    title: string;
    description: string;
    image: string;
    category: WorkCategory;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    createdAt: string;
    featured: boolean;
}