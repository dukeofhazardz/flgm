import * as React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import { VOLUNTEER } from "@/data/forms";
import { CONTACT } from "@/data/contact";

/**
 * VolunteerFormSection — the three-step registration desk.
 * A compact step rail keeps the shape of the form visible before it begins.
 */

const STEP_NOTES = [
  "Your name, phone number, and church membership.",
  "Where you would like to serve and what you bring.",
  "When you are available and your consent to be contacted.",
];

export function VolunteerFormSection(): React.ReactElement {
  return (
    <section
      id="volunteer-form"
      data-section="volunteer-form"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 03 — Volunteer registration"
          note="Three steps · confidential · church contact"
          folio="No. 03 / 04"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="max-w-[10ch] font-serif text-[clamp(2.3rem,4.6vw,3.7rem)] font-medium leading-[0.94] tracking-[-0.04em]">
                Register to{" "}
                <span className="italic">serve.</span>
              </h2>
              <p className="mt-4 max-w-[32ch] font-sans text-[14px] leading-[1.6] text-deep-green">
                {VOLUNTEER.form.lead}
              </p>

              <ol className="mt-6 border-t border-ink/15">
                {["Personal", "Service", "Availability"].map((step, index) => (
                  <li key={step} className="border-b border-ink/12 py-3.5">
                    <p className="flex items-baseline gap-3">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-[13.5px] font-medium text-ink/80">
                        {step}
                      </span>
                    </p>
                    <p className="mt-1 pl-7 font-sans text-[12.5px] leading-[1.5] text-deep-green">
                      {STEP_NOTES[index]}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40">
                  Need help
                </p>
                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="mt-2 inline-flex min-h-9 items-center gap-2 font-mono text-[12px] tracking-[0.04em] text-ink/75 transition-colors hover:text-deep-green"
                >
                  <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                  {CONTACT.phones[0]}
                </a>
                <p className="mt-1 max-w-[30ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-ink/35">
                  Your information is handled confidentially.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <div className="border border-ink/12 bg-white p-1.5 md:p-2">
              <VolunteerForm />
            </div>
            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
              <span>Form 03 — Volunteer registration</span>
              <span>A representative will contact you</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
