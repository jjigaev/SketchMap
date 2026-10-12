import { test, expect, type Page } from "@playwright/test";

const root = "/SketchMap/portfolio/";
const englishRoot = `${root}en/`;
const origin = "https://jjigaev.github.io";
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

async function expectLocaleMetadata(
  page: Page,
  route: string,
  lang: "ru" | "en",
) {
  const currentPath = `${lang === "en" ? englishRoot : root}${route}`;
  await expect(page.locator("html")).toHaveAttribute("lang", lang);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${origin}${currentPath}`,
  );
  for (const [language, path] of [
    ["ru", root],
    ["en", englishRoot],
    ["x-default", root],
  ]) {
    await expect(
      page.locator(`link[rel="alternate"][hreflang="${language}"]`),
    ).toHaveAttribute("href", `${origin}${path}${route}`);
  }
  await expect(
    page.locator(`.language-switch a[hreflang="${lang}"]`),
  ).toHaveAttribute("aria-current", "page");
}

for (const route of routes) {
  test(`${route || "home"}: English copy, reciprocal metadata, and matching language links`, async ({
    page,
  }) => {
    await page.goto(`${englishRoot}${route}`);
    await expectLocaleMetadata(page, route, "en");
    const untranslated = await page.evaluate(() => {
      const cyrillic = /[\u0400-\u04ff]/;
      const body = document.body.cloneNode(true) as HTMLElement;
      body
        .querySelectorAll("script, style, .language-switch")
        .forEach((node) => node.remove());
      const copy = [
        document.title,
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? "",
        body.textContent ?? "",
        ...Array.from(
          body.querySelectorAll("[alt], [aria-label], [title], [placeholder]"),
        ).flatMap((element) =>
          ["alt", "aria-label", "title", "placeholder"].map(
            (attribute) => element.getAttribute(attribute) ?? "",
          ),
        ),
      ];
      return copy
        .flatMap((text) => text.split(/\n/).map((line) => line.trim()))
        .filter((text) => cyrillic.test(text));
    });
    expect(untranslated).toEqual([]);

    const russian = page.locator('.language-switch a[hreflang="ru"]');
    await expect(russian).toHaveAttribute("href", `${root}${route}`);
    await russian.click();
    await expect(page).toHaveURL(`${root}${route}`);
    await expectLocaleMetadata(page, route, "ru");
    const english = page.locator('.language-switch a[hreflang="en"]');
    await expect(english).toHaveAttribute("href", `${englishRoot}${route}`);
    await english.click();
    await expect(page).toHaveURL(`${englishRoot}${route}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
}

test("English home offers websites to US businesses and preserves the real contact channels", async ({
  page,
}) => {
  await page.goto(englishRoot);
  const servesUSBusinesses =
    /\b(?:(?:US|U\.S\.|United States|American)\s+business(?:es)?|business(?:es)?\s+in\s+(?:Kazakhstan\s+and\s+)?(?:the\s+)?(?:US|U\.S\.|United States))/i;
  await expect(page.locator("main")).toContainText(servesUSBusinesses);
  await expect(page.locator("#contact")).toContainText(servesUSBusinesses);
  for (const href of [
    "https://t.me/xcheney",
    "https://wa.me/77084917354",
    "mailto:hempelkazakhstan@gmail.com",
  ]) {
    await expect(page.locator(`#contact a[href="${href}"]`)).toBeVisible();
  }
});

test("Language switching preserves the current home section", async ({
  page,
}) => {
  await page.goto(`${root}#services`);
  const english = page.locator('.language-switch a[hreflang="en"]');
  await expect(english).toHaveAttribute("href", `${englishRoot}#services`);
  await english.click();
  await expect(page).toHaveURL(`${englishRoot}#services`);
  await expect(page.locator("#services")).toBeInViewport();
  const russian = page.locator('.language-switch a[hreflang="ru"]');
  await expect(russian).toHaveAttribute("href", `${root}#services`);
  await russian.click();
  await expect(page).toHaveURL(`${root}#services`);
  await expect(page.locator("#services")).toBeInViewport();
  await page.locator('.desktop-nav a[href$="#about"]').click();
  await expect(english).toHaveAttribute("href", `${englishRoot}#about`);
  await page.goBack();
  await expect(english).toHaveAttribute("href", `${englishRoot}#services`);
});

test("Demo language links track initial and changed sections", async ({
  page,
}) => {
  await page.goto(`${englishRoot}demos/oryn/#main`);
  const russian = page.locator('.language-switch a[hreflang="ru"]');
  await expect(russian).toHaveAttribute("href", `${root}demos/oryn/#main`);
  await page.locator('.demo-footer a[href="#top"]').click();
  await expect(russian).toHaveAttribute("href", `${root}demos/oryn/#top`);
  await russian.click();
  await expect(page).toHaveURL(`${root}demos/oryn/#top`);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
});

test("Portfolio sitemap indexes both languages with reciprocal alternatives and excludes concept demos", async ({
  request,
  page,
}) => {
  const response = await request.get(`${root}sitemap.xml`);
  expect(response.status()).toBe(200);
  const sitemap = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, "application/xml");
      return {
        parseError: document.querySelector("parsererror")?.textContent ?? null,
        urls: Array.from(document.getElementsByTagNameNS("*", "url")).map(
          (url) => ({
            loc: url.getElementsByTagNameNS("*", "loc")[0]?.textContent,
            alternatives: Array.from(
              url.getElementsByTagNameNS(
                "http://www.w3.org/1999/xhtml",
                "link",
              ),
            ).map((link) => ({
              lang: link.getAttribute("hreflang"),
              href: link.getAttribute("href"),
            })),
          }),
        ),
      };
    },
    await response.text(),
  );
  expect(sitemap.parseError).toBeNull();
  const indexedRoutes = routes.filter((route) => !route.startsWith("demos/"));
  const expectedLocations = indexedRoutes.flatMap((route) => [
    `${origin}${root}${route}`,
    `${origin}${englishRoot}${route}`,
  ]);
  expect(sitemap.urls.map((url) => url.loc).sort()).toEqual(
    expectedLocations.sort(),
  );
  for (const route of indexedRoutes) {
    const alternatives = [
      { lang: "ru", href: `${origin}${root}${route}` },
      { lang: "en", href: `${origin}${englishRoot}${route}` },
      { lang: "x-default", href: `${origin}${root}${route}` },
    ];
    for (const base of [root, englishRoot]) {
      const entry = sitemap.urls.find(
        (url) => url.loc === `${origin}${base}${route}`,
      );
      expect(entry?.alternatives).toEqual(expect.arrayContaining(alternatives));
    }
  }
});

test("English project filters announce results and the mobile menu stays accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(englishRoot);
  await page.getByRole("button", { name: /Concepts/ }).click();
  await expect(page.locator(".project-showcase:visible")).toHaveCount(3);
  await expect(page.locator("[data-filter-status]")).toHaveText("Shown: 3");
  await page.locator('[data-filter="implemented"]').click();
  await expect(page.locator(".project-showcase:visible h3")).toHaveText(
    "FORMA",
  );
  await expect(page.locator("[data-filter-status]")).toHaveText("Shown: 1");
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".project-showcase:visible")).toHaveCount(4);
  await expect(page.locator("[data-filter-status]")).toHaveText("Shown: 4");

  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Close menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  const menu = page.getByRole("button", { name: "Open menu", exact: true });
  await expect(menu).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await menu.click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(page).toHaveURL(`${englishRoot}#services`);
});

test("English case and demo navigation retains the chosen language", async ({
  page,
}) => {
  await page.goto(englishRoot);
  await page.locator(`.hero-reel a[href="${englishRoot}work/oryn/"]`).click();
  await expect(page).toHaveURL(`${englishRoot}work/oryn/`);
  await page.locator(".case-head-bottom a").click();
  await expect(page).toHaveURL(`${englishRoot}demos/oryn/`);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator(`a[href="${englishRoot}work/oryn/"]`).first().click();
  await page.locator(".next-project a").click();
  await expect(page).toHaveURL(`${englishRoot}work/aq-tis/`);
  await page.locator(".back-link").click();
  await expect(page).toHaveURL(`${englishRoot}#work`);

  await page.goto(`${englishRoot}work/forma/`);
  await page.locator(".case-head-bottom a").click();
  await expect(page).toHaveURL("/SketchMap/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("English demo filters and FAQ remain interactive", async ({ page }) => {
  await page.goto(`${englishRoot}demos/oryn/`);
  await page.getByRole("button", { name: "Commercial", exact: true }).click();
  await expect(page.locator(".property-grid article:visible h3")).toHaveText(
    "ORYN Work",
  );
  await expect(page.locator("[data-filter-status]")).toHaveText("Shown: 1");
  await page.goto(`${englishRoot}demos/sary/`);
  await page
    .getByRole("button", { name: /Desserts|Sweet/, exact: true })
    .click();
  await expect(page.locator(".sary-menu-list article:visible")).toHaveCount(2);
  await expect(page.locator("[data-filter-status]")).toHaveText("Shown: 2");
  await page.goto(`${englishRoot}demos/aq-tis/`);
  const faq = page.locator(".dental-faq details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator("p")).toBeVisible();
});

for (const demo of ["oryn", "aq-tis", "sary"]) {
  test(`${demo}: English validation and unsent form feedback`, async ({
    page,
  }) => {
    const url = `${englishRoot}demos/${demo}/`;
    await page.goto(url);
    const form = page.locator("[data-demo-form]");
    const submit = form.getByRole("button", { name: /Check|Preview|Test/ });
    await submit.click();
    await expect(form.locator(".form-result")).toBeHidden();
    await form.locator("input[name=name]").fill("Demo visitor");
    await form.locator("select[name=service]").selectOption({ index: 1 });
    if (demo !== "oryn") {
      const date = form.locator("input[type=date]");
      await form.locator("select[name=time]").selectOption({ index: 1 });
      await date.fill("2000-01-01");
      await submit.click();
      await expect(form.locator(".form-result")).toBeHidden();
      await date.fill((await date.getAttribute("min"))!);
    }
    const submissions: string[] = [];
    page.on("request", (request) => {
      if (
        request.method() !== "GET" ||
        request.isNavigationRequest() ||
        ["xhr", "fetch"].includes(request.resourceType())
      ) {
        submissions.push(`${request.method()} ${request.url()}`);
      }
    });
    await submit.click();
    await expect(form.locator(".form-result")).toContainText(
      /not (?:been )?sent|nothing was sent/i,
    );
    await expect(form.locator(".form-result")).not.toContainText(
      /[\u0400-\u04ff]/,
    );
    await expect(page).toHaveURL(url);
    expect(submissions).toEqual([]);
    await form.locator("input[name=name]").fill("Another example");
    await expect(form.locator(".form-result")).toBeHidden();
  });
}

test("English language links, cases, and demo safety work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  try {
    await page.goto(root);
    await page.locator('.language-switch a[hreflang="en"]').click();
    await expect(page).toHaveURL(englishRoot);
    await expect(page.locator(".project-showcase")).toHaveCount(4);
    await page
      .locator(`.hero-reel a[href="${englishRoot}work/aq-tis/"]`)
      .click();
    await page.locator(".case-head-bottom a").click();
    await expect(page).toHaveURL(`${englishRoot}demos/aq-tis/`);
    await expect(page.locator('input[name="name"]')).toBeDisabled();
    await expect(page.locator("[data-demo-form] button")).toBeDisabled();
    await page.locator('.language-switch a[hreflang="ru"]').click();
    await expect(page).toHaveURL(`${root}demos/aq-tis/`);
  } finally {
    await context.close();
  }
});
