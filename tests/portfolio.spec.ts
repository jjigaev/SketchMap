import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const root = "/SketchMap/portfolio/";
const routes = [
  "",
  "work/forma/",
  "work/oryn/",
  "work/aq-tis/",
  "work/sary/",
  "demos/oryn/",
  "demos/aq-tis/",
  "demos/sary/",
];
for (const width of [360, 390, 768, 1024, 1280, 1440]) {
  for (const route of routes) {
    test(`${route || "home"} at ${width}px: layout, assets, runtime`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("response", (response) => {
        if (response.status() >= 400)
          errors.push(`${response.status()} ${response.url()}`);
      });
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${root}${route}`);
      expect(response?.status()).toBe(200);
      await page.evaluate(async () => {
        await document.fonts.ready;
        const images = Array.from(document.images);
        images.forEach((image) => (image.loading = "eager"));
        await Promise.all(
          images.map((image) => image.decode().catch(() => {})),
        );
      });
      await expect(page.locator("h1")).toHaveCount(1);
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        broken: Array.from(document.images)
          .filter((image) => !image.complete || !image.naturalWidth)
          .map((image) => image.src),
      }));
      expect(metrics.overflow).toBeLessThanOrEqual(1);
      expect(metrics.broken).toEqual([]);
      expect(errors).toEqual([]);
      await page.reload();
      await expect(page.locator("h1")).toBeVisible();
    });
  }
}

for (const route of routes) {
  test(`${route || "home"}: WCAG AA automated audit`, async ({ page }) => {
    await page.goto(`${root}${route}`);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        targets: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}

test("Portfolio filtering, details, mobile navigation, and keyboard recovery", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(root);
  await page.getByRole("button", { name: "Концепты" }).click();
  await expect(page.locator(".project-showcase:visible")).toHaveCount(3);
  await page.getByRole("button", { name: "Реализованные" }).click();
  await expect(page.locator(".project-showcase:visible")).toHaveCount(1);
  await expect(page.locator(".project-showcase:visible h3")).toHaveText(
    "FORMA",
  );
  await page.getByRole("button", { name: "Все работы" }).click();
  await expect(page.locator(".project-showcase:visible")).toHaveCount(4);
  const menu = page.getByRole("button", { name: "Открыть меню" });
  await menu.click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await menu.click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Услуги" })
    .click();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  const closedService = page.locator(".service-row").nth(1);
  await closedService.locator("summary").click();
  await expect(closedService).toHaveAttribute("open", "");
});

test("Demo catalog filters and FAQ", async ({ page }) => {
  await page.goto(`${root}demos/oryn/`);
  await page.getByRole("button", { name: "Коммерческие", exact: true }).click();
  await expect(page.locator(".property-grid article:visible")).toHaveCount(1);
  await expect(page.locator(".property-grid article:visible h3")).toHaveText(
    "ORYN Work",
  );
  await page.goto(`${root}demos/sary/`);
  await page.getByRole("button", { name: "Сладкое", exact: true }).click();
  await expect(page.locator(".sary-menu-list article:visible")).toHaveCount(2);
  await page.goto(`${root}demos/aq-tis/`);
  const faq = page.locator(".dental-faq details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator("p")).toBeVisible();
});

for (const demo of ["oryn", "aq-tis", "sary"]) {
  test(`${demo}: honest demo form, validation, no outgoing request`, async ({
    page,
  }) => {
    await page.goto(`${root}demos/${demo}/`);
    const form = page.locator("[data-demo-form]");
    await form.getByRole("button", { name: /Проверить/ }).click();
    await expect(form.locator(".form-result")).toBeHidden();
    await form.locator("input[name=name]").fill("Тест");
    await form.locator("select[name=service]").selectOption({ index: 1 });
    if (demo !== "oryn") {
      const date = form.locator("input[type=date]");
      const today = await date.getAttribute("min");
      await date.fill("2000-01-01");
      await form.locator("select[name=time]").selectOption({ index: 1 });
      await form.getByRole("button", { name: /Проверить/ }).click();
      await expect(form.locator(".form-result")).toBeHidden();
      await date.fill(today!);
    }
    const submissions: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") submissions.push(request.url());
    });
    await form.getByRole("button", { name: /Проверить/ }).click();
    await expect(form.locator(".form-result")).toContainText(/не отправлен/);
    expect(submissions).toEqual([]);
    await form.locator("input[name=name]").fill("Другой пример");
    await expect(form.locator(".form-result")).toBeHidden();
  });
}

test("Reduced motion and progressive enhancement without JavaScript", async ({
  page,
  browser,
}) => {
  await page.goto(root);
  await page.evaluate(() => window.scrollTo(0, 1600));
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(`http://127.0.0.1:4322${root}`);
  await expect(staticPage.locator(".project-showcase")).toHaveCount(4);
  await expect(staticPage.locator(".project-showcase").first()).toBeVisible();
  await staticPage
    .getByRole("link", { name: "Подробнее о проекте" })
    .first()
    .click();
  await expect(staticPage.locator("h1")).toHaveText("FORMA");
  await staticPage.goto(`http://127.0.0.1:4322${root}demos/aq-tis/`);
  await expect(staticPage.locator('input[name="name"]')).toBeDisabled();
  await expect(
    staticPage.getByRole("button", { name: "Проверить запись" }),
  ).toBeDisabled();
  await context.close();
});

test("Normal-motion browser loads with no runtime failures", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "no-preference" });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`http://127.0.0.1:4322${root}`);
  for (const id of ["work", "services", "process", "about", "contact"])
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  expect(errors).toEqual([]);
  await context.close();
});

test("Every built HTML link, fragment, asset and old FORMA route resolves", async () => {
  const dist = resolve("dist");
  const htmlFiles: string[] = [];
  async function walk(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith(".html")) htmlFiles.push(path);
    }
  }
  await walk(dist);
  expect(htmlFiles.length).toBe(41);
  const oldPages = htmlFiles.filter(
    (path) => !relative(dist, path).startsWith(`portfolio${sep}`),
  );
  expect(oldPages.length).toBe(33);
  const issues: string[] = [];
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const pagePath = `/SketchMap/${relative(dist, file)
      .split(sep)
      .join("/")
      .replace(/index\.html$/, "")}`;
    const url = new URL(pagePath, "https://jjigaev.github.io");
    const refs = [...html.matchAll(/(?:href|src|poster)="([^"]+)"/g)].map(
      (match) => match[1],
    );
    for (const match of html.matchAll(/srcset="([^"]+)"/g))
      refs.push(
        ...match[1].split(",").map((value) => value.trim().split(/\s+/)[0]),
      );
    for (const ref of refs) {
      const target = new URL(ref.replaceAll("&amp;", "&"), url);
      if (target.origin !== url.origin) continue;
      if (!target.pathname.startsWith("/SketchMap/")) {
        issues.push(`${pagePath}: outside base ${ref}`);
        continue;
      }
      let path = resolve(
        dist,
        decodeURIComponent(target.pathname.slice("/SketchMap/".length)),
      );
      try {
        if ((await stat(path)).isDirectory())
          path = resolve(path, "index.html");
        await stat(path);
        if (target.hash && path.endsWith(".html")) {
          const body = path === file ? html : await readFile(path, "utf8");
          const id = decodeURIComponent(target.hash.slice(1));
          if (!body.includes(`id="${id}"`))
            issues.push(`${pagePath}: missing fragment ${ref}`);
        }
      } catch {
        issues.push(`${pagePath}: missing ${ref}`);
      }
    }
  }
  expect(issues).toEqual([]);
});

test("Existing FORMA localization, filtering, and project details still work", async ({
  page,
}) => {
  for (const [path, lang] of [
    ["/SketchMap/", "ru"],
    ["/SketchMap/kk/", "kk"],
    ["/SketchMap/en/", "en"],
  ]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("/SketchMap/projects/");
  await expect(page.locator("h1")).toBeVisible();
  const detail = page
    .locator('a[href*="/projects/"]')
    .filter({ has: page.locator("img") })
    .first();
  await detail.click();
  await expect(page.locator("h1")).toBeVisible();
  expect(page.url()).toMatch(/\/projects\/[^/]+\/$/);
});
