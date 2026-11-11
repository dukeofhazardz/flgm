import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { VOLUNTEER } from "@/data/forms";

/**
 * VolunteerAreas — the five open doors.
 * One full-width roster, not a card grid. Each area gets a number, a title, a
 * plain description, and a rule that inverts on hover.
 */

export function VolunteerAreas(): React.ReactElement {
  return (
    <section
      id="opportunities"
      data-section="volunteer-areas"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 02 — Volunteer opportunities"
          note="Five service areas · one mission"
          folio="No. 02 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[11ch] font-serif text-[clamp(2.7rem,7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            Five ways to{" "}
            <span className="italic">serve.</span>
          </h2>
          <p className="col-span-12 max-w-[40ch] font-sans text-[15px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[16px]">
            {VOLUNTEER.hero.invite}
          </p>
        </div>

        <ol className="mt-9 border-t border-ink/20 md:mt-14">
          {VOLUNTEER.areas.map((area, index) => (
            <li key={area.id}>
              <article className="group grid grid-cols-12 items-start gap-x-3 gap-y-3 border-b border-ink/15 py-6 transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-night hover:text-white md:gap-x-6 md:py-8">
                <div className="col-span-2 flex items-baseline justify-between md:col-span-1">
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(2.4rem,4.6vw,3.8rem)] font-medium leading-[0.8] tracking-[-0.06em] text-ink/25 transition-colors duration-300 group-hover:text-dawn-mint/88"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="col-span-10 max-w-[18ch] font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[0.98] tracking-[-0.035em] md:col-span-4">
                  {area.title}
                </h3>

                <p className="col-span-10 col-start-3 max-w-[48ch] font-sans text-[14px] leading-[1.6] text-deep-green transition-colors duration-300 group-hover:text-white/86 md:col-span-6 md:col-start-6 md:text-[15px]">
                  {area.note}
                </p>

                <div className="col-span-12 flex items-center justify-between border-t border-ink/10 pt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white/66 md:col-span-1 md:border-t-0 md:pt-0">
                  <span className="md:hidden">Area {String(index + 1).padStart(2, "0")} / 05</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-ink/30 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-dawn-mint"
                    strokeWidth={1.4}
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
          <p className="max-w-[58ch] font-serif text-[clamp(1.1rem,2vw,1.5rem)] font-medium italic leading-[1.3] tracking-[-0.02em] text-deep-green">
            Every volunteer is encouraged to serve according to their gifts,
            availability, and level of preparation.
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
            Five areas · one church
          </p>
        </div>
      </div>
    </section>
  );
}
