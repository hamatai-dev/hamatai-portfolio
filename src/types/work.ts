export type WorkCategory = 'website' | 'webapp';

export interface LocalizedText {
    ja: string;
    en: string;
}

interface WorkCaseStudy {
    subtitle: LocalizedText;
    kind: string;
    challenge: LocalizedText;
    solution: LocalizedText;
    role: LocalizedText;
    result: LocalizedText;
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
    caseStudy?: WorkCaseStudy;
}