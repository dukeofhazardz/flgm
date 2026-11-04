"use client";

import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { Pending } from "@/components/ui/pending";
import { PROGRAMMES } from "@/data/programmes";
import {
  occurrenceLabel,
  upcomingFirstThursday,
  upcomingWeeklyDate,
} from "@/lib/time";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeProgrammes — five tall editorial cards on a forest field.
 *
 * Desktop pins the stage and translates the track horizontally, with a chapter
 * counter and a thin progress line. Mobile and reduced motion get an honest
 * vertical stack. Next-occurrence badges are computed after mount so the
 * server and client never disagree.
 */
export function HomeProgrammes(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const hydrated = useHydrated();

  // Occurrence labels depend on the current clock, so they are computed once
  // hydration is complete — never during the prerender, and never through a
  // state-setting effect.
  const next = useMemo<Record<string, string>>(() => {
    if (!hydrated) return {};

    const from = new Date();
    const labels: Record<string, string> = {};

    for (const programme of PROGRAMMES) {
      if (programme.recurrence === "weekly" && programme.weekday !== null) {
        labels[programme.id] = `Next · ${occurrenceLabel(
          upcomingWeeklyDate(programme.weekday, programme.time24, from)
        )}`;
      } else if (programme.recurrence === "first-thursday") {
        labels[programme.id] = `Next · ${occurrenceLabel(
          upcomingFirstThursday(null, from)
        )}`;
      } else {
        labels[programme.id] = "Schedule pending";
      }
    }

    return labels;
  }, [hydrated]);

  useEffect(() => {
    const section = root.current;
    const pinned = stage.current;
    const rail = track.current;
    if (!section || !pinned || !rail) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 40);

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinned,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress });
              }
              if (counter.current) {
                const active = Math.min(
                  PROGRAMMES.length,
                  Math.floor(self.progress * PROGRAMMES.length) + 1
                );
                counter.current.textContent = `0${active} / 0${PROGRAMMES.length}`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { x: 0 });
          if (progress.current) gsap.set(progress.current, { scaleX: 0 });
        };
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="programmes"
      data-section="programmes"
      data-header-theme="dark"
      className="relative bg-forest text-white"
    >
      {/* Deep field + a single green horizon light. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(90% 60% at 18% 0%, rgba(0,200,83,0.16) 0%, rgba(0,200,83,0.03) 42%, rgba(4,24,15,0) 72%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1680px] px-5 pt-16 md:px-8 md:pt-24 lg:px-10 lg:pt-28">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/15 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-dawn-mint/65">§ 05 — Programmes</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 md:col-span-4 md:block md:text-left">
            Five ways to grow
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-white/40 md:col-span-2">
            No. 05 / 10
          </Folio>
        </header>

        <div className="mt-8 grid grid-cols-12 items-end gap-6 pb-8 md:mt-10">
          <h2 className="col-span-12 max-w-[20ch] font-serif text-[clamp(2.2rem,5.4vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.035em] md:col-span-7">
            Come and grow <span className="text-dawn-mint italic">with us.</span>
          </h2>
          <p className="col-span-12 max-w-[42ch] font-sans text-[15px] leading-[1.65] text-white/65 md:col-span-4 md:col-start-9">
            Our programmes are designed to help believers grow in grace, understand
            their identity in Christ, build meaningful relationships, and fulfil their
            divine purpose.
          </p>
        </div>
      </div>

      {/* ── Pinned horizontal stage ── */}
      <div
        ref={stage}
        data-programmes-stage
        className="relative flex flex-col justify-center pb-14 lg:h-[100svh] lg:overflow-hidden lg:pb-0"
      >
        <div className="mx-5 mb-4 flex items-center justify-between gap-6 border-t border-white/12 pt-3 md:mx-8 lg:mx-10">
          <p className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            <span ref={counter} className="hidden tabular-nums text-dawn-mint/80 lg:inline">
              01 / 05
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 lg:block" />
            <span className="lg:hidden">Five programmes</span>
            <span aria-hidden="true" className="text-white/25 lg:hidden">
              ·
            </span>
            {next ? "Next occurrence live" : "Weekly rhythm"}
          </p>
          <p className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 lg:flex">
            Scroll to travel
            <span aria-hidden="true" className="text-dawn-mint">
              →
            </span>
          </p>
        </div>

        {/* Progress line */}
        <div className="mx-5 hidden h-px overflow-hidden bg-white/15 md:mx-8 lg:mx-10 lg:block" aria-hidden="true">
          <span
            ref={progress}
            className="block h-full w-full origin-left bg-brand-green"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="mt-5 overflow-visible lg:mt-7 lg:overflow-hidden">
          <div
            ref={track}
            data-programmes-track
            className="flex w-full flex-col gap-4 px-5 md:px-8 lg:w-max lg:flex-row lg:gap-5 lg:px-10"
          >
            {PROGRAMMES.map((programme, index) => {
              const number = `0${index + 1}`;
              const badge = next[programme.id] ?? "Next occurrence";

              return (
                <article
                  key={programme.id}
                  data-programme-card
                  className={cn(
                    "group relative flex shrink-0 flex-col justify-between overflow-hidden border border-white/14 bg-night/55 p-5 md:p-7",
                    "lg:h-[64vh] lg:min-h-[460px] lg:w-[min(74vw,540px)]",
                    "transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    "hover:-translate-y-1 hover:border-dawn-mint/35 hover:bg-night/80"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-8 select-none"
                  >
                    <span
                      className="block font-serif text-[clamp(5.5rem,13vw,9.5rem)] font-medium leading-none tracking-[-0.06em] text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(201,245,218,0.2)" }}
                    >
                      {number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 block font-serif text-[clamp(5.5rem,13vw,9.5rem)] font-medium leading-none tracking-[-0.06em] text-dawn-mint/85 transition-[clip-path] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{
                        clipPath: "inset(0 100% 0 0)",
                        WebkitTextStroke: "1px rgba(201,245,218,0.2)",
                      }}
                    >
                      {number}
                    </span>
                  </div>

                  <div className="relative flex items-start justify-between gap-4 pr-16">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 border px-2 py-1 font-mono text-[8px] uppercase leading-none tracking-[0.12em]",
                        programme.confirmed
                          ? "border-white/15 text-white/60"
                          : "border-white/10 text-white/40"
                      )}
                    >
                      {programme.confirmed ? (
                        <span
                          className="live-dot h-1.5 w-1.5 rounded-full bg-signal-red"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-signal-red/45"
                          aria-hidden="true"
                        />
                      )}
                      {badge}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dawn-mint/60">
                      {programme.day}
                    </p>
                    <h3 className="mt-3 max-w-[16ch] font-serif text-[clamp(1.75rem,2.9vw,2.7rem)] font-medium leading-[0.98] tracking-[-0.03em] text-white">
                      {programme.name}
                    </h3>
                    <p className="mt-4 max-w-[44ch] font-sans text-[14.5px] leading-[1.62] text-white/55">
                      {programme.description}
                    </p>
                  </div>

                  <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-white/12 pt-4">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                        Time · WAT
                      </p>
                      {programme.confirmed ? (
                        <p className="mt-1.5 font-mono text-[13px] leading-none text-dawn-mint">
                          {programme.time} WAT
                        </p>
                      ) : (
                        <Pending
                          confirmed={programme.confirmed}
                          label={programme.time}
                          className="mt-2 justify-start border-0 bg-transparent px-0 py-0 text-[9px] tracking-[0.14em] text-dawn-mint/60"
                        />
                      )}
                    </div>

                    <Link
                      href="/events"
                      aria-label={`See ${programme.name} on the events calendar`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 text-white/70 transition-[transform,background-color,color,border-color] duration-300 hover:border-brand-green hover:bg-brand-green hover:text-ink"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}

            {/* End plate: a quiet close to the horizontal run. */}
            <div className="relative hidden shrink-0 flex-col justify-between border border-dashed border-white/12 p-7 lg:flex lg:h-[64vh] lg:min-h-[460px] lg:w-[340px]">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                End of the week
              </p>
              <div>
                <p className="font-serif text-[2.4rem] font-medium leading-[0.95] tracking-[-0.03em] text-dawn-mint">
                  Every day,
                  <br />
                  <span className="text-white italic">better.</span>
                </p>
                <p className="mt-4 max-w-[26ch] font-sans text-[14px] leading-[1.6] text-white/55">
                  Programme times are published in West Africa Time. Unconfirmed
                  details appear only when the church supplies them.
                </p>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-white"
              >
                Full calendar
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
