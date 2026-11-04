"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, CalendarPlus } from "lucide-react";
import { DayDial } from "@/components/sections/watch-and-pray/day-dial";
import { SplitFlap } from "@/components/sections/watch-and-pray/split-flap";
import {
  WAP_DAYS,
  lagosParts,
  wapCountdown,
  wapCountdownSentence,
  wapDayNumber,
  wapIsLive,
  wapPhase,
  watClock,
} from "@/lib/watch-and-pray";
import { cn } from "@/lib/utils";

/**
 * WatchState — the programme's live state machine, driven by Africa/Lagos.
 *
 * before  → split-flap countdown to 11 Nov 2026, 5:30 AM
 * during  → "Day N of 50", 50-tick dial, LIVE mark inside the 5:30 window
 * after   → the replays state
 *
 * Client-only so nothing prerenders a clock. The panel reserves its height
 * before hydration to avoid a layout jump.
 */

function CalendarButton({ className }: { className?: string }): React.ReactElement {
  return (
    <Link
      href="/watch-and-pray/calendar"
      className={cn(
        "group inline-flex min-h-11 items-center gap-2.5 border border-white/25 px-4 py-2.5",
        "font-mono text-[9px] uppercase tracking-[0.18em] text-white/80",
        "transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "hover:border-white hover:bg-white hover:text-ink active:scale-[0.98]",
        className
      )}
    >
      <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
      Add to calendar
      <span className="sr-only">(.ics file)</span>
    </Link>
  );
}

function PanelHeader({
  now,
  phaseLabel,
}: {
  now: Date | null;
  phaseLabel: string;
}): React.ReactElement {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
      <p className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.24em] text-white/45">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
        The watch
      </p>
      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        <span>{phaseLabel}</span>
        <span aria-hidden="true" className="h-3 w-px bg-white/15" />
        <span className="tabular-nums text-white/70">
          {now
            ? `${watClock(now)}:${String(lagosParts(now).second).padStart(2, "0")}`
            : "--:--:--"}{" "}
          WAT
        </span>
      </div>
    </div>
  );
}

function BeforeWatch({ now }: { now: Date }): React.ReactElement {
  const countdown = wapCountdown(now);
  if (!countdown) return <></>;

  return (
    <div>
      <div className="grid gap-8 pt-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="text-balance font-serif text-[clamp(1.4rem,3.4vw,2.7rem)] font-medium leading-[1.05] tracking-[-0.025em] text-white">
            The first watch begins in
          </p>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.6] text-white/60">
            Fifty mornings of prayer, worship, testimony, and digital outreach.
            Set a reminder and begin with us at first light.
          </p>
          <CalendarButton className="mt-6" />
        </div>

        <div className="md:col-span-7">
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:items-end sm:gap-x-6"
            aria-hidden="true"
          >
            <SplitFlap value={countdown.days} digits={3} label="Days" />
            <SplitFlap value={countdown.hours} digits={2} label="Hours" />
            <SplitFlap value={countdown.minutes} digits={2} label="Minutes" />
            <SplitFlap value={countdown.seconds} digits={2} label="Seconds" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              <span className="sm:hidden">Wed 11 Nov 2026 · 5:30 AM WAT</span>
              <span className="hidden sm:inline">Wednesday 11 November 2026</span>
              <span className="mx-2 hidden text-brand-green sm:inline" aria-hidden="true">
                /
              </span>
              <span className="hidden sm:inline">5:30 AM WAT</span>
            </p>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Day 01 of 50
            </p>
          </div>
        </div>
      </div>

      <p className="sr-only">
        Watch and Pray begins on Wednesday 11 November 2026 at 5:30 AM West Africa
        Time. Countdown: {wapCountdownSentence(countdown)}.
      </p>
    </div>
  );
}

function DuringWatch({ now }: { now: Date }): React.ReactElement | null {
  const day = wapDayNumber(now);
  if (day === null) return null;
  const live = wapIsLive(now);
  const today = WAP_DAYS[day - 1];

  return (
    <div className="grid gap-8 pt-6 md:grid-cols-12 md:items-center md:gap-6">
      <div className="md:col-span-7">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
          {live ? (
            <>
              <span className="inline-flex items-center gap-2 text-white">
                <span
                  className="live-dot inline-block h-2 w-2 rounded-full bg-signal-red"
                  aria-hidden="true"
                />
                Live now
              </span>
              <span aria-hidden="true" className="text-white/20">
                /
              </span>
              <span>5:30 AM WAT</span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-2 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Today’s watch
              </span>
              <span aria-hidden="true" className="text-white/20">
                /
              </span>
              <span>5:30 AM WAT</span>
            </>
          )}
        </p>

        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-serif text-[clamp(5.2rem,22vw,13rem)] font-medium leading-[0.78] tracking-[-0.06em] text-white tabular-nums">
            {String(day).padStart(2, "0")}
          </span>
          <span className="max-w-[4ch] font-mono text-[10px] uppercase leading-[1.5] tracking-[0.2em] text-white/45">
            Day of 50
          </span>
        </p>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          {today.weekday}
          <span className="mx-2 text-brand-green" aria-hidden="true">
            /
          </span>
          {today.longLabel}
        </p>

        <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-white/60">
          {live
            ? "The morning watch is open. Join the daily prayer on Facebook, Instagram, or TikTok."
            : "The daily watch gathers at 5:30 AM WAT. The live mark appears during the morning window."}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="#join"
            className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
          >
            Join the daily prayer
            <ArrowDownRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          </Link>
          <CalendarButton />
        </div>
      </div>

      <div className="md:col-span-5">
        <DayDial day={day} className="md:ml-auto" />
      </div>

      <p className="sr-only">
        Today is day {day} of 50, {today.longLabel}. The daily watch is at 5:30 AM
        West Africa Time.{live ? " The live window is open now." : ""}
      </p>
    </div>
  );
}

function AfterWatch({ now }: { now: Date }): React.ReactElement | null {
  const phase = wapPhase(now);
  if (phase !== "after") return null;

  return (
    <div className="grid gap-8 pt-6 md:grid-cols-12 md:items-center md:gap-6">
      <div className="md:col-span-7">
        <p className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
          The fifty days are complete
        </p>

        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-serif text-[clamp(5.2rem,22vw,13rem)] font-medium leading-[0.78] tracking-[-0.06em] text-white tabular-nums">
            50
          </span>
          <span className="max-w-[4ch] font-mono text-[10px] uppercase leading-[1.5] tracking-[0.2em] text-white/45">
            Days prayed
          </span>
        </p>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
          11 November — 30 December 2026
        </p>

        <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.6] text-white/60">
          The daily watch has closed, but the replays remain open. Return to the
          archive for the sessions, scriptures, testimonies, and declarations from
          the fifty days.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="#recordings"
            className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
          >
            Open the replays
            <ArrowDownRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="md:col-span-5">
        <DayDial day={50} className="md:ml-auto" />
      </div>

      <p className="sr-only">
        The Watch and Pray programme ran from 11 November to 30 December 2026.
        Replays are available in the recordings archive.
      </p>
    </div>
  );
}

function Shell(): React.ReactElement {
  return (
    <div className="border border-white/12 bg-white/[0.025] p-5 md:p-7 lg:p-8">
      <PanelHeader now={null} phaseLabel="Reading the hour" />
      <div className="min-h-[290px] pt-6 md:min-h-[260px]">
        <div className="h-2 w-32 animate-pulse bg-white/10" aria-hidden="true" />
        <div className="mt-5 h-16 w-2/3 animate-pulse bg-white/[0.06]" aria-hidden="true" />
      </div>
    </div>
  );
}

export function WatchState(): React.ReactElement {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) return <Shell />;

  const phase = wapPhase(now);

  return (
    <div
      data-watch-state
      className="relative overflow-hidden border border-white/12 bg-white/[0.025] p-5 backdrop-blur-[2px] md:p-7 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,83,0.16) 0%, rgba(0,200,83,0) 70%)",
        }}
      />
      <PanelHeader
        now={now}
        phaseLabel={
          phase === "before" ? "Countdown" : phase === "during" ? "In session" : "Replays"
        }
      />
      {phase === "before" ? <BeforeWatch now={now} /> : null}
      {phase === "during" ? <DuringWatch now={now} /> : null}
      {phase === "after" ? <AfterWatch now={now} /> : null}
    </div>
  );
}
