# Studio portfolio

## Architecture and preservation

The existing Astro stack, `/SketchMap` base and GitHub Pages deployment workflow stay intact. The root remains FORMA; moving it would change previously published links and language navigation. The portfolio has its own entry point at `/SketchMap/portfolio/`, styles and layout. No existing FORMA page, component, style, i18n data or asset was changed.

All pages are statically generated HTML. There is no client-side router, backend or mandatory external service. Direct navigation and refresh work on GitHub Pages. Existing runtime dependencies are unchanged; Playwright, axe, Node types and Prettier with Astro support were added as development-only dependencies. `npm run format:portfolio` formats only the added code.

| URL beneath `/SketchMap/` | Content |
| --- | --- |
| `portfolio/` | Studio homepage, project filters, services, process, team, contact |
| `portfolio/work/forma/` | Existing FORMA case study |
| `portfolio/work/oryn/` | Development concept case study |
| `portfolio/work/aq-tis/` | Dental concept case study |
| `portfolio/work/sary/` | Restaurant concept case study |
| `portfolio/demos/oryn/` | Interactive developer concept |
| `portfolio/demos/aq-tis/` | Interactive clinic concept |
| `portfolio/demos/sary/` | Interactive restaurant concept |
| `portfolio/sitemap.xml` | Portfolio and case-study sitemap |

The portfolio adds 8 HTML pages to the existing 33 FORMA pages. Demo pages have `noindex, follow` because the businesses are fictional. The portfolio and cases have canonical URLs and OpenGraph metadata. All internal links and assets use the existing `withBase` helper.

`public/robots.txt` is included for deployment portability. On a GitHub **project** site it is served at `/SketchMap/robots.txt`, whereas crawlers normally consult the origin-root `/robots.txt`; configure that at `jjigaev.github.io` if needed. Per-page robots metadata works independently, and the sitemap can be submitted directly. Do not block demos from crawling if you expect crawlers to see `noindex`.

## Editable content

- `src/portfolio/config.ts`: the user-supplied Cerebrum name, company description, biographies of Ибрахим Абдибек and Бекзат Муратбай, Bekzat's stack, and real public WhatsApp/Telegram/email contacts. WhatsApp accepts an international number, Telegram accepts a handle without the URL, email and phone accept their usual values. Unprovided channels are omitted when real channels exist. Demo-company contacts remain intentionally empty and separate.
- `src/portfolio/projects.ts`: typed project records, status, narrative, features, stack, cover and live URL. Add a record to generate its case study and update catalog counts automatically. Add matching desktop/mobile captures and a live route for the new project. The hero reel is a curated selection of the first four projects.
- `src/portfolio/components/`: shared header, showcase, contact, form and location components.
- `src/portfolio/layouts/`: independent portfolio and demo document shells.
- `src/portfolio/styles/`: portfolio, case and demo styles. The three demos share only basic primitives and have distinct composition, typography and palette.
- `src/portfolio/scripts/`: small progressive-enhancement modules for navigation, filters, reveal animations and demo forms. No new animation framework is loaded.

The portfolio content is separate from FORMA's existing RU/KK/EN system. Its initial language is Russian. Future translations can map the typed content and locale-prefixed static routes without replacing the page architecture. There are no pretend language-switch links.

## Honest demos

FORMA is an implemented website for a fictional architecture studio, confirmed by the owner during this task. ORYN, AQ TIS and SARY are explicitly labeled concepts. No commercial outcomes, client testimonials, credentials, team biographies or contact details were invented. Cerebrum's biographies and contact information were supplied directly by the user.

The clinic leaves doctors, before/after material, reviews and prices as explicit placeholders. Restaurant dishes and prices are labeled demonstration content. ORYN's numbers count elements of the concept, not business achievements. No real maps, addresses or registered trademarks are fabricated.

Demo forms validate required fields and dates locally, then explicitly state that no booking/request was created. They send no request and use no storage. Their fields stay disabled without JavaScript to prevent a fallback GET submission from exposing entered values in a URL. This is a demo UX, not a booking integration.

## Media and motion

Optimized imagery and actual desktop/mobile browser captures live in `public/portfolio/media/`. Four original images were created using built-in OpenAI ImageGen, after Higgsfield reported zero credits. No paid Higgsfield job was submitted. The exact prompts, filenames and attribution are recorded in [`public/portfolio/MEDIA-CREDITS.md`](../public/portfolio/MEDIA-CREDITS.md).

Photography-shaped generated visuals are labeled as AI concept imagery in the demos. FORMA screenshots carry the existing Nikolai Bulykin / CC BY-SA 4.0 photograph attribution beside the preview. Existing media remains unchanged.

The new pages contain no video. Responsive 1600/800 px WebP images, local variable fonts, explicit image dimensions and lazy below-fold images keep page delivery light. Motion uses CSS and the Web Animations/Intersection Observer APIs: brief entrances, scroll reveals and hover feedback. Native scrolling stays intact; reduced-motion disables movement, including when the preference changes. Content remains readable without JavaScript.

To recapture real previews, run `npm run dev`, then `npm run screenshots`. This captures the original and demo sites at 1440×960 and 390×844 into committed WebP assets, plus ignored review images and the portfolio OpenGraph image. Set `PREVIEW_ORIGIN` to capture a production preview and `PLAYWRIGHT_CHANNEL` to choose an installed browser (default: Edge). Original generated PNGs can be re-encoded with `node scripts/prepare-portfolio-media.mjs <original-output-directory>`.

## Review and publication

1. Review the user-supplied Cerebrum name, biographies, stack and public contact channels in `config.ts`. Optional phone/Instagram fields can be filled later; they are currently omitted.
2. Run `npm ci`, `npm run check`, `npm run build`, and `npm test`. Tests start a production preview at port 4322 with the real GitHub Pages base.
3. Local tests use installed Edge. On Linux/macOS set `PLAYWRIGHT_CHANNEL=chromium` after `npx playwright install chromium`, or use the CI configuration.
4. Review the homepage, all cases and demos on desktop and mobile. No fake send-success state should appear.
5. Merge the PR only after review. The existing deployment workflow publishes from `main`; opening the PR does not publish the site.
6. After deployment, verify `/SketchMap/portfolio/` and the original `/SketchMap/` on the live host.

The new PR-only `portfolio-check.yml` runs type checking, the production build and browser tests independently of the existing deployment workflow. Automated accessibility checks complement visual and keyboard review; they are not a full accessibility certification. No external Lighthouse or real-user performance score is claimed.
