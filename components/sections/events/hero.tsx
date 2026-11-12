import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { EVENTS } from "@/data/events";

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

function dateParts(iso: string): { month: string; day: string } {
  const [, month, day] = iso.split("-");
  return {
    month: MONTHS[Number(month) - 1] ?? "",
    day: String(Number(day)).padStart(2, "0"),
  };
}

/**
 * EventsHero — the calendar as a masthead.
 *
 * Five dates run across the foot of the night field like a stamped ticket
 * rail. The full ticket rows live below; this is the issue cover.
 */
export function EventsHero(): React.ReactElement {
  return (
    <section
      id="events-top"
      data-section="events-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 01 — Events & programmes</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-4 md:block">
            The calendar, kept in West Africa Time
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-2">
            No. 01 / 03
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-8 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 md:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Upcoming events at FLGM
            </p>
            <h1 className="mt-4 max-w-[9ch] font-serif text-[clamp(3.6rem,12vw,11rem)] font-medium leading-[0.82] tracking-[-0.055em] text-ink">
              The year <span className="block italic text-deep-green">ahead.</span>
            </h1>
          </div>

          <div className="col-span-12 md:col-span-4 md:pb-1">
            <span aria-hidden="true" className="block h-px w-12 bg-brand-green md:w-16" />
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.62] text-ink/75 md:text-[16px]">
              Discover upcoming worship services, conferences, special
              celebrations, and ministry activities at Forever Life and Grace
              Mission.
            </p>
            <Link
              href="#calendar"
              className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-brand-green hover:text-ink"
            >
              See the calendar
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Date rail */}
        <div className="mt-10 grid grid-cols-5 border-t border-ink/15 md:mt-14">
          {EVENTS.map((event, index) => {
            const { month, day } = dateParts(event.date);
            return (
              <Link
                key={event.id}
                href="#calendar"
                aria-label={`${event.title}, ${month} ${day}`}
                className="group relative border-b border-ink/12 px-2 py-4 transition-colors duration-300 hover:bg-mist md:border-r md:px-4 md:py-5 md:last:border-r-0"
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-ink/50 md:text-[8.5px]">
                    {month}
                  </span>
                  <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-ink/35 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 font-serif text-[clamp(1.8rem,4.2vw,4rem)] font-medium leading-[0.78] tracking-[-0.07em] tabular-nums text-ink transition-colors duration-300 group-hover:text-deep-green md:mt-4">
                  {day}
                </p>
                <p className="mt-2 hidden max-w-[15ch] font-mono text-[7.5px] uppercase leading-[1.6] tracking-[0.12em] text-ink/50 md:block">
                  {event.category}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45 md:text-[8.5px]">
          <p>Resurrection Ground · Gwarinpa, Abuja</p>
          <p>
            2026 — 2027
            <span className="mx-2 text-ink/20" aria-hidden="true">
              /
            </span>
            WAT · UTC+1
            <ArrowUpRight className="ml-2 inline h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
