import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { PrayerForm } from "@/components/forms/prayer-form";
import { PRAYER } from "@/data/forms";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * PrayerFormSection — the request desk.
 * The confidentiality statements sit in a sticky rail beside the form, so the
 * promise is visible while the request is being written.
 */

export function PrayerFormSection(): React.ReactElement {
  return (
    <section
      id="prayer-request"
      data-section="prayer-form"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 02 — Prayer request"
          note="Confidential · authorised personnel only"
          folio="No. 02 / 03"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
                <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                Pastoral care
              </p>
              <h2 className="mt-3 max-w-[12ch] font-serif text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[0.94] tracking-[-0.04em]">
                Pastoral care and{" "}
                <span className="italic">confidentiality.</span>
              </h2>

              <ol className="mt-7 border-t border-ink/15">
                {PRAYER.confidentiality.map((statement, index) => (
                  <li
                    key={statement}
                    className="flex gap-3 border-b border-ink/12 py-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-[13.5px] leading-[1.55] text-deep-green">
                      {statement}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40">
                  Prefer to speak directly
                </p>
                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="mt-2 inline-flex min-h-10 items-center gap-2 font-mono text-[13px] tracking-[0.04em] text-ink/80 transition-colors hover:text-deep-green"
                >
                  <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                  {CONTACT.phones[0]}
                </a>
                <a
                  href={whatsappLink("Good day, I would like to speak with the pastoral team.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex w-fit items-center gap-1.5 border-b border-ink/25 pb-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-ink hover:text-ink"
                >
                  WhatsApp the church
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="border border-ink/12 bg-white p-1.5 md:p-2">
              <PrayerForm />
            </div>
            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
              <span>Form 02 — Prayer request</span>
              <span>Pastoral team · church office</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
