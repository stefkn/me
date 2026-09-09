import { mulberry32 } from "./rng";

export function makePerlin(seed: number) {
  const rng = mulberry32(seed);
  const N = 16;
  const angles = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) angles[i] = rng() * Math.PI * 2;

  function grad(ix: number, iy: number): [number, number] {
    const gi = (((iy % N) + N) % N) * N + (((ix % N) + N) % N);
    const a = angles[gi];
    return [Math.cos(a), Math.sin(a)];
  }
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

  return function noise(x: number, y: number): number {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const sx = x - x0;
    const sy = y - y0;
    const [g00x, g00y] = grad(x0, y0);
    const [g10x, g10y] = grad(x1, y0);
    const [g01x, g01y] = grad(x0, y1);
    const [g11x, g11y] = grad(x1, y1);
    const n00 = g00x * sx + g00y * sy;
    const n10 = g10x * (sx - 1) + g10y * sy;
    const n01 = g01x * sx + g01y * (sy - 1);
    const n11 = g11x * (sx - 1) + g11y * (sy - 1);
    const u = fade(sx);
    const v = fade(sy);
    return (n00 * (1 - u) + n10 * u) * (1 - v) + (n01 * (1 - u) + n11 * u) * v;
  };
}

export function fbmField(
  seed: number,
  freq: number,
  octaves: number,
  gridW: number,
  gridH: number,
): Float32Array {
  const noise = makePerlin(seed);
  const out = new Float32Array(gridW * gridH);
  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      const u = gx / (gridW - 1);
      const v = gy / (gridH - 1);
      let amp = 0.5;
      let f = freq;
      let sum = 0;
      let norm = 0;
      for (let o = 0; o < octaves; o++) {
        sum += amp * noise(u * f, v * f);
        norm += amp;
        amp *= 0.5;
        f *= 2.0;
      }
      out[gy * gridW + gx] = sum / norm;
    }
  }
  return out;
}
