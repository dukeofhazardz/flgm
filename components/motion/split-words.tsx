"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

/**
 * SplitWords — splits text by WORDS only, never mid-word.
 * Returns an array of word elements wrapped in spans for animation.
 * Safe under prefers-reduced-motion (renders as plain text).
 */

interface SplitWordsProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function SplitWords({
  children,
  className,
  tag = "p",
}: SplitWordsProps): React.ReactElement {
  const Tag = tag as React.ElementType;
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>(
    null
  );
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced || !ref.current) return undefined;
    const split = new SplitText(ref.current, { type: "words", wordsClass: "word" });
    return () => split.revert();
  }, [reduced]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
