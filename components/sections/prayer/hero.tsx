import * as React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PRAYER } from "@/data/forms";

/**
 * PrayerHero — a night cover for the prayer and counselling issue.
 * The right-hand arch is a light study, not a photograph: concentric rings of
 * dawn light gathered under the signature arch.
 */

export function PrayerHero(): React.ReactElement {
  return (
    <section
      id="prayer-top"
      data-section="prayer-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <span
        aria-hidden="true"
        className="type-outline-ink pointer-events-none absolute -right-8 top-24 hidden select-none font-serif text-[16rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.07] lg:block xl:text-[21rem]"
      >
        Pray
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <SectionHeader
          tag="§ 01 — Prayer & counselling"
          note="Confidential · handled by the pastoral team"
          folio="No. 01 / 03"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-12 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Prayer · guidance · pastoral support
            </p>

            <h1 className="mt-5 font-serif text-[clamp(3.3rem,10vw,9.4rem)] font-medium leading-[0.83] tracking-[-0.055em] text-ink">
              <span className="block">{PRAYER.hero.lines[0]}</span>
              <span className="block italic text-deep-green">{PRAYER.hero.lines[1]}</span>
              <span className="mt-1 block">{PRAYER.hero.lines[2]}</span>
            </h1>

            <p className="mt-7 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-ink/75 md:text-[17px]">
              {PRAYER.hero.lead}
            </p>
            <p className="mt-4 max-w-[46ch] font-sans text-[14.5px] leading-[1.65] text-ink/60">
              {PRAYER.hero.body}
            </p>

            <Link
              href="#prayer-request"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-brand-green hover:text-ink"
            >
              Submit a prayer request
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>

          {/* Arch light study */}
          <figure className="col-span-12 mx-auto w-full max-w-[360px] lg:col-span-4 lg:col-start-9 lg:mx-0 lg:ml-auto lg:max-w-[400px]">
            <div
              className="relative aspect-[4/5] overflow-hidden border border-ink/12 bg-tint-white"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="A study of dawn light gathered beneath an arch"
              >
                <defs>
                  <linearGradient id="prayer-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4F9EC" />
                    <stop offset="58%" stopColor="#F8FCEF" />
                    <stop offset="100%" stopColor="#EAF1DE" />
                  </linearGradient>
                  <radialGradient id="prayer-glow" cx="50%" cy="88%" r="62%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="32%" stopColor="#C4D120" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="prayer-arch">
                    <path d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500 Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#prayer-arch)">
                  <rect width="400" height="500" fill="url(#prayer-sky)" />
                  <rect width="400" height="500" fill="url(#prayer-glow)" />

                  {Array.from({ length: 9 }).map((_, index) => (
                    <circle
                      key={index}
                      cx="200"
                      cy="474"
                      r={44 + index * 34}
                      fill="none"
                      stroke="#02600D"
                      strokeWidth="0.6"
                      opacity={0.3 - index * 0.026}
                    />
                  ))}

                  <path
                    d="M200 96 V474"
                    stroke="#02600D"
                    strokeWidth="0.7"
                    opacity="0.28"
                  />
                  <path
                    d="M144 132 V474 M256 132 V474"
                    stroke="#02600D"
                    strokeWidth="0.5"
                    opacity="0.16"
                  />
                  <path
                    d="M92 196 V474 M308 196 V474"
                    stroke="#02600D"
                    strokeWidth="0.45"
                    opacity="0.13"
                  />

                  <circle cx="200" cy="474" r="7" fill="#02600D" opacity="0.85" />
                  <circle cx="200" cy="474" r="22" fill="none" stroke="#02600D" strokeWidth="0.6" opacity="0.4" />

                  <path
                    d="M20 360 H380 M20 420 H380"
                    stroke="#02600D"
                    strokeWidth="0.6"
                    opacity="0.16"
                  />
                </g>

                <path
                  d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500"
                  fill="none"
                  stroke="#02600D"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>

              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15"
                style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
                <span>Fig. 01 — The quiet hour</span>
                <span>Gwarinpa</span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
              <span>Light study · no photograph</span>
              <span>Plate 01</span>
            </figcaption>
          </figure>
        </div>

        {/* Request index */}
        <ol className="mt-12 grid grid-cols-2 border-t border-ink/15 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          {PRAYER.form.requestTypes.map((type, index) => (
            <li
              key={type}
              className="border-b border-ink/12 py-4 sm:border-r sm:px-5 sm:last:border-r-0 lg:border-b-0"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1.5 font-sans text-[13.5px] leading-[1.4] text-ink/80">
                {type}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
          <p>Requests are not published · counselling subject to availability</p>
          <p>Forever Life and Grace Mission</p>
        </div>
      </div>
    </section>
  );
}
