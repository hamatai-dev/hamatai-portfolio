import type { ComponentType, SVGProps } from 'react';
import { useTranslations } from 'next-intl';
import {
  BeakerIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  CameraIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { SectionHeader } from '@/components/ui/SectionHeader';

type Kind = 'work' | 'life' | 'sleep';
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface Slot {
  id: string;
  start: number;
  end: number;
  kind: Kind;
  fill: string;
  icon: Icon;
  /** アイコンを濃い色で描く(明るいセグメント用) */
  darkIcon?: boolean;
}

const INK = '#0A0A0B';
const PAPER = '#EDE9E0';

const SLOTS: Slot[] = [
  { id: 'wake', start: 6, end: 7, kind: 'life', fill: '#EDE9E099', icon: SunIcon, darkIcon: true },
  { id: 'meeting', start: 7, end: 9, kind: 'work', fill: '#FF5B2E', icon: UsersIcon, darkIcon: true },
  { id: 'work', start: 9, end: 11, kind: 'work', fill: '#FF5B2E99', icon: ComputerDesktopIcon },
  { id: 'sightseeing', start: 11, end: 15, kind: 'life', fill: '#EDE9E0', icon: CameraIcon, darkIcon: true },
  { id: 'cafe', start: 15, end: 18, kind: 'work', fill: '#FF5B2E99', icon: BuildingStorefrontIcon },
  { id: 'food', start: 18, end: 20, kind: 'life', fill: '#EDE9E0B3', icon: CakeIcon, darkIcon: true },
  { id: 'free', start: 20, end: 21, kind: 'life', fill: '#EDE9E099', icon: BeakerIcon, darkIcon: true },
  { id: 'evening', start: 21, end: 23, kind: 'work', fill: '#FF5B2E', icon: UsersIcon, darkIcon: true },
  { id: 'language', start: 23, end: 24, kind: 'life', fill: '#EDE9E040', icon: LanguageIcon },
  { id: 'sleep', start: 0, end: 6, kind: 'sleep', fill: '#EDE9E01F', icon: MoonIcon },
];

const SCHEDULE_ORDER = ['wake', 'meeting', 'work', 'sightseeing', 'cafe', 'food', 'free', 'evening', 'language', 'sleep'];

const SIZE = 720;
const C = SIZE / 2;
const R_OUT = 290;
const R_IN = R_OUT * 0.72;
const R_ICON = (R_OUT + R_IN) / 2;

const angle = (h: number) => (h / 24) * 360;
const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)] as const;
};

function sectorPath(start: number, end: number) {
  const a0 = angle(start);
  const a1 = angle(end);
  const large = a1 - a0 > 180 ? 1 : 0;
  const [ox0, oy0] = polar(R_OUT, a0);
  const [ox1, oy1] = polar(R_OUT, a1);
  const [ix1, iy1] = polar(R_IN, a1);
  const [ix0, iy0] = polar(R_IN, a0);
  return `M ${ox0} ${oy0} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${ox1} ${oy1} L ${ix1} ${iy1} A ${R_IN} ${R_IN} 0 ${large} 0 ${ix0} ${iy0} Z`;
}

const pad = (n: number) => String(n % 24).padStart(2, '0');
const range = (s: Slot) => `${pad(s.start)}:00 – ${s.end === 24 ? '24' : pad(s.end)}:00`;

function Clock() {
  const t = useTranslations('about.rhythm');

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[720px]"
      style={{ containerType: 'inline-size' }}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {SLOTS.map((s) => (
          <path key={s.id} d={sectorPath(s.start, s.end)} fill={s.fill} stroke="#111113" strokeWidth={3} />
        ))}
        {Array.from({ length: 24 }, (_, h) => {
          const [x, y] = polar(R_OUT + 24, angle(h));
          const major = h % 6 === 0;
          return (
            <circle key={h} cx={x} cy={y} r={major ? 3 : 1.5} fill={major ? '#FF5B2E' : '#8E8B84'} />
          );
        })}
        {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
          const [x, y] = polar(R_OUT + 48, angle(h));
          return (
            <text
              key={h}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill={h % 6 === 0 ? PAPER : '#8E8B84'}
            >
              {pad(h)}
            </text>
          );
        })}
      </svg>

      {SLOTS.map((s) => {
        const mid = angle((s.start + s.end) / 2);
        const [x, y] = polar(R_ICON, mid);
        const Icon = s.icon;
        return (
          <span
            key={s.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${(x / SIZE) * 100}%`,
              top: `${(y / SIZE) * 100}%`,
              width: '3.2cqw',
              height: '3.2cqw',
              transform: 'translate(-50%, -50%)',
              color: s.darkIcon ? INK : PAPER,
            }}
          >
            <Icon className="h-full w-full" strokeWidth={1.6} />
          </span>
        );
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: '0.8cqw' }}>
        <span className="font-mono tracking-[0.1em] text-muted" style={{ fontSize: 'max(9px, 1.5cqw)' }}>
          {t('centerLabel')}
        </span>
        <span className="flex items-end font-display leading-none text-paper" style={{ fontSize: '20.8cqw', gap: '0.5cqw' }}>
          24
          <span className="italic text-accent" style={{ fontSize: '6.7cqw' }}>
            h
          </span>
        </span>
        <span className="text-paper-dim" style={{ fontSize: 'max(11px, 1.8cqw)' }}>
          {t('centerSub')}
        </span>
      </div>
    </div>
  );
}

export function DailyRhythm() {
  const t = useTranslations('about.rhythm');
  const slotMap = new Map(SLOTS.map((s) => [s.id, s]));
  const rows = SCHEDULE_ORDER.map((id) => slotMap.get(id)!);

  const legend = [
    { label: t('legendWork'), fill: '#FF5B2E' },
    { label: t('legendLife'), fill: PAPER },
    { label: t('legendSleep'), fill: '#EDE9E01F' },
  ];

  return (
    <section className="bg-ink-2">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-24 lg:gap-[88px] lg:px-16 lg:pb-40 lg:pt-[152px]">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          accent={t('accent')}
          aside={<p className="text-[15px] leading-[1.9] text-paper-dim">{t('intro')}</p>}
        />

        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <div className="w-full lg:flex-1">
            <Clock />
          </div>

          <div className="flex w-full flex-col gap-7 lg:w-[496px] lg:shrink-0">
            <div className="flex items-center gap-6">
              {legend.map((l) => (
                <span key={l.label} className="inline-flex items-center gap-2 text-xs text-paper-dim">
                  <span className="h-3 w-3 rounded-[3px]" style={{ background: l.fill }} />
                  {l.label}
                </span>
              ))}
            </div>
            <ul className="flex flex-col border-t border-line">
              {rows.map((s) => (
                <li key={s.id} className="flex items-center gap-5 border-b border-line py-[15px]">
                  <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ background: s.fill }} />
                  <span className="w-[132px] shrink-0 font-mono text-[13px] text-accent">{range(s)}</span>
                  <span className="text-base font-medium text-paper lg:text-lg">
                    {t(`items.${s.id}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
