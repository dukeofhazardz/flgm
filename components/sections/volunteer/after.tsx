import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { VOLUNTEER } from "@/data/forms";

/**
 * VolunteerAfter — what happens after registration.
 * A dawn rail of five steps beside the ministry charge and the Matthew 28:19
 * quotation. The close returns the reader to the form, not to a dead end.
 */

export function VolunteerAfter(): React.ReactElement {
  return (
    <section
      id="after-registration"
      data-section="volunteer-after"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 04 — After registration"
          note="Orientation · training · placement · service"
          folio="No. 04 / 04"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-12 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="max-w-[12ch] font-serif text-[clamp(2.5rem,5.4vw,4.6rem)] font-medium leading-[0.92] tracking-[-0.045em]">
              What happens{" "}
              <span className="italic text-deep-green">after.</span>
            </h2>
            <p className="mt-4 max-w-[42ch] font-sans text-[15px] leading-[1.62] text-ink/70">
              A church representative will contact you regarding the next steps.
            </p>

            <ol className="relative mt-8">
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-[15px] top-3 w-px bg-gradient-to-b from-brand-green via-brand-green/40 to-ink/10 md:left-[19px]"
              />
              {VOLUNTEER.timeline.map((step, index) => (
                <li
                  key={step.title}
                  className="group relative grid grid-cols-[32px_1fr] gap-4 border-b border-ink/10 py-5 last:border-b-0 last:pb-0 md:grid-cols-[40px_1fr] md:gap-5 md:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-mist font-mono text-[9px] tabular-nums tracking-[0.06em] text-ink/60 transition-colors duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-ink md:h-10 md:w-10 md:text-[10px]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="max-w-[26ch] font-serif text-[clamp(1.3rem,2.4vw,1.85rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ink/85">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] font-sans text-[13.5px] leading-[1.6] text-ink/60 md:text-[14px]">
                      {step.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <figure className="relative border border-ink/15 bg-white p-6 md:p-8">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="block font-serif text-[5rem] font-medium leading-[0.55] text-brand-green/60"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2">
                    <p className="max-w-[18ch] font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink/85">
                      {VOLUNTEER.quote.text}
                    </p>
                    <figcaption className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-deep-green">
                      {VOLUNTEER.quote.source}
                    </figcaption>
                  </blockquote>

                  <div className="mt-8 border-t border-ink/12 pt-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">
                      Our commitment
                    </p>
                    <p className="mt-2.5 max-w-[38ch] font-sans text-[14px] leading-[1.62] text-ink/75">
                      {VOLUNTEER.commitment}
                    </p>
                  </div>
                </div>
              </figure>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-ink/15 bg-white px-5 py-4">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                    Ready to serve?
                  </p>
                  <p className="mt-1 font-serif text-[1.3rem] font-medium italic leading-tight tracking-[-0.02em] text-ink/80">
                    Join the mission.
                  </p>
                </div>
                <Link
                  href="#volunteer-form"
                  className="group inline-flex min-h-11 items-center gap-2 bg-brand-green px-4 py-2.5 font-sans text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
                >
                  Begin registration
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/12 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45 md:mt-20">
          <p>Evangelism and discipleship · volunteer registration</p>
          <p>Forever Life and Grace Mission</p>
        </div>
      </div>
    </section>
  );
}
