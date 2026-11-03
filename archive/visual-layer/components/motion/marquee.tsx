"use strict";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Marquee — horizontal scroll for the programme list on mobile
 * (vertical list on desktop). Constant motion uses `linear` easing.
 * Duplicated content for seamless loop. Paused under prefers-reduced-motion.
 * Cleans up on unmount.
 */

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function Marquee({ children, className, speed = 25 }: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;

    wrap.appendChild(content.cloneNode(true));
    wrap.appendChild(content.cloneNode(true));

    if (reduced) {
      wrap.style.animationPlayState = "paused";
      return;
    }

    const width = content.scrollWidth;
    const ctx = gsap.context(() => {
      gsap.to(wrap, {
        x: -width,
        duration: width / speed,
        repeat: -1,
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, [speed, reduced]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "overflow-hidden relative [mask-image:linear-gradient(to_right,black_20%,transparent_20%_80%,black_80%)]",
        className,
      )}
    >
      <div
        ref={contentRef}
        className="inline-flex items-center gap-12 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
