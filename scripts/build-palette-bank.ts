import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { extractPalette } from "../src/lib/paletteExtraction";
import { oklchToRgb } from "../src/lib/color";
import type { PaletteBankEntry, Swatch } from "../src/lib/types";

const REFS_DIR = path.resolve(process.cwd(), "src/data/gradient-refs");
const OUT_FILE = path.resolve(process.cwd(), "src/data/palette-bank.generated.json");
const PREVIEW_DIR = path.resolve(process.cwd(), ".palette-preview");
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MIN_DIM = 200;

async function writeContactSheet(palettes: PaletteBankEntry[]): Promise<void> {
  if (palettes.length === 0) return;
  const W = 1200;
  const ROW = 36;
  const H = palettes.length * ROW;
  const buf = Buffer.alloc(W * H * 4, 255);
  palettes.forEach((entry, rowIdx) => {
    let x = 0;
    for (const s of entry.swatches) {
      const [r, g, b] = oklchToRgb(s.L, s.C, s.H);
      const w = Math.max(1, Math.round(s.weight * W));
      const end = Math.min(W, x + w);
      for (let px = x; px < end; px++) {
        for (let py = 0; py < ROW; py++) {
          const idx = ((rowIdx * ROW + py) * W + px) * 4;
          buf[idx] = Math.round(r);
          buf[idx + 1] = Math.round(g);
          buf[idx + 2] = Math.round(b);
          buf[idx + 3] = 255;
        }
      }
      x = end;
    }
  });
  await mkdir(PREVIEW_DIR, { recursive: true });
  await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile(path.join(PREVIEW_DIR, "contact-sheet.png"));
  console.log(`wrote ${path.join(PREVIEW_DIR, "contact-sheet.png")}`);
}

async function main() {
  let entries;
  try {
    entries = await readdir(REFS_DIR, { withFileTypes: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      await mkdir(REFS_DIR, { recursive: true });
      entries = [];
    } else {
      throw err;
    }
  }
  const files = entries
    .filter((e) => e.isFile() && SUPPORTED.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name);

  let cache: Record<string, { hash: string; swatches: Swatch[] }> = {};
  try {
    cache = JSON.parse(await readFile(OUT_FILE, "utf-8")).cache ?? {};
  } catch {
    /* no prior build */
  }

  const nextCache: typeof cache = {};
  const palettes: PaletteBankEntry[] = [];

  for (const file of files) {
    const full = path.join(REFS_DIR, file);
    const bytes = await readFile(full);
    const hash = createHash("sha1").update(bytes).digest("hex");

    if (cache[file]?.hash === hash) {
      nextCache[file] = cache[file];
      palettes.push({ source: file, swatches: cache[file].swatches });
      continue;
    }

    const meta = await sharp(full).metadata();
    if (!meta.width || !meta.height || Math.min(meta.width, meta.height) < MIN_DIM) {
      console.warn(`skipping ${file}: below ${MIN_DIM}px minimum`);
      continue;
    }

    const swatches = await extractPalette(full);
    nextCache[file] = { hash, swatches };
    palettes.push({ source: file, swatches });
    console.log(`extracted ${file} (${swatches.length} swatches, top weight ${swatches[0].weight})`);
  }

  await writeFile(
    OUT_FILE,
    JSON.stringify({ generatedAt: new Date().toISOString(), cache: nextCache, palettes }, null, 2),
  );
  console.log(`wrote ${palettes.length} palettes to ${OUT_FILE}`);

  await writeContactSheet(palettes);
}

main();
