import type { APIRoute } from "astro";
import { projects } from "../../portfolio/projects";
import { withBase } from "../../lib/paths";
import { portfolioLocales, portfolioRoute } from "../../portfolio/i18n";

export const GET: APIRoute = ({ site }) => {
  const routes = ["", ...projects.map((project) => `work/${project.slug}/`)];
  const absolute = (path: string) => new URL(withBase(path), site).href;
  const urls = routes
    .flatMap((route) =>
      portfolioLocales.map((locale) => {
        const alternates = portfolioLocales
          .map(
            (language) =>
              `<xhtml:link rel="alternate" hreflang="${language}" href="${absolute(portfolioRoute(language, route))}"/>`,
          )
          .join("");
        return `<url><loc>${absolute(portfolioRoute(locale, route))}</loc>${alternates}<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(portfolioRoute("ru", route))}"/></url>`;
      }),
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
