import * as React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_FORM } from "@/data/forms";
import { CONTACT } from "@/data/contact";
import { SOCIALS } from "@/data/socials";
import { SocialLink } from "@/components/ui/social-link";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * ContactFormSection — the message desk.
 * The form sits on the left; the church office card on the right carries the
 * address, one direct line, the church email, and the four published platforms.
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
          <p className="col-span-12 max-w-[40ch] font-sans text-[15px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[16px]">
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
            <div className="relative overflow-hidden border border-ink/12 bg-tint-white p-6 text-ink md:p-7">
              <div className="relative">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                  The church office
                </p>
                <p className="mt-4 font-serif text-[clamp(1.3rem,2.3vw,1.65rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink/85">
                  Forever Life and Grace Mission
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.55] text-ink/70">
                  Resurrection Ground, beside Davina Hills Resort, off 1st
                  Avenue, Gwarinpa, Abuja, Nigeria.
                </p>

                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 font-mono text-[13px] tracking-[0.04em] text-ink/85 transition-colors hover:text-deep-green"
                >
                  <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                  {CONTACT.phones[0]}
                </a>

                {CONTACT.email ? (
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 flex min-h-10 items-center gap-2 font-mono text-[12.5px] tracking-[0.02em] text-ink/85 transition-colors hover:text-deep-green"
                  >
                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                    {CONTACT.email}
                  </a>
                ) : null}

                <a
                  href={whatsappLink("Good day, I would like to speak with the church office.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-10 items-center gap-2 border border-ink/25 px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/80 transition-colors hover:border-deep-green hover:text-deep-green"
                >
                  WhatsApp the church
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                </a>

                <div className="mt-6 border-t border-ink/12 pt-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                    Official platforms
                  </p>
                  <ul className="mt-2">
                    {SOCIALS.map((social) => (
                      <li key={social.id} className="border-b border-ink/10 last:border-b-0">
                        <SocialLink
                          social={social}
                          className="group min-h-11 w-full gap-3 py-2 text-ink/80 transition-colors hover:text-deep-green"
                          labelClassName="flex flex-1 flex-col"
                          trailing={
                            <ArrowUpRight
                              className="h-3.5 w-3.5 shrink-0 text-ink/40 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-deep-green"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          }
                        >
                          <span className="block font-sans text-[13px] font-medium text-ink/85">
                            {social.label}
                          </span>
                          <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-ink/50">
                            {social.handle}
                          </span>
                        </SocialLink>
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
