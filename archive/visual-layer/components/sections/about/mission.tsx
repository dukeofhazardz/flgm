"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { MISSION } from "@/data/mission";

/**
 * Our Mission — six numbered cards with a sticky progress index.
 * Copy from content.md (lines 70–77). Numbered because the mission is a
 * genuine sequence of purposes; order is meaningful here.
 */

export function MissionSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const cards = el.querySelectorAll<HTMLElement>("[data-mission-card]");
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
    <section className="bg-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
              Our Mission
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Our mission is to:
            </p>
          </div>

          {/* Sticky progress index */}
          <div
            className="hidden lg:block flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase"
          >
            {MISSION.map((_, i) => (
              <span
                key={i}
                className={`
                  h-6 px-2 rounded-none transition-colors
                  ${i === activeIndex
                    ? "bg-brand-green text-ink font-bold"
                    : "bg-tint-white text-ink/40 border border-ink/10"}
                `}
              >
                0{i + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MISSION.map((item, i) => (
            <article
              key={item.id}
              data-mission-card
              data-index={i}
              className={`
                p-6 rounded-none border border-ink/10 transition-all duration-300
                ${i === activeIndex
                  ? "bg-tint-white border-brand-green shadow-[0_10px_30px_-10px_rgba(0,200,83,0.06)]"
                  : "bg-white text-ink/70"}
              `}
            >
              <span className="text-2xl font-serif font-bold text-brand-green block mb-3">
                0{i + 1}
              </span>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
