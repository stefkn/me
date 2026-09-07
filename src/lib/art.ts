export interface ArtField {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  colors: string[];
  opacity: number;
  driftAmp: number;
  driftSpeed: number;
  driftSpeedY: number;
  hueDrift: number;
  phase: number;
}

export interface ArtConfig {
  seed: number;
  width: number;
  height: number;
  background: string;
  backgroundBottom: string;
  accent: string;
  palette: string[];
  neon: string[];
  fields: ArtField[];
}

const PRIMARY_HUES = [0, 30, 55, 120, 210, 270];

export function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.min(1, Math.max(0, s));
  l = Math.min(1, Math.max(0, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function generateArt(
  slug: string,
  options?: { seed?: number; hue?: number; width?: number; height?: number },
): ArtConfig {
  const seed = options?.seed ?? hashString(slug);
  const width = options?.width ?? 1920;
  const height = options?.height ?? 1080;
  const rng = mulberry32(seed);

  const hue = options?.hue ?? PRIMARY_HUES[Math.floor(rng() * PRIMARY_HUES.length)];
  const saturation = 0.65 + rng() * 0.25;

  const deep = hslToHex(hue - 35 + (rng() - 0.5) * 14, saturation, 0.13 + rng() * 0.05);
  const mid = hslToHex(hue + (rng() - 0.5) * 12, saturation, 0.5 + rng() * 0.06);
  const light = hslToHex(hue + 35 + (rng() - 0.5) * 14, saturation, 0.88 + rng() * 0.04);
  const accent = hslToHex(hue + 180 + (rng() - 0.5) * 20, 0.7 + rng() * 0.2, 0.5 + rng() * 0.1);
  const shades = [deep, mid, light];
  const neon = [
    hslToHex(hue - 12, 0.9, 0.30),
    hslToHex(hue - 4, 0.95, 0.44),
    hslToHex(hue + 4, 1.0, 0.58),
    hslToHex(hue + 12, 0.9, 0.72),
  ];

  const fieldCount = 4;
  const fieldColors = [
    [shades[0], shades[1]],
    [shades[1], shades[2]],
    [shades[2], shades[0]],
    [accent, shades[1]],
  ];
  const fields: ArtField[] = [];

  for (let i = 0; i < fieldCount; i++) {
    const isAccent = i === fieldCount - 1;
    fields.push({
      id: `f${i}`,
      cx: isAccent ? 0.35 + rng() * 0.3 : -0.5 + rng() * 2.0,
      cy: isAccent ? 0.3 + rng() * 0.4 : -0.5 + rng() * 2.0,
      rx: isAccent ? 0.6 + rng() * 0.35 : 1.5 + rng() * 1.5,
      ry: isAccent ? 0.45 + rng() * 0.3 : 1.2 + rng() * 1.3,
      colors: [...fieldColors[i]],
      opacity: isAccent ? 0.35 + rng() * 0.15 : 0.15 + rng() * 0.15,
      driftAmp: isAccent ? 0.12 + rng() * 0.1 : 0.25 + rng() * 0.3,
      driftSpeed: 0.06 + rng() * 0.09,
      driftSpeedY: 0.08 + rng() * 0.17,
      hueDrift: 0.3 + rng() * 0.7,
      phase: rng() * Math.PI * 2,
    });
  }

  return {
    seed,
    width,
    height,
    background: deep,
    backgroundBottom: light,
    accent,
    palette: [deep, mid, light, accent],
    neon,
    fields,
  };
}
