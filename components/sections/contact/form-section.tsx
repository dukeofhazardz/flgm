import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_FORM } from "@/data/forms";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * ContactFormSection — the message desk.
 * The form sits on the left; the church office card on the right carries the
 * address, one direct line, and the confirmed social platforms. The YouTube
 * row is shown as awaiting a link, never as a dead anchor.
 */

export function ContactFormSection(): React.ReactElement {
  return (
    <section
      id="message"
      data-section="contact-form"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 04 — Send a message"
          note="Enquiries · visits · programmes · ministry"
          folio="No. 04 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[11ch] font-serif text-[clamp(2.7rem,6.8vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            Send us a{" "}
            <span className="italic">message.</span>
          </h2>
          <p className="col-span-12 max-w-[40ch] font-sans text-[15px] leading-[1.62] text-forest/70 md:col-span-4 md:col-start-9 md:text-[16px]">
            {CONTACT_FORM.lead}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-8 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="border border-ink/12 bg-mist p-1.5 md:p-2">
              <ContactForm />
            </div>
            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
              <span>Form 04 — Message the church</span>
              <span>Read by the church office</span>
            </p>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="relative overflow-hidden bg-night p-6 text-white md:p-7">
              <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 60% at 84% 10%, rgba(0,200,83,0.2) 0%, rgba(0,200,83,0.03) 50%, rgba(4,24,15,0) 78%)",
                }}
              />
              <div className="relative">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dawn-mint/70">
                  The church office
                </p>
                <p className="mt-4 font-serif text-[clamp(1.3rem,2.3vw,1.65rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white/90">
                  Forever Life and Grace Mission
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.55] text-white/55">
                  Resurrection Ground, beside Davina Hills Resort, off 1st
                  Avenue, Gwarinpa, Abuja, Nigeria.
                </p>

                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 font-mono text-[13px] tracking-[0.04em] text-white/80 transition-colors hover:text-dawn-mint"
                >
                  <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                  {CONTACT.phones[0]}
                </a>

                <a
                  href={whatsappLink("Good day, I would like to speak with the church office.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center gap-2 border border-white/25 px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-dawn-mint hover:text-dawn-mint"
                >
                  WhatsApp the church
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                </a>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                    Official platforms
                  </p>
                  <ul className="mt-2">
                    {CONTACT.socials.map((social) => (
                      <li key={social.platform} className="border-b border-white/10 last:border-b-0">
                        {social.url ? (
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-11 items-center justify-between gap-3 py-2 transition-colors hover:text-dawn-mint"
                          >
                            <span>
                              <span className="block font-sans text-[13px] font-medium text-white/85">
                                {social.platform}
                              </span>
                              <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
                                {social.handle}
                              </span>
                            </span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 shrink-0 text-white/30 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-dawn-mint"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <div className="flex min-h-11 items-center justify-between gap-3 py-2">
                            <span>
                              <span className="block font-sans text-[13px] font-medium text-white/60">
                                {social.platform}
                              </span>
                              <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                                Channel link to be confirmed
                              </span>
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-white/20"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
