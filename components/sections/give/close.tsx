import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GIVING } from "@/data/giving";
import { CONTACT } from "@/data/contact";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * GiveClose — the giving notice as the last page of the issue.
 * No form, no button that implies a checkout: the notice, the receipt, and
 * three honest ways to ask a question before giving.
 */

export function GiveClose(): React.ReactElement {
  const [primaryPhone, secondPhone, thirdPhone] = CONTACT.phones;

  return (
    <section
      id="giving-notice"
      data-section="give-close"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <span
        aria-hidden="true"
        className="type-outline-ink pointer-events-none absolute -bottom-8 -left-4 hidden select-none font-serif text-[15rem] font-medium italic leading-none tracking-[-0.08em] opacity-[0.06] lg:block xl:text-[19rem]"
      >
        Amen
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 05 — Giving notice"
          note="Voluntary · approved channels · no online checkout"
          folio="No. 05 / 05"
        />

        <div className="mt-10 grid grid-cols-12 gap-x-3 gap-y-10 md:mt-14 md:gap-x-6">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="max-w-[15ch] font-serif text-[clamp(2.8rem,7.4vw,7.2rem)] font-medium leading-[0.88] tracking-[-0.05em]">
              All contributions are{" "}
              <span className="italic text-deep-green">voluntary.</span>
            </h2>

            <p className="mt-7 max-w-[44ch] font-serif text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.22] tracking-[-0.02em] text-ink/85">
              Giving should be made through officially approved church channels.
            </p>

            <p className="mt-6 max-w-[52ch] font-sans text-[15px] leading-[1.65] text-ink/70 md:text-[16px]">
              {GIVING.hero.support}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/12 pt-6">
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/85 transition-colors hover:text-deep-green"
              >
                Ask the church about giving
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
                No payment form on this page
              </p>
            </div>
          </div>

          {/* Receipt */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="relative border border-ink/15 bg-white p-5 md:p-6">
              <div className="relative flex items-start justify-between gap-4 border-b border-dashed border-ink/20 pb-4">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-deep-green">
                    Forever Life
                    <br />
                    and Grace Mission
                  </p>
                  <p className="mt-2 font-serif text-[1.6rem] font-medium italic leading-none tracking-[-0.03em] text-ink/80">
                    Giving receipt
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45"
                >
                  05 / 05
                </span>
              </div>

              <ul className="relative mt-4 space-y-3">
                {[
                  ["Account", `${GIVING.bank} · ${GIVING.accountNumber}`],
                  ["Status", "Voluntary contribution"],
                  ["Channel", "Officially approved church channels"],
                  ["Checkout", "Not provided on this website"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/50">
                      {label}
                    </span>
                    <span className="max-w-[20ch] text-right font-sans text-[13px] leading-[1.45] text-ink/85">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-5 flex items-center justify-between gap-3">
                <span className="border border-brand-green/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-deep-green">
                  Approved channel
                </span>
                <span
                  aria-hidden="true"
                  className="h-8 w-8 rounded-full border border-ink/20"
                />
              </div>

              <p className="relative mt-5 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/45">
                This receipt records the church’s supplied account details. It is
                not proof of payment.
              </p>
            </div>

            <div className="mt-4 space-y-1.5">
              <a
                href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                className="flex min-h-9 items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink/80 transition-colors hover:text-deep-green"
              >
                <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                {primaryPhone}
              </a>
              <a
                href={`tel:${secondPhone.replace(/\s/g, "")}`}
                className="flex min-h-9 items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink/80 transition-colors hover:text-deep-green"
              >
                <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                {secondPhone}
              </a>
              <a
                href={`tel:${thirdPhone.replace(/\s/g, "")}`}
                className="flex min-h-9 items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink/80 transition-colors hover:text-deep-green"
              >
                <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                {thirdPhone}
              </a>
              <a
                href={whatsappLink("Good day, I have a question about giving to FLGM.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-9 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-green transition-colors hover:text-ink"
              >
                WhatsApp the church
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/12 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45 md:mt-20">
          <p>Giving with grace · building for generations</p>
          <p>{GIVING.accountName}</p>
        </div>
      </div>
    </section>
  );
}
