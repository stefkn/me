import sharp from "sharp";
import type { ArtConfig } from "./art";

export function renderSVG(cfg: ArtConfig, width: number, height: number): string {
  const defs: string[] = [];
  const shapes: string[] = [];

  const bgId = "art-bg";
  defs.push(
    `<linearGradient id="${bgId}" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0%" stop-color="${cfg.background}"/>` +
      `<stop offset="100%" stop-color="${cfg.backgroundBottom}"/>` +
      `</linearGradient>`,
  );
  shapes.push(`<rect width="${width}" height="${height}" fill="url(#${bgId})"/>`);

  cfg.fields.forEach((field, i) => {
    const id = `grad-${i}`;
    const cx = field.cx * width;
    const cy = field.cy * height;
    const rx = field.rx * width;
    const ry = field.ry * height;
    const mid = field.colors[1] ?? field.colors[0];
    const last = field.colors[field.colors.length - 1];

    defs.push(
      `<radialGradient id="${id}" gradientUnits="objectBoundingBox" cx="50%" cy="50%" r="50%">` +
        `<stop offset="0%" stop-color="${field.colors[0]}" stop-opacity="${field.opacity.toFixed(3)}"/>` +
        `<stop offset="45%" stop-color="${mid}" stop-opacity="${(field.opacity * 0.75).toFixed(3)}"/>` +
        `<stop offset="100%" stop-color="${last}" stop-opacity="0"/>` +
        `</radialGradient>`,
    );
    shapes.push(
      `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="url(#${id})"/>`,
    );
  });

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<defs>${defs.join("")}</defs>` +
    shapes.join("") +
    `</svg>`
  );
}

export async function renderPNG(
  cfg: ArtConfig,
  width = cfg.width,
  height = cfg.height,
): Promise<Buffer> {
  const svg = renderSVG(cfg, width, height);
  return sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();
}

export async function renderWebP(
  cfg: ArtConfig,
  width = cfg.width,
  height = cfg.height,
): Promise<Buffer> {
  const svg = renderSVG(cfg, width, height);
  return sharp(Buffer.from(svg), { density: 72 }).webp({ quality: 85 }).toBuffer();
}
