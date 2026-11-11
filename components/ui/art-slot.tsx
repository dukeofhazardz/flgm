"use client";

import * as React from "react";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { cn } from "@/lib/utils";

export type ArtName = "sun" | "stairs" | "doorway" | "book" | "rays" | "hands";
type ArtSlotName = ArtName;
type ArtSlotColor = "green" | "white" | "ink";

/**
 * ArtSlot — generative two-tone SVG studies built from bold shapes.
 * No photographs yet. Each study pairs the primary tone with a second accent
 * (green on dark, forest on light) plus grain from the surrounding slot.
 */

interface ArtSlotProps {
  name: ArtSlotName;
  className?: string;
  color?: ArtSlotColor;
  size?: number; // SVG viewBox size, default 200
}

const SUN = (
  <>
    <path
      d="M14 126h172M30 148h140M54 168h92"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.45"
    />
    <circle cx="100" cy="104" r="48" fill="currentColor" />
    <circle cx="100" cy="104" r="60" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <g style={{ color: "var(--art-accent)" }}>
      <path d="M100 8v26M100 174v18M22 104h24M154 104h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M45 49l18 18M137 131l18 18M45 159l18-18M137 77l18-18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
    <path d="M52 104a48 48 0 0 1 96 0" stroke="currentColor" strokeWidth="0.7" opacity="0.5" fill="none" />
  </>
);

const STAIRS = (
  <>
    <path d="M18 180h164" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    <path
      d="M24 176V138h34v-30h34V78h34V48h34V22h22"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M24 176h34v-38h34V108h34V78h34V48h34V22h22v154H24Z"
      fill="currentColor"
      opacity="0.9"
    />
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeWidth="0.9" opacity="0.85">
      <path d="M58 176v-38M92 138v-30M126 108V78M160 78V48M194 48V22" />
      <path d="M24 176h34M58 138h34M92 108h34M126 78h34M160 48h34M194 22h22" opacity="0.6" />
    </g>
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeWidth="0.8" opacity="0.5">
      <circle cx="158" cy="30" r="14" fill="none" />
      <path d="M158 16v28M144 30h28M148 20l20 20M168 20l-20 20" />
    </g>
  </>
);

const DOORWAY = (
  <>
    <path
      d="M52 180V88a48 48 0 0 1 96 0v92"
      fill="currentColor"
      opacity="0.92"
    />
    <g style={{ color: "var(--art-accent)" }} fill="none" stroke="currentColor">
      <path d="M52 180V88a48 48 0 0 1 96 0v92" strokeWidth="1.4" />
      <path d="M64 180V90a36 36 0 0 1 72 0v90" strokeWidth="0.8" opacity="0.75" />
      <path d="M76 180V92a24 24 0 0 1 48 0v88" strokeWidth="0.7" opacity="0.55" />
      <path d="M100 68v112M40 180h120" strokeWidth="0.8" opacity="0.6" />
      <path d="M100 98v52M82 180v-38a18 18 0 0 1 36 0v38" strokeWidth="0.9" opacity="0.8" />
    </g>
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeWidth="0.65" opacity="0.45">
      <path d="M24 180h152M32 166h136M40 152h120" />
      <path d="M150 40l10-10M158 58l14-6M138 28l4-14" />
    </g>
  </>
);

const BOOK = (
  <>
    <path
      d="M28 52c26-8 48-4 72 10 24-14 46-18 72-10v104c-26-8-48-4-72 10-24-14-46-18-72-10V52Z"
      fill="currentColor"
      opacity="0.92"
    />
    <g style={{ color: "var(--art-accent)" }} fill="none" stroke="currentColor">
      <path d="M100 62v104" strokeWidth="1.1" />
      <path d="M28 52c26-8 48-4 72 10 24-14 46-18 72-10v104c-26-8-48-4-72 10-24-14-46-18-72-10V52Z" strokeWidth="1.3" />
      <path d="M44 72c16-3 32 0 48 8M44 92c16-3 32 0 48 8M44 112c16-3 32 0 48 8M44 132c16-3 32 0 48 8" strokeWidth="0.7" opacity="0.7" />
      <path d="M108 80c16-8 32-11 48-8M108 100c16-8 32-11 48-8M108 120c16-8 32-11 48-8M108 140c16-8 32-11 48-8" strokeWidth="0.7" opacity="0.7" />
    </g>
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeWidth="0.8" opacity="0.5">
      <path d="M60 34v-12M80 30v-14M100 28V10M120 30v-14M140 34v-12" strokeLinecap="round" />
    </g>
  </>
);

const RAYS = (
  <>
    <g stroke="currentColor" strokeWidth="1" opacity="0.4">
      <circle cx="100" cy="100" r="68" fill="none" />
      <circle cx="100" cy="100" r="82" fill="none" strokeDasharray="2 5" />
    </g>
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeLinecap="round">
      <path d="M100 2v36M100 162v36M2 100h36M162 100h36" strokeWidth="2.2" />
      <path d="M31 31l25 25M144 144l25 25M31 169l25-25M144 56l25-25" strokeWidth="1.6" opacity="0.85" />
      <path d="M52 14l16 32M148 14l-16 32M14 52l32 16M186 52l-32 16M14 148l32-16M186 148l-32-16" strokeWidth="1" opacity="0.55" />
    </g>
    <circle cx="100" cy="100" r="26" fill="currentColor" />
    <circle cx="100" cy="100" r="13" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
  </>
);

const HANDS = (
  <>
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" fill="none" strokeWidth="1">
      <circle cx="100" cy="54" r="18" opacity="0.8" />
      <path d="M100 72v26" opacity="0.8" />
      <path d="M64 98c-16 26-18 56-10 82M136 98c16 26 18 56 10 82" opacity="0.9" />
    </g>
    <path
      d="M58 104c-14 24-20 50-14 76h32c-10-26-8-52 2-70 6-10 16-14 22-10v-16c0-10 8-18 18-18s18 8 18 18v16c6-4 16 0 22 10 10 18 12 44 2 70h32c6-26 0-52-14-76"
      fill="currentColor"
      opacity="0.9"
    />
    <g style={{ color: "var(--art-accent)" }} stroke="currentColor" strokeWidth="0.8" opacity="0.5">
      <path d="M100 32v-14M78 40l-6-12M122 40l6-12M58 54l-14-4M142 54l14-4" strokeLinecap="round" />
      <path d="M28 180h144M44 192h112" strokeDasharray="2 5" />
    </g>
  </>
);

const ART: Record<ArtSlotName, React.ReactNode> = {
  sun: SUN,
  stairs: STAIRS,
  doorway: DOORWAY,
  book: BOOK,
  rays: RAYS,
  hands: HANDS,
};

const COLOR_MAP: Record<ArtSlotColor, string> = {
  green: "text-brand-green",
  white: "text-white",
  ink: "text-ink",
};

export function ArtSlot({
  name,
  className,
  color = "green",
  size = 200,
}: ArtSlotProps): React.ReactElement {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <ParallaxLayer max={10}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn("h-full w-full", COLOR_MAP[color])}
          style={
            {
              "--art-accent": color === "white" ? "#C4D120" : "#408609",
            } as React.CSSProperties
          }
        >
          {ART[name]}
        </svg>
      </ParallaxLayer>
    </div>
  );
}
