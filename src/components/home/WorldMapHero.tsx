import { useLocale, useTranslations } from 'next-intl';
import { journeyStops, currentStop } from '@/data/journey';
import { WORLD_LAND_PATH } from '@/data/worldLandPath';
import { MAP_WIDTH, lngToX, latToY, projectStops } from '@/lib/worldMap';

// Only the latitude band the journey actually covers (≈ 50°N to 37°S) is shown,
// so the map reads as a wide strip along the bottom of the hero.
const VIEW_Y = 105;
const VIEW_HEIGHT = 245;

const LAT_LINES = [40, 30, 20, 10, 0, -10, -20, -30];
const LNG_LINES = Array.from({ length: 25 }, (_, i) => -180 + i * 15);

export function WorldMapHero() {
  const locale = useLocale() as 'ja' | 'en';
  const t = useTranslations('home.hero');

  const stops = projectStops(journeyStops);
  const current = stops.find((s) => s.current) ?? stops[stops.length - 1];

  const visitedCountries = new Set(
    journeyStops.filter((s) => s.status === 'visited').map((s) => s.country.en),
  ).size;

  const currentLabel = currentStop.city
    ? `${currentStop.city[locale]}, ${currentStop.country[locale]}`
    : currentStop.country[locale];

  return (
    <div className="relative w-full border-t border-line">
      <div
        className="relative w-full"
        style={{ aspectRatio: `${MAP_WIDTH} / ${VIEW_HEIGHT}`, maxHeight: 340 }}
      >
        <svg
          viewBox={`0 ${VIEW_Y} ${MAP_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="World trip route"
        >
          {LNG_LINES.map((lng) => {
            const x = lngToX(lng);
            return (
              <line
                key={`lng-${lng}`}
                x1={x}
                x2={x}
                y1={VIEW_Y}
                y2={VIEW_Y + VIEW_HEIGHT}
                stroke="rgba(237,233,224,0.06)"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {LAT_LINES.map((lat) => (
            <line
              key={`lat-${lat}`}
              x1={0}
              x2={MAP_WIDTH}
              y1={latToY(lat)}
              y2={latToY(lat)}
              stroke="rgba(237,233,224,0.06)"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path
            d={WORLD_LAND_PATH}
            fill="rgba(237,233,224,0.07)"
            stroke="rgba(237,233,224,0.25)"
            strokeWidth={0.5}
            fillRule="evenodd"
          />

          {/* Routes connecting the stops in order — solid accent for traveled legs, dashed/faint for the planned route.
              Each leg is drawn three times (shifted a full map-width left/right); the SVG viewBox clips away the
              off-screen copies, so a leg crossing the seam appears to exit one edge and re-enter the other. */}
          {stops.slice(1).flatMap((stop, i) => {
            const prev = stops[i];
            const planned = stop.status === 'planned';

            return [-MAP_WIDTH, 0, MAP_WIDTH].map((offset) => {
              const x1 = prev.xUnwrapped + offset;
              const x2 = stop.xUnwrapped + offset;
              const midX = (x1 + x2) / 2;
              const midY = Math.min(prev.y, stop.y) - 36;
              return (
                <path
                  key={`${stop.id}-${offset}`}
                  d={`M ${x1} ${prev.y} Q ${midX} ${midY} ${x2} ${stop.y}`}
                  fill="none"
                  stroke={planned ? 'rgba(237,233,224,0.4)' : 'var(--color-accent)'}
                  strokeWidth={1.5}
                  strokeDasharray={planned ? '3 6' : '5 5'}
                  vectorEffect="non-scaling-stroke"
                  className={planned ? undefined : 'animate-dash-flow'}
                />
              );
            });
          })}

          {/* Stops: filled for the traveled route, hollow for the planned route ahead */}
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
                    fill="rgba(255,91,46,0.15)"
                    stroke="var(--color-accent)"
                    strokeWidth={1}
                    className="animate-ping-slow"
                  />
                )}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={stop.current ? 4.5 : 3}
                  fill={
                    planned
                      ? 'var(--color-ink)'
                      : stop.current
                        ? 'var(--color-accent)'
                        : 'var(--color-paper)'
                  }
                  stroke={planned ? 'rgba(237,233,224,0.6)' : 'var(--color-ink)'}
                  strokeWidth={1}
                  strokeDasharray={planned ? '2 2' : undefined}
                >
                  <title>{label}</title>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Current location label, anchored next to the pulsing pin */}
        <div
          className="absolute hidden sm:flex items-center gap-2 whitespace-nowrap"
          style={{
            left: `calc(${(current.x / MAP_WIDTH) * 100}% + 18px)`,
            top: `${((current.y - VIEW_Y) / VIEW_HEIGHT) * 100}%`,
            transform: 'translateY(-50%)',
          }}
        >
          <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink">
            {t('now')}
          </span>
          <span className="text-[13px] font-medium text-paper">{currentLabel}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-6 py-3 font-mono text-[10px] tracking-[0.1em] text-muted sm:flex-row sm:justify-between lg:px-16">
        <span>
          FIG.01 — JAPAN → {currentStop.country.en.toUpperCase()} / {visitedCountries}{' '}
          COUNTRIES · BY TRAIN, BUS, SHIP, FLIGHT
        </span>
        <span>→ CENTRAL &amp; SOUTH AMERICA · SOUTH AFRICA (PLANNED)</span>
      </div>
    </div>
  );
}
