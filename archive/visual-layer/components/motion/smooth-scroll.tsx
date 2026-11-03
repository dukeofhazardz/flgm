"use strict";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — Lenis smooth-scrolling synced with GSAP ScrollTrigger.
 * Initialised once per app load. Cleans up raf on unmount; keeps the Lenis
 * instance alive across route changes for SPA feel. Respects
 * prefers-reduced-motion (smooth scroll off, native scroll).
 * Wrap page content once (typically in the root layout).
 */

interface SmoothScrollProps {
  children: React.ReactNode;
}

let lenisInstance: Lenis | null = null;

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;

    let lenis = lenisInstance;
    if (!lenis) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
        autoRaf: false,
        respectReducedMotion: true,
      });
      lenisInstance = lenis;
    }
    lenisRef.current = lenis;

    const onFrame = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
    };

    rafRef.current = requestAnimationFrame(onFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Lenis stays mounted across route changes; raf is the thing we stop.
    };
  }, [reduced]);

  return <div className="min-h-screen overflow-x-hidden">{children}</div>;
}
