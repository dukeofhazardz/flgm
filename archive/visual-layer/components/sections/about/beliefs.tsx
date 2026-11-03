"use client";

import * as React from "react";
import { useState } from "react";
import { BELIEFS, DOCTRINAL_STATEMENT_CONFIRMED } from "@/data/beliefs";
import { Pending } from "@/components/ui/pending";

/**
 * Our Beliefs — seven expandable accordion items with animated arch icon.
 * Copy from content.md (lines 78–94). Doctrinal statement flagged
 * confirmed:false; a LAUNCH_CHECKLIST entry covers it. No invented doctrine.
 */

interface BeliefItemProps {
  item: (typeof BELIEFS)[number];
  isOpen: boolean;
  onToggle: () => void;
}

function BeliefItem({ item, isOpen, onToggle }: BeliefItemProps) {
  return (
    <div className="border border-ink/10 rounded-none overflow-hidden group">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full p-6 text-left bg-white group-hover:bg-tint-white transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
              isOpen
                ? "bg-brand-green text-white rotate-90"
                : "bg-tint-white text-ink/60 border border-ink/10"
            }`}
            aria-hidden="true"
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 50 150 L 50 72 A 50 50 0 0 1 150 72 L 150 150" />
            </svg>
          </span>
          <h3 className="font-serif text-base font-bold text-ink">
            {item.title}
          </h3>
        </div>
        <span className={`text-[10px] font-semibold transition-colors ${
          isOpen ? "text-brand-green" : "text-deep-green"
        }`}>
          {isOpen ? "Read less" : "Read more"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-ink/5 p-6 text-sm text-ink/70 leading-relaxed">
          {item.description}
        </div>
      )}
    </div>
  );
}

export function BeliefsSection(): React.ReactElement {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="bg-tint-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Our Beliefs
          </h2>
          <p className="mt-4 text-sm text-ink/60 leading-relaxed">
            Forever Life and Grace Mission is founded on the following
            biblical convictions. These are a proposed summary based on the
            ministry’s stated themes; the official doctrinal statement should
            be reviewed and approved by the Chief Pastor before publication.
          </p>
        </div>

        {/* Doctrinal statement confirmation flag */}
        <Pending
          confirmed={DOCTRINAL_STATEMENT_CONFIRMED}
          label="Official doctrinal statement pending Chief Pastor approval"
          className="mb-10"
        />

        <div className="space-y-3">
          {BELIEFS.map((item, i) => (
            <BeliefItem
              key={item.id}
              item={item}
              isOpen={openIndices.includes(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
