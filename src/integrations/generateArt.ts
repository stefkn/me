import type { AstroIntegration } from "astro";
import { generateArtFiles } from "../lib/generateArtFiles";

export default function generateArtIntegration(): AstroIntegration {
  return {
    name: "generate-header-art",
    hooks: {
      "astro:server:setup": async () => {
        await generateArtFiles();
      },
      "astro:build:start": async () => {
        await generateArtFiles();
      },
    },
  };
}
