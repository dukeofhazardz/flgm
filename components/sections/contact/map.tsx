import * as React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTACT } from "@/data/contact";

/**
 * ContactMap — plan the visit, then see the entrance.
 * A designed street-grid fallback sits under the Google Maps embed so the card
 * is never an empty rectangle if the map is blocked or slow to load. The pin is
 * explicitly labelled as awaiting verification.
 */

const MAP_QUERY = encodeURIComponent(CONTACT.map.query);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export function ContactMap(): React.ReactElement {
  return (
    <section
      id="visit"
      data-section="contact-map"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 03 — Location & visit"
          note="Plan the journey · verify the entrance"
          folio="No. 03 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-start gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="max-w-[11ch] font-serif text-[clamp(2.5rem,5.4vw,4.6rem)] font-medium leading-[0.92] tracking-[-0.045em]">
              Plan your{" "}
              <span className="italic">visit.</span>
            </h2>
            <p className="mt-4 max-w-[36ch] font-sans text-[14.5px] leading-[1.62] text-deep-green">
              {CONTACT.visit.lead}
            </p>

            <ol className="mt-7 border-t border-ink/15">
              {CONTACT.visit.steps.map((step, index) => (
                <li key={step.id} className="border-b border-ink/12 py-4">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[clamp(1.15rem,2vw,1.45rem)] font-medium leading-tight tracking-[-0.02em]">
                      {step.title}
                    </span>
                  </p>
                  <p className="mt-1.5 pl-7 font-sans text-[13px] leading-[1.55] text-deep-green">
                    {step.note}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-5 max-w-[34ch] font-serif text-[1.05rem] font-medium italic leading-[1.35] tracking-[-0.01em] text-deep-green">
              {CONTACT.visit.close}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="border border-ink/15 bg-white p-1.5 md:p-2">
              <div
                className="relative h-[420px] overflow-hidden bg-night md:h-[540px]"
                style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
              >
                {/* Drawn fallback — always present under the embed */}
                <svg
                  viewBox="0 0 640 540"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect width="640" height="540" fill="#408609" />
                  {Array.from({ length: 11 }).map((_, index) => (
                    <line
                      key={`h-${index}`}
                      x1="0"
                      y1={40 + index * 46}
                      x2="640"
                      y2={40 + index * 46}
                      stroke="#C4D120"
                      strokeWidth="0.6"
                      opacity="0.14"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, index) => (
                    <line
                      key={`v-${index}`}
                      x1={30 + index * 52}
                      y1="0"
                      x2={30 + index * 52}
                      y2="540"
                      stroke="#C4D120"
                      strokeWidth="0.6"
                      opacity="0.12"
                    />
                  ))}
                  <path
                    d="M0 400 L640 250"
                    stroke="#C4D120"
                    strokeWidth="1.4"
                    opacity="0.22"
                  />
                  <path
                    d="M120 540 L400 0"
                    stroke="#C4D120"
                    strokeWidth="0.9"
                    opacity="0.14"
                  />
                  <circle cx="320" cy="286" r="54" fill="none" stroke="#C4D120" strokeWidth="0.7" opacity="0.4" />
                  <circle cx="320" cy="286" r="16" fill="none" stroke="#C4D120" strokeWidth="0.8" opacity="0.55" />
                  <circle cx="320" cy="286" r="4" fill="#C4D120" opacity="0.85" />
                  <text
                    x="320"
                    y="362"
                    textAnchor="middle"
                    fill="#C4D120"
                    opacity="0.55"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    letterSpacing="2"
                  >
                    RESURRECTION GROUND
                  </text>
                </svg>

                <iframe
                  title={`Google Maps location for ${CONTACT.map.query}`}
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 z-10 h-full w-full border-0"
                />

                <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 border border-crimson-text/30 bg-white px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-crimson-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
                  Pin awaiting verification
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-center justify-between gap-2 bg-night/80 px-4 py-3 text-white backdrop-blur-sm">
                  <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/92">
                    <MapPin className="h-3 w-3 text-dawn-mint" strokeWidth={1.6} aria-hidden="true" />
                    Resurrection Ground · Gwarinpa
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/72">
                    Entrance to be confirmed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-[40ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
                The location should be verified before publication so visitors
                are directed to the correct church entrance.
              </p>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/75 transition-colors duration-200 hover:border-ink hover:bg-night hover:text-white"
              >
                Get directions
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30">
              <span>Map card 03 — Google Maps embed</span>
              <span>{CONTACT.map.verified ? "Verified" : "Verification pending"}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
