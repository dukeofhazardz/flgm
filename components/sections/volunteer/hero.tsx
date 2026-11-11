import * as React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { VOLUNTEER } from "@/data/forms";
import { CHURCH } from "@/data/church";

/**
 * VolunteerHero — the mission issue.
 * The arch holds five vertical light columns, one for each service area; a
 * ministry elevation rather than a photograph.
 */

export function VolunteerHero(): React.ReactElement {
  return (
    <section
      id="volunteer-top"
      data-section="volunteer-hero"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[78vh]"
        style={{
          background:
            "radial-gradient(68% 62% at 76% 8%, rgba(51,164,2,0.2) 0%, rgba(51,164,2,0.03) 46%, rgba(2,96,13,0) 76%)",
        }}
      />
      <span
        aria-hidden="true"
        className="type-outline-night pointer-events-none absolute -left-8 top-24 hidden select-none font-serif text-[15rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.1] lg:block xl:text-[20rem]"
      >
        Serve
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <SectionHeader
          tag="§ 01 — Volunteer registration"
          note="Evangelism · discipleship · outreach"
          folio="No. 01 / 04"
          dark
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-12 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/72">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Every believer has a place
            </p>

            <h1 className="mt-5 font-serif text-[clamp(3.1rem,9.2vw,8.8rem)] font-medium leading-[0.83] tracking-[-0.055em]">
              <span className="block">{VOLUNTEER.hero.lines[0]}</span>
              <span className="block italic text-dawn-mint">{VOLUNTEER.hero.lines[1]}</span>
              <span className="block">{VOLUNTEER.hero.lines[2]}</span>
              <span className="mt-1 block italic text-dawn-mint">Build disciples.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-white/90 md:text-[17px]">
              {VOLUNTEER.hero.lead}
            </p>
            <p className="mt-4 max-w-[48ch] font-sans text-[14.5px] leading-[1.65] text-white/76">
              {VOLUNTEER.hero.body}
            </p>

            <Link
              href="#volunteer-form"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-white/25 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-brand-green hover:text-white"
            >
              Register to serve
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>

          {/* Ministry elevation */}
          <figure className="col-span-12 mx-auto w-full max-w-[350px] lg:col-span-4 lg:col-start-9 lg:mx-0 lg:ml-auto lg:max-w-[390px]">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-forest"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Five columns of light representing the five volunteer service areas"
              >
                <defs>
                  <linearGradient id="vol-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#02600D" />
                    <stop offset="64%" stopColor="#408609" />
                    <stop offset="100%" stopColor="#33A402" />
                  </linearGradient>
                  <linearGradient id="vol-bar" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#33A402" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#C4D120" stopOpacity="0.8" />
                  </linearGradient>
                  <radialGradient id="vol-glow" cx="50%" cy="86%" r="60%">
                    <stop offset="0%" stopColor="#C4D120" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="vol-arch">
                    <path d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500 Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#vol-arch)">
                  <rect width="400" height="500" fill="url(#vol-sky)" />
                  <rect width="400" height="500" fill="url(#vol-glow)" />

                  {[110, 164, 218, 272, 326].map((x, index) => {
                    const heights = [212, 274, 318, 246, 288];
                    const top = 468 - heights[index];
                    return (
                      <g key={x}>
                        <rect
                          x={x - 16}
                          y={top}
                          width="32"
                          height={heights[index]}
                          fill="url(#vol-bar)"
                          opacity="0.28"
                        />
                        <rect
                          x={x - 16}
                          y={top}
                          width="32"
                          height={heights[index]}
                          fill="none"
                          stroke="#C4D120"
                          strokeWidth="0.7"
                          opacity="0.65"
                        />
                        <line
                          x1={x - 16}
                          y1={top}
                          x2={x + 16}
                          y2={top}
                          stroke="#FFF3EE"
                          strokeWidth="1"
                          opacity="0.75"
                        />
                      </g>
                    );
                  })}

                  {[468, 404, 340, 276, 212].map((y) => (
                    <line
                      key={y}
                      x1="54"
                      y1={y}
                      x2="346"
                      y2={y}
                      stroke="#C4D120"
                      strokeWidth="0.4"
                      strokeDasharray="2 6"
                      opacity="0.25"
                    />
                  ))}

                  <path
                    d="M54 468 H346"
                    stroke="#C4D120"
                    strokeWidth="0.8"
                    opacity="0.55"
                  />

                  {[110, 164, 218, 272, 326].map((x, index) => (
                    <text
                      key={x}
                      x={x}
                      y="490"
                      textAnchor="middle"
                      fill="#C4D120"
                      opacity="0.6"
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                      letterSpacing="1.5"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </text>
                  ))}
                </g>

                <path
                  d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500"
                  fill="none"
                  stroke="#C4D120"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>

              <div className="grain absolute inset-0" aria-hidden="true" />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
                style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 bg-night/60 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-white/94">
                <span>Fig. 01 — Five ways to serve</span>
                <span>Elevation</span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/66">
              <span>Ministry elevation · no photograph</span>
              <span>Plate 01</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-3 gap-y-4 border-t border-white/15 py-5 md:mt-16 md:gap-x-6">
          <p className="col-span-12 font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium italic leading-[1.15] tracking-[-0.02em] text-white/85 md:col-span-7">
            {VOLUNTEER.hero.invite}
          </p>
          <div className="col-span-12 flex flex-wrap items-end justify-between gap-3 md:col-span-4 md:col-start-9">
            <p className="font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-white/66">
              {CHURCH.tagline}
              <br />
              Registration · orientation · placement
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-dawn-mint/88">
              Serve according to your gifts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
