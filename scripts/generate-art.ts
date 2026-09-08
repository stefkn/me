import { generateArtFiles } from "../src/lib/generateArtFiles";

generateArtFiles().catch((err) => {
  console.error("[generate-art] failed", err);
  process.exit(1);
});
