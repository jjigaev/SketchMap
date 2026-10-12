# Portfolio verification — 2026-10-12

## Final local results

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 49 static HTML pages, plus the bilingual portfolio sitemap.
- `npm test`: **140 passed** in 47.9 seconds, production preview under `/SketchMap/`, installed Microsoft Edge on Windows.
- `git diff --check`: clean.

## English version and US business offering

The portfolio now has 16 pages: the homepage, four cases and three demos in Russian and English. The English entry point is `/SketchMap/portfolio/en/`. Both languages describe Cerebrum's website, web application and CRM offering for businesses in the US and Kazakhstan. The original 33 FORMA routes remain intact.

The production browser suite covers all 16 portfolio pages at 360, 390, 768, 1024, 1280 and 1440 px, including image decoding, runtime/console errors, HTTP errors, direct route loading, refresh and horizontal overflow. Each portfolio page receives an automated axe WCAG A/AA check. English-specific checks cover translated visible and accessible text, metadata, reciprocal language links, fragment preservation, case/demo navigation, sitemap alternates, filters, mobile navigation and keyboard recovery.

All three demo forms in each language are checked for required fields, past-date rejection where applicable, explicit unsent status and absence of outgoing submissions. Reduced motion, a normal-motion scroll pass and usable static content without JavaScript are checked; form fields remain disabled without JavaScript. Every internal HTML link, asset and fragment across all 49 pages is checked. FORMA's existing localization and project navigation are also exercised.

## Visual review

Reviewed the English portfolio hero, team and contact sections at desktop and mobile sizes, all four full case pages at 1440 and 390 px, and the three translated demo sites at 1440×960 and 390×844. No clipped text or horizontal overflow was found. The mobile header fits the logo, RU/EN control and menu button. US business positioning is visible in the homepage introduction and contact section. Preview cards use actual captures of the selected language, including FORMA's existing English version.

Committed previews: [English desktop](previews/portfolio-en-desktop.webp), [English mobile](previews/portfolio-en-mobile.webp), [Russian desktop](previews/portfolio-desktop.webp), [Russian mobile](previews/portfolio-mobile.webp), and [team](previews/team-desktop.webp). Full-height and section review images remain locally under ignored `review/portfolio/`. Screenshot files depict the implementation, not generated UI mockups.

## Scope and publication

No original FORMA source or media, runtime dependency, Astro base/site setting, or existing deploy workflow was changed. These pages were reviewed in a local preview; publication requires merging the PR and checking the subsequent GitHub Pages deployment. The PR workflow repeats type checking, the production build and browser tests in Chromium on Ubuntu.

No Safari/Firefox/device-hardware run, external Lighthouse score, real-user performance metric or full manual accessibility certification is claimed. Cerebrum's supplied biographies, stack and public contact channels are translated without changing their facts. The US offering does not imply existing US clients or an office. Fictional project status remains explicit in both languages, clinical content and reviews remain placeholders, and demo forms are not live integrations.

Media provenance and the original ImageGen prompts are documented in `public/portfolio/MEDIA-CREDITS.md`. The English version reuses those images and adds browser captures; no new generated media was needed.
