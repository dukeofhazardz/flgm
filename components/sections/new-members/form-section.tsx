import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { NewMemberForm } from "@/components/forms/new-member-form";
import { NEW_MEMBERS } from "@/data/forms";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * NewMembersFormSection — the registration desk.
 * The form leads; a welcome card sits beside it with the three things a visitor
 * can expect after sending their details.
 */

export function NewMembersFormSection(): React.ReactElement {
  return (
    <section
      id="register"
      data-section="new-members-form"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 02 — Visitor registration"
          note="Visit · membership · follow-up"
          folio="No. 02 / 04"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[15ch] font-serif text-[clamp(2.6rem,6.4vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            Visitor and new member{" "}
            <span className="italic">registration.</span>
          </h2>
          <p className="col-span-12 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[16px]">
            {NEW_MEMBERS.form.lead}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-8 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="border border-ink/12 bg-mist p-1.5 md:p-2">
              <NewMemberForm />
            </div>
            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
              <span>Form 02 — Visitor registration</span>
              <span>Church administration</span>
            </p>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="relative overflow-hidden border border-ink/12 bg-tint-white p-6 text-ink md:p-7">
              <div className="relative">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                  A note for you
                </p>
                <p className="mt-4 font-serif text-[clamp(1.45rem,2.7vw,2.05rem)] font-medium italic leading-[1.12] tracking-[-0.025em] text-ink/85">
                  “Our desire is to help you grow in grace, understand your
                  identity in Christ, build meaningful relationships, and
                  participate in the life of the church.”
                </p>

                <div className="mt-6 border-t border-ink/12 pt-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                    After you send
                  </p>
                  <ol className="mt-3 space-y-3">
                    {NEW_MEMBERS.journey.slice(0, 3).map((step, index) => (
                      <li key={step.title} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-sans text-[13.5px] font-medium leading-[1.4] text-ink/85">
                            {step.title}
                          </p>
                          <p className="mt-0.5 font-sans text-[12.5px] leading-[1.5] text-ink/65">
                            {step.note}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 border-t border-ink/12 pt-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/50">
                    Prefer to call
                  </p>
                  <a
                    href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                    className="mt-2 inline-flex min-h-9 items-center gap-2 font-mono text-[12px] tracking-[0.04em] text-ink/85 transition-colors hover:text-deep-green"
                  >
                    <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                    {CONTACT.phones[0]}
                  </a>
                  <a
                    href={whatsappLink(
                      "Good day, I would like to know more about becoming a member of FLGM."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex w-fit items-center gap-1.5 border-b border-ink/25 pb-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/75 transition-colors hover:border-deep-green hover:text-deep-green"
                  >
                    WhatsApp the church
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
