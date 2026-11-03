"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { CHURCH } from "@/data/church";

gsap.registerPlugin(SplitText);

/**
 * About page hero — breadcrumb + SplitText title reveal.
 * No invented copy: title and identity line come only from content.md.
 */

export function AboutHero(): React.ReactElement {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const split = new SplitText(titleRef.current, { type: "chars,words" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
      },
    });
    tl.from(split.chars, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "ease-out",
      stagger: 0.025,
    });
    return () => split.revert();
  }, []);

  return (
    <section
      className="relative min-h-[44vh] bg-white border-b border-ink/10 px-6 py-20 md:py-32 text-center"
      aria-label="About page hero"
    >
      <nav className="flex justify-center gap-4 mb-10">
        <Link
          href="/"
          className="text-xs font-semibold text-deep-green tracking-widest uppercase hover:text-brand-red transition-colors"
        >
          Home
        </Link>
        <span className="text-ink/40 text-xs">/</span>
        <span className="text-xs font-semibold text-ink tracking-widest uppercase">
          About
        </span>
      </nav>

      <div className="relative z-10 inline-block">
        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tighter"
        >
          About Us
        </h1>
        <span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-16 bg-brand-green"
          aria-hidden="true"
        />
      </div>

      <p className="mt-8 max-w-2xl mx-auto text-lg text-ink/70 leading-relaxed">
        {CHURCH.identityLine}
      </p>
    </section>
  );
}
