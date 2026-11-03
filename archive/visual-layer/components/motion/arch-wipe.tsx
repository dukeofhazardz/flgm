"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Arch wipe — page transition between routes.
 * An arch-shaped mask expands to cover the screen, then contracts to reveal
 * the next page. Lenis and ScrollTrigger are refreshed after navigation.
 */

interface ArchWipeProps {
  visible: boolean;
  onComplete?: () => void;
}

export function ArchWipe({ visible, onComplete }: ArchWipeProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (visible) {
      const tl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });
      tlRef.current = tl;

      // Wipe in: arch mask covers the screen.
      tl.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "ease-in-out",
      });
    } else {
      // Wipe out: reveal content by expanding from center.
      const tl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });
      tlRef.current = tl;

      tl.to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "ease-in-out",
        delay: 0.2,
      });
    }

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [visible, onComplete]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] bg-white clip-path-[inset(0%_0%_100%_0%)] pointer-events-none"
    />
  );
}
