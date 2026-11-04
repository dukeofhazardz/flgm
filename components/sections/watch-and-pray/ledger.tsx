"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";
import {
  WAP_DAY_COUNT,
  WAP_DAYS,
  wapDayNumber,
  wapDayState,
  wapPhase,
  type WapPhase,
} from "@/lib/watch-and-pray";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * WatchLedger — the 50-day editorial ledger.
 *
 * Each day is a numbered plate: past days filled green, today lifted with the
 * small red mark, future days left as outlined numerals. Day themes appear only
 * if BOTH the daily-theme flag and the individual theme are approved.
 *
 * The grid reveals in a wave as it enters; the header rule fills with scroll.
 * Today is resolved on the client so nothing prerenders a calendar date.
 */

const LEGEND = [
  { label: "Kept", className: "bg-brand-green" },
  { label: "Today", className: "bg-dawn-mint ring-1 ring-signal-red" },
  { label: "Ahead", className: "border border-white/25" },
];

export function WatchLedger(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const [today, setToday] = useState<number | null>(null);
  const [phase, setPhase] = useState<WapPhase>("before");

  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(wapDayNumber(now));
    setPhase(wapPhase(now));
  }, []);

  // The rail reports real progress, not scroll position: empty before the
  // watch, filled by the number of mornings kept, complete after Day 50.
  const keptDays = phase === "after" ? WAP_DAY_COUNT : today ?? 0;
  const keptFraction = keptDays / WAP_DAY_COUNT;

  useEffect(() => {
    const section = root.current;
    if (!section) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-ledger-cell]", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.012, from: "start" },
        scrollTrigger: {
          trigger: "[data-ledger-grid]",
          start: "top 86%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="ledger"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, rgba(0,200,83,0.12) 0%, rgba(0,200,83,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              § 03 — The Ledger
            </span>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:col-span-4 md:block">
            Fifty numbered mornings
          </p>
          <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:col-span-2">
            No. 06 / 10
          </span>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-14">
          <div>
            <h2 className="max-w-[12ch] font-serif text-[clamp(2.7rem,7vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.045em]">
              The 50-Day <span className="italic">Ledger</span>
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.6] text-white/55">
              One plate for every morning of the watch. The ledger fills as the days
              are kept, from Day 01 to Day 50.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {LEGEND.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/45"
              >
                <span
                  aria-hidden="true"
                  className={cn("block h-3 w-3", item.className)}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 md:mt-10">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/35">
            11 Nov
          </span>
          <span
            role="progressbar"
            aria-label="Mornings kept"
            aria-valuemin={0}
            aria-valuemax={WAP_DAY_COUNT}
            aria-valuenow={keptDays}
            className="relative h-px flex-1 overflow-hidden bg-white/12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 block origin-left bg-brand-green"
              style={{ transform: `scaleX(${keptFraction})` }}
            />
          </span>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/35">
            30 Dec
          </span>
        </div>

        <ol
          data-ledger-grid
          className="mt-5 grid grid-cols-5 border-l border-t border-white/10 md:grid-cols-10"
        >
          {WAP_DAYS.map((day) => {
            const state = wapDayState(day.day, today);
            const theme =
              WATCH_AND_PRAY.dailyThemes.approved
                ? WATCH_AND_PRAY.dailyThemes.byDay[day.day]
                : undefined;

            return (
              <li
                key={day.day}
                data-ledger-cell
                aria-label={`Day ${day.day}, ${day.longLabel}, ${
                  state === "past" ? "kept" : state === "today" ? "today" : "ahead"
                }`}
                className={cn(
                  "relative flex aspect-[4/3] flex-col justify-between border-b border-r border-white/10 p-2 transition-colors duration-300 md:aspect-[5/4] md:p-3",
                  state === "past" && "bg-brand-green text-ink",
                  state === "today" && "bg-dawn-mint text-ink",
                  state === "future" && "bg-white/[0.015] text-white"
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <span
                    className={cn(
                      "font-mono text-[7px] uppercase leading-none tracking-[0.16em] md:text-[8px]",
                      state === "future" ? "text-white/30" : "text-ink/55"
                    )}
                  >
                    Day
                  </span>
                  {state === "today" ? (
                    <span className="flex items-center gap-1 font-mono text-[6.5px] uppercase leading-none tracking-[0.14em] text-crimson-text md:text-[7px]">
                      <span className="block h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
                      Today
                    </span>
                  ) : day.day === 1 && state === "future" ? (
                    <span className="block h-1.5 w-1.5 bg-brand-green" aria-hidden="true" />
                  ) : null}
                </div>

                <div>
                  <span
                    className={cn(
                      "block font-serif text-[clamp(1.45rem,3.4vw,2.5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums",
                      state === "future" && "outline-white-soft"
                    )}
                  >
                    {String(day.day).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 flex items-baseline justify-between gap-1 font-mono text-[7px] uppercase leading-none tracking-[0.1em] md:text-[8px]",
                      state === "future" ? "text-white/38" : "text-ink/60"
                    )}
                  >
                    <span>{day.dateLabel}</span>
                    <span className="hidden md:inline">{day.weekday}</span>
                  </span>
                  {theme ? (
                    <span
                      className={cn(
                        "mt-1 block truncate font-mono text-[6.5px] uppercase tracking-[0.1em]",
                        state === "future" ? "text-white/35" : "text-ink/55"
                      )}
                    >
                      {theme}
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
          <p>Day 01 — Wednesday 11 November 2026</p>
          <p>Day 50 — Wednesday 30 December 2026</p>
        </div>
      </div>
    </section>
  );
}
