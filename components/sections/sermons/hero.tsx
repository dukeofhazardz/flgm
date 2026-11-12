import * as React from "react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { SERMON_CATEGORIES, SERMONS } from "@/data/sermons";

/**
 * SermonsHero — the library cover.
 *
 * The two-line title is the masthead. The book study sits in the arch, lit from
 * below, and the foot rail states the honest count: eight categories, no
 * published messages yet.
 */
export function SermonsHero(): React.ReactElement {
  return (
    <section
      id="sermons-top"
      data-section="sermons-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="relative mx-auto max-w-[1680px] px-5 pb-12 pt-[116px] md:px-8 md:pb-16 md:pt-[132px] lg:px-10 lg:pb-20 lg:pt-[148px]">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 01 — Sermons & messages</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-4 md:block">
            The teaching library of the house
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-2">
            No. 01 / 03
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 md:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Sermons and messages
            </p>

            <h1 className="mt-4 max-w-[11ch] font-serif text-[clamp(3.2rem,10.2vw,9.6rem)] font-medium leading-[0.84] tracking-[-0.05em] text-ink">
              The Word <span className="block italic text-deep-green">of Grace.</span>
              <span className="mt-2 block">The Life</span>
              <span className="block italic text-deep-green">of God.</span>
            </h1>

            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.62] text-ink/70 md:text-[16px]">
              Explore teachings, sermons, worship sessions, testimonies, and
              messages designed to establish believers in the knowledge of God’s
              grace, eternal life, sonship, and Kingdom influence.
            </p>
          </div>

          <figure className="col-span-12 mx-auto w-full max-w-[310px] md:col-span-4 md:mx-0 md:max-w-none lg:ml-auto lg:max-w-[340px]">
            <div
              className="relative aspect-[4/5] overflow-hidden border border-ink/12 bg-tint-white"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #F4F9EC 0%, #F8FCEF 46%, #EAF1DE 82%, #DDEBC4 100%)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(66% 48% at 50% 92%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 76%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <ArtSlot
                  name="book"
                  size={260}
                  color="ink"
                  className="translate-y-3 opacity-80"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute left-2 top-10 select-none font-serif text-[7.5rem] font-medium leading-none text-ink/12"
              >
                00
              </span>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/12"
                style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
                <span>Fig. 01 — The Word</span>
                <span>Library</span>
              </div>
            </div>
          </figure>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-4 border-t border-ink/12 pt-4 md:mt-14 md:gap-x-6">
          <p className="col-span-6 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/50 md:col-span-3">
            {String(SERMON_CATEGORIES.length).padStart(2, "0")} categories
          </p>
          <p className="col-span-6 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/50 md:col-span-3">
            {String(SERMONS.length).padStart(2, "0")} published messages
          </p>
          <p className="col-span-12 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/45 md:col-span-4 md:col-start-9 md:text-right">
            Audio · video · transcripts · Scripture
          </p>
        </div>
      </div>
    </section>
  );
}
