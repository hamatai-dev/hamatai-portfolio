import { useLocale, useTranslations } from 'next-intl';
import { journeyStops, currentStop, type Transport } from '@/data/journey';
import { WORLD_LAND_PATH } from '@/data/worldLandPath';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

// Center the map on Japan (135°E, the JST reference meridian) so the journey
// reads as heading east from home. Must match CENTER_LNG in scripts/gen-world-map.js.
const CENTER_LNG = 135;

const TRANSPORT_ICON: Record<Transport, string> = {
  flight: '✈️',
  ship: '🚢',
  bus: '🚌',
  train: '🚆',
};

function normalizeLng(lng: number) {
  let d = (((lng - CENTER_LNG) % 360) + 360) % 360; // 0..360
  if (d > 180) d -= 360; // -180..180
  return d;
}

/**
 * Projects stops onto the map, keeping a continuous "unwrapped" x alongside
 * the visible (wrapped) one — so a route leg that crosses the seam (e.g.
 * South America -> Africa, on the far side of the globe from Japan) can be
 * drawn as a single line that exits one edge and re-enters the other,
 * instead of a line cutting straight across the map.
 */
function projectStops(stops: typeof journeyStops) {
  let prevUnwrapped: number | null = null;

  return stops.map((stop) => {
    const shifted = normalizeLng(stop.lng);
    const deg =
      prevUnwrapped === null
        ? shifted
        : [shifted - 360, shifted, shifted + 360].reduce((best, candidate) =>
            Math.abs(candidate - prevUnwrapped!) < Math.abs(best - prevUnwrapped!)
              ? candidate
              : best
          );
    prevUnwrapped = deg;

    const xUnwrapped = ((deg + 180) / 360) * MAP_WIDTH;
    const x = ((xUnwrapped % MAP_WIDTH) + MAP_WIDTH) % MAP_WIDTH;
    const y = ((90 - stop.lat) / 180) * MAP_HEIGHT;

    return { ...stop, x, xUnwrapped, y };
  });
}

export function WorldMapHero() {
  const locale = useLocale() as 'ja' | 'en';
  const t = useTranslations('hero');

  const stops = projectStops(journeyStops);

  const currentLabel = currentStop.city
    ? `${currentStop.city[locale]}, ${currentStop.country[locale]}`
    : currentStop.country[locale];

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[2/1] rounded-2xl border border-white/8 bg-surface-card/60 overflow-hidden">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full"
          role="img"
          aria-label={t('mapCaption')}
        >
          <defs>
            <radialGradient id="world-map-vignette" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.14)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
          </defs>

          <rect
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            fill="url(#world-map-vignette)"
          />

          <path
            d={WORLD_LAND_PATH}
            fill="rgba(148,163,184,0.22)"
            stroke="rgba(148,163,184,0.32)"
            strokeWidth={0.5}
            fillRule="evenodd"
          />

          {/* Routes connecting the stops in order — solid for traveled legs, dashed/faint for the planned route ahead.
              Each leg is drawn three times (shifted a full map-width left/right); the SVG viewBox clips away the
              off-screen copies, so a leg crossing the seam appears to exit one edge and re-enter the other. */}
          {stops.slice(1).flatMap((stop, i) => {
            const prev = stops[i];
            const planned = stop.status === 'planned';
            const icon = stop.transport ? TRANSPORT_ICON[stop.transport] : null;

            return [-MAP_WIDTH, 0, MAP_WIDTH].map((offset) => {
              const x1 = prev.xUnwrapped + offset;
              const x2 = stop.xUnwrapped + offset;
              const midX = (x1 + x2) / 2;
              const midY = Math.min(prev.y, stop.y) - 36;
              return (
                <g key={`${stop.id}-${offset}`}>
                  <path
                    d={`M ${x1} ${prev.y} Q ${midX} ${midY} ${x2} ${stop.y}`}
                    fill="none"
                    stroke={
                      planned
                        ? 'rgba(148,163,184,0.4)'
                        : 'rgba(96,165,250,0.55)'
                    }
                    strokeWidth={1.5}
                    strokeDasharray={planned ? '3 6' : '5 5'}
                    className={planned ? undefined : 'animate-dash-flow'}
                  />
                  {icon && (
                    <text
                      x={midX}
                      y={midY + 4}
                      fontSize="13"
                      textAnchor="middle"
                    >
                      {icon}
                    </text>
                  )}
                </g>
              );
            });
          })}

          {/* Stops: filled pins for the traveled route, hollow pins for the planned route ahead */}
          {stops.map((stop) => {
            const label = stop.city
              ? `${stop.country[locale]} – ${stop.city[locale]}`
              : stop.country[locale];
            const planned = stop.status === 'planned';
            return (
              <g key={stop.id}>
                {stop.current && (
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={7}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    className="animate-ping-slow"
                  />
                )}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={stop.current ? 6 : 4}
                  fill={
                    planned
                      ? 'var(--color-surface)'
                      : stop.current
                        ? 'var(--color-accent)'
                        : 'var(--color-accent-light)'
                  }
                  stroke={
                    planned ? 'rgba(148,163,184,0.7)' : 'var(--color-surface)'
                  }
                  strokeWidth={1.5}
                  strokeDasharray={planned ? '2 2' : undefined}
                >
                  <title>{label}</title>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Current location chip */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/85 backdrop-blur border border-accent/25 text-accent text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          {t('currentlyIn', { country: currentLabel })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-muted text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-light inline-block" />
          {t('legendVisited')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-secondary inline-block" />
          {t('legendPlanned')}
        </span>
      </div>

      <p className="mt-1.5 text-center text-muted text-xs">
        {t('mapCaption')}
      </p>
    </div>
  );
}
