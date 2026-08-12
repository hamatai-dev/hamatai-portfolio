export type WorkCategory = 'website' | 'webapp';

export interface LocalizedText {
    ja: string;
    en: string;
}

export interface Work {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    image: string;
    category: WorkCategory;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    createdAt: string;
    featured: boolean;
}