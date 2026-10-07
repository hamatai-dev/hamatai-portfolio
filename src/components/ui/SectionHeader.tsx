import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** 例: `(02) — JOURNEY / 旅の軌跡` */
  label: string;
  title: string;
  /** アクセント色・イタリックの2語目 */
  accent?: string;
  /** 右側(下揃え)に置く紹介文など */
  aside?: ReactNode;
  /** aside ラッパーの追加クラス(既定は `lg:w-[420px]`) */
  asideClassName?: string;
  className?: string;
}

/** セクション見出し(ラベル + 巨大なセリフ体タイトル + 右側の紹介文)。 */
export function SectionHeader({ label, title, accent, aside, asideClassName, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16',
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-7">
        <p className="font-mono text-xs tracking-[0.08em] text-muted">{label}</p>
        <h2 className="flex flex-wrap items-baseline gap-x-6 font-display text-[clamp(56px,9.4vw,136px)] leading-[0.95] tracking-[-0.03em] text-paper">
          {title}
          {accent && <span className="italic text-accent">{accent}</span>}
        </h2>
      </div>
      {aside && (
        <div className={cn('w-full shrink-0 lg:w-[420px]', asideClassName)}>{aside}</div>
      )}
    </div>
  );
}
