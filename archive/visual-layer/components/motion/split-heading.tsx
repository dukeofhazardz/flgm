"use strict";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

/**
 * SplitHeading — expressive oversized display type reveal.
 * Splits a heading into characters/words and reveals them with a dawn-like
 * ease-out. Single orchestrated moment per heading; not scattered.
 * Respects prefers-reduced-motion (text renders instantly).
 * Cleans up on unmount / route change.
 */

interface SplitHeadingProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3";
}

export function SplitHeading({
  children,
  className,
  tag = "h1",
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Tag = tag;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.set(el, { opacity: 1 });
    const split = new SplitText(el, { type: "chars,words", charsClass: "char" });

    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "ease-out",
        stagger: 0.03,
      });
    });

    return () => {
      split.revert();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <Tag ref={ref} className={cn(className, "block opacity-1")}>
      {children}
    </Tag>
  );
}
