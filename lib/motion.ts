/**
 * Motion constants shared by every animated component.
 *
 * One vocabulary, so a reveal on the home page is the same reveal on Give.
 * Easing curves come from DESIGN.md §6 (Emil Kowalski's strong ease-out /
 * ease-in-out); built-in CSS easings are never used for UI motion.
 */

export const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
export const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
export const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";

/** GSAP-ready aliases for the same curves. */
export const GSAP_EASE = {
  out: "power4.out",
  inOut: "power2.inOut",
  drawer: "power3.out",
} as const;

export const REVEAL = {
  /** Travel in px. Small enough to read as "settling", not "flying". */
  distance: 22,
  /** Section rails travel less than headlines. */
  railDistance: 10,
  duration: 0.7,
  /** 30–80ms between items, per DESIGN.md. */
  stagger: 0.065,
  start: "top 88%",
} as const;

export const MARQUEE_SKEW = 7;
export const TYPE_SKEW = 2.2;

/** Media queries are read at call time — never at module scope (SSR). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

/** Desktop-class motion: precise pointer, no reduced-motion request. */
export function canUseRichMotion(): boolean {
  return hasFinePointer() && !prefersReducedMotion();
}
