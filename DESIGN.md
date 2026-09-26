# FORMA — Design direction

Status: Direction C, **Material Journal**, evolved into **«Сначала место. Затем форма»** for a fictional Almaty-based architecture and interiors studio. This document is the visual source of truth for the site. FORMA and its copy are working material and can be renamed later.

## Idea

Show the relationship between a place and the spatial decisions that give it character. Each project pairs an architectural view with a closer observation of light, material, or joinery. The site reads like a contemporary studio journal rather than a catalogue of cards. Photography remains the main event; typography and rules give it structure. The home opens with a subtle 12-second motion study made from a real aerial photograph of Almaty Botanical Garden. Its formal paths, green canopy, city and mountain backdrop root the studio in its city without presenting the scene as a FORMA commission.

The audience is a prospective Kazakhstan-based client deciding whether the studio can shape a thoughtful residential, commercial, hospitality, or cultural space. Four of the six featured concept projects have Kazakhstan-specific settings and original matching imagery; two are international. This is a standalone client-facing architecture-studio website, intended to become a project in the web developer's portfolio. The website's job is to make the work memorable, explain the practice, and make an inquiry straightforward.

## Visual system

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Paper | `--color-paper` | `#eeece6` | Main canvas, drawn from chalk and plaster |
| Chalk | `--color-chalk` | `#f8f7f3` | Quiet inset surfaces and form fields |
| Ink | `--color-ink` | `#262b27` | Primary text and dark sections |
| Mid ink | `--color-muted` | `#606a61` | Secondary text |
| Mineral | `--color-mineral` | `#b9b8ac` | Lines, dividers, image placeholders |
| Olive | `--color-olive` | `#58684f` | Sparse action and focus accents |

Color is not applied as a decorative overlay to photographs. Image color is curated: daylight, natural stone, oak, plaster, muted greens, and occasional shadow. The dark footer uses ink as a deliberate close to the journal.

### Type

- Display and editorial statements: **Cormorant Garamond Variable**, normal or italic, mostly 300–400 weight. Its high contrast echoes the reference editorial tone. OFL licensing allows local hosting; Cyrillic-ext covers Russian and Kazakh without a fallback shift.
- Navigation, body, forms, and metadata: **IBM Plex Sans Variable**, 400–600 weight, with the same Cyrillic coverage. It provides a precise contrast to the serif.
- Utility labels use the sans in uppercase at 0.75–0.82rem with 0.15em tracking. They carry real categories, dates, or section names; numbering is reserved for ordered processes and project counts.
- Home display scale: `clamp(6rem, 10.75vw, 12.5rem)` (with locale and mobile adjustments); title scale `clamp(3.6rem, 7vw, 7.75rem)`; section title `clamp(2.75rem, 5vw, 5.5rem)`; body 1rem–1.125rem with a generous 1.55–1.7 line height.
- The Kazakh home title has its own calibrated scale, a roomier line height, and extra reveal-mask descent. This keeps `Әуелі` and the second line clear of the film at every required width.

### Grid and spacing

- Maximum content width: 1600px. Desktop outer gutter: `clamp(1.5rem, 4.5vw, 5.5rem)`.
- Desktop: 12 columns, `clamp(0.75rem, 1.25vw, 1.5rem)` gap. Tablet: 8 columns. Mobile: 4 columns.
- Spacing scale in rem: 0.5, 0.75, 1, 1.5, 2, 3, 4.5, 6, 9, 12. Repeated section gaps use these values or responsive clamps derived from them.
- Editorial copy width: 42–48rem. Long text does not stretch across the grid.
- Rules: 1px mineral or low-opacity ink, square corners. No decorative shadows or generic card surfaces.

### Image grammar

- Wide architectural view: 3:2 or 16:9.
- Portrait or close detail: 4:5 or 3:4.
- Paired scales appear on the home page and project details: a wide contextual view beside a smaller detail. Captions align to the image edges.
- Images always reserve their aspect ratio to prevent layout shifts. Crop focal points are set per image. Project pages may use one full-bleed image, followed by generous-gutter pairs and occasional single images.
- All active project images form location-led three-frame sequences: exterior, architectural/material detail, and interior. Landscape, climate, urban context, and materials should support the named place across all three frames. Almaty is green and mountainous; Karatau is dry and rocky; Astana has an open steppe sky; Porto reads as an Atlantic coast; London has its street fabric. The studio images also show Almaty.

### Motion

- Micro interaction: 200–300ms. Filter rearrangement: 650–700ms. Entrance reveal: 900–1200ms; the menu panel opens in 760ms.
- Primary ease: `cubic-bezier(.22, 1, .36, 1)`; exit ease: `cubic-bezier(.4, 0, 1, 1)`.
- Use one masked reveal language for major images, a slight image scale on pointer hover, and short opacity/position shifts for labels. The hero has a title entrance, poster-to-video transition, and a gentle frame expansion under normal scrolling. The home project reel moves one large frame at a time; project filtering uses GSAP Flip. Motion should clarify entry, filtering, and spatial relationships.
- The hero motion study is a local, silent MP4 derived from a CC BY-SA 4.0 aerial photograph, with a matching poster and visible attribution. It pauses offscreen and when the tab is hidden, offers a visible pause/play control, and stays a still image for reduced-motion or Save-Data users. Cross-document image transitions are progressive enhancement on browsers supporting CSS view transitions.
- Native scrolling remains intact. Every animation is interruptible. `prefers-reduced-motion` removes spatial movement and keeps state changes immediate.

## Interaction model

- A left-aligned menu trigger opens a full-height photographic navigation layer at every width; the FORMA wordmark sits at the true center, language links at right. Keyboard focus is contained while open, Escape closes it, and reduced-motion users see immediate state changes. The RU / ҚАЗ / EN switch preserves the section, project slug, query and hash.
- The home page presents six projects in a large editorial reel with visible adjacent frames, buttons, keyboard and touch/drag input. A later dark photographic gallery reveals four practice areas through their project detail imagery. The project explorer separately filters the same six projects by stable category keys, preserves clear result feedback, and keeps each project a real link. Hover preview enhances the image; title, category, location, and year remain visible without hover.
- Project details are static routes generated from typed data, with a narrative, gallery, and next-project link.
- Inquiry form has meaningful validation, inline errors, focus recovery, and a confirmation state with a prepared `mailto:` draft. Budgets are in tenge and refer to implementation cost. The interface makes the final send step explicit, so it never implies a message was already transmitted.

## Language and static routes

- Russian is the default at `/SketchMap/`; Kazakh is under `/SketchMap/kk/`; English is under `/SketchMap/en/`.
- Each locale has the same 11 static page types, including six project detail routes. All core content, image descriptions, form states, page metadata, `lang`, canonical and alternate-language links are localized.
- Project slugs and category IDs stay stable across locales. The copy lives in typed TypeScript data, so visual components can read one consistent project record per language.

## Responsive composition

- At 1024 and 768px, image pairs and metadata columns rebalance rather than merely shrinking.
- At 390 and 360px, the hero title scales to the available width, paired images stack, filters become a deliberate two-row group, and the form uses full-width fields.
- Check 1440, 1280, 1024, 768, 390, and 360px. Ensure visible keyboard focus, contrast, touch targets, alt text, and legible text on every surface.

## Avoid

Repeated pill buttons, glossy overlays, rounded cards, faux architectural diagrams, decorative numbering, auto-playing galleries, scroll hijacking, and copy that reads like a generic design-agency slogan.
