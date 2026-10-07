import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  locale: string = 'ja-JP',
): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** 日本時間基準で `2026.09.15` 形式に整形する。 */
export function formatDateDotted(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' })
    .replaceAll('-', '.');
}
