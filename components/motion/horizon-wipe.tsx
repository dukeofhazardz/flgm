"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizonWipe — page transition between routes.
 * Arch-shaped wipe rises from bottom to top (sunrise horizon) to cover the
 * screen, then contracts to reveal the next page. Lenis and ScrollTrigger
 * are refreshed after navigation.
 */

interface HorizonWipeProps {
  visible: boolean;
  onComplete?: () => void;
}

export function HorizonWipe({
  visible,
  onComplete,
}: HorizonWipeProps): React.ReactElement {
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

      // Wipe in: arch covers screen.
      tl.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "ease-in-out",
      });
    } else {
      // Wipe out: reveal content.
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
      tlRef.current?.revert();
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
