import * as React from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { ANNUAL_PROGRAMME } from "@/data/events";
import { cn } from "@/lib/utils";

const DAYS = [
  { short: "Sun", long: "Sunday", mark: "S" },
  { short: "Mon", long: "Monday", mark: "M" },
  { short: "Tue", long: "Tuesday", mark: "T" },
  { short: "Wed", long: "Wednesday", mark: "W" },
  { short: "Thu", long: "Thursday", mark: "T" },
  { short: "Fri", long: "Friday", mark: "F" },
  { short: "Sat", long: "Saturday", mark: "S" },
];

/**
 * AnnualWeek — the year in rhythm.
 *
 * A seven-day strip carries the recurring life of the house; the annual list
 * below carries the wider programme. Confirmed times stay as published;
 * unconfirmed times read "Time to be confirmed" rather than guessing.
 */
export function AnnualWeek(): React.ReactElement {
  return (
    <section
      id="annual-programme"
      data-section="events-annual"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 03 — Annual programme</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            The recurring life of the house
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 03 / 03
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[12ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            The week, in <span className="italic">rhythm.</span>
          </h2>
          <p className="col-span-12 max-w-[38ch] text-[15px] leading-[1.62] text-forest/72 md:col-span-4 md:col-start-9 md:text-[16px]">
            Sunday gathers the family. Thursday turns the week toward prayer.
            Around them, fellowship, evangelism, and building work continue
            through the year.
          </p>
        </div>

        {/* Week strip */}
        <div className="mt-8 grid grid-cols-1 border-l border-t border-ink/15 bg-white md:mt-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {DAYS.map((day, dayIndex) => {
            const items = ANNUAL_PROGRAMME.filter(
              (item) => item.weekday === dayIndex
            );
            const active = items.length > 0;

            return (
              <div
                key={day.long}
                className={cn(
                  "relative flex flex-col border-b border-r border-ink/15 p-4 md:min-h-[210px] lg:min-h-[300px]",
                  active ? "bg-white" : "bg-mist/65"
                )}
              >
                <div className="flex items-start justify-between gap-2 border-b border-ink/10 pb-2">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">
                      {day.short}
                    </p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-ink/35">
                      {String(dayIndex + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "select-none font-serif text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-none tracking-[-0.06em]",
                      active ? "text-brand-green" : "text-ink/15"
                    )}
                  >
                    {day.mark}
                  </span>
                </div>

                {active ? (
                  <div className="mt-3 flex flex-1 flex-col gap-2.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "border-l-2 pl-2.5",
                          item.confirmed ? "border-brand-green" : "border-signal-red"
                        )}
                      >
                        <p className="text-[12px] font-medium leading-[1.35] text-ink/80">
                          {item.label}
                        </p>
                        <p
                          className={cn(
                            "mt-1 font-mono text-[7px] uppercase leading-[1.5] tracking-[0.12em]",
                            item.confirmed ? "text-ink/40" : "text-crimson-text/85"
                          )}
                        >
                          {item.time}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 hidden flex-1 flex-col justify-between md:flex">
                    <div className="flex flex-col gap-2" aria-hidden="true">
                      <span className="block h-px w-8 bg-ink/10" />
                      <span className="block h-px w-12 bg-ink/10" />
                      <span className="block h-px w-6 bg-ink/10" />
                    </div>
                    <p className="font-mono text-[7px] uppercase leading-[1.5] tracking-[0.12em] text-ink/40">
                      Through the year
                    </p>
                  </div>
                )}

                <p className="mt-3 border-t border-ink/10 pt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-ink/40">
                  {active ? `${String(items.length).padStart(2, "0")} listed` : "Open"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Annual list */}
        <div className="mt-12 border-t border-ink/20 md:mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/15 py-4">
            <h3 className="font-serif text-[clamp(1.7rem,3.6vw,2.8rem)] font-medium leading-none tracking-[-0.03em]">
              The annual <span className="italic">programme.</span>
            </h3>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
              Eight movements · one house
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2">
            {ANNUAL_PROGRAMME.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "group border-b border-ink/12 py-5 md:py-6",
                  index % 2 === 0 ? "md:pr-8" : "md:border-l md:border-ink/12 md:pl-8"
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p
                    className={cn(
                      "font-mono text-[8px] uppercase tracking-[0.16em]",
                      item.confirmed ? "text-ink/40" : "text-crimson-text/80"
                    )}
                  >
                    {item.rhythm}
                  </p>
                </div>
                <h4 className="mt-2 max-w-[30ch] font-serif text-[clamp(1.25rem,2.4vw,1.8rem)] font-medium leading-[1.06] tracking-[-0.02em]">
                  {item.label}
                </h4>
                <p className="mt-2 max-w-[48ch] text-[14px] leading-[1.58] text-forest/68">
                  {item.description}
                </p>
                <p
                  className={cn(
                    "mt-3 font-mono text-[8px] uppercase tracking-[0.16em]",
                    item.confirmed ? "text-ink/35" : "text-crimson-text/80"
                  )}
                >
                  {item.time}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 max-w-[60ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/30">
          Programme times are published as confirmed by the church. Unconfirmed
          times remain marked until the church publishes them.
        </p>
      </div>
    </section>
  );
}
