import * as React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTACT } from "@/data/contact";
import { CHURCH } from "@/data/church";

/**
 * ContactHero — the location issue.
 * The arch holds a street-grid study and a single pin: a drawn location, not a
 * stock photograph. The service times run along the foot as a timetable.
 */

export function ContactHero(): React.ReactElement {
  return (
    <section
      id="contact-top"
      data-section="contact-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <span
        aria-hidden="true"
        className="type-outline-ink pointer-events-none absolute -left-8 top-24 hidden select-none font-serif text-[15rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.07] lg:block xl:text-[20rem]"
      >
        Visit
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <SectionHeader
          tag="§ 01 — Contact & location"
          note="Address · enquiry lines · service times"
          folio="No. 01 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-12 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Resurrection Ground · Gwarinpa · Abuja
            </p>

            <h1 className="mt-5 font-serif text-[clamp(3rem,8.6vw,8.2rem)] font-medium leading-[0.84] tracking-[-0.055em] text-ink">
              <span className="block">Connect with</span>
              <span className="block italic text-deep-green">Forever Life</span>
              <span className="block">and Grace Mission.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] font-sans text-[16px] leading-[1.65] text-ink/75 md:text-[17px]">
              We welcome you to visit us, worship with us, participate in our
              programmes, and become part of our church family.
            </p>

            <Link
              href="#visit"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-brand-green hover:text-ink"
            >
              Plan your visit
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>

          {/* Location study */}
          <figure className="col-span-12 mx-auto w-full max-w-[350px] lg:col-span-4 lg:col-start-9 lg:mx-0 lg:ml-auto lg:max-w-[390px]">
            <div
              className="relative aspect-[4/5] overflow-hidden border border-ink/12 bg-tint-white"
              style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            >
              <svg
                viewBox="0 0 400 500"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="A drawn street grid with a single location pin beneath an arch"
              >
                <defs>
                  <linearGradient id="contact-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4F9EC" />
                    <stop offset="62%" stopColor="#F8FCEF" />
                    <stop offset="100%" stopColor="#EAF1DE" />
                  </linearGradient>
                  <radialGradient id="contact-glow" cx="50%" cy="72%" r="56%">
                    <stop offset="0%" stopColor="#C4D120" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#33A402" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="contact-arch">
                    <path d="M20 500 V238 C20 119 100 40 200 40 C300 40 380 119 380 238 V500 Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#contact-arch)">
                  <rect width="400" height="500" fill="url(#contact-sky)" />
                  <rect width="400" height="500" fill="url(#contact-glow)" />

                  {/* Street grid */}
                  {[100, 160, 220, 280, 340, 400, 460].map((y) => (
                    <line
                      key={`h-${y}`}
                      x1="20"
                      y1={y}
                      x2="380"
                      y2={y}
                      stroke="#02600D"
                      strokeWidth="0.5"
                      opacity="0.18"
                    />
                  ))}
                  {[80, 140, 200, 260, 320].map((x) => (
                    <line
                      key={`v-${x}`}
                      x1={x}
                      y1="60"
                      x2={x}
                      y2="500"
                      stroke="#02600D"
                      strokeWidth="0.5"
                      opacity="0.14"
                    />
                  ))}

                  {/* Two diagonal roads */}
                  <path
                    d="M20 380 L380 250"
                    stroke="#02600D"
                    strokeWidth="1.1"
                    opacity="0.3"
                  />
                  <path
                    d="M60 500 L300 60"
                    stroke="#02600D"
                    strokeWidth="0.7"
                    opacity="0.18"
                  />

                  {/* Blocks */}
                  <rect x="92" y="112" width="96" height="48" fill="#02600D" opacity="0.05" />
                  <rect x="272" y="112" width="60" height="48" fill="#02600D" opacity="0.04" />
                  <rect x="92" y="232" width="96" height="48" fill="#02600D" opacity="0.04" />
                  <rect x="212" y="292" width="120" height="48" fill="#02600D" opacity="0.06" />

                  {/* Route to the pin */}
                  <path
                    d="M70 460 C92 430 92 402 132 388 C166 376 214 390 224 350 C234 310 206 292 224 262"
                    fill="none"
                    stroke="#02600D"
                    strokeWidth="1.2"
                    strokeDasharray="3 6"
                    opacity="0.7"
                  />

                  {/* Pin */}
                  <circle cx="224" cy="252" r="30" fill="#FFFFFF" stroke="#02600D" strokeWidth="0.6" opacity="0.9" />
                  <circle cx="224" cy="252" r="18" fill="none" stroke="#02600D" strokeWidth="0.7" opacity="0.6" />
                  <circle cx="224" cy="252" r="6" fill="#FC0000" />
                  <path
                    d="M224 282 V330"
                    stroke="#02600D"
                    strokeWidth="0.7"
                    strokeDasharray="2 4"
                    opacity="0.45"
                  />

                  <text
                    x="56"
                    y="86"
                    fill="#02600D"
                    opacity="0.6"
                    fontFamily="var(--font-mono)"
                    fontSize="8"
                    letterSpacing="2"
                  >
                    RESURRECTION GROUND
                  </text>
                  <text
                    x="56"
                    y="102"
                    fill="#02600D"
                    opacity="0.4"
                    fontFamily="var(--font-mono)"
                    fontSize="7"
                    letterSpacing="1.6"
                  >
                    GWARINPA · ABUJA
                  </text>
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
                <span>Fig. 01 — The entrance</span>
                <span>Pin 01</span>
              </div>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
              <span>Location study · pin to be verified</span>
              <span>Plate 01</span>
            </figcaption>
          </figure>
        </div>

        {/* Service times */}
        <ol className="mt-12 grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3 md:mt-16">
          {CONTACT.serviceTimes.map((time, index) => (
            <li
              key={time.id}
              className="border-b border-ink/12 py-4 sm:border-r sm:px-5 sm:last:border-r-0"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/45">
                {String(index + 1).padStart(2, "0")} — {time.day}
              </p>
              <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-serif text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-ink/85">
                  {time.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-deep-green">
                  {time.time}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
          <p>{CHURCH.address}</p>
          <p>All times WAT</p>
        </div>
      </div>
    </section>
  );
}
