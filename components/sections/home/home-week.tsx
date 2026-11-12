"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { WEEK } from "@/data/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeWeek — the week as a typographic ledger.
 *
 * A small sun travels the rail from Sunday to Thursday as the ledger crosses
 * the viewport, drawing a green thread behind it. Sunday and Thursday carry the
 * published gatherings; empty days stay empty. Reduced motion parks the sun.
 */
export function HomeWeek(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const ledger = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const list = ledger.current;
    const sun = marker.current;
    const thread = trail.current;
    if (!section || !list || !sun) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-week-row]"));
    if (rows.length < 5) return undefined;

    const yFor = (row: HTMLElement) =>
      row.offsetTop + row.offsetHeight / 2 - sun.offsetHeight / 2;

    const ctx = gsap.context(() => {
      const paint = () => {
        const start = yFor(rows[0]) + sun.offsetHeight / 2;
        const end = yFor(rows[4]) + sun.offsetHeight / 2;
        gsap.set(sun, { y: yFor(rows[0]) });
        if (thread) {
          gsap.set(thread, { y: start, height: Math.max(0, end - start), scaleY: 1 });
        }
      };

      if (reduced) {
        paint();
        return;
      }

      paint();

      const st = ScrollTrigger.create({
        trigger: list,
        start: "top 70%",
        end: "bottom 58%",
        invalidateOnRefresh: true,
        onRefresh: paint,
        onUpdate: (self) => {
          // Travel Sunday → Thursday across the middle of the scroll.
          const travel = gsap.utils.clamp(0, 1, self.progress / 0.72);
          gsap.set(sun, {
            y: yFor(rows[0]) + (yFor(rows[4]) - yFor(rows[0])) * travel,
          });
          if (thread) {
            const start = yFor(rows[0]) + sun.offsetHeight / 2;
            const end = yFor(rows[4]) + sun.offsetHeight / 2;
            gsap.set(thread, {
              y: start,
              height: Math.max(0, end - start),
              scaleY: Math.max(0.001, travel),
            });
          }
        },
      });

      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="the-week"
      data-section="week"
      data-header-theme="light"
      className="relative overflow-hidden bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 07 — The Week</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block md:text-left">
            Sunday to Saturday
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 06 / 10
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-5 md:mt-14">
          <h2 className="col-span-12 max-w-[15ch] font-serif text-[clamp(2.2rem,5.4vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.035em] md:col-span-6">
            The week, <span className="italic">gathered.</span>
          </h2>
          <p className="col-span-12 max-w-[42ch] font-sans text-[15px] leading-[1.65] text-deep-green md:col-span-4 md:col-start-9">
            Our programmes are designed to help believers grow in grace, understand
            their identity in Christ, build meaningful relationships, and fulfil their
            divine purpose. All times are West Africa Time.
          </p>
        </div>

        {/* ── Ledger ── */}
        <div className="relative mt-10 md:mt-14">
          <div ref={ledger} className="relative pl-12 md:pl-20">
            {/* Rail + travelling sun */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-4 top-0 w-px bg-ink/15 md:left-5"
            >
              <span
                ref={trail}
                className="absolute left-0 top-0 block w-px origin-top bg-brand-green"
                style={{ height: 0 }}
              />
            </div>

            <div
              ref={marker}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 flex h-8 w-8 -translate-x-0 items-center justify-center md:h-10 md:w-10"
            >
              <span className="hero-rays absolute inset-[-8px] text-brand-green/35">
                <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
                  <path
                    d="M32 2v9M32 53v9M2 32h9M53 32h9M10.8 10.8l6.4 6.4M46.8 46.8l6.4 6.4M10.8 53.2l6.4-6.4M46.8 17.2l6.4-6.4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="relative block h-4 w-4 rounded-full bg-brand-green shadow-[0_0_0_5px_rgba(51,164,2,0.12),0_0_22px_rgba(51,164,2,0.45)] md:h-5 md:w-5" />
            </div>

            {WEEK.map((day, index) => {
              const gathering = day.services.length > 0;
              const isSunOrThu = day.id === "sun" || day.id === "thu";
              return (
                <div
                  key={day.id}
                  data-week-row
                  className={cn(
                    "group relative grid grid-cols-12 items-start gap-x-3 gap-y-2 border-t border-ink/12 py-5 transition-colors duration-300 md:gap-x-6 md:py-6",
                    "hover:bg-mist/70",
                    isSunOrThu && "bg-mist/35"
                  )}
                >
                  <div className="col-span-12 flex items-baseline gap-3 md:col-span-4 md:gap-5">
                    <span className="w-7 shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35 md:w-9">
                      {day.short}
                    </span>
                    <h3
                      className={cn(
                        "font-serif text-[clamp(1.65rem,3.4vw,2.8rem)] font-medium leading-none tracking-[-0.03em]",
                        gathering ? "text-ink" : "text-ink/35"
                      )}
                    >
                      {day.day}
                    </h3>
                    {index === 0 && (
                      <span className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-deep-green md:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                        Two gatherings
                      </span>
                    )}
                  </div>

                  <div className="col-span-12 md:col-span-8">
                    {gathering ? (
                      <div className="flex flex-col">
                        {day.services.map((service) => (
                          <div
                            key={service.name}
                            className="flex flex-col gap-1 border-b border-ink/8 py-2 last:border-b-0 first:pt-0 md:flex-row md:items-baseline md:justify-between md:gap-6"
                          >
                            <p className="max-w-[52ch] font-sans text-[15px] leading-[1.5] text-deep-green md:text-[16px]">
                              {service.name}
                            </p>
                            <p
                              className={cn(
                                "shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]",
                                service.confirmed ? "text-ink/70" : "text-crimson-text/70"
                              )}
                            >
                              {service.time}
                              {service.confirmed && (
                                <span className="ml-1.5 text-ink/35">WAT</span>
                              )}
                              {service.cadence && (
                                <span className="ml-2 normal-case tracking-normal text-ink/35">
                                  · {service.cadence}
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between gap-6">
                        <p className="font-sans text-[14px] leading-[1.5] text-ink/30">
                          No published gathering
                        </p>
                        <span aria-hidden="true" className="font-mono text-[13px] text-ink/20">
                          —
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="border-t border-ink/12" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
            The sun marks Sunday and Thursday
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
            Times WAT · UTC+1
          </p>
        </div>
      </div>
    </section>
  );
}
