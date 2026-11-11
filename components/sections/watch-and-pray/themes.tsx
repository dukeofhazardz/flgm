"use client";

import * as React from "react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";
import { cn } from "@/lib/utils";

/**
 * WatchThemes — five prayer threads as a full-width editorial accordion.
 *
 * The categories are internally `confirmed: false` (a proposed framework), so
 * the public page never uses the word "proposed" or claims approval. Opening a
 * row animates clip-path, transform and opacity only.
 */

export function WatchThemes(): React.ReactElement {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="themes"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 04 — Themes</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Five threads through fifty mornings
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 07 / 10
          </Folio>
        </header>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7 font-serif text-[clamp(2.6rem,6.4vw,6rem)] font-medium leading-[0.94] tracking-[-0.045em]">
            Prayer <span className="italic">Themes</span>
          </h2>
          <p className="md:col-span-4 md:col-start-9 max-w-[38ch] text-[16px] leading-[1.62] text-deep-green">
            Five threads run through the fifty mornings, each turning the same
            grace toward a different part of life.
          </p>
        </div>

        <div className="mt-10 border-t border-ink/20 md:mt-14">
          {WATCH_AND_PRAY.themeCategories.map((theme, index) => {
            const isOpen = open === index;
            const panelId = `theme-panel-${theme.id}`;
            const buttonId = `theme-button-${theme.id}`;

            return (
              <div
                key={theme.id}
                className={cn(
                  "border-b border-ink/20 transition-colors duration-300",
                  isOpen ? "bg-mist" : "bg-transparent"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group grid w-full grid-cols-12 items-center gap-x-3 gap-y-2 px-0 py-6 text-left md:gap-x-6 md:py-8"
                  >
                    <span className="col-span-2 font-mono text-[9px] uppercase tracking-[0.18em] text-crimson-text md:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "col-span-9 max-w-[18ch] font-serif text-[clamp(1.7rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:col-span-10",
                        "group-hover:translate-x-1.5"
                      )}
                    >
                      {theme.title}
                    </span>
                    <span className="col-span-1 flex justify-end">
                      {isOpen ? (
                        <Minus className="h-6 w-6 text-ink/70" strokeWidth={1.3} aria-hidden="true" />
                      ) : (
                        <Plus className="h-6 w-6 text-ink/40" strokeWidth={1.3} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="theme-open grid grid-cols-12 gap-x-3 pb-8 md:gap-x-6 md:pb-10"
                  >
                    <span className="col-span-2 md:col-span-1" aria-hidden="true" />
                    <div className="col-span-10 md:col-span-7">
                      <p className="max-w-[52ch] text-[17px] leading-[1.62] text-deep-green md:text-[18px]">
                        {theme.description}
                      </p>
                    </div>
                    <p className="col-span-10 col-start-3 mt-4 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/35 md:col-span-3 md:col-start-10 md:mt-0 md:text-right">
                      Thread {String(index + 1).padStart(2, "0")} / 05
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
