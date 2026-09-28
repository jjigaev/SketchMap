# Portfolio verification — 2026-09-28

## Final local results

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 41 static HTML pages, plus the portfolio sitemap. FORMA retains its original 33 routes.
- `npm test`: **65 passed**, 23.6 seconds, production preview under `/SketchMap/`, installed Microsoft Edge on Windows, Node 26.5.0.
- `git diff --check`: clean.

The browser suite covers all 8 new pages at 360, 390, 768, 1024, 1280 and 1440 px; image decoding, runtime/console errors, HTTP errors, direct route loading and refresh, and horizontal overflow. All new pages passed the automated axe WCAG A/AA checks. Catalog/menu filters, service/FAQ disclosures, mobile navigation and Escape focus recovery were exercised. All three demo forms were checked for required fields, past-date rejection where applicable, explicit unsent status and absence of outgoing submissions. Reduced motion, a normal-motion scroll pass and usable static content without JavaScript were checked; form fields remain disabled without JavaScript. Every internal HTML link, asset and fragment across all 41 pages resolves. FORMA home locales and project navigation were also checked.

During QA, insufficient contrast in secondary captions was corrected. Headless Edge required an initial compositor frame before capturing FORMA's filtered poster; the capture script now performs that warm-up and the final captures were visually verified. Screenshot files depict the actual implementation, not generated UI mockups.

## Visual review

Reviewed the portfolio hero on desktop and mobile, the full homepage composition, the work and contact sections, all three demo heroes on desktop and mobile, and FORMA's actual preview. Images have explicit dimensions; the new pages contain no video. New JavaScript consists of a shared approximately 2.1 KB module and a roughly 1.0 KB demo form module before compression. Existing FORMA animation bundles are separate and unchanged.

Committed previews: [`previews/portfolio-desktop.webp`](previews/portfolio-desktop.webp) and [`previews/portfolio-mobile.webp`](previews/portfolio-mobile.webp). Full-height review images remain locally under ignored `review/portfolio/`.

## Scope and remaining setup

No original FORMA source or media, Astro base/site setting, or existing deploy workflow was changed. New pages were verified in a local production preview; GitHub Pages publication requires merging the PR, then checking the live deploy. The separate PR workflow repeats checks in Chromium on Ubuntu.

No Safari/Firefox/device-hardware run, external Lighthouse score, real-user performance metric or full manual accessibility certification is claimed. Studio name, people and contact details remain explicit placeholders in `src/portfolio/config.ts`; they must be filled before sales use. Clinical content, reviews and results are placeholders. Demo forms are not live integrations.

Higgsfield had 0 credits; no generation job was submitted. Four generated ImageGen assets and their exact prompts are documented in `public/portfolio/MEDIA-CREDITS.md`.
