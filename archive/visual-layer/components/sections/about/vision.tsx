"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

/**
 * Our Vision — vision statement + five "we envision believers who…"
 * statements as scroll-activated stacked cards.
 * Copy from content.md (lines 62–69).
 */

const VISION_STATEMENT =
  "To raise a people established in the revelation of God’s grace and eternal life, manifesting sonship, dominion, spiritual maturity, and Kingdom influence in every sphere of life.";

const ENVISION_STATEMENTS = [
  "Understand and live from their identity as sons of God.",
  "Are established in the knowledge of God’s grace and eternal life.",
  "Demonstrate spiritual maturity and the character of Christ.",
  "Exercise dominion and influence in their families, communities, and society.",
  "Participate actively in evangelism, discipleship, and the advancement of God’s Kingdom.",
] as const;

export function VisionSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const cards = el.querySelectorAll<HTMLElement>("[data-vision-card]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index ?? "0", 10);
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-tint-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Our Vision
          </h2>
        </Reveal>

        {/* Vision statement */}
        <div className="mb-16 relative pl-8">
          <span
            className="absolute -left-2 top-0 h-[2px] w-4 bg-brand-green"
            aria-hidden="true"
          />
          <p className="font-serif text-lg md:text-xl text-ink leading-relaxed italic">
            {VISION_STATEMENT}
          </p>
        </div>

        {/* Envision statements — scroll-activated stacked cards */}
        <div ref={containerRef} className="space-y-4">
          {ENVISION_STATEMENTS.map((statement, i) => (
            <div
              key={i}
              data-vision-card
              data-index={i}
              className={`
                p-6 rounded-none border-l-4 transition-all duration-300 ease-out
                ${i === activeIndex
                  ? "border-brand-green bg-white text-ink shadow-[0_10px_30px_-10px_rgba(0,200,83,0.08)]"
                  : "border-ink/10 bg-tint-white text-ink/60"}
              `}
            >
              <span className="text-xs font-semibold text-brand-red tracking-widest uppercase block mb-2">
                We envision believers who
              </span>
              <p className="text-sm text-current leading-relaxed">
                {statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
