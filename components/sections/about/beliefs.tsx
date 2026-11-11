"use client";

import * as React from "react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { BELIEFS } from "@/data/beliefs";
import { cn } from "@/lib/utils";

/**
 * AboutBeliefs — seven convictions as an accessible editorial accordion.
 *
 * The numerals are the design: each row is a giant plate with the statement
 * held inside it. Opening uses clip-path, opacity and transform only. The
 * button owns `aria-expanded` and the panel is labelled by it.
 */
export function AboutBeliefs(): React.ReactElement {
  const [open, setOpen] = useState<string | null>(BELIEFS[0]?.id ?? null);

  return (
    <section
      id="beliefs"
      data-section="about-beliefs"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{
          background:
            "radial-gradient(72% 100% at 18% 0%, rgba(51,164,2,0.12) 0%, rgba(51,164,2,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-white/76">§ 05 — Our beliefs</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/66 md:col-span-4 md:block">
            The convictions that shape the house
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-white/66 md:col-span-2">
            No. 05 / 06
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[10ch] font-serif text-[clamp(2.8rem,7.4vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            What we <span className="italic">hold.</span>
          </h2>
          <p className="col-span-12 max-w-[38ch] text-[15px] leading-[1.62] text-white/82 md:col-span-4 md:col-start-9 md:text-[16px]">
            Seven convictions, opened one at a time. The Church is built on the
            person and work of Jesus Christ, and on the Word that reveals Him.
          </p>
        </div>

        <div className="mt-10 border-t border-white/20 md:mt-14">
          {BELIEFS.map((belief, index) => {
            const isOpen = open === belief.id;
            const buttonId = `belief-button-${belief.id}`;
            const panelId = `belief-panel-${belief.id}`;

            return (
              <div
                key={belief.id}
                className={cn(
                  "border-b border-white/15 transition-colors duration-300",
                  isOpen ? "bg-dawn-mint text-ink" : "bg-transparent text-white"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : belief.id)}
                    className="group grid w-full grid-cols-12 items-center gap-x-3 gap-y-2 py-5 text-left md:gap-x-6 md:py-7"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "col-span-3 font-serif text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.78] tracking-[-0.07em] tabular-nums transition-colors duration-300 md:col-span-2",
                        isOpen ? "text-ink" : "text-white/34"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "col-span-8 max-w-[24ch] font-serif text-[clamp(1.45rem,3.9vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:col-span-9",
                        "group-hover:translate-x-1"
                      )}
                    >
                      {belief.title}
                    </span>

                    <span className="col-span-1 flex justify-end">
                      {isOpen ? (
                        <Minus
                          className="h-6 w-6 text-ink/70"
                          strokeWidth={1.3}
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus
                          className="h-6 w-6 text-white/72"
                          strokeWidth={1.3}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="theme-open grid grid-cols-12 gap-x-3 pb-7 md:gap-x-6 md:pb-9"
                  >
                    <span className="col-span-3 md:col-span-2" aria-hidden="true" />
                    <div className="col-span-9 md:col-span-7">
                      <p className="max-w-[52ch] text-[17px] leading-[1.64] text-deep-green md:text-[18px]">
                        {belief.description}
                      </p>
                    </div>
                    <p className="col-span-9 col-start-4 mt-4 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/55 md:col-span-3 md:col-start-10 md:mt-0 md:text-right">
                      Conviction {String(index + 1).padStart(2, "0")} / 07
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
