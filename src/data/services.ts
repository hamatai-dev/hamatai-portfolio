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
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    featured: true,
  },
  {
    id: 'homepage',
    icon: '🖥️',
    technologies: ['Next.js', 'Tailwind CSS', 'microCMS', 'Vercel'],
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
    id: 'frontend',
    icon: '⚡',
    technologies: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
    featured: false,
  },
  {
    id: 'consulting',
    icon: '💼',
    technologies: [],
    featured: true,
  },
];
