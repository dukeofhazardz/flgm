"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, CalendarPlus } from "lucide-react";
import { HeroDawn } from "@/components/sections/watch-and-pray/hero-dawn";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

gsap.registerPlugin(ScrollTrigger);

/**
 * WatchHero — the page opens at night, the sun on the horizon.
 *
 * The upper field is deep night with the masthead and theme. The lower band is
 * solid Grace Green carrying "5:30" in colossal ink numerals — a green horizon
 * with the sun cut by it. Ink on green keeps the giant numerals AA-legible;
 * white display type stays on the night field above.
 */

const BAND_HEIGHT = "clamp(208px, 27svh, 300px)";

export function WatchHero(): React.ReactElement {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set("[data-wap-line]", { yPercent: 114 });
      gsap.set("[data-wap-fade]", { opacity: 0, y: 12 });
      gsap.set("[data-wap-clock]", { clipPath: "inset(0 0 100% 0)" });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.08 });
      intro
        .to("[data-wap-line]", { yPercent: 0, duration: 1.05, stagger: 0.07 }, 0)
        .to("[data-wap-fade]", { opacity: 1, y: 0, duration: 0.75, stagger: 0.07 }, 0.32)
        .to(
          "[data-wap-clock]",
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power2.inOut" },
          0.2
        );

      gsap.to("[data-wap-sun-scene]", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-wap-title]", {
        yPercent: -12,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === section) trigger.kill();
        });
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="relative flex min-h-[100svh] flex-col">
        <div
          data-wap-sun-scene
          className="absolute inset-x-0 top-0"
          style={{ bottom: BAND_HEIGHT }}
        >
          <HeroDawn />
        </div>

        {/* ── Night field ── */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-5 pt-[112px] md:px-8 md:pt-[108px] lg:px-10 lg:pt-[124px]">
          <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-3">
            <p className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[8.5px] uppercase leading-none tracking-[0.22em] text-white/50 md:text-[9px]">
              <span className="h-1.5 w-1.5 bg-signal-red" aria-hidden="true" />
              Watch and Pray
            </p>
            <p className="whitespace-nowrap text-right font-mono text-[8.5px] uppercase leading-[1.6] tracking-[0.18em] text-white/40 md:text-[9px]">
              <span className="hidden sm:inline">
                50 days
                <span className="mx-2 text-white/15" aria-hidden="true">
                  /
                </span>
              </span>
              11 Nov — 30 Dec 2026
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-start py-6 md:justify-center md:py-8">
            <div data-wap-title className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <h1 className="font-serif text-[clamp(3.6rem,12.5vw,10.5rem)] font-medium leading-[0.82] tracking-[-0.05em] text-white">
                  <span className="block overflow-hidden pb-[0.04em]">
                    <span data-wap-line className="block">
                      Watch
                    </span>
                  </span>
                  <span className="block overflow-hidden pb-[0.04em]">
                    <span data-wap-line className="block italic">
                      and Pray
                    </span>
                  </span>
                </h1>

                <p
                  data-wap-fade
                  className="mt-5 max-w-[32ch] font-sans text-[15px] leading-[1.5] text-white/65 md:mt-6 md:text-[16px]"
                >
                  Strategic Prayer and Testimony Outreach
                </p>
              </div>

              <div data-wap-fade className="md:col-span-4 md:pb-2">
                <span aria-hidden="true" className="block h-px w-12 bg-brand-green md:w-16" />
                <p className="mt-4 max-w-[26ch] font-serif text-[clamp(1.2rem,2.4vw,1.85rem)] font-medium italic leading-[1.22] tracking-[-0.015em] text-white/85">
                  {WATCH_AND_PRAY.theme}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-between gap-4 md:flex">
            <p
              data-wap-fade
              className="max-w-[30ch] font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.16em] text-white/35 md:text-[9px]"
            >
              Gwarinpa, Abuja
              <span className="mx-2 text-white/15" aria-hidden="true">
                /
              </span>
              West Africa Time
            </p>

            <span
              data-wap-fade
              className="flex shrink-0 items-center gap-2.5"
              aria-hidden="true"
            >
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/35 md:text-[9px]">
                The watch begins
              </span>
              <span className="relative block h-7 w-px overflow-hidden bg-white/15">
                <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-2.5 w-px bg-brand-green" />
              </span>
              <ArrowDown className="h-3 w-3 text-brand-green" strokeWidth={1.6} />
            </span>
          </div>
        </div>

        {/* ── The green horizon band ── */}
        <div
          className="relative z-10 flex shrink-0 flex-col justify-between overflow-hidden bg-brand-green px-5 pb-0 pt-3 text-ink md:px-8 md:pt-4 lg:px-10"
          style={{ height: BAND_HEIGHT }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(201,245,218,0.4)_0%,rgba(201,245,218,0)_58%)]" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-dawn-mint/70"
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between gap-6">
            <div data-wap-clock className="flex items-start gap-2 md:gap-3">
              <span className="font-serif text-[clamp(4.9rem,12.5vw,10.5rem)] font-medium leading-[0.7] tracking-[-0.06em] tabular-nums">
                5<span className="mx-[0.02em]">:</span>30
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60 md:mt-2 md:text-[12px]">
                AM
              </span>
            </div>

            <div className="hidden text-right sm:block">
              <p className="font-serif text-[clamp(1rem,2.2vw,1.75rem)] font-medium italic leading-none tracking-[-0.015em]">
                The daily watch
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
                Fifty mornings
                <span className="mx-1.5 text-ink/30" aria-hidden="true">
                  /
                </span>
                WAT
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between gap-3 border-t border-ink/25 py-2.5">
            <p className="whitespace-nowrap font-mono text-[8.5px] uppercase leading-none tracking-[0.16em] text-ink/65 md:text-[9px]">
              <span className="sm:hidden">11 Nov — 30 Dec</span>
              <span className="hidden sm:inline">11 Nov — 30 Dec 2026</span>
              <span className="mx-2 text-ink/30" aria-hidden="true">
                /
              </span>
              <span className="sm:hidden">5:30 AM</span>
              <span className="hidden sm:inline">Daily · 5:30 AM WAT</span>
            </p>

            <Link
              href="/watch-and-pray/calendar"
              className="group inline-flex min-h-9 shrink-0 items-center gap-2 whitespace-nowrap border border-ink/30 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/85 transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-ink hover:bg-ink hover:text-dawn-mint active:scale-[0.98] md:min-h-10 md:px-3.5 md:text-[9px]"
            >
              <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              Add to calendar
              <span className="sr-only">(.ics file)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
