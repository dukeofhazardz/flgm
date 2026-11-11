import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTACT } from "@/data/contact";
import { CHURCH } from "@/data/church";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * PrayerClose — the direct line.
 * A short night close with the three enquiry numbers set as a ledger, so a
 * person who would rather talk than type is never stuck at a form.
 */

export function PrayerClose(): React.ReactElement {
  return (
    <section
      id="prayer-direct"
      data-section="prayer-close"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80vh]"
        style={{
          background:
            "radial-gradient(60% 70% at 78% 100%, rgba(51,164,2,0.2) 0%, rgba(51,164,2,0.03) 48%, rgba(2,96,13,0) 78%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
        <SectionHeader
          tag="§ 03 — Direct line"
          note="Call · WhatsApp · visit"
          folio="No. 03 / 03"
          dark
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="max-w-[13ch] font-serif text-[clamp(2.7rem,6.6vw,6rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Prefer to speak with{" "}
              <span className="italic text-dawn-mint">someone?</span>
            </h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[15px] leading-[1.65] text-white/86 md:text-[16px]">
              Counselling appointments are subject to pastoral availability. Call
              or WhatsApp the church and a member of the team will help directly.
            </p>

            <a
              href={whatsappLink("Good day, I would like to speak with the pastoral team.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center gap-3 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
            >
              WhatsApp the church
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/66">
              Enquiry lines
            </p>
            <ol className="mt-3 border-t border-white/15">
              {CONTACT.phones.map((phone, index) => (
                <li key={phone} className="border-b border-white/12">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="group flex min-h-[62px] items-center justify-between gap-4 py-3 transition-colors hover:text-dawn-mint"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/56">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium leading-none tracking-[-0.02em] tabular-nums">
                        {phone}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-white/56 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-dawn-mint"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/12 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/56 md:mt-20">
          <p>{CHURCH.name}</p>
          <p>{CHURCH.address}</p>
        </div>
      </div>
    </section>
  );
}
