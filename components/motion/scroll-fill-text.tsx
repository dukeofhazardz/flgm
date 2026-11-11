"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * ScrollFillText — word-by-word scroll fill, scrubbed to scroll position.
 * Words fill with ink as the section scrolls into view, one word at a time.
 * Uses clip-path fill on a duplicated colored layer for the fill effect.
 * Transform + opacity + clip-path only.
 * Cleans up on unmount.
 */

interface ScrollFillTextProps {
  children: string;
  className?: string;
  fillColor?: string;
}

type CSSStyleWithSetProperty = React.CSSProperties & {
  setProperty: (property: string, value: string) => void;
};

export function ScrollFillText({
  children,
  className,
  fillColor = "#33A402",
}: ScrollFillTextProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return undefined;

    // Create a duplicate layer for the fill
    const fillLayer = document.createElement("div");
    const style = fillLayer.style as unknown as CSSStyleWithSetProperty;
    style.position = "absolute";
    style.inset = "0";
    style.color = fillColor;
    style.setProperty("-webkit-text-fill-color", fillColor);
    style.clipPath = "inset(0 100% 0 0)";
    style.setProperty("-webkit-clip-path", "inset(0 100% 0 0)");
    style.pointerEvents = "none";
    el.insertBefore(fillLayer, el.firstChild);

    const split = new SplitText(el, { type: "words", wordsClass: "word" });
    split.words.forEach((w) => {
      (w as HTMLElement).style.position = "relative";
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Fill from bottom to top, word by word
          const fillProgress = Math.min(1, progress * 1.5);
          fillLayer.style.clipPath = `inset(${(1 - fillProgress) * 100}% 0 0 0)`;
          fillLayer.style.setProperty(
            "-webkit-clip-path",
            `inset(${(1 - fillProgress) * 100}% 0 0 0)`
          );
        },
      });
    });

    return () => {
      split.revert();
      ctx.revert();
      el.removeChild(fillLayer);
    };
  }, [reduced, fillColor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
    </div>
  );
}
