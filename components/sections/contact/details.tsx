import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * ContactDetails — address and enquiry lines.
 * The address is set as a place, not a field: large serif, two beats, with the
 * three phone numbers as full-width tap targets beside it.
 */

export function ContactDetails(): React.ReactElement {
  const [first, second, third] = CONTACT.phones;

  return (
    <section
      id="enquiries"
      data-section="contact-details"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 02 — Address & enquiry lines"
          note="Visit · call · WhatsApp"
          folio="No. 02 / 04"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-12 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-6">
            <p className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
              <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
              Church address
            </p>
            <h2 className="mt-3 max-w-[11ch] font-serif text-[clamp(2.8rem,6.6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Resurrection{" "}
              <span className="italic">Ground.</span>
            </h2>

            <address className="mt-6 max-w-[36ch] font-serif text-[clamp(1.15rem,2.1vw,1.5rem)] font-medium not-italic leading-[1.45] tracking-[-0.015em] text-deep-green">
              Forever Life and Grace Mission
              <br />
              Resurrection Ground, beside Davina Hills Resort,
              <br />
              off 1st Avenue, Gwarinpa, Abuja, Nigeria.
            </address>

            <p className="mt-5 max-w-[42ch] font-sans text-[14px] leading-[1.6] text-deep-green">
              The location pin is awaiting final verification so that visitors
              are directed to the correct church entrance. Please call the church
              if you are unsure before travelling.
            </p>

            <Link
              href="#visit"
              className="group mt-6 inline-flex min-h-11 items-center gap-3 border border-ink/25 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/75 transition-colors duration-200 hover:border-ink hover:bg-night hover:text-white"
            >
              See the map and directions
              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
              <span className="h-1 w-1 rounded-full bg-brand-green" aria-hidden="true" />
              Church enquiries
            </p>
            <h3 className="mt-3 font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[0.96] tracking-[-0.04em]">
              Three lines.{" "}
              <span className="italic">One church.</span>
            </h3>

            <ol className="mt-6 border-t border-ink/20">
              {[
                [first, "Church enquiries"],
                [second, "Church enquiries"],
                [third, "Church enquiries"],
              ].map(([phone, label], index) => (
                <li key={phone} className="border-b border-ink/15">
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="group flex min-h-[74px] items-center justify-between gap-4 py-4 transition-colors hover:text-deep-green"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-serif text-[clamp(1.5rem,3.1vw,2.25rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                          {phone}
                        </span>
                        <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
                          {label}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-ink/30 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-deep-green"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>

            {CONTACT.email ? (
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex min-h-[70px] items-center justify-between gap-4 border-b border-ink/15 py-4 transition-colors hover:text-deep-green"
              >
                <span className="flex items-center gap-4">
                  <Mail
                    className="h-5 w-5 shrink-0 text-ink/30 transition-colors group-hover:text-deep-green"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block break-all font-serif text-[clamp(1.15rem,2.5vw,1.65rem)] font-medium leading-tight tracking-[-0.02em]">
                      {CONTACT.email}
                    </span>
                    <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
                      Email the church
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-ink/30 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-deep-green"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            ) : null}

            <a
              href={whatsappLink("Good day, I would like to speak with Forever Life and Grace Mission.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex min-h-12 items-center justify-between gap-6 bg-brand-green px-5 py-3 font-sans text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-dawn-mint"
            >
              WhatsApp the church
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
