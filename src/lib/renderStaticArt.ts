import sharp from "sharp";
import type { PaletteBankEntry } from "./types";
import { generateBankFields, sampleGrid } from "./art";

const GRID_W = 76;
const GRID_H = 43;

export async function renderArtPNG(
  seed: number,
  bank: PaletteBankEntry[],
  width: number,
  height: number,
): Promise<Buffer> {
  const cfg = generateBankFields(seed, bank, GRID_W, GRID_H);
  const raw = sampleGrid(cfg, 0, GRID_W, GRID_H);
  return sharp(Buffer.from(raw), {
    raw: { width: GRID_W, height: GRID_H, channels: 4 },
  })
    .resize(width, height, { kernel: "cubic" })
    .png()
    .toBuffer();
}
