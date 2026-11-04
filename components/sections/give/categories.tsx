import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GIVING } from "@/data/giving";
import { cn } from "@/lib/utils";

/**
 * GiveCategories — seven approved categories as a typographic mosaic.
 * Not a card grid: one bordered ledger with alternating spans, giant numerals,
 * and the category name doing the work.
 */

const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

export function GiveCategories(): React.ReactElement {
  return (
    <section
      id="categories"
      data-section="give-categories"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <SectionHeader
          tag="§ 04 — Giving categories"
          note="Approved categories, subject to church approval"
          folio="No. 04 / 05"
        />

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[12ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            Where your <span className="italic">giving</span> goes.
          </h2>
          <p className="col-span-12 max-w-[38ch] font-sans text-[15px] leading-[1.62] text-forest/72 md:col-span-4 md:col-start-9 md:text-[16px]">
            The ministry publishes these categories for approved giving. State
            the category in your transfer narration so the church can reconcile
            your gift.
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-1 border-l border-t border-ink/15 md:mt-12 md:grid-cols-12">
          {GIVING.categories.map((category, index) => (
            <li
              key={category}
              className={cn(
                "group relative flex min-h-[190px] flex-col justify-between border-b border-r border-ink/15 bg-white p-5 transition-[background-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-dawn-mint md:min-h-[240px] md:p-6 lg:p-7",
                SPANS[index]
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.06em] text-ink/18 transition-colors duration-300 group-hover:text-ink/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 text-ink/25 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  strokeWidth={1.4}
                />
              </div>

              <div className="mt-10">
                <h3 className="max-w-[18ch] font-serif text-[clamp(1.55rem,3.4vw,2.9rem)] font-medium leading-[0.98] tracking-[-0.035em]">
                  {category}
                </h3>
                <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">
                  Category {String(index + 1).padStart(2, "0")} / 07
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-5 max-w-[64ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/35">
          Categories are published from the church’s supplied giving information
          and remain subject to church approval.
        </p>
      </div>
    </section>
  );
}
