import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * NewMembersClose — the welcome at the door.
 * A short night close with two useful next steps and the three enquiry lines.
 */

export function NewMembersClose(): React.ReactElement {
  return (
    <section
      id="welcome"
      data-section="new-members-close"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <span
        aria-hidden="true"
        className="type-outline-ink pointer-events-none absolute -right-10 bottom-0 hidden select-none font-serif text-[17rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.06] lg:block xl:text-[22rem]"
      >
        Welcome
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
        <SectionHeader
          tag="§ 04 — Welcome"
          note="Come as you are · leave as family"
          folio="No. 04 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,7.4vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.05em]">
              You are{" "}
              <span className="italic text-deep-green">welcome</span> here.
            </h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[15px] leading-[1.65] text-ink/70 md:text-[16px]">
              {CONTACT.visit.lead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#visit"
                className="inline-flex min-h-12 items-center justify-between gap-6 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
              >
                Plan your visit
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
              <Link
                href="/prayer"
                className="inline-flex min-h-12 items-center justify-between gap-6 border border-ink/30 px-5 py-3 font-sans text-[14px] font-medium text-ink/85 transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                Send a prayer request
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="border border-ink/15 bg-white p-5 md:p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">
                The church office
              </p>
              <p className="mt-3 font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ink/85">
                Thank you for visiting. We look forward to welcoming you in person.
              </p>

              <div className="mt-5 border-t border-ink/12 pt-4">
                {CONTACT.phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex min-h-10 items-center gap-3 border-b border-ink/10 py-1.5 font-mono text-[11.5px] tracking-[0.04em] text-ink/80 transition-colors last:border-b-0 hover:text-deep-green"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {phone}
                  </a>
                ))}
                <a
                  href={whatsappLink(
                    "Good day, I am a first-time visitor and would like to know more about FLGM."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-9 items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-deep-green transition-colors hover:text-ink"
                >
                  WhatsApp the church
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
