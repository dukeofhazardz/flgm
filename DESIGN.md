# DESIGN.md — FLGM "The Daybreak Edition"

**Client:** Forever Life and Grace Mission (FLGM), Resurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria  
**Tagline:** We Get Better Every Day!  
**Identity line:** A House of Grace. A People of Purpose.  
**Public copy source:** content.md only; church wording kept, lightly edited for scannability  
**Status:** Design specification — editorial, kinetic, unforgettable. No implementation code.

---

## 1. Creative Concept: "The Daybreak Edition"

**Concept statement:** The website is a single magazine issue about one idea — "We Get Better Every Day." Every day starts at dawn (Watch and Pray is 5:30 AM WAT). The scroll is a sunrise: the hero opens in deep forest-green night, a huge sun rises as the user scrolls, the horizon glows green to mint to a faint warm blush, and the page lands in bright white day. Later sections return to dark forest for contrast, making white text pop.

**Editorial premise:** The site reads like a contemporary culture magazine crossed with a sunrise — oversized type, strong contrast, big numerals, bold colour blocking, and surprising motion. Not a template. Every screen feels like turning a page in a high-end publication.

**Signature device:** Sunrise scroll. Dark Night #04180F at the top, sun (Grace Green #00C853) rising from the horizon as the user scrolls down, horizon gradient Night → Grace Green → Dawn Mint #C9F5DA → Blush #FFE3DE → White #FFFFFF at the bottom. The physical scroll position maps to sun elevation.

---

## 2. Colour System

All colours derive from brand white, green #00C853, and red #FC0000 only. No blue, gold, or purple.

### Named palette

| Name | Hex | Role |
|------|-----|------|
| White | #FFFFFF | Primary background, day sections |
| Mist | #F2F8F3 | Very light green-tinted white, alternate light sections |
| Dawn Mint | #C9F5DA | Horizon tint, green-to-mint transition |
| Blush | #FFE3DE | Sunrise glow only, derived from red |
| Grace Green | #00C853 | Brand green, electric accent |
| Ink | #07130D | Near-black green, body text on light |
| Forest | #0B3B24 | Dark sections, body text on white |
| Night | #04180F | Hero depth, pre-dawn hero background |
| Crimson-text | #B80000 | Small text derived from red |
| Signal Red | #FC0000 | Live dot, tiny markers, thin underlines, Give emphasis |

### Proportions
- ~50% white/mist
- ~30% forest/ink/night
- ~15% Grace Green
- Under 5% red/blush

### Contrast rules (non-negotiable)
- **Never** white text on #00C853 (2.2:1 — fails AA). Use Ink or Forest text on Grace Green.
- **Never** Grace Green as small text on white. Grace Green is for large graphics, buttons with Ink text, and electric accents only.
- #FC0000 on white passes (~4.1:1) for large text, icons, borders and graphics only. Use Crimson-text #B80000 for small text.
- Red stays under 5% of any screen. Red appears only as: live dot, tiny markers, thin underlines, Give emphasis.
- **Never** a big red field beside a big green field — reads as Christmas.
- White and Ink dominate every screen. Dark sections use white text with Grace Green as the electric highlight. Light sections use Ink/Forest text.

### Contrast pairing table (tested)

| Pair | Hex combination | Ratio | Usage |
|------|----------------|-------|-------|
| Ink on White | #07130D on #FFFFFF | ~15.6:1 | Body text, light sections |
| Forest on White | #0B3B24 on #FFFFFF | ~12.3:1 | Secondary text, light sections |
| Ink on Grace Green | #07130D on #00C853 | ~9.8:1 | Buttons, electric highlights |
| Forest on Grace Green | #0B3B24 on #00C853 | ~7.6:1 | Large accents on green |
| White on Night | #FFFFFF on #04180F | ~18.4:1 | Hero text, dark sections |
| White on Forest | #FFFFFF on #0B3B24 | ~11.2:1 | Dark section body |
| White on Ink | #FFFFFF on #07130D | ~14.1:1 | Darkest section body |
| Signal Red on White | #FC0000 on #FFFFFF | ~4.1:1 | Large graphics, icons, borders |
| Crimson-text on White | #B80000 on #FFFFFF | ~8.2:1 | Small red text |
| Grace Green on White | #00C853 on #FFFFFF | ~2.2:1 | **BANNED** for text |

### Gradient recipes (3)

1. **Night-to-Dawn** (hero sunrise): `linear-gradient(180deg, #04180F 0%, #0B3B24 35%, #00C853 65%, #C9F5DA 85%, #FFFFFF 100%)` — used behind the hero sun as it rises on scroll.
2. **Mint Glow** (section accents): `radial-gradient(circle at center, #C9F5DA 0%, transparent 70%)` — soft glow behind oversized type on dark sections.
3. **Blush Horizon** (sunrise rim): `linear-gradient(135deg, #FFE3DE 0%, #FFFFFF 60%)` — thin rim light along the horizon line during dawn scroll.

---

## 3. Typography (via next/font)

### Typefaces (3 maximum)
- **Display:** Variable expressive high-contrast serif. Fraunces (opsz, SOFT, WONK axes) or stronger alternative (e.g. Playfair Display variable, Cormorant Garamond). Variable axes used for cursor-reactive softness and weight.
- **Body:** Sharp grotesk sans. Hanken Grotesk or Bricolage Grotesque.
- **Mono:** DM Mono for folios, dates, labels, issue numbers.

### Type scale
| Step | Size | Use | Tracking | Leading |
|------|------|-----|----------|---------|
| T0 | clamp(4rem, 14vw, 14rem) | Hero masthead, issue titles | -0.03em | 0.95 |
| T1 | clamp(2.5rem, 8vw, 5rem) | Section kickers, folio labels | -0.02em | 1.05 |
| T2 | clamp(1.75rem, 5vw, 3rem) | Page headlines | -0.02em | 1.1 |
| T3 | clamp(1.25rem, 3vw, 1.75rem) | Subheadings, pull-quote lead-in | 0em | 1.4 |
| T4 | 17px min (mobile) / 18px desktop | Body text | 0em | 1.55 |
| T5 | 15px | Captions, folio, labels | 0.05em | 1.4 |
| T6 | 12px | Fine print, legal | 0.08em | 1.3 |

### Typographic devices
- **Headlines may mix roman and italic words** — soft italic emphasis within display setting, never full-sentence italic.
- **Soft italic emphasis** only within display headlines; body stays roman.
- **Body min 17px on mobile**, 18px desktop.
- **Measure:** 45–75 characters per line for body; serif may extend slightly longer.
- **Alignment:** Left-aligned by default; centre at most one moment per page (hero masthead).
- **No eyebrow labels.** No ALL-CAPS labels. No accenting a single word inside a headline with colour.
- **Two typefaces at most** (serif display + sans body), mono reserved for folios/dates/labels.
- **Oversized type:** Reserved for giant numerals (event dates, 5:30 AM, 1,000 capacity) and the single hero masthead. Never body text.

---

## 4. Kinetic Type Toolkit

All type motion uses transform + opacity only; never layout-triggering properties.

1. **Variable-font cursor reactivity:** Display type weight and SOFT axis soften/react as the cursor approaches within 200px. Words nearest the cursor grow bolder/softer subtly (±50 weight, ±0.1 softness). Disabled under reduced motion.
2. **Giant outlined words that fill on scroll:** Outlined display text (stroke: Ink, fill: transparent) fills with Ink as the section scrolls into view. One word at a time, scrubbed to scroll position.
3. **Marquee with scroll-velocity skew:** Horizontal type marquee skews based on scroll velocity — faster scroll = more skew. Constant motion uses linear easing; paused under reduced motion.
4. **Word-by-word scroll text fill:** Long pull-quotes or mission statements fill word-by-word as the user scrolls, scrubbed (not animated on a timer).
5. **Letter-roll hovers on links:** On hover, link text rotates slightly in 3D (rotateX ±5deg) with a trailing fade. Press feedback scale 0.97.

---

## 5. Imagery Without Photos

No real photographs exist yet. All imagery is built from bold two-tone SVG and CSS, combined with grain, duotone, and giant type.

### 6 reusable art slots

| Slot | Shape | Use |
|------|-------|-----|
| Rising sun | Partial circle, Grace Green fill | Hero sun, dawn motif |
| Stairs | Ascending right-angle steps | Growth, mission steps |
| Open doorway | Arch silhouette | Entry, welcome, programmes |
| Open book | Two-page spread | Beliefs, sermons, Word |
| Light rays | Radial lines from center | Grace, divine light |
| Hands-up silhouette lines | Minimal stroke figure | Worship, surrender, response |

### ImageSlot API convention
`<ImageSlot name="rising-sun" alt="..." />` renders the SVG art in two-tone (Ink + Grace Green or White + Forest) with grain overlay and optional duotone treatment. When real photography arrives, the same component accepts an `src` prop and applies: green duotone filter + grain texture + arch mask. Never show a blank box or pale rectangle with an icon.

**Architectural concept rule:** Auditorium concept images must carry a visible "Architectural concept" label and must never be presented as completed construction.

**Grain:** Subtle SVG fractal-noise grain overlay at ~25% opacity on all image slots and tinted sections.

---

## 6. Motion Language (emilkowalski)

### Easing curves (custom; never built-in weak easings)
- **Strong ease-out (enter):** cubic-bezier(0.23, 1, 0.32, 1)
- **Strong ease-in-out (on-screen movement):** cubic-bezier(0.77, 0, 0.175, 1)
- **Drawer curve (panels):** cubic-bezier(0.32, 0.72, 0, 1)
- **Linear:** constant motion only (marquee, clock tick)
- **Never ease-in** on UI (starts slow, feels sluggish)

### Durations
| Element | Duration |
|---------|----------|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing scroll reveals | up to ~600ms |
| UI exit | Always faster than enter |

### Stagger rules
30–80ms between items (heading → text → picture within a section). Stagger is decorative, never blocks interaction.

### Scroll-reveal rules
- Trigger once per section as it enters (IntersectionObserver, margin ≈ -100px).
- Reveal order: heading → text → picture.
- Transform + opacity only (never width/height/padding/margin).
- clip-path inset reveals for arch-masked images.
- Content never stays hidden if script fails.

### Pinned-section rules
- One pinned moment per page maximum (vision text-fill on About).
- Pinning disabled on mobile and under reduced motion.
- Pinned content never traps the scroll.

### Hover behaviour
- Gated behind `@media (hover: hover) and (pointer: fine)`.
- Buttons scale to 0.97 on active press (160ms ease-out).
- Nothing relies on hover alone.

### Page transitions
- **Horizon wipe:** An arch-shaped wipe rises from bottom to top (like a horizon/sunrise) between routes, duration ~400ms ease-in-out.
- Fade between pages within the wipe.
- No layout shift.
- No motion on keyboard-initiated actions.

### Cursor spotlight
- On dark sections (Night/Forest), a soft green circular spotlight follows the cursor (~200px diameter, Grace Green at 15% opacity).
- Disabled on touch and under reduced motion.

### prefers-reduced-motion fallback
- Keep opacity and color transitions that aid comprehension.
- Remove all movement and position animation.
- Stagger reduced to zero.
- Cursor spotlight disabled.
- Marquee paused (static text).
- Preloader motion disabled; dawn countdown shows static time.

---

## 7. Layout

### Grid system
- Asymmetric 12-column grid on desktop.
- Columns overlap: type can sit across shapes, shapes can bleed into type areas.
- Edge-to-edge colour blocks: sections may change the entire field colour (white ↔ mist ↔ night).
- Big margins on desktop (120–220px between sections); tight confident spacing on mobile (60–100px).

### Composition rules
- Each section has a different composition from its neighbours; none is a card grid.
- One dominant image or type block per section.
- Sticky side labels on desktop (section tags, folio numbers).
- Section gaps clearly larger than any intra-section gap (120–220px desktop).
- One deliberate rest screen per page maximum.
- Left-aligned by default; centre at most one moment.

### Navigation
- Wordmark, three to five plain links, one action. No bar chrome.
- Header transparent over hero, becomes blurred white bar on scroll; hides on scroll down, shows on scroll up.
- Live Abuja clock (WAT) in the header.
- Mobile: full-screen arch-reveal menu with staggered links, large tap targets (≥44×44px), focus trap, Esc to close.

### Footer
- Designed close, not a sitemap. Church name returns at full width. Address, quick links, social, giving account line, declaration, policy links.

---

## 8. Signature Moments (8)

1. **Sunrise hero scroll:** The sun (Grace Green circle) rises from the bottom as the user scrolls; horizon glows Night → Mint → Blush → White. Tied to 5:30 AM Watch and Pray and "We Get Better Every Day."
2. **Horizon wipe page transition:** Arch-shaped wipe rises from bottom to top between routes.
3. **Variable-font cursor spotlight:** Soft green light follows cursor over dark sections; display type softens/firms as cursor approaches words.
4. **Giant outlined word fill:** Masthead words fill with Ink as the hero scrolls in.
5. **Pinned vision text-fill:** On About, the vision statement fills word-by-word as the section is pinned and scrubbed.
6. **Live Abuja clock + "Day N of 50" counter:** Header shows live WAT time; Watch and Pray section shows day counter (11 Nov – 30 Dec 2026).
7. **Scroll-velocity skewed marquee:** "Grace • Eternal Life • Sonship • Kingdom Influence" skews with scroll speed beneath the hero.
8. **Arch-masked programme horizontal scroll:** Services scroll horizontally on mobile with big date numerals; vertical list on desktop; arch masks each programme card.

---

## 9. Pages and Sections

| Page | Sections | Source in content.md | Missing / Unconfirmed |
|------|----------|----------------------|----------------------|
| Home | Masthead, Welcome, Vision, Programmes, Building Project, Next Step, Events teaser | Lines 6–15, 18–25, 26–42, 236–241 | Alpha Worship time conflict; programme schedules need confirmation |
| About | Who We Are, History, Vision, Mission, Beliefs, Leadership | Lines 49–109, 62–69, 70–77, 78–94, 95–109 | Founding year, founder, doctrinal statement (proposed), leadership directory (structure only) |
| Watch and Pray | Programme, daily schedule, themes, join, recordings | Lines 312–382 | Daily themes (proposed), YouTube URL, recordings archive |
| Sermons | Message categories, library features | Lines 383–420 | All sermon data unconfirmed; YouTube connection pending |
| Events | Calendar (5 events), annual programme, management | Lines 421–492 | Carol Service time (TBC), First Fruit schedule (TBC), Alpha Worship time (conflict) |
| Give | Building project, account, categories, gateway | Lines 493–539 | Payment gateway approval pending; categories subject to approval |
| Prayer & Counselling | Request form, confidentiality | Lines 540–566 | Secure submission system not yet built |
| Contact | Address, phones, socials, map | Lines 567–596 | Official email missing; YouTube URL pending; Google Maps pin unverified |
| New Members | Registration form, follow-up journey | Lines 597–638 | Form backend not yet built |
| Volunteer | Five service areas, registration form, follow-up | Lines 849–1017 | Volunteer database, admin dashboard pending |

**Unconfirmed items (confirmed:false — hidden or "Details coming soon"):** YouTube URL, Carol Service time, First Fruit Worship daily schedule, Watch and Pray daily themes, doctrinal statement, leadership directory, history, Alpha Worship time (one section says 5:00 PM, another gives none).

---

## 10. Accessibility

- **AA contrast** on every screen: Ink or Forest on white/mist; Ink or Forest on #00C853 (never white on bright green); #FC0000 large only; Crimson-text for small red; Ink for body.
- **Tap targets ≥44×44px** with 8px+ spacing.
- **Readable for older visitors:** Body ≥17px mobile, leading 1.45–1.6, measure 45–75 chars, left-aligned, sentence case, visible focus rings, full keyboard navigation, no hover-only content, reduced-motion fallback.
- **Large tap targets** on mobile menu and footer links.
- **Skip to content** link (first focusable element).
- **All images carry alt text**; architectural concept images carry visible label.
- **No colour-only information:** red accents always paired with text or icon.

---

## 11. Logo

None supplied. Plan a text wordmark: FOREVER LIFE AND GRACE MISSION with identity line and tagline as lockup. Logo placeholder mark: an empty arch outline (signature ARCH shape) with a TODO for the official logo. Never invent a logo mark or monogram.

---

## 12. Implementation Notes (from AGENTS.md — non-negotiable)

- **Scrolling:** `html { overflow-x: clip }`, never `overflow: hidden` on body/html. No `100vw` sideways scroll. One Lenis instance synced to GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t * 1000))`. Disable smooth scroll on touch and `prefers-reduced-motion`. Never leave Lenis stopped.
- **Motion:** Transform, opacity, clip-path only. No WebGL in v1. Kill GSAP timelines and ScrollTriggers on unmount.
- **No empty placeholders:** Every image slot is a designed composition per this DESIGN.md until a real photo arrives.
- **No generic look:** No Playfair Display, Inter, Poppins, pastel gradients, centred heading+paragraph+two-button stacks, or plain card grids.
- **Visual gate:** Screenshots at 360/768/1440/1920px after every visual change; critique as harsh art director; fix until premium and unique.
