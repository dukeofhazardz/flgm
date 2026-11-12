"use client";

import * as React from "react";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import {
  EVENT_CATEGORIES,
  EVENTS,
  type ChurchEvent,
} from "@/data/events";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Flip);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parts(iso: string): { month: string; day: string; year: string } {
  const [year, month, day] = iso.split("-");
  return {
    month: MONTHS[Number(month) - 1] ?? "",
    day: String(Number(day)).padStart(2, "0"),
    year,
  };
}

function longDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function weekday(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function dateLine(event: ChurchEvent): string {
  if (event.endDate) {
    return `${longDate(event.date)} – ${longDate(event.endDate)}`;
  }
  return `${weekday(event.date)} · ${longDate(event.date)}`;
}

function watToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function EventTicket({
  event,
  index,
  past,
}: {
  event: ChurchEvent;
  index: number;
  past: boolean;
}): React.ReactElement {
  const date = parts(event.date);
  const time = event.timeConfirmed ? `${event.time} WAT` : "Time to be confirmed";

  return (
    <article
      data-event-row
      data-flip-id={event.id}
      aria-labelledby={`event-title-${event.id}`}
      className={cn(
        "group relative border-b border-ink/20 bg-white transition-opacity duration-500",
        past && "opacity-40 saturate-50"
      )}
    >
      <div className="grid grid-cols-12">
        {/* Date stub */}
        <div className="relative col-span-12 border-b border-dashed border-ink/20 px-4 pb-5 pt-5 md:col-span-3 md:border-b-0 md:border-r md:px-6 md:py-7">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/35">
              No. {String(index + 1).padStart(2, "0")}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-ink/15 px-2 py-1 font-mono text-[7.5px] uppercase leading-none tracking-[0.1em] text-ink/55">
              {!past ? (
                <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              ) : null}
              {event.category}
            </span>
          </div>

          <div className="mt-5 md:mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45">
              {date.month}
            </p>
            <p className="mt-2 font-serif text-[clamp(4.6rem,9vw,8rem)] font-medium leading-[0.72] tracking-[-0.075em] tabular-nums text-ink transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1">
              {date.day}
            </p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
              {date.year}
            </p>
          </div>

          {past ? (
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-crimson-text">
              Past gathering
            </p>
          ) : null}

          <span
            aria-hidden="true"
            className="absolute -right-2 bottom-[-8px] hidden h-4 w-4 rounded-full bg-white md:block"
          />
        </div>

        {/* Title and description */}
        <div className="col-span-12 px-4 py-5 md:col-span-6 md:px-6 md:py-7">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-crimson-text/80">
            {dateLine(event)}
          </p>

          <h3
            id={`event-title-${event.id}`}
            className="mt-3 max-w-[26ch] font-serif text-[clamp(1.55rem,3.1vw,2.65rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink"
          >
            {event.title}
          </h3>

          <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.62] text-deep-green md:text-[16px]">
            {event.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/40">
              Resurrection Ground · Gwarinpa
            </span>
            <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" />
            <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/40 sm:inline">
              Abuja, Nigeria
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="col-span-12 flex flex-col border-t border-dashed border-ink/20 px-4 py-5 md:col-span-3 md:border-l md:border-t-0 md:px-6 md:py-7">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/35">
              Time
            </p>
            <p
              className={cn(
                "mt-1 max-w-[16ch] font-serif text-[clamp(1.2rem,2vw,1.55rem)] font-medium leading-[1.1] tracking-[-0.02em]",
                event.timeConfirmed ? "text-ink" : "text-crimson-text"
              )}
            >
              {time}
            </p>
            {!event.timeConfirmed ? (
              <p className="mt-1 font-mono text-[7.5px] uppercase leading-[1.6] tracking-[0.12em] text-ink/35">
                {event.id === "first-fruit-worship"
                  ? "Daily schedule to follow"
                  : "The church will confirm"}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-2 md:mt-auto md:pt-6">
            <Link
              href={event.ctaHref}
              className="group/cta inline-flex min-h-11 items-center justify-between gap-3 border border-brand-green bg-brand-green px-3.5 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.13em] text-ink transition-colors duration-200 hover:bg-dawn-mint"
            >
              <span>{event.cta}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>

            <Link
              href={`/events/${event.id}/calendar`}
              className="inline-flex min-h-11 items-center gap-2 border border-ink/18 px-3.5 py-2 font-mono text-[8.5px] uppercase tracking-[0.13em] text-ink/65 transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              <CalendarPlus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Add to calendar
              <span className="sr-only">(download an .ics file)</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * EventsCalendar — five tickets, live category filters, and the Flip re-flow.
 *
 * The past state is resolved in Abuja time after hydration so a prerendered
 * date can never mark an event wrongly. Filter changes capture the current
 * positions, then let GSAP Flip move the surviving rows into their new places.
 */
export function EventsCalendar(): React.ReactElement {
  const hydrated = useHydrated();
  const today = hydrated ? watToday() : null;
  const [active, setActive] = useState<(typeof EVENT_CATEGORIES)[number] | "All">("All");
  const listRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = useMemo(
    () =>
      active === "All"
        ? EVENTS
        : EVENTS.filter((event) => event.category === active),
    [active]
  );

  useLayoutEffect(() => {
    const state = flipState.current;
    flipState.current = null;
    if (!state) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const tween = Flip.from(state, {
      duration: 0.55,
      ease: "power3.out",
      stagger: 0.045,
      absolute: true,
      prune: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        ),
    });

    return () => {
      tween.kill();
    };
  }, [active]);

  const choose = (next: (typeof EVENT_CATEGORIES)[number] | "All") => {
    if (next === active) return;
    const node = listRef.current;
    if (node) {
      flipState.current = Flip.getState(
        node.querySelectorAll<HTMLElement>("[data-event-row]")
      );
    }
    setActive(next);
  };

  return (
    <section
      id="calendar"
      data-section="events-calendar"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 02 — The calendar</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            All times Abuja local · WAT
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 02 / 03
          </Folio>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-14">
          <div>
            <h2 className="max-w-[12ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Five <span className="italic">gatherings.</span>
            </h2>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.62] text-deep-green md:text-[17px]">
              Discover upcoming worship services, conferences, special
              celebrations, and ministry activities at Forever Life and Grace
              Mission.
            </p>
          </div>

          <div className="flex flex-col items-start gap-1 md:items-end">
            <p
              aria-live="polite"
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40"
            >
              {visible.length === 1 ? "One event shown" : `${String(visible.length).padStart(2, "0")} events shown`}
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/25">
              2026 — 2027
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2 border-y border-ink/12 py-4 md:mt-10">
          {(["All", ...EVENT_CATEGORIES] as const).map((filter) => {
            const selected = active === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(filter)}
                data-filter-chip
                className={cn(
                  "min-h-11 border px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]",
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-ink/18 bg-transparent text-ink/60 hover:border-ink/50 hover:text-ink"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div ref={listRef} className="mt-8 border-t border-ink/20 md:mt-10">
          {visible.map((event) => {
            const past = Boolean(
              today &&
                (event.endDate ?? event.date) < today
            );
            const index = EVENTS.findIndex((item) => item.id === event.id);
            return (
              <EventTicket
                key={event.id}
                event={event}
                index={index}
                past={past}
              />
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/35">
          <p>Times WAT · UTC+1</p>
          <p>Past events remain on the calendar, faded</p>
        </div>
      </div>
    </section>
  );
}
