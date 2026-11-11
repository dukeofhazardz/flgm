import * as React from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import {
  ABOUT_HISTORY,
  HISTORY_TIMELINE,
  HISTORY_TIMELINE_CONFIRMED,
  type HistoryMilestone,
} from "@/data/about";

/**
 * HistoryTimeline — a designed milestone rail that stays out of the public
 * page until the church confirms the record. It renders nothing while the
 * gate is closed, so no founding year or milestone can leak by accident.
 */
export function HistoryTimeline({
  milestones,
  confirmed,
}: {
  milestones: HistoryMilestone[];
  confirmed: boolean;
}): React.ReactElement | null {
  if (!confirmed || milestones.length === 0) return null;

  return (
    <ol className="relative mt-12 border-l border-ink/20 pl-6 md:mt-16 md:pl-10">
      {milestones.map((milestone) => (
        <li key={milestone.id} className="relative pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-brand-green ring-4 ring-white md:-left-[45px]"
          />
          <div className="grid gap-3 md:grid-cols-12 md:items-baseline">
            <p className="font-serif text-[clamp(2.4rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] text-ink md:col-span-3">
              {milestone.year}
            </p>
            <div className="md:col-span-9">
              <h3 className="font-serif text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-tight tracking-[-0.02em]">
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.62] text-deep-green">
                {milestone.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * AboutHistory — the supplied paragraphs, set as a numbered editorial column.
 * A designed timeline sits behind an explicit confirmation gate.
 */
export function AboutHistory(): React.ReactElement {
  return (
    <section
      id="history"
      data-section="about-history"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 02 — Our history</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            A ministry of grace and eternal life
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 02 / 06
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-8 md:mt-14 md:gap-x-6">
          <div className="col-span-12 md:col-span-4 md:flex md:flex-col">
            <h2 className="max-w-[8ch] font-serif text-[clamp(2.8rem,7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Our <span className="italic">history.</span>
            </h2>
            <p className="mt-5 max-w-[26ch] font-mono text-[9px] uppercase leading-[1.9] tracking-[0.18em] text-ink/40">
              A record of grace,
              <br />
              still being written.
            </p>

            <figure className="mt-14 hidden md:mt-auto md:block md:pt-20" aria-hidden="true">
              <svg
                viewBox="0 0 220 320"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-auto w-full max-w-[250px] text-ink/20"
              >
                <path d="M18 318V142a92 92 0 0 1 184 0v176" opacity="0.85" />
                <path d="M34 318V144a76 76 0 0 1 152 0v174" opacity="0.45" />
                <path d="M46 318V148a64 64 0 0 1 128 0v170" opacity="0.7" />
                <path d="M46 318h24v-24h24v-24h24v-24h24v-24h24v-24h8" opacity="0.55" />
                <circle cx="110" cy="118" r="9" opacity="0.5" />
                <path d="M110 96v-14M88 108l-10-10M132 108l10-10" opacity="0.35" />
                <path d="M6 318h208" opacity="0.3" strokeDasharray="2 6" />
              </svg>
              <figcaption className="mt-3 font-mono text-[7.5px] uppercase tracking-[0.18em] text-ink/30">
                Fig. 02 — The ascent
              </figcaption>
            </figure>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="max-w-[30ch] font-serif text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.22] tracking-[-0.02em] text-deep-green">
              {ABOUT_HISTORY.paragraphs[0]}
            </p>

            <div className="mt-8 border-t border-ink/15">
              {ABOUT_HISTORY.paragraphs.slice(1).map((paragraph, index) => (
                <div
                  key={paragraph}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-b border-ink/12 py-5 md:grid-cols-12 md:gap-x-6"
                >
                  <span className="col-span-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/30 md:col-span-1">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <p className="col-span-1 max-w-[54ch] text-[16px] leading-[1.66] text-deep-green md:col-span-11 md:text-[17px]">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            <HistoryTimeline
              milestones={HISTORY_TIMELINE}
              confirmed={HISTORY_TIMELINE_CONFIRMED}
            />

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/40">
                The journey continues
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/30">
                Resurrection Ground · Gwarinpa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
