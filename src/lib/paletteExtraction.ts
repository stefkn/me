import sharp from "sharp";
import { rgbToOklab } from "./color";
import { mulberry32 } from "./rng";
import type { Swatch } from "./types";

interface Oklab {
  L: number;
  a: number;
  b: number;
}

function kmeans(points: Oklab[], k: number, seed = 0, iters = 30) {
  const rng = mulberry32(seed);
  const pool = [...Array(points.length).keys()];
  const centers: Oklab[] = [];
  for (let i = 0; i < k; i++) {
    const j = Math.floor(rng() * pool.length);
    centers.push({ ...points[pool[j]] });
    pool.splice(j, 1);
  }
  let labels = new Array(points.length).fill(0);
  for (let iter = 0; iter < iters; iter++) {
    for (let p = 0; p < points.length; p++) {
      let best = 0;
      let bestDist = Infinity;
      for (let c = 0; c < k; c++) {
        const dl = points[p].L - centers[c].L;
        const da = points[p].a - centers[c].a;
        const db = points[p].b - centers[c].b;
        const dist = dl * dl + da * da + db * db;
        if (dist < bestDist) {
          bestDist = dist;
          best = c;
        }
      }
      labels[p] = best;
    }
    const sums = Array.from({ length: k }, () => ({ L: 0, a: 0, b: 0, n: 0 }));
    for (let p = 0; p < points.length; p++) {
      const c = labels[p];
      sums[c].L += points[p].L;
      sums[c].a += points[p].a;
      sums[c].b += points[p].b;
      sums[c].n++;
    }
    let moved = 0;
    for (let c = 0; c < k; c++) {
      if (sums[c].n === 0) continue;
      const nl = sums[c].L / sums[c].n;
      const na = sums[c].a / sums[c].n;
      const nb = sums[c].b / sums[c].n;
      moved += Math.abs(nl - centers[c].L) + Math.abs(na - centers[c].a) + Math.abs(nb - centers[c].b);
      centers[c] = { L: nl, a: na, b: nb };
    }
    if (moved < 1e-5) break;
  }
  const counts = new Array(k).fill(0);
  for (const l of labels) counts[l]++;
  return { centers, counts };
}

export async function extractPalette(path: string, k = 6): Promise<Swatch[]> {
  const { data, info } = await sharp(path)
    .resize(140, 140, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const points: Oklab[] = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const [L, a, b] = rgbToOklab(data[i], data[i + 1], data[i + 2]);
    points.push({ L, a, b });
  }

  const { centers, counts } = kmeans(points, k, 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const swatches: Swatch[] = centers.map((c, i) => {
    const C = Math.hypot(c.a, c.b);
    const H = ((Math.atan2(c.b, c.a) * 180) / Math.PI + 360) % 360;
    return {
      L: round(c.L, 3),
      C: round(C, 3),
      H: round(H, 1),
      weight: round(counts[i] / total, 3),
    };
  });
  swatches.sort((a, b) => b.weight - a.weight);
  return swatches;
}

function round(v: number, d: number) {
  const m = 10 ** d;
  return Math.round(v * m) / m;
}
