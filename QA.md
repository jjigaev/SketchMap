# FORMA — QA record

Checked on 26 September 2026 against the local development server and the static /SketchMap/ production preview.

## Build

- ASTRO_TELEMETRY_DISABLED=1 npm run check: 24 Astro/TypeScript files, 0 errors, 0 warnings, 0 hints.
- ASTRO_TELEMETRY_DISABLED=1 npm run build: 33 static pages, 11 per language (RU, KK, EN), including all six project detail pages in each language.
- The production preview loads the final Botanical Garden poster and the new practice gallery. No browser console warnings or errors appeared in the checked pages.

## Visual and interaction pass

- Checked the home composition at 1440, 1280, 1024, 768, 390 and 360 px. The larger Cormorant Garamond headlines stay inside the layout; the Kazakh headline and film have clear separation at 360 px. No horizontal overflow was found at those widths.
- Reviewed the dark studio philosophy composition with two project photographs at 1280 and 390 px, and the new four-category practice gallery at 360 px. The gallery connects visually with the footer; a border marks the transition.
- Opened and closed the new full-screen menu at desktop and mobile widths. Escape restores focus to the menu trigger, the main content becomes interactive again, and the dark panel covers the scrollbar gutter.
- On the 390 px project archive, filtered to Cultural: the URL updates to ?category=Cultural, one project remains, and the localized count reads “Показано 01 проект.” Opened that project and switched to Kazakh while retaining its slug.
- Tested the hero pause and play control, and resized across the mobile breakpoint: the browser switches between the portrait and landscape video/poster assets.

## Media, accessibility and limits

- The Almaty Botanical Garden hero is a locally hosted, silent 12-second H.264 motion study derived from a real aerial photograph. Landscape and portrait versions are 10.6 MB and 5.6 MB. The poster loads first; the video is deferred, pauses offscreen, and is skipped for reduced-motion and Save-Data visitors.
- Nikolai Bulykin, the Wikimedia Commons source, CC BY-SA 4.0, and the fact that the photograph was animated are credited on the page and in public/video/VIDEO-CREDITS.md.
- Project controls are native links/buttons with visible focus. The earlier inquiry-form pass verified inline errors, first-invalid-field focus, success state, and the prepared mailto: draft. The form still has no backend and does not send or store data.
- No external lab performance score was measured.
