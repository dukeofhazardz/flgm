import * as React from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { VISION_CARDS, type VisionCard } from "@/data/about";
import { cn } from "@/lib/utils";

const TONES: Record<VisionCard["tone"], string> = {
  green: "bg-brand-green text-ink border-brand-green",
  white: "bg-white text-ink border-ink/12",
  mist: "bg-[#E4F4E9] text-ink border-ink/12",
  forest: "bg-forest text-white border-white/10",
  ink: "bg-ink text-white border-white/10",
};

/**
 * AboutVision — six statements as a stacked sticky deck.
 *
 * Each card pins a little lower than the one before it, so the previous
 * statement stays visible as a rule at the top while the next arrives. No
 * scroll-hijacking and no pin plugin: native sticky, one quiet motion moment.
 */
export function AboutVision(): React.ReactElement {
  return (
    <section
      id="vision"
      data-section="about-vision"
      data-header-theme="light"
      className="relative bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-28 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 03 — Our vision</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            The horizon we walk toward
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 03 / 06
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[12ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            The people we are <span className="italic">raising.</span>
          </h2>
          <p className="col-span-12 max-w-[40ch] text-[16px] leading-[1.62] text-forest/75 md:col-span-4 md:col-start-9 md:text-[17px]">
            One vision, held in six movements. Scroll through the deck and the
            statements gather behind one another like pages of the same issue.
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          {VISION_CARDS.map((card, index) => {
            const dark = card.tone === "forest" || card.tone === "ink";
            const bright = card.tone === "green";
            const muted = dark
              ? "text-white/45"
              : bright
                ? "text-night/65"
                : "text-ink/40";
            const hairline = dark
              ? "bg-white/20"
              : bright
                ? "bg-night/25"
                : "bg-ink/20";
            const ghost = dark
              ? "text-white/10"
              : bright
                ? "text-night/15"
                : "text-ink/10";
            const note = dark
              ? "text-white/45"
              : bright
                ? "text-night/70"
                : "text-ink/40";
            const border = dark
              ? "border-white/15"
              : bright
                ? "border-night/25"
                : "border-ink/15";
            return (
              <article
                key={card.id}
                className={cn(
                  "sticky mb-4 flex min-h-[42svh] flex-col justify-between border p-6 transition-colors duration-300 md:mb-6 md:min-h-[51svh] md:p-9 lg:p-11",
                  TONES[card.tone]
                )}
                style={{
                  top: `calc(80px + ${index * 10}px)`,
                  zIndex: index + 1,
                }}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.22em]",
                        muted
                      )}
                    >
                      Vision
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn("h-px w-8", hairline)}
                    />
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.22em]",
                        muted
                      )}
                    >
                      {card.number} / 06
                    </span>
                  </div>
                  <span
                    className={cn(
                      "hidden font-mono text-[8px] uppercase tracking-[0.18em] sm:block",
                      note
                    )}
                  >
                    {card.label}
                  </span>
                </div>

                <div className="mt-8 flex items-end justify-between gap-8 md:mt-12">
                  <p
                    className={cn(
                      "max-w-[24ch] font-serif font-medium tracking-[-0.04em]",
                      card.id === "vision"
                        ? "text-[clamp(1.85rem,5.1vw,5rem)] leading-[1.02]"
                        : "text-[clamp(2.25rem,7vw,6.8rem)] leading-[0.94]"
                    )}
                  >
                    {card.statement}
                  </p>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden select-none font-serif text-[clamp(4rem,10vw,10rem)] font-medium leading-none tracking-[-0.06em] sm:block",
                      ghost
                    )}
                  >
                    {card.number}
                  </span>
                </div>

                <div
                  className={cn(
                    "mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-4",
                    border
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[8.5px] uppercase tracking-[0.18em]",
                      note
                    )}
                  >
                    Forever Life and Grace Mission
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[8.5px] uppercase tracking-[0.18em]",
                      note
                    )}
                  >
                    {index === VISION_CARDS.length - 1 ? "The deck ends here" : "Keep scrolling"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
