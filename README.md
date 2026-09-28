# FORMA — Architecture & Interiors

This repository also contains a web/digital studio portfolio at **`/SketchMap/portfolio/`**. FORMA remains at **`/SketchMap/`**, with all of its original routes, visual identity, assets and deployment configuration preserved. The portfolio adds four case studies and three interactive fictional-brand demos: ORYN (development), AQ TIS (dental) and SARY (restaurant). FORMA is labeled as an implemented website for a fictional studio, not a real client commission.

Portfolio architecture, editable contacts/team, media provenance and the release checklist are in [`docs/PORTFOLIO.md`](docs/PORTFOLIO.md). Run `npm run check`, `npm run build`, then `npm test` for the production-preview checks. The entire repository now builds 41 HTML pages; the 33-page count below describes FORMA only.

A standalone fictional website for an Almaty-based architecture and interior design studio, created to be presented later as a commercial web-development portfolio project. It is the studio's own client-facing site, not the web developer's portfolio site. The studio, projects, and inquiry details are concept material. Russian is the default language, with complete Kazakh and English versions.

## Run locally

```bash
npm install
npm run dev
```

Open the local `/SketchMap/` URL printed by Astro. The repository uses an Astro base path so local preview matches its GitHub Pages URL structure.

## Quality checks

```bash
npm run check
npm run build
```

The build is fully static. Six project detail pages per language are generated from [`src/data/projects.ts`](src/data/projects.ts): four Kazakhstan concept projects and two international ones. The RU, KK and EN routes total 33 pages. Project visuals are local WebP assets, with coherent location-led exterior/detail/interior series; their provenance is recorded in [`public/images/IMAGE-CREDITS.md`](public/images/IMAGE-CREDITS.md). The home uses locally hosted landscape and portrait motion studies of a real Almaty Botanical Garden aerial photograph, with visible author and CC BY-SA 4.0 attribution, documented in [`public/video/VIDEO-CREDITS.md`](public/video/VIDEO-CREDITS.md). The inquiry form validates in the browser, then prepares a `mailto:` draft for the visitor to send. No data is sent or stored by the website.

## GitHub Pages

The site is configured for `https://jjigaev.github.io/SketchMap/` in [`astro.config.mjs`](astro.config.mjs). The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on pushes to `main` after GitHub Pages is set to use **GitHub Actions** as its source. If the repository or account changes, update both `site` and `base` in the Astro config.

## Design system

[`DESIGN.md`](DESIGN.md) records the Material Journal / «Сначала место. Затем форма» direction, typography, grid, spacing, color, imagery, motion, localization, and responsive rules. Styling tokens live in [`src/styles/global.css`](src/styles/global.css).

Browser and build checks are recorded in [`QA.md`](QA.md).
