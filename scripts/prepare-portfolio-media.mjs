import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

// Pass the folder containing the original generated PNGs; originals are never changed.
const source = process.argv[2];
if (!source)
  throw new Error(
    "Usage: node scripts/prepare-portfolio-media.mjs <source directory>",
  );
const files = {
  architecture: "exec-2a999553-c35f-4d54-a88d-34a1160d93ee.png",
  dental: "exec-0ce516c6-8a18-489b-9b44-cc37f0fb4d22.png",
  restaurant: "exec-e6126823-b4e0-4ed1-bb72-82be3425cdc7.png",
  interior: "exec-2a012dd4-afbc-499c-8404-ed4d84645f48.png",
};
await mkdir("public/portfolio/media", { recursive: true });
for (const [name, file] of Object.entries(files)) {
  for (const width of [1600, 800]) {
    const target = `public/portfolio/media/${name}${width === 800 ? "-800" : ""}.webp`;
    const info = await sharp(join(source, file))
      .resize({ width })
      .webp({ quality: 79, effort: 6 })
      .toFile(target);
    console.log(`${target}: ${Math.round(info.size / 1024)} KB`);
  }
}
