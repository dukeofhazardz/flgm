"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { canUseRichMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxLayer — a considered drift, with a ceiling.
 *
 * The layer travels at most `max` pixels either way across its whole pass
 * through the viewport, so art never breaks its frame or collides with the
 * copy next to it. Transform only, scrubbed, recalculated on resize.
 *
 * Off on touch, below 1024px, and under reduced motion — art then sits still.
 */

interface ParallaxLayerProps {
  children?: React.ReactNode;
  className?: string;
  /** Maximum travel in px in each direction. Never exceed 24 in this build. */
  max?: number;
  /** 0 (stationary) → 1 (full max). */
  amount?: number;
}

export function ParallaxLayer({
  children,
  className,
  max = 16,
  amount = 1,
}: ParallaxLayerProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const limit = Math.min(Math.abs(max), 24) * gsap.utils.clamp(0, 1, amount);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!canUseRichMotion() || window.innerWidth < 1024 || limit === 0) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: limit },
        {
          y: -limit,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [limit]);

  return (
    <div ref={ref} className={cn("h-full w-full", className)} data-parallax-max={limit}>
      {children}
    </div>
  );
}
