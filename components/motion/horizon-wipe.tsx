"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CHURCH } from "@/data/church";

/**
 * HorizonWipe — the page transition.
 *
 * An arch-shaped sheet of night rises from the bottom of the screen like a
 * horizon coming up, holds the wordmark for a beat, then continues past the
 * top to reveal the next page. The arc is the site's signature arch, scaled up
 * until only its crown is visible.
 *
 * Only transform is animated (translateY on the sheet, yPercent on the copy),
 * so it never triggers layout. `idle` keeps the sheet parked off-screen and
 * pointer-transparent; the component never blocks the page while resting.
 */

export type WipePhase = "idle" | "cover" | "reveal";

/** How far past the top edge the sheet travels to hide the arch's corners. */
const OVERSHOOT = 7;

interface HorizonWipeProps {
  phase: WipePhase;
  onCovered?: () => void;
  onRevealed?: () => void;
}

export function HorizonWipe({
  phase,
  onCovered,
  onRevealed,
}: HorizonWipeProps): React.ReactElement {
  const root = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = sheet.current;
    const host = root.current;
    if (!el || !host) return undefined;

    tl.current?.kill();
    gsap.killTweensOf(el);

    if (phase === "idle") {
      // Park it below the fold. `y` is zeroed so GSAP never adds the CSS
      // percentage offset to a yPercent target (which would double it).
      gsap.set(el, { y: 0, yPercent: 101 });
      gsap.set(host, { pointerEvents: "none" });
      return undefined;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(host, { pointerEvents: "auto" });
    gsap.set(el, { y: 0, yPercent: 101 });

    if (reduced) {
      if (phase === "cover") {
        gsap.set(el, { yPercent: -OVERSHOOT });
        onCovered?.();
      } else {
        gsap.set(el, { yPercent: 101 });
        onRevealed?.();
      }
      return undefined;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(host, { pointerEvents: "none" });
        if (phase === "cover") onCovered?.();
        else onRevealed?.();
      },
    });
    tl.current = timeline;

    if (phase === "cover") {
      // Slight overshoot: the arch's corners dip below the viewport top at
      // yPercent 0, which would leave the page's top corners showing.
      timeline.to(el, {
        yPercent: -OVERSHOOT,
        duration: 0.42,
        ease: "power4.inOut",
      });
    } else {
      timeline.to(el, {
        yPercent: -101,
        duration: 0.52,
        ease: "power4.inOut",
      });
    }

    return () => {
      timeline.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
      data-wipe-phase={phase}
    >
      <div
        ref={sheet}
        className="wipe-sheet absolute -left-[25%] top-0 h-[112%] w-[150%] will-change-transform"
        style={{
          borderTopLeftRadius: "50% 16%",
          borderTopRightRadius: "50% 16%",
          background:
            "radial-gradient(120% 60% at 50% 0%, #0B3B24 0%, #04180F 58%, #020D08 100%)",
          boxShadow:
            "0 -1px 0 rgba(201,245,218,0.5), 0 -18px 60px rgba(0,200,83,0.16)",
        }}
      >
        {/* Dawn light bleeding over the crown of the arch. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-52"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(0,200,83,0.35) 0%, rgba(0,200,83,0.08) 42%, transparent 72%)",
          }}
        />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* The lockup sits on the horizon line, not floating in the middle. */}
        <div className="absolute inset-x-0 top-[38%] flex flex-col items-center px-6 text-center">
          <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-signal-red" />
          <p className="mt-4 font-sans text-[9px] uppercase leading-none tracking-[0.42em] text-white/40">
            {CHURCH.name}
          </p>
          <p className="mt-5 font-serif text-[clamp(1.6rem,3.6vw,2.75rem)] font-medium italic leading-[0.95] tracking-[-0.03em] text-dawn-mint">
            {CHURCH.tagline}
          </p>
          <span
            aria-hidden="true"
            className="mt-6 block h-px w-14 origin-center bg-gradient-to-r from-transparent via-brand-green to-transparent"
          />
          <p className="mt-5 font-mono text-[8.5px] uppercase tracking-[0.34em] text-white/35">
            Gwarinpa · Abuja
          </p>
        </div>

        {/* Base line: the same folio language as the page footers. */}
        <div className="absolute inset-x-0 bottom-[7%] flex items-center justify-between px-[8vw]">
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/25">
            Forever Life and Grace Mission
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/25">
            Abuja, Nigeria
          </span>
        </div>
      </div>
    </div>
  );
}
