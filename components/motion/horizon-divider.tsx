"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizonDivider — animated dawn gradient edge between sections.
 * A thin dawn-colored line that draws in as the section enters.
 * Transform + opacity only.
 * Cleans up on unmount.
 */

interface HorizonDividerProps {
  className?: string;
  height?: string;
}

export function HorizonDivider({
  className,
  height = "2px",
}: HorizonDividerProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.style.clipPath = "inset(0 0% 0 0)";
      return undefined;
    }

    gsap.set(el, { clipPath: "inset(0 100% 0 0)" });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        end: "bottom 10%",
        once: true,
        onEnter: () =>
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "ease-out",
          }),
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-night via-brand-green to-blush"
        style={{ height }}
      />
    </div>
  );
}
