export interface Swatch {
  L: number;
  C: number;
  H: number;
  weight: number;
}

export interface PaletteBankEntry {
  source: string;
  swatches: Swatch[];
}

export interface ArtField {
  rgb: [number, number, number];
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  opacity: number;
  core: number;
  hardness: number;
  warpAmt: number;
  warpX: Float32Array;
  warpY: Float32Array;
  driftAmp: number;
  driftSpeed: number;
  driftSpeedY: number;
  phase: number;
}

export interface ArtConfig {
  fields: ArtField[];
  bgTop: [number, number, number];
  bgBottom: [number, number, number];
  source: string;
}
