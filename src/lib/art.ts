import bankData from "../data/palette-bank.generated.json";
import type { ArtConfig, ArtField, PaletteBankEntry, Swatch } from "./types";
import { mulberry32 } from "./rng";
import { oklchToRgb } from "./color";
import { fbmField } from "./noise";

export const BANK: PaletteBankEntry[] = bankData.palettes;

const FALLBACK_ENTRY: PaletteBankEntry = {
  source: "fallback",
  swatches: [
    { L: 0.58, C: 0.17, H: 265, weight: 0.2 },
    { L: 0.68, C: 0.15, H: 320, weight: 0.18 },
    { L: 0.72, C: 0.1, H: 200, weight: 0.16 },
    { L: 0.52, C: 0.13, H: 30, weight: 0.14 },
    { L: 0.82, C: 0.06, H: 130, weight: 0.12 },
    { L: 0.46, C: 0.09, H: 170, weight: 0.1 },
  ],
};

function splitByChroma(swatches: Swatch[]) {
  const sorted = [...swatches].sort((a, b) => b.C - a.C);
  const richCount = Math.ceil(sorted.length / 2);
  return { sorted, rich: sorted.slice(0, richCount), wash: sorted.slice(richCount) };
}

const MIN_HUE_SPREAD = 60;
const MIN_BORROW_CHROMA = 0.06;

function hueDelta(a: number, b: number): number {
  const d = ((a - b) % 360 + 360) % 360;
  return d > 180 ? 360 - d : d;
}

function distinctHueCount(swatches: Swatch[]): number {
  if (swatches.length <= 1) return swatches.length;
  const hues = swatches.map((s) => s.H).sort((a, b) => a - b);
  let groups = 1;
  let spanStart = hues[0];
  let spanEnd = hues[0];
  for (let i = 1; i < hues.length; i++) {
    if (hues[i] - spanStart < MIN_HUE_SPREAD) {
      spanEnd = hues[i];
      continue;
    }
    groups++;
    spanStart = hues[i];
    spanEnd = hues[i];
  }
  if (groups > 1 && hueDelta(hues[0], spanEnd) < MIN_HUE_SPREAD) groups--;
  return groups;
}

function pickRichSwatches(
  entry: PaletteBankEntry,
  bank: PaletteBankEntry[],
  count: number,
): Swatch[] {
  const entryRich = [...entry.swatches].sort((a, b) => b.C - a.C).slice(0, count);

  if (distinctHueCount(entryRich) >= count) return entryRich;

  const pool = bank
    .flatMap((e) => e.swatches)
    .filter((s) => s.C >= MIN_BORROW_CHROMA)
    .sort((a, b) => b.C - a.C);

  const chosen: Swatch[] = [entryRich[0]];
  const used = new Set<Swatch>(chosen);

  while (chosen.length < count) {
    let best: Swatch | null = null;
    let bestScore = -Infinity;
    for (const s of pool) {
      if (used.has(s)) continue;
      let minD = Infinity;
      for (const c of chosen) {
        const d = hueDelta(c.H, s.H);
        if (d < minD) minD = d;
      }
      if (minD < MIN_HUE_SPREAD) continue;
      const score = minD + s.C * 0.01;
      if (score > bestScore) {
        bestScore = score;
        best = s;
      }
    }
    if (!best) break;
    chosen.push(best);
    used.add(best);
  }

  for (const s of entryRich) {
    if (chosen.length >= count) break;
    if (!used.has(s)) {
      chosen.push(s);
      used.add(s);
    }
  }

  return chosen;
}

function boostRich(s: Swatch, rng: () => number): [number, number, number] {
  const boostedL = s.L + (0.58 - s.L) * 0.35;
  const boostedC = Math.max(s.C, 0.2 + rng() * 0.1);
  return oklchToRgb(boostedL, boostedC, s.H);
}

function backgroundFrom(wash: Swatch[], sorted: Swatch[]) {
  const calmest = wash.at(-1) ?? sorted.at(-1)!;
  const calmer2 = wash.at(-2) ?? sorted.at(-2) ?? calmest;
  return {
    bgTop: oklchToRgb(calmest.L, calmest.C, calmest.H),
    bgBottom: oklchToRgb(calmer2.L, calmer2.C, calmer2.H),
  };
}

export function generateBankFields(
  seed: number,
  bank: PaletteBankEntry[],
  gridW: number,
  gridH: number,
): ArtConfig {
  const rng = mulberry32(seed);
  const source = bank.length > 0 ? bank : [FALLBACK_ENTRY];
  const entry = source[Math.floor(rng() * source.length)];
  const { sorted, wash } = splitByChroma(entry.swatches);
  const rich = pickRichSwatches(entry, source, Math.ceil(entry.swatches.length / 2));

  const sepBase = rng() * Math.PI * 2;
  const hardCount = Math.min(rich.length, 1 + (rng() < 0.4 ? 1 : 0));
  const hardIdx = new Set<number>();
  while (hardIdx.size < hardCount) hardIdx.add(Math.floor(rng() * rich.length));

  const fields: ArtField[] = [];

  rich.forEach((s, i) => {
    const angle = sepBase + (i / rich.length) * Math.PI * 2 + (rng() - 0.5) * 0.5;
    const dist = 0.22 + rng() * 0.14;
    const areaScale = 0.7 + s.weight * 2.2;
    const isHard = hardIdx.has(i);

    fields.push({
      rgb: boostRich(s, rng),
      cx: 0.5 + Math.cos(angle) * dist,
      cy: 0.5 + Math.sin(angle) * dist,
      rx: (isHard ? 0.58 + rng() * 0.28 : 0.5 + rng() * 0.25) * areaScale,
      ry: (0.42 + rng() * 0.2) * areaScale,
      opacity: 0.95 + rng() * 0.2,
      core: isHard ? 0.32 + rng() * 0.22 : 0.12 + rng() * 0.1,
      hardness: isHard ? 2.6 + rng() * 1.6 : 1.6 + rng() * 0.6,
      warpAmt: isHard ? 0.22 + rng() * 0.16 : 0.05 + rng() * 0.05,
      warpX: fbmField(Math.floor(rng() * 1e6), 2.5 + rng() * 2.0, 3, gridW, gridH),
      warpY: fbmField(Math.floor(rng() * 1e6) + 7919, 2.5 + rng() * 2.0, 3, gridW, gridH),
      driftAmp: isHard ? 0.05 + rng() * 0.05 : 0.07 + rng() * 0.06,
      driftSpeed: 0.05 + rng() * 0.06,
      driftSpeedY: 0.06 + rng() * 0.09,
      phase: rng() * Math.PI * 2,
    });
  });

  wash.forEach((s) => {
    const areaScale = 0.7 + s.weight * 2.2;
    fields.push({
      rgb: oklchToRgb(s.L, s.C, s.H),
      cx: -0.3 + rng() * 1.6,
      cy: -0.3 + rng() * 1.6,
      rx: (0.85 + rng() * 0.35) * areaScale,
      ry: (0.7 + rng() * 0.3) * areaScale,
      opacity: 0.38 + rng() * 0.14,
      core: 0,
      hardness: 1.1 + rng() * 0.4,
      warpAmt: 0.03 + rng() * 0.03,
      warpX: fbmField(Math.floor(rng() * 1e6), 2.0 + rng() * 1.5, 3, gridW, gridH),
      warpY: fbmField(Math.floor(rng() * 1e6) + 7919, 2.0 + rng() * 1.5, 3, gridW, gridH),
      driftAmp: 0.14 + rng() * 0.1,
      driftSpeed: 0.05 + rng() * 0.06,
      driftSpeedY: 0.06 + rng() * 0.09,
      phase: rng() * Math.PI * 2,
    });
  });

  return { fields, ...backgroundFrom(wash, sorted), source: entry.source };
}

function fieldWeight(d: number, core: number, hardness: number): number {
  if (d <= core) return 1;
  const shell = Math.max(0.08, 1 - core);
  const t = Math.min(1, (d - core) / shell);
  return Math.pow(Math.max(0, 1 - t), hardness);
}

export function sampleGrid(
  cfg: ArtConfig,
  t: number,
  gridW: number,
  gridH: number,
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(gridW * gridH * 4);
  for (let gy = 0; gy < gridH; gy++) {
    for (let gx = 0; gx < gridW; gx++) {
      const idx2 = gy * gridW + gx;
      const u = gx / (gridW - 1);
      const v = gy / (gridH - 1);
      let rS = 0;
      let gS = 0;
      let bS = 0;
      let wS = 0;

      for (const f of cfg.fields) {
        const cx = f.cx + f.driftAmp * Math.sin(t * f.driftSpeed + f.phase);
        const cy = f.cy + f.driftAmp * Math.cos(t * f.driftSpeedY + f.phase * 1.3);
        const dx = (u - cx) / f.rx + f.warpX[idx2] * f.warpAmt;
        const dy = (v - cy) / f.ry + f.warpY[idx2] * f.warpAmt;
        const d = Math.hypot(dx, dy);
        const w = f.opacity * fieldWeight(d, f.core, f.hardness);
        rS += f.rgb[0] * w;
        gS += f.rgb[1] * w;
        bS += f.rgb[2] * w;
        wS += w;
      }

      const bgR = cfg.bgTop[0] + (cfg.bgBottom[0] - cfg.bgTop[0]) * v;
      const bgG = cfg.bgTop[1] + (cfg.bgBottom[1] - cfg.bgTop[1]) * v;
      const bgB = cfg.bgTop[2] + (cfg.bgBottom[2] - cfg.bgTop[2]) * v;
      rS += bgR * 0.2;
      gS += bgG * 0.2;
      bS += bgB * 0.2;
      wS += 0.2;

      const idx = idx2 * 4;
      out[idx] = rS / wS;
      out[idx + 1] = gS / wS;
      out[idx + 2] = bS / wS;
      out[idx + 3] = 255;
    }
  }
  return out;
}
