import * as React from "react";

/**
 * HeroLand — the ground the sun comes out of.
 *
 * Five ridges stacked in depth, all darker than the sky at every point in the
 * scroll so they read as silhouettes rather than bands of colour. Only the far
 * ridge carries a rim of first light, and that rim is brightest directly above
 * the sun and dies at the edges of the frame — light catching a crest, not a
 * line drawn across the page.
 *
 * Everything here is scenery. No real building, name or place is depicted.
 */

const RIDGE_A =
  "M0 78 C 100 74 160 26 260 22 C 350 18 410 74 520 76 C 600 78 640 16 740 14 C 840 12 880 74 980 76 C 1060 78 1120 26 1220 22 C 1320 18 1380 60 1440 64 L1440 450 L0 450 Z";
/** Flat crest for narrow screens, so the skyline's base always sits on ground. */
const RIDGE_A_FLAT =
  "M0 66 C 60 64 120 38 220 28 C 280 22 320 20 400 19 L1040 19 C 1120 20 1160 22 1220 28 C 1320 38 1380 58 1440 62 L1440 450 L0 450 Z";
const RIDGE_B =
  "M0 150 C 110 146 180 124 300 122 C 420 120 490 142 610 142 C 730 142 800 118 920 120 C 1040 122 1100 146 1210 148 C 1310 150 1390 154 1440 156 L1440 450 L0 450 Z";
const RIDGE_C =
  "M0 224 C 130 218 230 200 360 204 C 490 208 570 230 700 228 C 830 226 910 202 1040 206 C 1170 210 1300 220 1440 224 L1440 450 L0 450 Z";
const RIDGE_D =
  "M0 306 C 150 298 260 282 400 286 C 540 290 620 312 760 310 C 900 308 980 284 1120 288 C 1260 292 1350 302 1440 306 L1440 450 L0 450 Z";
const RIDGE_E =
  "M0 386 C 170 380 300 368 460 372 C 620 376 700 392 860 390 C 1020 388 1120 372 1280 376 C 1380 378 1420 382 1440 384 L1440 450 L0 450 Z";

/** Roofs, a low wall, a tower and one open arch, based on y=120. */
const SKYLINE =
  "M0 120 V108 H44 V120 Z " +
  "M44 120 V100 L64 84 L84 100 V120 Z " +
  "M84 120 V110 H104 V120 Z " +
  "M104 120 V76 H126 V120 Z " +
  "M126 120 V104 L140 92 L154 104 V120 Z " +
  "M158 120 V78 C158 50 172 36 190 36 C208 36 222 50 222 78 V120 Z " +
  "M172 120 V82 C172 64 180 57 190 57 C200 57 208 64 208 82 V120 Z " +
  "M226 120 V96 L248 80 L270 96 V120 Z " +
  "M270 120 V108 H292 V120 Z " +
  "M292 120 V112 H300 V120 Z";

export function HeroLand(): React.ReactElement {
  return (
    <>
      {/* Far ridge — the sun rises behind this. */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1440 450"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="land-a" x1="0" y1="0" x2="0.16" y2="1">
              <stop offset="0%" stopColor="#04170F" />
              <stop offset="38%" stopColor="#020F09" />
              <stop offset="100%" stopColor="#010704" />
            </linearGradient>
            {/* Rim light, brightest where the sun will break the crest. */}
            <linearGradient id="rim-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9F5DA" stopOpacity="0" />
              <stop offset="30%" stopColor="#C9F5DA" stopOpacity="0.04" />
              <stop offset="43%" stopColor="#C9F5DA" stopOpacity="0.46" />
              <stop offset="52%" stopColor="#C9F5DA" stopOpacity="0.34" />
              <stop offset="68%" stopColor="#C9F5DA" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#C9F5DA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={RIDGE_A_FLAT} fill="url(#land-a)" className="xl:hidden" />
          <path d={RIDGE_A} fill="url(#land-a)" className="hidden xl:inline" />
          <g data-hero-rim opacity="0">
            <path
              d={RIDGE_A_FLAT}
              fill="none"
              stroke="url(#rim-a)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              className="xl:hidden"
            />
            <path
              d={RIDGE_A}
              fill="none"
              stroke="url(#rim-a)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              className="hidden xl:inline"
            />
          </g>
        </svg>
      </div>

      {/* The town, standing on the ridge line and reading as a silhouette. */}
      <div
        data-hero-town
        className="absolute left-[50%] top-0 z-[1] w-[min(56vw,clamp(180px,30svh,330px))] -translate-x-1/2 -translate-y-[72%] xl:-translate-y-[76%] opacity-0"
      >
        <svg viewBox="0 0 300 120" className="h-auto w-full" aria-hidden="true">
          <path d={SKYLINE} fillRule="evenodd" fill="#010805" />
        </svg>
      </div>

      {/* Middle and near ridges. No rim: depth is carried by value alone. */}
      <div className="absolute inset-0 z-[2]">
        <svg
          viewBox="0 0 1440 450"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="land-b" x1="0" y1="0" x2="0.14" y2="1">
              <stop offset="0%" stopColor="#03130C" />
              <stop offset="42%" stopColor="#010A06" />
              <stop offset="100%" stopColor="#010503" />
            </linearGradient>
            <linearGradient id="land-c" x1="0" y1="0" x2="0.1" y2="1">
              <stop offset="0%" stopColor="#020E09" />
              <stop offset="46%" stopColor="#010704" />
              <stop offset="100%" stopColor="#000302" />
            </linearGradient>
            <linearGradient id="land-d" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#010A07" />
              <stop offset="48%" stopColor="#010503" />
              <stop offset="100%" stopColor="#000201" />
            </linearGradient>
            <linearGradient id="land-e" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#010705" />
              <stop offset="100%" stopColor="#000201" />
            </linearGradient>
          </defs>
          <path d={RIDGE_B} fill="url(#land-b)" />
          <path d={RIDGE_C} fill="url(#land-c)" />
          <path d={RIDGE_D} fill="url(#land-d)" />
          <path d={RIDGE_E} fill="url(#land-e)" />
        </svg>
      </div>
    </>
  );
}
