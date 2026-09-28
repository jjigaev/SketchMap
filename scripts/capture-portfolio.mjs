import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const origin = process.env.PREVIEW_ORIGIN || "http://localhost:4321";
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
});
async function settlePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    images.forEach((image) => (image.loading = "eager"));
    await Promise.all(images.map((image) => image.decode()));
    await new Promise((done) =>
      requestAnimationFrame(() => requestAnimationFrame(done)),
    );
  });
}
await mkdir("review/portfolio", { recursive: true });
await mkdir("public/portfolio/media", { recursive: true });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const pages = {
    forma: "/SketchMap/",
    oryn: "/SketchMap/portfolio/demos/oryn/",
    "aq-tis": "/SketchMap/portfolio/demos/aq-tis/",
    sary: "/SketchMap/portfolio/demos/sary/",
  };
  for (const [slug, path] of Object.entries(pages)) {
    for (const [device, width, height] of [
      ["desktop", 1440, 960],
      ["mobile", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
      await settlePage(page);
      // Warm the compositor before capturing filtered images in headless Edge.
      await page.screenshot();
      await settlePage(page);
      const buffer = await page.screenshot();
      await sharp(buffer)
        .webp({ quality: 85, effort: 6 })
        .toFile(`public/portfolio/media/${slug}-${device}.webp`);
      console.log(`Captured ${slug} ${device}`);
    }
  }
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${origin}/SketchMap/portfolio/`, {
      waitUntil: "networkidle",
    });
    await settlePage(page);
    await page.screenshot({
      path: `review/portfolio/home-${device}.png`,
      fullPage: true,
    });
    const hero = await page.screenshot();
    await sharp(hero)
      .webp({ quality: 85 })
      .toFile(`review/portfolio/hero-${device}.webp`);
    if (device === "desktop")
      await sharp(hero)
        .resize(1200, 630, { fit: "cover", position: "top" })
        .jpeg({ quality: 82 })
        .toFile("public/portfolio/media/og.jpg");
  }
} finally {
  await browser.close();
}
