export interface Service {
  id: string;
  icon: string;
  technologies: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    id: 'webapp',
    icon: '🌐',
    technologies: ['Next.js', 'Spring Boot', 'Cloudflare', 'AWS'],
    featured: true,
  },
  {
    id: 'homepage',
    icon: '🖥️',
    technologies: ['Next.js', 'microCMS', 'Cloudflare'],
    featured: true,
  },
  {
    id: 'notion',
    icon: '📝',
    technologies: ['Notion', 'Notion API'],
    featured: false,
  },
  {
    id: 'mobile',
    icon: '📱',
    technologies: ['React Native', 'Expo', 'TypeScript'],
    featured: false,
  },
  {
    id: 'rebuild',
    icon: '🛠️',
    technologies: [],
    featured: false,
  },
  {
    id: 'consulting',
    icon: '💼',
    technologies: [],
    featured: true,
  },
];
