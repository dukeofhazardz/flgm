import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { NEW_MEMBERS } from "@/data/forms";

/**
 * NewMembersJourney — the six-station follow-up route.
 * A single rail with numbered stops, deliberately not a grid of cards: the
 * sequence matters more than the individual boxes.
 */

export function NewMembersJourney(): React.ReactElement {
  return (
    <section
      id="follow-up"
      data-section="new-members-journey"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 03 — Visitor follow-up journey"
          note="Register · contact · fellowship · ministry"
          folio="No. 03 / 04"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="max-w-[11ch] font-serif text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[0.92] tracking-[-0.045em]">
                The visitor{" "}
                <span className="italic">journey.</span>
              </h2>
              <p className="mt-5 max-w-[34ch] font-sans text-[15px] leading-[1.62] text-deep-green md:text-[16px]">
                Register online or in person when you visit. From that first
                registration, the church follows a clear path with you.
              </p>

              <div className="mt-7 border-t border-ink/15 pt-5">
                <p className="max-w-[34ch] font-serif text-[clamp(1.15rem,2vw,1.45rem)] font-medium italic leading-[1.3] tracking-[-0.02em] text-deep-green">
                  Follow-up progress is documented and reported to the
                  appropriate leadership.
                </p>
              </div>

              <Link
                href="/contact#visit"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 border-b border-ink/30 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
              >
                Plan your first visit
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <ol className="relative col-span-12 lg:col-span-7 lg:col-start-6">
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-ink/10 via-forest/35 to-brand-green md:left-[19px]"
            />
            {NEW_MEMBERS.journey.map((step, index) => (
              <li
                key={step.title}
                className="group relative grid grid-cols-[32px_1fr] gap-4 border-b border-ink/12 py-6 first:pt-0 last:border-b-0 md:grid-cols-[40px_1fr] md:gap-6 md:py-7"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-mist font-mono text-[9px] tabular-nums tracking-[0.06em] text-ink/55 transition-colors duration-300 group-hover:border-ink group-hover:bg-night group-hover:text-white md:h-10 md:w-10 md:text-[10px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <div>
                    <h3 className="max-w-[24ch] font-serif text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[48ch] font-sans text-[14px] leading-[1.6] text-deep-green md:text-[15px]">
                      {step.note}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30 md:text-right">
                    Station {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/15 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35 md:mt-16">
          <p>Six stations · one church family</p>
          <p>Registration is not membership · follow-up comes first</p>
        </div>
      </div>
    </section>
  );
}
