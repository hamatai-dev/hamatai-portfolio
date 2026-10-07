'use client';

import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface FilterOption<K extends string> {
  key: K;
  label: string;
  count: number;
  /** 指定するとボタンの代わりにリンクとして描画する(サーバー側で絞り込む場合) */
  href?: ComponentProps<typeof Link>['href'];
}

interface FilterBarProps<K extends string> {
  options: FilterOption<K>[];
  value: K;
  onChange?: (key: K) => void;
  /** 右端のメモ(例: `NEWEST FIRST ↓`) */
  note?: string;
}

/** ピル型のフィルタ帯(件数付き)。Works / News で共通利用する。 */
export function FilterBar<K extends string>({ options, value, onChange, note }: FilterBarProps<K>) {
  return (
    <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const active = opt.key === value;
          const className = cn(
            'inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors',
            active ? 'border-accent bg-accent text-ink' : 'border-line text-paper hover:border-paper',
          );
          const content = (
            <>
              {opt.label}
              <span className={cn('font-mono text-[11px]', active ? 'text-ink' : 'text-muted')}>
                {opt.count}
              </span>
            </>
          );
          return opt.href ? (
            <Link
              key={opt.key}
              href={opt.href}
              aria-current={active ? 'true' : undefined}
              className={className}
            >
              {content}
            </Link>
          ) : (
            <button
              key={opt.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange?.(opt.key)}
              className={className}
            >
              {content}
            </button>
          );
        })}
      </div>
      {note && <span className="font-mono text-[11px] tracking-[0.05em] text-muted">{note}</span>}
    </div>
  );
}
