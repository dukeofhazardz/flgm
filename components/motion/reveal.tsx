"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal — scroll reveal for sections.
 * Reveals heading → text → picture with a 30–80ms stagger.
 * Transform + opacity only (never width/height/padding/margin).
 * Respects prefers-reduced-motion (content shows immediately, no travel).
 * Cleans up ScrollTrigger on unmount.
 */

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  stagger?: number; // default 0.06 (60ms)
  once?: boolean;
}

export function Reveal({
  children,
  className,
  stagger = 0.06,
  once = true,
}: RevealProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      return undefined;
    }

    const childrenEls = el.querySelectorAll<HTMLElement>(
      ":scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > figure, :scope > img"
    );

    gsap.set(childrenEls, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        once,
        onEnter: () =>
          gsap.to(childrenEls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "ease-in-out",
            stagger,
          }),
        onEnterBack: () =>
          gsap.to(childrenEls, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "ease-out",
            stagger,
          }),
      });
    });

    return () => ctx.revert();
  }, [stagger, once, reduced]);

  return (
    <div ref={ref} className={className} style={{ visibility: reduced ? "visible" : "inherit" }}>
      {children}
    </div>
  );
}
