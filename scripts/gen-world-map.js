const fs = require('fs');
const path = require('path');
const { feature } = require('topojson-client');
const topo = require('world-atlas/land-110m.json');

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

// Center the map on Japan (135°E, the JST reference meridian) so the journey
// reads as heading east from home. This moves the "seam" of the flat map to
// the opposite side of the globe (off the coast of South America) instead of
// the usual 180° meridian. Must match CENTER_LNG in WorldMapHero.tsx.
const CENTER_LNG = 135;

function normalizeLng(lng) {
  let d = ((lng - CENTER_LNG) % 360 + 360) % 360; // 0..360
  if (d > 180) d -= 360; // -180..180
  return d;
}

function project([lng, lat]) {
  const shifted = normalizeLng(lng);
  const x = ((shifted + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return [x, y];
}

function ringToPath(ring) {
  let d = '';
  let prevShifted = null;
  for (let i = 0; i < ring.length; i++) {
    const shifted = normalizeLng(ring[i][0]);
    const [x, y] = project(ring[i]);
    if (i === 0) {
      d += `M${x.toFixed(2)},${y.toFixed(2)}`;
    } else if (prevShifted !== null && Math.abs(shifted - prevShifted) > 180) {
      // Seam crossing — break the path instead of drawing a line across the map.
      d += `M${x.toFixed(2)},${y.toFixed(2)}`;
    } else {
      d += `L${x.toFixed(2)},${y.toFixed(2)}`;
    }
    prevShifted = shifted;
  }
  return d + 'Z';
}

function polygonToPath(polygon) {
  return polygon.map(ringToPath).join(' ');
}

const geo = feature(topo, topo.objects.land);
let d = '';
for (const f of geo.features) {
  const g = f.geometry;
  if (g.type === 'Polygon') {
    d += polygonToPath(g.coordinates) + ' ';
  } else if (g.type === 'MultiPolygon') {
    for (const poly of g.coordinates) {
      d += polygonToPath(poly) + ' ';
    }
  }
}
d = d.trim();

const out = `// AUTO-GENERATED from world-atlas (land-110m, Natural Earth data, public domain).
// Equirectangular projection, viewBox 0 0 ${MAP_WIDTH} ${MAP_HEIGHT}, centered on
// Japan at ${CENTER_LNG}°E (lng ${CENTER_LNG}-180..${CENTER_LNG}+180 -> x 0..${MAP_WIDTH}, lat 90..-90 -> y 0..${MAP_HEIGHT}).
// Regenerate with scripts/gen-world-map.js if a different resolution/projection is needed.
export const WORLD_LAND_PATH = ${JSON.stringify(d)};
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'worldLandPath.ts'),
  out,
  'utf-8'
);

console.log('Path length (chars):', d.length);
console.log('Features:', geo.features.length);
