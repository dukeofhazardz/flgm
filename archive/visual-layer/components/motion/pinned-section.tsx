"use strict";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PinnedSection — one pinned moment only (vision text-fill on About).
 * Pinned content never traps the scroll; disabled on mobile and under
 * prefers-reduced-motion. Cleans up on unmount / route change.
 */

interface PinnedSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export function PinnedSection({ children, className }: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  useEffect(() => {
    if (reduced || isMobile) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    });

    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <div ref={ref} className={cn("relative min-h-screen", className)}>
      {children}
    </div>
  );
}
