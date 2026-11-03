"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { EVENTS } from "@/data/events";
import { eventStatus } from "@/lib/time";

/**
 * UPCOMING EVENTS teaser — Client Component.
 * The next 3 upcoming events from events.ts as ticket-style cards with big
 * date numerals (NOV 11, NOV 28, DEC 05...).
 * Event status is computed on the client to avoid Next.js 16's
 * blocking-prerender-current-time rule (new Date() during prerender).
 */

export function EventsTeaserSection(): React.ReactElement | null {
  const [upcoming, setUpcoming] = useState<Array<typeof EVENTS[number]>>([]);

  // Compute upcoming events on the client so `new Date()` is evaluated
  // per-visit, not during prerender (Next.js 16 blocking-prerender rule).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUpcoming(EVENTS.filter((e) => eventStatus(e) === "upcoming").slice(0, 3));
  }, []);

  if (upcoming.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-ink/10 border-b border-ink/10 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-[1.05] tracking-tight">
              Upcoming Events
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              Discover upcoming worship services, conferences, and celebrations.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcoming.map((event) => {
            const date = new Date(event.date);
            const month = date
              .toLocaleString("en-NG", { timeZone: "Africa/Lagos", month: "short" })
              .toUpperCase();
            const day = date.getDate();

            return (
              <article
                key={event.id}
                className="relative p-6 md:p-8 border border-ink/10 rounded-none bg-white group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-[10px] font-semibold text-brand-red/60 tracking-tighter uppercase">
                    {event.category}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-4">
                  <div className="flex flex-col items-start">
                    <span className="text-5xl font-serif font-bold text-ink leading-none">
                      {day}
                    </span>
                    <span className="mt-1 text-[11px] font-bold text-brand-red tracking-tighter uppercase">
                      {month}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-[1.1] mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-ink/60 leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-ink">
                    {event.time}
                  </span>
                </div>

                <Link
                  href="/events"
                  className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red uppercase tracking-tighter"
                >
                  Event Details <span>→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
