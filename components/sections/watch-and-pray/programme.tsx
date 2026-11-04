import * as React from "react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

/**
 * Programme — about the outreach and the six objectives.
 * Objectives are bold numbered statements on hairlines, not cards.
 */

export function WatchProgramme(): React.ReactElement {
  return (
    <section
      id="about"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 01 — The Programme</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Fifty mornings of prayer and outreach
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 04 / 10
          </Folio>
        </header>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <h2 className="max-w-[13ch] font-serif text-[clamp(2.6rem,6.4vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              About the <span className="italic">Programme</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-2">
            <span aria-hidden="true" className="block h-px w-12 bg-brand-green" />
            <p className="mt-4 max-w-[28ch] font-serif text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium italic leading-[1.28] tracking-[-0.015em] text-forest">
              {WATCH_AND_PRAY.theme}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          {/* Arch study — designed composition, never an empty slot. */}
          <div className="md:col-span-4">
            <figure className="md:sticky md:top-28">
              <div
                className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden bg-mist"
                style={{
                  borderTopLeftRadius: 999,
                  borderTopRightRadius: 999,
                  clipPath: "inset(0 0 0 0)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,24,15,0.96) 0%, rgba(11,59,36,0.9) 36%, rgba(0,200,83,0.78) 74%, rgba(201,245,218,0.85) 100%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[6%] bottom-0 top-[28%] opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 78%, rgba(201,245,218,0.5) 0%, rgba(201,245,218,0) 62%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArtSlot
                    name="rays"
                    size={168}
                    color="white"
                    className="opacity-90 mix-blend-screen"
                  />
                </div>
                <div className="grain absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-x-5 top-[26%] flex items-start justify-between font-mono text-[7.5px] uppercase tracking-[0.18em] text-white/60">
                  <span>Fig. 04</span>
                  <span>Fifty mornings</span>
                </div>
                <div className="absolute inset-x-3 bottom-4 flex items-end justify-between font-mono text-[7.5px] uppercase tracking-[0.18em] text-white/65">
                  <span>Generative study</span>
                  <span>05:30 WAT</span>
                </div>
              </div>
              <figcaption className="mt-3 max-w-[360px] font-mono text-[8.5px] uppercase leading-[1.7] tracking-[0.16em] text-ink/40">
                The watch begins before the city wakes.
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.62] text-forest/85 md:text-[18px]">
              {WATCH_AND_PRAY.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-5 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/40">
                  Period
                </dt>
                <dd className="mt-1.5 font-serif text-[1.2rem] font-medium leading-tight tracking-[-0.01em]">
                  11 Nov — 30 Dec
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/40">
                  Daily
                </dt>
                <dd className="mt-1.5 font-serif text-[1.2rem] font-medium leading-tight tracking-[-0.01em]">
                  5:30 AM WAT
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/40">
                  Where
                </dt>
                <dd className="mt-1.5 font-serif text-[1.2rem] font-medium leading-tight tracking-[-0.01em]">
                  Online, daily
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ── Objectives ── */}
        <div id="objectives" className="mt-20 md:mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <h3 className="font-serif text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-none tracking-[-0.03em]">
              Programme <span className="italic">Objectives</span>
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
              Six commitments
              <span className="mx-2 text-ink/20" aria-hidden="true">
                /
              </span>
              01 — 06
            </p>
          </div>

          <ol>
            {WATCH_AND_PRAY.objectives.map((objective) => (
              <li key={objective.n} className="border-b border-ink/12">
                <div className="group grid grid-cols-12 items-baseline gap-x-3 gap-y-2 py-7 md:gap-x-6 md:py-9">
                  <span
                    aria-hidden="true"
                    className="col-span-2 font-serif text-[clamp(1.7rem,4vw,3.3rem)] font-medium leading-none tracking-[-0.04em] md:col-span-1"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(7,19,13,0.32)",
                    }}
                  >
                    {objective.n}
                  </span>
                  <p className="col-span-10 max-w-[34ch] font-serif text-[clamp(1.3rem,2.6vw,2.15rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:col-span-10 md:col-start-2">
                    {objective.statement}
                  </p>
                  <span
                    aria-hidden="true"
                    className="col-span-12 hidden justify-self-end font-mono text-[8.5px] uppercase tracking-[0.18em] text-brand-green md:col-span-1 md:block"
                  >
                    ↗
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
