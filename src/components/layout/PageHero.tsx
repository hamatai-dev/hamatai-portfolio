import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  /** 例: `(WORKS) — 実績・制作物` */
  label: string;
  title: string;
  /** アクセント色・イタリックで表示する2語目 */
  accent?: string;
  /** タイトル右下に置くサイドコンテンツ(紹介文・プロフィール表など) */
  aside?: ReactNode;
  /** タイトル行の下に置くコンテンツ(フィルタ帯・ジャンプ目次など) */
  below?: ReactNode;
  /** About のみタイトルを一回り大きくする */
  size?: 'default' | 'large';
  /** 直下にフィルタ帯などが続く場合、下余白を詰める */
  compact?: boolean;
  className?: string;
}

const TITLE_SIZE = {
  default: 'text-[clamp(60px,12.2vw,176px)]',
  large: 'text-[clamp(72px,14.4vw,208px)]',
} as const;

/** 全下層ページ共通のヒーロー(ラベル + 巨大タイトル + 右側サイド + 下部スロット)。 */
export function PageHero({
  label,
  title,
  accent,
  aside,
  below,
  size = 'default',
  compact,
  className,
}: PageHeroProps) {
  return (
    <section className={cn('bg-ink', className)}>
      <div
        className={cn(
          'mx-auto flex max-w-[1440px] flex-col gap-12 px-6 pt-14 lg:gap-[72px] lg:px-16 lg:pt-[110px]',
          compact ? 'pb-10 lg:pb-14' : 'pb-16 lg:pb-[120px]',
        )}
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex min-w-0 flex-col gap-8">
            <p className="font-mono text-xs tracking-[0.08em] text-muted">{label}</p>
            <h1
              className={cn(
                'flex flex-wrap items-baseline gap-x-[0.16em] font-display leading-[0.92] tracking-[-0.03em] text-paper',
                TITLE_SIZE[size],
              )}
            >
              {title}
              {accent && <span className="italic text-accent">{accent}</span>}
            </h1>
          </div>
          {aside && <div className="w-full shrink-0 lg:w-[380px]">{aside}</div>}
        </div>
        {below}
      </div>
    </section>
  );
}

/** PageHero の `aside` に入れる標準の紹介文。 */
export function PageHeroIntro({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-[1.9] text-paper-dim">{children}</p>;
}
