import type { journeyStops } from '@/data/journey';

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 500;

// Center the map on Japan (135°E, the JST reference meridian) so the journey
// reads as heading east from home. Must match CENTER_LNG in scripts/gen-world-map.js.
const CENTER_LNG = 135;

function normalizeLng(lng: number) {
  let d = (((lng - CENTER_LNG) % 360) + 360) % 360; // 0..360
  if (d > 180) d -= 360; // -180..180
  return d;
}

export const lngToX = (lng: number) => ((normalizeLng(lng) + 180) / 360) * MAP_WIDTH;
export const latToY = (lat: number) => ((90 - lat) / 180) * MAP_HEIGHT;

/**
 * Projects stops onto the map, keeping a continuous "unwrapped" x alongside
 * the visible (wrapped) one — so a route leg that crosses the seam (e.g.
 * South America -> Africa, on the far side of the globe from Japan) can be
 * drawn as a single line that exits one edge and re-enters the other,
 * instead of a line cutting straight across the map.
 */
export function projectStops(stops: typeof journeyStops) {
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
    const y = latToY(stop.lat);

    return { ...stop, x, xUnwrapped, y };
  });
}
