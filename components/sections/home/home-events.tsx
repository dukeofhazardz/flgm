import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { EVENTS } from "@/data/events";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/**
 * TornEdge — a quiet paper tear across the top or bottom of a ticket.
 * Filled with the section colour so the card reads as torn from a sheet.
 */
function TornEdge({
  position,
  className,
}: {
  position: "top" | "bottom";
  className?: string;
}): React.ReactElement {
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 h-3 w-full ${
        position === "top" ? "-top-px" : "-bottom-px rotate-180"
      } ${className ?? ""}`}
    >
      <path
        d="M0 12 L0 9 L14 4 L26 8 L39 2 L52 7 L66 3 L80 9 L95 5 L110 8 L124 2 L138 6 L152 9 L166 4 L180 7 L194 2 L208 8 L222 5 L236 9 L250 3 L264 6 L278 9 L292 4 L306 8 L320 2 L334 7 L348 5 L362 9 L376 3 L390 7 L400 4 L400 12 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function dateParts(iso: string): { month: string; day: string } {
  const [, month, day] = iso.split("-");
  return {
    month: MONTHS[Number(month) - 1] ?? "",
    day: String(Number(day)).padStart(2, "0"),
  };
}

/**
 * HomeEvents — the next three gatherings as torn tickets.
 * Giant date numerals, category tags, and one green scan line on hover.
 */
export function HomeEvents(): React.ReactElement {
  const next = EVENTS.slice(0, 3);

  return (
    <section
      id="events"
      data-section="events"
      data-header-theme="light"
      className="relative overflow-hidden bg-mist text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-green/25"
      />

      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 10 - Events</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block md:text-left">
            The next three gatherings
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 09 / 10
          </Folio>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-12">
          <h2 className="max-w-[16ch] font-serif text-[clamp(2.4rem,6vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            What&apos;s <span className="italic">coming.</span>
          </h2>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
          >
            Full calendar
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-7 md:mt-14 md:grid-cols-3 md:gap-5 lg:gap-7">
          {next.map((event, index) => {
            const { month, day } = dateParts(event.date);
            const isNext = index === 0;

            return (
              <Link
                key={event.id}
                href="/events"
                className="group relative block focus-visible:outline-none"
              >
                <article
                  className="ticket-card relative flex h-full flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: "translateY(0)" }}
                >
                  <TornEdge position="top" className="text-mist" />

                  {/* Date stub */}
                  <div className="relative flex items-start justify-between gap-4 border-b border-dashed border-ink/20 px-5 pb-5 pt-8 md:px-6 md:pt-9">
                    <div className="ticket-date transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45">
                        {month}
                      </p>
                      <p className="mt-1 font-serif text-[clamp(4.4rem,8.4vw,7rem)] font-medium leading-[0.72] tracking-[-0.07em] text-ink">
                        {day}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1.5 border border-ink/15 px-2 py-1 font-mono text-[8px] uppercase leading-none tracking-[0.12em] text-ink/55">
                        {isNext ? (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-signal-red"
                            aria-hidden="true"
                          />
                        ) : null}
                        {event.category}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">
                        {isNext ? "Next" : `0${index + 1}`}
                      </span>
                    </div>

                    {/* notch on the perforation */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 bottom-[-8px] h-4 w-4 rounded-full bg-mist"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 bottom-[-8px] h-4 w-4 rounded-full bg-mist"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-crimson-text/80">
                      {event.time === "Details coming soon"
                        ? "Time coming soon"
                        : `${event.time} WAT`}
                    </p>

                    <h3 className="mt-2 max-w-[22ch] font-serif text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
                      {event.title}
                    </h3>

                    <p className="mt-3 max-w-[40ch] font-sans text-[14px] leading-[1.58] text-deep-green">
                      {event.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/40">
                        Resurrection Ground
                      </span>
                      <span
                        aria-hidden="true"
                        className="ticket-arrow flex h-9 w-9 items-center justify-center border border-ink/15 text-ink/60 transition-[transform,background-color,color,border-color] duration-300"
                      >
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                      </span>
                    </div>
                  </div>

                  <TornEdge position="bottom" className="text-mist" />

                  {/* Hover scan line */}
                  <span
                    aria-hidden="true"
                    className="ticket-scan absolute inset-x-0 bottom-0 z-20 h-[2px] origin-left bg-brand-green"
                  />
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
            Event details are published as the church confirms them
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
            Times WAT · UTC+1
          </p>
        </div>
      </div>
    </section>
  );
}
