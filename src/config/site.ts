export const SITE_URL = 'https://hamatai.com';
export const GA_MEASUREMENT_ID = 'G-CP3VCKJ9B8';
export const SITE_NAME = 'Taishi Hamano';
export const AUTHOR_NAME_JA = '濱野 大志';
export const NOTE_USERNAME = 'hamatai_7109';

export const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/hamatai-dev' },
  { id: 'x', label: 'X (Twitter)', href: 'https://x.com/hamatai_7109' },
  { id: 'note', label: 'note', href: `https://note.com/${NOTE_USERNAME}` },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCaEmeuLIUpCvwULifx5qLow',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/hamatai_7109',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/bigambitiooooon',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bigambitiooon/',
  },
  {
    id: 'coconala',
    label: 'ココナラ',
    href: 'https://coconala.com/users/6220559',
  },
  {
    id: 'standfm',
    label: 'stand.fm',
    href: 'https://stand.fm/channels/6a9870fb0bbc2a81f5777ad4',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    href: 'https://open.spotify.com/show/3islsHEiRoi1FL0hwNloDX?si=a980bf6ea41a4b3c',
  },
  {
    id: 'applepodcast',
    label: 'Podcast',
    href: 'https://podcasts.apple.com/jp/podcast/life-shift-%E6%97%85%E3%81%99%E3%82%8B%E3%83%8E%E3%83%9E%E3%83%89%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%AE%E6%97%A5%E5%B8%B8/id6808319808',
  },
  {
    id: 'substack',
    label: 'Substack',
    href: 'https://substack.com/@hamatai',
  },
] as const;

/**
 * トップのヒーロー背景動画。ファイルを `public/` に置いたらここを有効にする。
 * `null` にすると動画なし(暗い背景+グラデーション)で表示する。
 * Cloudflare の静的アセットは 1ファイル 25MiB までなので、差し替え時はサイズに注意。
 */
export const HERO_VIDEO: { src: string; poster: string } | null = {
  src: '/videos/hero.mp4',
  poster: '/images/hero-poster.jpg',
};
