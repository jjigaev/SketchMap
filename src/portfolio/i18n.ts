import { withBase } from "../lib/paths";

export type PortfolioLocale = "ru" | "en";
export const portfolioLocales = ["ru", "en"] as const;

/** Locale routes remain beneath the existing GitHub Pages portfolio entry point. */
export function portfolioRoute(locale: PortfolioLocale, path = "") {
  return `/portfolio/${locale === "en" ? "en/" : ""}${path.replace(/^\/+/, "")}`;
}

export function portfolioHref(locale: PortfolioLocale, path = "") {
  return withBase(portfolioRoute(locale, path));
}

export function alternatePortfolioHref(
  pathname: string,
  locale: PortfolioLocale,
) {
  const prefix = withBase("/portfolio/");
  const relative = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length)
    : "";
  return portfolioHref(locale, relative.replace(/^en(?:\/|$)/, ""));
}
