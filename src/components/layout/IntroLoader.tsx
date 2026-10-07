'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';
import { journeyStops, type Transport } from '@/data/journey';
import { WORLD_LAND_PATH } from '@/data/worldLandPath';
import { MAP_HEIGHT, MAP_WIDTH, lngToX, latToY, projectStops } from '@/lib/worldMap';

const STORAGE_KEY = 'hamatai:intro-seen';
/** ホイール換算でこの量をスクロールすると 100% に到達する。 */
const WHEEL_DISTANCE = 2600;
const HOLD_AT_ARRIVAL_MS = 900;
const SHUTTER_MS = 1000;

const TRANSPORT_LABEL: Record<Transport, string> = {
  flight: 'BY FLIGHT',
  train: 'BY TRAIN',
  bus: 'BY BUS',
  ship: 'BY SHIP',
};

type Pt = { x: number; y: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpPt = (a: Pt, b: Pt, t: number): Pt => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

interface Leg {
  from: Pt;
  to: Pt;
  /** 進行度 0..1 のうち、この区間が始まる/終わる位置 */
  start: number;
  end: number;
}

/** 訪問済みの停留所だけでルートを組み立てる(予定ルートは現在地以降なので描かない)。 */
function buildRoute() {
  const visited = journeyStops.filter((s) => s.status === 'visited');
  const stops = projectStops(visited).map((s) => ({ ...s, p: { x: s.xUnwrapped, y: s.y } }));

  const raw = stops.slice(1).map((s, i) => {
    const a = stops[i].p;
    const b = s.p;
    return { from: a, to: b, w: Math.sqrt(Math.hypot(b.x - a.x, b.y - a.y)) + 4 };
  });
  const total = raw.reduce((sum, l) => sum + l.w, 0);
  let acc = 0;
  const legs: Leg[] = raw.map((l) => {
    const start = acc / total;
    acc += l.w;
    return { from: l.from, to: l.to, start, end: acc / total };
  });

  // 各停留所に到達する進行度(0番目は0)
  const reachAt = [0, ...legs.map((l) => l.end)];
  const countries = [...new Set(stops.map((s) => s.country.en))];
  return { stops, legs, reachAt, countries };
}

const legPath = (l: Leg) => `M ${l.from.x} ${l.from.y} L ${l.to.x} ${l.to.y}`;

function partialPath(l: Leg, t: number) {
  const head = lerpPt(l.from, l.to, t);
  return `M ${l.from.x} ${l.from.y} L ${head.x} ${head.y}`;
}

interface SceneProps {
  progress: number;
  vw: number;
  vh: number;
  route: ReturnType<typeof buildRoute>;
  onSkip: () => void;
}

function Scene({ progress, vw, vh, route, onSkip }: SceneProps) {
  const { stops, legs, reachAt, countries } = route;
  const p = progress;

  const legIndex = Math.max(0, legs.findIndex((l) => p <= l.end));
  const leg = legs[legIndex];
  const localT = leg ? clamp01((p - leg.start) / (leg.end - leg.start)) : 1;
  const head = leg ? lerpPt(leg.from, leg.to, localT) : stops[stops.length - 1].p;

  // カメラ: 序盤は世界全体、進むほど現在位置へズーム
  const cam = easeInOut(clamp01(p * 1.15));
  const W = lerp(MAP_WIDTH, 300, cam);
  const H = W * (vh / vw);
  const cx = lerp(MAP_WIDTH / 2, head.x, cam);
  const cy = lerp(MAP_HEIGHT / 2, head.y, cam);
  const u = W / vw; // 1px あたりの地図単位

  let reached = 0;
  reachAt.forEach((at, i) => {
    if (p >= at - 1e-6) reached = i;
  });
  const stop = stops[reached];
  const countryNo = countries.indexOf(stop.country.en) + 1;
  const sub = stop.transport
    ? `COUNTRY ${String(countryNo).padStart(2, '0')} / ${String(countries.length).padStart(2, '0')} · ${TRANSPORT_LABEL[stop.transport]}`
    : `COUNTRY 01 / ${String(countries.length).padStart(2, '0')} · DEPARTURE`;
  const arrived = p >= 0.999;
  const hint = arrived
    ? 'ARRIVED — OPENING THE HERO'
    : p <= 0.001
      ? 'LOADING — SCROLL TO TRAVEL'
      : p > 0.75
        ? 'TRAVELLING — ALMOST THERE'
        : 'TRAVELLING — KEEP SCROLLING';

  const labelStops = stops.filter((s, i) => reachAt[i] <= p + 1e-6 && stops.findIndex((x) => x.country.en === s.country.en) === i);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <svg
        viewBox={`${cx - W / 2} ${cy - H / 2} ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {Array.from({ length: 25 }, (_, i) => {
          const x = lngToX(-180 + i * 15);
          return <line key={`g${i}`} x1={x} x2={x} y1={-400} y2={900} stroke="rgba(237,233,224,0.05)" vectorEffect="non-scaling-stroke" />;
        })}
        {[-60, -40, -20, 0, 20, 40, 60].map((lat) => (
          <line key={lat} x1={-400} x2={1400} y1={latToY(lat)} y2={latToY(lat)} stroke="rgba(237,233,224,0.05)" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={WORLD_LAND_PATH} fill="rgba(237,233,224,0.07)" stroke="rgba(237,233,224,0.22)" strokeWidth={0.5} fillRule="evenodd" />

        {legs.map((l, i) => (
          <path key={`ghost${i}`} d={legPath(l)} fill="none" stroke="rgba(237,233,224,0.14)" strokeWidth={1.2} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        ))}
        {legs.map((l, i) => {
          if (p >= l.end) return <path key={`done${i}`} d={legPath(l)} fill="none" stroke="var(--color-accent)" strokeWidth={2} vectorEffect="non-scaling-stroke" />;
          if (i === legIndex && p > l.start) return <path key={`part${i}`} d={partialPath(l, localT)} fill="none" stroke="var(--color-accent)" strokeWidth={2} vectorEffect="non-scaling-stroke" />;
          return null;
        })}

        {stops.map((s, i) =>
          reachAt[i] <= p + 1e-6 ? <circle key={s.id} cx={s.p.x} cy={s.p.y} r={3.5 * u} fill="var(--color-paper)" /> : null,
        )}
        <circle cx={head.x} cy={head.y} r={9 * u} fill="rgba(255,91,46,0.18)" stroke="var(--color-accent)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <circle cx={head.x} cy={head.y} r={5 * u} fill="var(--color-accent)" />

        {labelStops.map((s) => (
          <text key={`l${s.id}`} x={s.p.x + 10 * u} y={s.p.y - 8 * u} fontSize={11 * u} fill="rgba(237,233,224,0.72)" fontFamily="var(--font-jetbrains-mono), monospace">
            {(s.country.en === 'Japan' ? 'JAPAN' : s.country.en).toUpperCase()}
          </text>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-[28px] leading-none text-paper lg:text-[32px]">hamatai.</span>
          <span className="hidden font-mono text-[11px] tracking-[0.1em] text-paper-dim sm:block">{hint}</span>
          <button
            type="button"
            onClick={onSkip}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[11px] text-paper transition-colors hover:border-paper"
          >
            SKIP <span aria-hidden>→</span>
          </button>
        </div>

        <h2
          className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-[clamp(56px,10vw,128px)] leading-[0.95] tracking-[-0.03em] text-paper lg:left-10"
          style={{ opacity: clamp01(1 - p * 6) }}
        >
          Follow the
          <br />
          <span className="italic text-accent">route.</span>
        </h2>

        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-[0.08em] text-muted">{sub}</span>
            <span className="font-display text-[clamp(36px,5vw,56px)] leading-none text-paper">{stop.country.en}</span>
            {arrived && (
              <span className="mt-2 self-start rounded bg-accent px-2 py-1 font-mono text-[11px] font-semibold text-ink">YOU ARE HERE</span>
            )}
          </div>

          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs text-paper sm:flex lg:bottom-10" style={{ opacity: clamp01(1 - p * 8) }}>
            SCROLL TO TRAVEL <span className="text-accent">↓</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted">ROUTE PROGRESS</span>
            <span className="flex items-start font-display leading-none text-paper">
              <span className="text-[clamp(64px,10vw,120px)]">{Math.round(p * 100)}</span>
              <span className="mt-2 text-[clamp(24px,3.4vw,40px)] text-accent">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IntroLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname === '/');
  const [opening, setOpening] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: 1440, h: 900 });

  const route = useMemo(buildRoute, []);
  const target = useRef(0);
  const current = useRef(0);
  const openingRef = useRef(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setVisible(false);
    window.scrollTo(0, 0);
  }, []);

  const open = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    target.current = 1;
    current.current = 1;
    setProgress(1);
    setOpening(true);
    window.setTimeout(finish, SHUTTER_MS);
  }, [finish]);

  // シャッターは閉じた状態で一度描画してから開く(でないと transition が走らない)
  useEffect(() => {
    if (!opening) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShutterOpen(true)));
    return () => cancelAnimationFrame(id);
  }, [opening]);

  // 表示可否の判定(ホームかつセッション初回のみ。reduced-motion は即スキップ)
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pathname !== '/' || seen || reduced) {
      setVisible(false);
      if (pathname === '/' && reduced) {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch {}
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);

    const advance = (delta: number) => {
      if (openingRef.current) return;
      target.current = clamp01(target.current + delta);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      advance((e.deltaY * unit) / WHEEL_DISTANCE);
    };
    let lastY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0]?.clientY;
      if (y == null || lastY == null) return;
      advance((lastY - y) / (window.innerHeight * 3));
      lastY = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') open();
      else if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        advance(0.08);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        advance(-0.08);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);

    let raf = 0;
    let arrivedAt: number | null = null;
    const tick = (now: number) => {
      if (!openingRef.current) {
        current.current += (target.current - current.current) * 0.1;
        if (Math.abs(target.current - current.current) < 0.0005) current.current = target.current;
        setProgress(current.current);
        if (current.current >= 0.999) {
          arrivedAt ??= now;
          if (now - arrivedAt > HOLD_AT_ARRIVAL_MS) open();
        } else {
          arrivedAt = null;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [visible, open]);

  if (!visible) return null;

  const scene = <Scene progress={progress} vw={size.w} vh={size.h} route={route} onSkip={open} />;
  const half = 'absolute left-0 right-0 overflow-hidden transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]';

  return (
    <div role="dialog" aria-label="Intro" className="fixed inset-0 z-[100]">
      {opening ? (
        <>
          <div
            className={`${half} top-0 h-1/2`}
            style={{ transitionDuration: `${SHUTTER_MS}ms`, transform: shutterOpen ? 'translateY(-100%)' : 'translateY(0)' }}
          >
            <div className="absolute left-0 right-0 top-0" style={{ height: size.h }}>
              {scene}
            </div>
          </div>
          <div
            className={`${half} bottom-0 h-1/2`}
            style={{ transitionDuration: `${SHUTTER_MS}ms`, transform: shutterOpen ? 'translateY(100%)' : 'translateY(0)' }}
          >
            <div className="absolute bottom-0 left-0 right-0" style={{ height: size.h }}>
              {scene}
            </div>
          </div>
        </>
      ) : (
        scene
      )}
    </div>
  );
}
