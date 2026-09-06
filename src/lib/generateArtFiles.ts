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

interface ManifestEntry {
  hero: string;
  og: string;
}

async function dirExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

export async function generateArtFiles(): Promise<void> {
  if (!(await dirExists(POSTS_DIR))) {
    console.log("[generate-art] no posts directory, skipping");
    return;
  }

  const files = (await readdir(POSTS_DIR)).filter((f) => /\.(md|mdx)$/.test(f));
  await mkdir(OUT_DIR, { recursive: true });

  const manifest: Record<string, ManifestEntry> = {};

  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(raw);

    const cfg = generateArt(slug, {
      seed: typeof data.seed === "number" ? data.seed : undefined,
      hue: typeof data.hue === "number" ? data.hue : undefined,
    });

    const heroBuf = await renderPNG(cfg, HERO.width, HERO.height);
    await writeFile(path.join(OUT_DIR, `${slug}-hero.png`), heroBuf);

    const ogBuf = await renderPNG(cfg, OG.width, OG.height);
    await writeFile(path.join(OUT_DIR, `${slug}.png`), ogBuf);

    manifest[slug] = { hero: `${slug}-hero.png`, og: `${slug}.png` };
    console.log(`[generate-art] generated art for "${slug}"`);
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`[generate-art] wrote manifest for ${Object.keys(manifest).length} posts`);
}
