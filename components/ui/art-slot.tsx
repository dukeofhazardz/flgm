"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ArtSlotName = "sun" | "stairs" | "doorway" | "book" | "rays" | "hands";
type ArtSlotColor = "green" | "white" | "ink";

/**
 * ArtSlot — generative two-tone SVG art slot built from bold shapes.
 * No photographs yet. Combines with grain, duotone and giant type.
 * Each variant uses Ink + Brand Green (or White + Forest on dark sections).
 */

interface ArtSlotProps {
  name: ArtSlotName;
  className?: string;
  color?: ArtSlotColor;
  size?: number; // SVG viewBox size, default 200
}

const SUN = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="100" cy="100" r="42" className="fill-current" />
    <path d="M100 14 v28 M100 158 v28 M14 100 h28 M158 100 h28 M64.7 64.7 l19.8 19.8 M115.5 115.5 l19.8 19.8 M64.7 135.3 l19.8 -19.8 M115.5 84.5 l19.8 -19.8" />
  </svg>
);

const STAIRS = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 180 h28 v-28 h28 v-28 h28 v-28 h28 v-28 h28 v-28" className="fill-current" />
  </svg>
);

const DOORWAY = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M70 40 L70 160 L130 160 L130 40 Z" className="fill-current" />
    <path d="M90 160 L90 180 L110 180 L110 160" className="fill-current" />
  </svg>
);

const BOOK = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 40 L160 40 L160 160 L40 160 Z" className="fill-current" />
    <path d="M100 40 L100 160" className="fill-current" />
    <path d="M40 80 L160 80 M40 120 L160 120" className="fill-current" />
  </svg>
);

const RAYS = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="100" cy="100" r="20" className="fill-current" />
    <path d="M100 40 v15 M100 145 v15 M40 100 h15 M145 100 h15 M63.6 63.6 l10.6 10.6 M125.8 125.8 l10.6 10.6 M63.6 136.4 l10.6 -10.6 M125.8 74.2 l10.6 -10.6" className="fill-current" />
  </svg>
);

const HANDS = (
  <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M60 100 Q40 140 40 180 L60 180 Q80 140 60 100 Z" className="fill-current" />
    <path d="M140 100 Q160 140 160 180 L140 180 Q120 140 140 100 Z" className="fill-current" />
    <path d="M100 60 L100 100" className="fill-current" />
  </svg>
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

/**
 * ArtSlot — generative two-tone SVG art slot.
 */

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
      <svg
        viewBox="0 0 200 200"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-full h-full", COLOR_MAP[color])}
        style={{ width: size, height: size }}
      >
        {ART[name]}
      </svg>
    </div>
  );
}
