"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxLayer — slow drift/scale on scroll.
 * Transform + opacity only. Respects prefers-reduced-motion (static).
 * Cleans up ScrollTrigger on unmount.
 */

interface ParallaxLayerProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; // 0.05–0.2 subtle
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.1,
}: ParallaxLayerProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, reduced]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
