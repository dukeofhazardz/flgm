import * as React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { NEW_MEMBERS } from "@/data/forms";

/**
 * NewMembersHero — the welcome issue.
 * The right-hand arch holds a dotted route: six small stations climbing toward
 * a point of light, echoing the follow-up journey further down the page.
 */

export function NewMembersHero(): React.ReactElement {
  return (
    <section
      id="new-members-top"
      data-section="new-members-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <span
        aria-hidden="true"
        className="type-outline-ink pointer-events-none absolute -left-6 top-28 hidden select-none font-serif text-[15rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.07] lg:block xl:text-[20rem]"
      >
        Come
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <SectionHeader
          tag="§ 01 — New members"
          note="Visitors · membership · follow-up"
          folio="No. 01 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-12 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              A first visit · a returning faith · a church family
            </p>

            <h1 className="mt-5 font-serif text-[clamp(3.2rem,9.6vw,9rem)] font-medium leading-[0.83] tracking-[-0.055em] text-ink">
              <span className="block">{NEW_MEMBERS.hero.lines[0]}</span>
              <span className="block italic text-deep-green">{NEW_MEMBERS.hero.lines[1]}</span>
              <span className="mt-1 block">{NEW_MEMBERS.hero.lines[2]}</span>
            </h1>

            <p className="mt-7 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-ink/75 md:text-[17px]">
              {NEW_MEMBERS.hero.lead}
            </p>
            <p className="mt-4 max-w-[48ch] font-sans text-[14.5px] leading-[1.65] text-ink/60">
              {NEW_MEMBERS.hero.body}
            </p>

            <Link
              href="#register"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-brand-green hover:text-ink"
            >
              Connect with the church family
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>

          {/* Route study */}
          <figure className="col-span-12 mx-auto w-full max-w-[350px] lg:col-span-4 lg:col-start-9 lg:mx-0 lg:ml-auto lg:max-w-[390px]">
            <div
              className="relative aspect-[4/5] overflow-hidden border border-ink/12 bg-tint-white"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="A dotted route climbing through an arch toward a point of light"
              >
                <defs>
                  <linearGradient id="member-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4F9EC" />
                    <stop offset="62%" stopColor="#F8FCEF" />
                    <stop offset="100%" stopColor="#EAF1DE" />
                  </linearGradient>
                  <radialGradient id="member-glow" cx="50%" cy="18%" r="55%">
                    <stop offset="0%" stopColor="#F8FCEF" stopOpacity="0.9" />
                    <stop offset="34%" stopColor="#C4D120" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="member-arch">
                    <path d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500 Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#member-arch)">
                  <rect width="400" height="500" fill="url(#member-sky)" />
                  <rect width="400" height="500" fill="url(#member-glow)" />

                  <path
                    d="M64 468 C92 424 72 390 108 356 C144 322 236 344 252 300 C268 256 196 244 218 198 C240 152 306 150 300 100"
                    fill="none"
                    stroke="#02600D"
                    strokeWidth="1.1"
                    strokeDasharray="2 7"
                    opacity="0.55"
                  />

                  {[
                    [64, 468],
                    [90, 400],
                    [108, 356],
                    [236, 322],
                    [218, 198],
                    [300, 110],
                  ].map(([cx, cy], index) => (
                    <g key={index}>
                      <circle cx={cx} cy={cy} r="9" fill="#FFFFFF" stroke="#02600D" strokeWidth="0.8" />
                      <circle cx={cx} cy={cy} r="2.4" fill={index === 5 ? "#FC0000" : "#33A402"} />
                      <text
                        x={cx + 16}
                        y={cy + 3}
                        fill="#02600D"
                        opacity="0.55"
                        fontFamily="var(--font-mono)"
                        fontSize="8"
                        letterSpacing="1.5"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </text>
                    </g>
                  ))}

                  <circle cx="300" cy="88" r="22" fill="none" stroke="#02600D" strokeWidth="0.6" opacity="0.35" />
                  <circle cx="300" cy="88" r="6" fill="#33A402" opacity="0.95" />

                  <path
                    d="M20 420 H380"
                    stroke="#02600D"
                    strokeWidth="0.6"
                    opacity="0.18"
                  />
                </g>

                <path
                  d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500"
                  fill="none"
                  stroke="#02600D"
                  strokeWidth="1"
                  opacity="0.45"
                />
              </svg>

              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15"
                style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
                <span>Fig. 01 — The welcome route</span>
                <span>Six stations</span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
              <span>Register · contact · fellowship</span>
              <span>Plate 01</span>
            </figcaption>
          </figure>
        </div>

        <ol className="mt-12 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3 md:mt-16">
          {NEW_MEMBERS.form.descriptors.slice(0, 3).map((descriptor, index) => (
            <li
              key={descriptor}
              className="border-b border-ink/12 py-4 sm:border-r sm:px-5 sm:last:border-r-0"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45">
                {String(index + 1).padStart(2, "0")} — You are
              </p>
              <p className="mt-1.5 font-serif text-[clamp(1.15rem,2.2vw,1.55rem)] font-medium leading-tight tracking-[-0.02em] text-ink/85">
                {descriptor}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
          <p>A church family in Gwarinpa, Abuja</p>
          <p>Registration · follow-up · fellowship</p>
        </div>
      </div>
    </section>
  );
}
