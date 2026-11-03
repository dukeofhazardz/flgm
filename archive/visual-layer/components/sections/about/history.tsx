"use client";

import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { Pending } from "@/components/ui/pending";

/**
 * Our History — supplied paragraphs only, plus a clearly-pending timeline
 * slot for founding year, founder, original location and milestones.
 * Shown as "Our story is being documented" and hidden until confirmed:true.
 * No invented founding year, founder, or milestones.
 */

const HISTORY_PARAGRAPHS = [
  "Forever Life and Grace Mission was established as a ministry dedicated to the revelation of God’s grace and eternal life in Jesus Christ.",
  "Over the years, the ministry has continued to pursue its mandate of raising believers in spiritual understanding, sonship, and Kingdom influence through teaching, worship, prayer, fellowship, and evangelism.",
  "Through its various ministry expressions, FLGM seeks to strengthen believers, nurture young people, build godly relationships, and extend the message of God’s grace to communities and beyond.",
  "Our journey continues with a commitment to spiritual growth, discipleship, evangelism, and the establishment of a strong church community.",
] as const;

const HISTORY_MILESTONES = [
  "Year of establishment",
  "Name of founder and founding pastor",
  "Original location of the ministry",
  "Major milestones in the ministry’s development",
  "Significant ministry achievements",
  "Establishment of Resurrection Ground, Gwarinpa",
] as const;

export function HistorySection(): React.ReactElement {
  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal className="mb-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink leading-[1.05] tracking-tight">
            Our History
          </h2>
        </Reveal>

        <div className="space-y-6">
          {HISTORY_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="text-sm md:text-base text-ink/70 leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Pending timeline slot — clearly-pending, not shown as fact */}
        <div className="mt-16 border border-blush-red-tint/30 bg-white/50 rounded-none p-8 md:p-12">
          <Pending
            confirmed={false}
            label="Our story is being documented"
            className="mb-6"
          />
          <h3 className="font-serif text-xl font-bold text-ink mb-4">
            Historical details awaiting verification
          </h3>
          <p className="text-sm text-ink/60 leading-relaxed mb-6">
            The following details should be confirmed by the Chief Pastor
            before publication:
          </p>
          <ul className="space-y-3 text-sm text-ink/60">
            {HISTORY_MILESTONES.map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blush-red-tint font-medium mt-0.5">•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
