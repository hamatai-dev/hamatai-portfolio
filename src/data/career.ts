import type { LocalizedText } from '@/types/work';

export interface CareerItem {
  /** 表示用 `YYYY.MM`。終了が無い場合は現在も継続中。 */
  from: string;
  to?: string;
  role: LocalizedText;
  company: LocalizedText;
  description: LocalizedText;
  current?: boolean;
}

export const career: CareerItem[] = [
  {
    from: '2026.04',
    current: true,
    role: { ja: 'フリーランス Webエンジニア', en: 'Freelance Web Engineer' },
    company: { ja: '個人事業主', en: 'Self-Employed' },
    description: {
      ja: '独立してフリーランスエンジニアとして活動を開始。Webアプリ開発・ホームページ制作・AI導入コンサルなど幅広く対応。現在は世界を旅しながらノマドとして活動しています。',
      en: 'Went independent as a freelance engineer, covering web app development, website creation and AI adoption consulting. Currently working as a nomad while traveling the world.',
    },
  },
  {
    from: '2024.04',
    to: '2026.03',
    role: { ja: 'Webエンジニア', en: 'Web Engineer' },
    company: { ja: 'アルサーガパートナーズ株式会社', en: 'Arsaga Partners Inc.' },
    description: {
      ja: '金融系Webアプリのバックエンド・インフラ構築およびAndroidアプリ開発に従事。スクラムからウォーターフォールまで、幅広いプロジェクト管理を経験しました。',
      en: 'Worked on backend and infrastructure for a fintech web app and on Android app development. Experienced project management from Scrum to waterfall.',
    },
  },
  {
    from: '2022.11',
    to: '2024.03',
    role: { ja: 'Webエンジニア', en: 'Web Engineer' },
    company: { ja: '株式会社SEアシスト', en: 'SE Assist Co., Ltd.' },
    description: {
      ja: '中小企業向けのWebデザインおよびWebアプリのフロントエンド開発を担当。UI/UXを意識した実装経験を積みました。',
      en: 'Handled web design and frontend development of web apps for small and medium-sized businesses, with a strong focus on UI/UX.',
    },
  },
  {
    from: '2022.04',
    to: '2022.10',
    role: { ja: 'コンサルタント', en: 'Consultant' },
    company: { ja: '株式会社公文教育研究会', en: 'Kumon Institute of Education Co., Ltd.' },
    description: {
      ja: '教室の新規開設や既存教室の運営をサポートするコンサルタントとして勤務。',
      en: 'Worked as a consultant supporting the launch of new classrooms and the operation of existing ones.',
    },
  },
];
