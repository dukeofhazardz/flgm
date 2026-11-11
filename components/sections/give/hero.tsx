import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GIVING } from "@/data/giving";
import { CHURCH } from "@/data/church";

/**
 * GiveHero — the cover of the giving issue.
 * Night field, the four-line masthead, and the account ledger at the foot.
 * The full ticket lives below; this is the introduction, not a payment form.
 */

export function GiveHero(): React.ReactElement {
  return (
    <section
      id="give-top"
      data-section="give-hero"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[76vh]"
        style={{
          background:
            "radial-gradient(64% 62% at 78% 6%, rgba(51,164,2,0.2) 0%, rgba(51,164,2,0.04) 44%, rgba(51,164,2,0) 74%)",
        }}
      />
      <span
        aria-hidden="true"
        className="type-outline-night pointer-events-none absolute -right-6 bottom-16 hidden select-none font-serif text-[17rem] font-medium leading-none tracking-[-0.08em] opacity-[0.16] lg:block xl:text-[22rem]"
      >
        GIVE
      </span>

      <div className="relative mx-auto max-w-[1680px] px-5 pb-0 pt-[116px] md:px-8 md:pt-[132px] lg:px-10 lg:pt-[148px]">
        <SectionHeader
          tag="§ 01 — Online giving"
          note="Voluntary giving · approved channels"
          folio="No. 01 / 05"
          dark
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/72">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              Giving with grace
            </p>

            <h1 className="mt-4 font-serif text-[clamp(3.1rem,9.2vw,8.8rem)] font-medium leading-[0.84] tracking-[-0.055em]">
              {GIVING.hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={
                    index === 1 || index === 3
                      ? "block italic"
                      : index === 2
                        ? "mt-2 block md:mt-3"
                        : "block"
                  }
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <span aria-hidden="true" className="block h-px w-12 bg-brand-green md:w-16" />
            <p className="mt-4 max-w-[36ch] font-sans text-[16px] leading-[1.62] text-white/90 md:text-[17px]">
              {GIVING.hero.lead}
            </p>
            <p className="mt-4 max-w-[34ch] font-sans text-[14px] leading-[1.6] text-white/76">
              {GIVING.hero.support}
            </p>
            <Link
              href="#official-account"
              className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-white/30 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/92 transition-colors hover:border-brand-green hover:text-white"
            >
              See the official account
              <ArrowDown className="h-3.5 w-3.5 text-brand-green" strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Ledger strip */}
        <div className="mt-12 grid grid-cols-1 border-t border-white/15 sm:grid-cols-3 md:mt-16">
          {[
            ["Bank", GIVING.bank],
            ["Account", GIVING.accountNumber],
            ["Purpose", "Building for generations"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="border-b border-white/12 py-4 sm:border-r sm:px-5 sm:last:border-r-0"
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/66">
                {String(index + 1).padStart(2, "0")} — {label}
              </p>
              <p className="mt-1.5 font-serif text-[clamp(1.15rem,2.2vw,1.6rem)] font-medium leading-tight tracking-[-0.02em] text-white/85">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/56 md:text-[8.5px]">
          <p>
            {CHURCH.identityLine}
            <span className="mx-2 text-white/15" aria-hidden="true">
              /
            </span>
            Resurrection Ground, Gwarinpa
          </p>
          <p className="flex items-center gap-2">
            No payment form · no online checkout
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
