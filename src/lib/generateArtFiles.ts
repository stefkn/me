import { readdir, writeFile, mkdir, access } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { generateArt } from "./art";
import { renderPNG } from "./renderStaticArt";

const POSTS_DIR = path.resolve(process.cwd(), "src/content/posts");
const OUT_DIR = path.resolve(process.cwd(), "public/generated/art");

const HERO = { width: 1920, height: 1080 };
const OG = { width: 1200, height: 630 };
const CARD = { width: 640, height: 360 };

interface ManifestEntry {
  hero: string;
  og: string;
  card: string;
}

async function dirExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

export async function generateArtFiles(): Promise<void> {
  if (!(await dirExists(POSTS_DIR))) {
    console.log("[generate-art] no posts directory, skipping");
    return;
  }

  const files = await collectFiles(POSTS_DIR);
  await mkdir(OUT_DIR, { recursive: true });

  const manifest: Record<string, ManifestEntry> = {};

  for (const file of files) {
    const rel = path.relative(POSTS_DIR, file).replace(/\\/g, "/");
    const slug = rel.replace(/\.(md|mdx)$/, "");
    const raw = readFileSync(file, "utf8");
    const { data } = matter(raw);

    const cfg = generateArt(slug, {
      seed: typeof data.seed === "number" ? data.seed : undefined,
      hue: typeof data.hue === "number" ? data.hue : undefined,
    });

    const heroBuf = await renderPNG(cfg, HERO.width, HERO.height);
    const heroPath = path.join(OUT_DIR, `${slug}-hero.png`);
    await mkdir(path.dirname(heroPath), { recursive: true });
    await writeFile(heroPath, heroBuf);

    const ogBuf = await renderPNG(cfg, OG.width, OG.height);
    await writeFile(path.join(OUT_DIR, `${slug}.png`), ogBuf);

    const cardBuf = await renderPNG(cfg, CARD.width, CARD.height);
    await writeFile(path.join(OUT_DIR, `${slug}-card.png`), cardBuf);

    manifest[slug] = {
      hero: `${slug}-hero.png`,
      og: `${slug}.png`,
      card: `${slug}-card.png`,
    };
    console.log(`[generate-art] generated art for "${slug}"`);
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`[generate-art] wrote manifest for ${Object.keys(manifest).length} posts`);
}
