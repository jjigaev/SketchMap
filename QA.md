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

## Linked project gallery, 16 October 2026

- `npm test`: 19 passing tests for gesture thresholds, horizontal intent, measured slide gaps, bounds, rapid navigation, click suppression, cancellation, native touch ownership, reduced motion, resize recovery and listener cleanup.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: 26 files, no errors, warnings or hints. Production build: all 33 static pages.
- In the local production preview, mouse-dragged from Saya House to Atelier Almaty without navigating away; a normal click still opened Saya House. Two rapid Next clicks advanced two projects. Home/End selected the first/last project, and the boundary buttons disabled correctly.
- Inspected the paired composition at 1280px in the browser and at 360, 390, 768, 1024 and 1440px in real responsive iframe viewports. The selected project survived resizing. Fixed slide sizing to use the available track width rather than viewport units, preserving equal gutters with a non-overlay scrollbar.
- Exercised native horizontal scrolling in the narrow layout and checked the mobile overlapping detail composition. RU, KK and EN labels were checked at narrow widths. No page-wide horizontal overflow remained after the page and fonts settled.
- The standalone preview produced no browser errors. Physical iOS/Android touch hardware and an external Lighthouse score were not available; touch is deliberately handled by native scrolling rather than custom pointer interception, with controller regression coverage.

## Saya House sketch comparison, 16 October 2026

- `npm test`: all 31 tests pass, including 12 comparison tests for numeric bounds, localized accessible values, input updates, full-image endpoints, image loading/failure and listener cleanup. The 19 existing linked-gallery tests remain intact.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: 29 files, no errors, warnings or hints. Production build: all 33 static pages. Checked all 18 generated project detail pages: the comparison appears only on Saya House, once in each locale, with the correct base path.
- In the production browser, dragged the divider from 50% to 75%. Home/End revealed the complete visualization/sketch, Arrow Right advanced by one percent, and Page Up returned to a balanced split. The visible divider, clipping and accessible percentage values stayed synchronized.
- Inspected the composition at 1280px and in real iframe viewports at 360, 390, 768, 1024 and 1440px. Both images retain the full 3:2 frame. No page-wide horizontal overflow was found after fonts settled. The native range retains `pan-y pinch-zoom` for vertical scrolling and browser zoom.
- Switched to KK and EN at 390px through the language links. The comparison anchor, localized headings, control names and percentage announcements were preserved; neither locale overflowed.
- A temporary production fixture with a missing sketch confirmed that the available visualization fills the frame, the failed image and divider are hidden, the range is disabled and a localized recovery message appears. The normal standalone page produced no browser warnings or errors.
- Added one locally hosted, lazy-loaded 1536 × 1024 WebP sketch (515,058 bytes), derived from the existing concept visualization. Its origin is disclosed on the page and its full generation prompt is recorded in `public/images/IMAGE-CREDITS.md`.
- Physical iOS/Android touch hardware and an external Lighthouse score were not available. Touch and cancellation use native range behavior; no custom gesture capture or motion animation was added.

## Comparisons across all projects, 16 October 2026

- Extended the same comparison to Atelier Almaty, Karatau Retreat, Northern Light Gallery, Tide House and Morrow Store. A shared `ProjectComparison.astro` receives typed hero/sketch data; the existing Saya anchor remains valid. Existing comparison CSS and controller behavior are preserved.
- `npm test`: 37 passing tests, including project/locale pairing, distinct sketch descriptions, shipped WebP assets and controller independence. `ASTRO_TELEMETRY_DISABLED=1 npm run check`: 30 files, no errors, warnings or hints. Production build: 33 pages.
- Verified all 18 built project detail pages: exactly one comparison per page, the correct project-specific hero/sketch URLs under `/SketchMap/`, unique IDs and matching label/help relationships.
- In the standalone production preview, dragged the Atelier divider from 50% to 75%; Home/End reached 0%/100%, and Arrow Right advanced by one percent. The visible split and accessible values matched. Both images loaded at 1536 × 1024. No browser warnings or errors appeared on that page.
- Checked all six project comparisons in a real 360px iframe viewport: the correct images loaded, the control reached ready state and responded to keyboard input, and there was no page-wide horizontal overflow. Checked Morrow Store additionally at 390, 768, 1024, 1280 and 1440px, with no overflow.
- Switched Morrow Store to KK and EN at 390px through the actual language links. The project comparison anchor was retained, headings and accessible values were localized, and the layout remained within the page width. Visually inspected the mobile Kazakh composition and the desktop Atelier split.
- Added five lazy-loaded 1536 × 1024 WebP sketches, encoded without cropping or resizing: Atelier 509,180 bytes; Karatau 557,438; Northern Light 457,730; Tide 548,432; Morrow 583,710. Each uses its own visualization as the edit target and the Saya sketch only as a style reference. Sources and exact prompts are recorded in `public/images/IMAGE-CREDITS.md`.
- No physical iOS/Android device or external performance score was measured. The existing native range semantics, vertical scrolling, pinch zoom, loading/error fallback and reduced-motion behavior remain in place with regression coverage.
