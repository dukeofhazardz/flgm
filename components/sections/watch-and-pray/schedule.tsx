"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

gsap.registerPlugin(ScrollTrigger);

/**
 * WatchSchedule — the daily office as a vertical dawn timeline.
 *
 * The green sun marker travels the rail as the list is read; each row lifts
 * from a quiet state as the marker reaches it. Transform + opacity only.
 * Reduced motion parks the marker at the first entry and shows every row.
 */

export function WatchSchedule(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const track = list.current;
    const sun = marker.current;
    if (!section || !track || !sun) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-schedule-row]");

      if (reduced) {
        gsap.set(rows, { opacity: 1, y: 0 });
        gsap.set(sun, { y: 0, opacity: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0.42, y: 14 });
      gsap.set(sun, { opacity: 1 });

      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 76%",
          once: true,
          onEnter: () =>
            gsap.to(row, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            }),
        });
      });

      gsap.to(sun, {
        y: () => Math.max(0, track.offsetHeight - sun.offsetHeight),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 68%",
          end: "bottom 68%",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="schedule"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 02 — Daily</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            The order of the morning
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 05 / 10
          </Folio>
        </header>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 className="max-w-[11ch] font-serif text-[clamp(2.4rem,5.4vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.04em]">
                The daily <span className="italic">watch</span>
              </h2>
              <p className="mt-5 max-w-[34ch] text-[16px] leading-[1.62] text-forest/75">
                The morning gathers around worship, prayer, the Word, testimony, and
                online outreach.
              </p>

              <div className="mt-9 flex items-end gap-4">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-green"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full border border-brand-green/25"
                  />
                  <span className="relative font-mono text-[9px] uppercase tracking-[0.1em] text-ink">
                    5:30
                  </span>
                </span>
                <div className="pb-1">
                  <p className="font-serif text-[1.35rem] font-medium italic leading-none tracking-[-0.01em]">
                    First light
                  </p>
                  <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
                    West Africa Time
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-[32ch] border-t border-ink/15 pt-4 font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.14em] text-ink/40">
                The full sequence and session duration will be published soon.
              </p>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="relative pl-9 md:pl-14">
              {/* Rail */}
              <span
                aria-hidden="true"
                className="dawn-rail absolute bottom-2 left-[7px] top-2 w-px md:left-[11px]"
              />

              {/* The travelling sun */}
              <span
                ref={marker}
                aria-hidden="true"
                className="absolute left-0 top-1 z-10 flex h-4 w-4 items-center justify-center md:h-6 md:w-6"
              >
                <span className="absolute inset-0 rounded-full bg-brand-green shadow-[0_0_0_5px_rgba(0,200,83,0.14),0_0_24px_6px_rgba(0,200,83,0.28)]" />
                <span className="absolute -inset-2 rounded-full border border-brand-green/25" />
              </span>

              <ol ref={list} className="relative">
                {WATCH_AND_PRAY.schedule.map((row, index) => (
                  <li
                    key={row.activity}
                    data-schedule-row
                    className="group border-b border-ink/15 py-7 first:border-t md:py-9"
                  >
                    <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1.5">
                      <span className="col-span-12 font-mono text-[9px] uppercase tracking-[0.2em] text-crimson-text md:col-span-3">
                        {row.time}
                      </span>
                      <p className="col-span-12 font-serif text-[clamp(1.35rem,2.7vw,2.15rem)] font-medium leading-[1.16] tracking-[-0.025em] text-ink md:col-span-8">
                        {row.activity}
                      </p>
                      <span
                        aria-hidden="true"
                        className="hidden justify-self-end font-mono text-[9px] tracking-[0.18em] text-ink/25 md:col-span-1 md:block"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
