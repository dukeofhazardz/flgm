# AGENTS.md — FLGM Website Permanent Rules

## VISUAL GATE
After building or changing anything visual, you **must**:
1. Use browser-use to open the page in a real browser.
2. Take screenshots at **360px, 768px, 1440px, and 1920px** widths.
3. Critique them as a harsh art director — fix anything empty, bland, cramped, misaligned, badly wrapped, low contrast, or unfinished.
4. Re-screenshot after every fix.
5. Do not report done until the page looks premium and unique.

## NO EMPTY PLACEHOLDERS
Never ship a blank box or a pale rectangle with an icon. Every image slot must be a designed composition (see DESIGN.md) until a real photograph arrives. This includes:
- Arch masks must contain generative light/architecture SVG, not empty colored rectangles.
- Placeholder images must use the arch shape, grain texture, and dawn gradient per DESIGN.md.
- "Architectural concept" images must carry a visible label and must not be presented as completed construction.

## NO GENERIC LOOK
Do not use:
- **Playfair Display** — not the display face for this project.
- **Inter** — not the body face for this project.
- **Poppins** — never.
- Pastel-on-white gradients.
- Centred stacks of heading + paragraph + two buttons (the "AI landing page" look).
- Cards in a plain grid.

Use the typefaces specified in DESIGN.md (expressive high-contrast serif for display + clean humanist sans for body via next/font). Use the arch shape as the signature motif. White and ink dominate; brand green (#00C853) and brand red (#FC0000) are accents only.

## CONTENT RULES
- Public copy comes **only** from content.md. Keep the church's wording, lightly edited for web scannability.
- Never publish internal notes: anything starting "Editorial note", "Important", "Technical note", "Note:", "Website development notes", the readiness checklist, the "Date Correction" block, "Website implementation recommendation", the Executive Secretary responsibility table, tool artefacts like "x-apple-data-detectors" links, image links, and button labels like "Prepare Enquiry", "Prepare Registration", "Copy Checklist".
- Never invent: the Chief Pastor's name or bio, founding year, history milestones, testimonials, statistics, photos, sermon titles, leadership names, prices, or opening hours.
- Unconfirmed items are marked `confirmed:false` in the data layer and either hidden or shown as a tasteful "Details coming soon" state. Unconfirmed items include: YouTube URL, Carol Service time, First Fruit Worship daily schedule, Watch and Pray daily themes, doctrinal statement, leadership directory, history, Alpha Worship time.

## PERFORMANCE
- Animate **transform, opacity, and clip-path only**. Never animate width, height, padding, margin, or layout-triggering properties.
- **No WebGL in v1.**
- Respect `prefers-reduced-motion`: remove movement and position animation; keep opacity and color transitions that aid comprehension.
- Kill all GSAP timelines and ScrollTriggers on unmount.
- No layout thrashing: read layout properties once, batch writes.

## SCROLLING FOUNDATION (non-negotiable)
- Page must scroll with **mouse wheel, trackpad, keyboard (Space, PageDown, Home, End), and touch**. Dragging the scrollbar must never be the only way.
- `html { overflow-x: clip }` — never `overflow: hidden` on `body` or `html`.
- Remove any `100vw` usage that causes sideways scroll. Assert `document.documentElement.scrollWidth <= clientWidth` at 360px, 768px, 1440px, and 1920px.
- **Lenis**: single instance, synced to GSAP ScrollTrigger:
  - `lenis.on('scroll', ScrollTrigger.update)`
  - `gsap.ticker.add(t => lenis.raf(t * 1000))`
  - `gsap.ticker.lagSmoothing(0)`
- Disable smooth scroll on touch devices and `prefers-reduced-motion` (native scroll in those cases).
- **Never leave Lenis stopped** after the preloader closes, menu closes, or component unmounts. Stop Lenis on unmount but retain the instance so it can be restarted.
- One Lenis instance per app; do not create a second instance in any component.

## FILE ORGANIZATION
- `/data/` — typed content data files (keep, do not delete).
- `/lib/` — time logic, whatsapp helper, types, utils (keep, do not delete).
- `/components/forms/` — form route handlers (keep, do not delete).
- `/archive/visual-layer/` — archived visual components (preloader, header, footer, sections, cursor, old globals.css). Do not compile; excluded in tsconfig and eslint.
- New visual components go in `/components/layout/`, `/components/sections/`, `/components/motion/`, `/components/ui/` as needed.

## DATA LAYER DISCIPLINE
- Every public content item carries `confirmed:boolean`.
- Unconfirmed items use `<Pending>` component for "Details coming soon" state.
- Nothing is invented: no Chief Pastor name/bio, no founding year, no history milestones, no testimonials, no statistics, no photos, no sermon titles, no leadership names, no prices, no opening hours.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
