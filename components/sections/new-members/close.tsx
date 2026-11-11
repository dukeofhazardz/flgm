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
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[72vh]"
        style={{
          background:
            "radial-gradient(64% 66% at 22% 100%, rgba(51,164,2,0.2) 0%, rgba(51,164,2,0.03) 48%, rgba(2,96,13,0) 78%)",
        }}
      />
      <span
        aria-hidden="true"
        className="type-outline-night pointer-events-none absolute -right-10 bottom-0 hidden select-none font-serif text-[17rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.1] lg:block xl:text-[22rem]"
      >
        Welcome
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
        <SectionHeader
          tag="§ 04 — Welcome"
          note="Come as you are · leave as family"
          folio="No. 04 / 04"
          dark
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="max-w-[12ch] font-serif text-[clamp(3rem,7.4vw,6.8rem)] font-medium leading-[0.88] tracking-[-0.05em]">
              You are{" "}
              <span className="italic text-dawn-mint">welcome</span> here.
            </h2>
            <p className="mt-6 max-w-[44ch] font-sans text-[15px] leading-[1.65] text-white/86 md:text-[16px]">
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
                className="inline-flex min-h-12 items-center justify-between gap-6 border border-white/25 px-5 py-3 font-sans text-[14px] font-medium text-white/94 transition-colors duration-200 hover:border-white hover:text-white"
              >
                Send a prayer request
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="border border-white/15 p-5 md:p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/66">
                The church office
              </p>
              <p className="mt-3 font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white/85">
                Thank you for visiting. We look forward to welcoming you in person.
              </p>

              <div className="mt-5 border-t border-white/12 pt-4">
                {CONTACT.phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex min-h-10 items-center gap-3 border-b border-white/10 py-1.5 font-mono text-[11.5px] tracking-[0.04em] text-white/90 transition-colors last:border-b-0 hover:text-dawn-mint"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/56">
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
                  className="mt-3 inline-flex min-h-9 items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-dawn-mint transition-colors hover:text-white"
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
