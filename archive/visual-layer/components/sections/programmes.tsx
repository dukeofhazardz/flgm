"use client";

import { useState, useEffect } from "react";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Pending } from "@/components/ui/pending";
import { PROGRAMMES } from "@/data/programmes";
import { nextWeeklyOccurrence, nextFirstThursday } from "@/lib/time";

/**
 * FEATURED PROGRAMMES — horizontal pinned scroll on desktop,
 * vertical stack on mobile.
 * Each programme is a large card with big numeral, time in WAT,
 * and a live "next occurrence" badge. Alpha Worship time only as
 * confirmed:false.
 */

interface ProgrammeCardProps {
  programme: (typeof PROGRAMMES)[number];
  index: number;
}

function nextOccurrenceFor(programme: (typeof PROGRAMMES)[number]): string | null {
  let next: Date | null = null;
  if (programme.id === "alpha-worship") {
    next = nextFirstThursday("17:00");
  } else {
    const dayMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    const day = dayMap[programme.day.toLowerCase()];
    if (day !== undefined) {
      const [h, m] = programme.time
        .replace("AM", "")
        .replace("PM", "")
        .split("–")[0]
        .trim()
        .split(":")
        .map(Number);
      const hour = programme.time.includes("PM") && h !== 12 ? h + 12 : h;
      next = nextWeeklyOccurrence(day, `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }

  if (!next) return null;
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  };
  return next.toLocaleString("en-NG", opts);
}

function ProgrammeCard({ programme, index }: ProgrammeCardProps) {
  const [nextOccurrence, setNextOccurrence] = useState<string | null>(null);

  // Compute next occurrence on the client to avoid prerender time evaluation.
  useEffect(() => {
    const next = nextOccurrenceFor(programme);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNextOccurrence(next);
  }, [programme]);

  return (
    <article
      className="flex-shrink-0 w-[320px] md:w-[360px] p-6 border border-ink/10 rounded-none bg-white transition-all duration-300 hover:border-brand-green/50 hover:shadow-[0_20px_40px_-10px_rgba(0,200,83,0.10)]"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl font-serif font-bold text-brand-green">
          0{index + 1}
        </span>
        <Pending confirmed={programme.confirmed} label="Details coming soon">
          <span className="text-[9px] text-ink/40 tracking-tighter uppercase">
            tbc
          </span>
        </Pending>
      </div>

      <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-[1.1] mb-2">
        {programme.name}
      </h3>

      <p className="text-sm text-ink/60 leading-relaxed mb-4">
        {programme.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-serif font-medium text-ink">
            {programme.day}
          </span>
          <span className="text-base font-mono text-deep-green">
            {programme.confirmed ? programme.time : "Details coming soon"}
          </span>
        </div>

        {nextOccurrence && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-deep-green tracking-tight uppercase">
              Next: {nextOccurrence} WAT
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export function ProgrammesSection(): React.ReactElement {
  return (
    <section className="bg-tint-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal className="mb-2">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-[1.05] tracking-tight">
                Featured Programmes
              </h2>
            </Reveal>
            <p className="text-sm text-ink/60 leading-relaxed max-w-lg">
              Our programmes are designed to help believers grow in grace,
              understand their identity in Christ, build meaningful relationships,
              and fulfil their divine purpose.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 px-6 pb-8 scroll-smooth no-scrollbar lg:flex-nowrap lg:px-0 lg:pb-0">
            {PROGRAMMES.map((p, i) => (
              <ProgrammeCard key={p.id} programme={p} index={i} />
            ))}
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
          <p className="text-[10px] text-ink/40 tracking-widest uppercase">
            Scroll sideways
          </p>
        </div>

        <div className="lg:hidden mt-12 border-t border-ink/10 pt-8">
          <Marquee speed={24}>
            {PROGRAMMES.map((p) => (
              <span
                key={p.id}
                className="mx-4 text-sm font-semibold text-ink/60 tracking-widest uppercase"
              >
                {p.day} • {p.time}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
