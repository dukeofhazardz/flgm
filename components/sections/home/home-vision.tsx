"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { ArtSlot } from "@/components/ui/art-slot";
import { PILLARS, VISION_STATEMENT } from "@/data/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeVision — the first white morning.
 *
 * Desktop pins the vision statement while ink wipes down over a faint grey
 * setting of the same words. The four pillars below fill one at a time, each
 * with a generative study in an arch. Pinning is off on mobile and under
 * reduced motion; every trigger is reverted with the component.
 */
export function HomeVision(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    const pinned = stage.current;
    const ink = fill.current;
    if (!section || !pinned || !ink) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(ink, { clipPath: "inset(0 0 0% 0)" });
        gsap.set("[data-pillar-fill]", { clipPath: "inset(0 0% 0 0)" });
        gsap.set("[data-pillar-art]", { clipPath: "inset(0 0 0 0)", rotate: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinned,
            start: "top 12%",
            end: "+=80%",
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ink,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 1 },
          0
        ).fromTo(
          "[data-vision-type]",
          { scale: 0.985, yPercent: 2 },
          { scale: 1, yPercent: 0, ease: "none", duration: 1 },
          0
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set(ink, { clipPath: "inset(0 0 0% 0)" });
          gsap.set("[data-vision-type]", { scale: 1, yPercent: 0 });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinned,
            start: "top 82%",
            end: "bottom 52%",
            scrub: 0.6,
          },
        });
        tl.fromTo(
          ink,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 1 }
        );
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set(ink, { clipPath: "inset(0 0 0% 0)" });
        };
      });

      // Pillars: outlined word fills left to right, art unveils, type drifts.
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((row, index) => {
        const wordFill = row.querySelector<HTMLElement>("[data-pillar-fill]");
        const art = row.querySelector<HTMLElement>("[data-pillar-art]");
        if (!wordFill || !art) return;
        const drift = index % 2 === 0 ? 2.4 : -2.4;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              end: "bottom 58%",
              scrub: 0.55,
            },
          })
          .fromTo(
            wordFill,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", ease: "none", duration: 1 },
            0
          )
          .fromTo(
            row.querySelector("[data-pillar-word]"),
            { xPercent: drift },
            { xPercent: 0, ease: "none", duration: 1 },
            0
          )
          .fromTo(
            art,
            { clipPath: "inset(100% 0 0 0)", rotate: drift * 1.5 },
            { clipPath: "inset(0% 0 0 0)", rotate: 0, ease: "power2.out", duration: 0.7 },
            0.1
          );
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="vision"
      data-section="vision"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pt-16 md:px-8 md:pt-28 lg:px-10 lg:pt-32">
        {/* ── Section rail ── */}
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 03 — Vision</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block md:text-left">
            The horizon we walk toward
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 03 / 10
          </Folio>
        </header>

        {/* ── Pinned statement ── */}
        <div
          ref={stage}
          data-vision-stage
          className="relative flex min-h-[64vh] flex-col justify-center py-14 md:min-h-[78vh] md:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-10 hidden select-none font-serif text-[18vw] leading-none text-ink/[0.03] md:block"
          >
            03
          </div>

          <div className="relative">
            <p className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/40">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
              Our vision
            </p>

            <h2
              data-vision-type
              className="relative max-w-[19ch] font-serif text-[clamp(2.15rem,6.2vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance"
            >
              {/* Faint setting: the full statement, always legible. */}
              <span className="block text-ink/[0.13]">{VISION_STATEMENT}</span>
              {/* Ink wipes over it, tied to scroll. */}
              <span
                ref={fill}
                aria-hidden="true"
                className="absolute inset-0 block text-ink"
                style={{ clipPath: "inset(0 0 100% 0)" }}
              >
                {VISION_STATEMENT}
              </span>
            </h2>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-ink/15 pt-5 md:mt-14">
              <p className="max-w-[34ch] font-sans text-[15px] leading-[1.6] text-forest/70">
                A House of Grace. A People of Purpose. We get better every day.
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
                Scroll to fill
                <span aria-hidden="true" className="ml-2 inline-block text-brand-green">
                  ↓
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Four pillars ── */}
        <div className="pb-20 md:pb-28">
          <div className="mb-2 flex items-baseline justify-between border-b border-ink/12 pb-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40">
              Four words we live by
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/30">
              01 — 04
            </p>
          </div>

          {PILLARS.map((pillar, index) => {
            const flip = index % 2 === 1;
            return (
              <article
                key={pillar.id}
                data-pillar
                className="group relative border-b border-ink/12 py-9 md:py-12"
              >
                <div className="grid grid-cols-12 items-center gap-x-3 gap-y-5 md:gap-x-6">
                  <div
                    className={cn(
                      "col-span-12 md:row-start-1",
                      flip
                        ? "md:col-span-3 md:col-start-1"
                        : "md:col-span-4 md:col-start-9"
                    )}
                  >
                    <figure
                      data-pillar-art
                      className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden bg-mist md:mx-0"
                      style={{
                        borderTopLeftRadius: 999,
                        borderTopRightRadius: 999,
                        clipPath: "inset(100% 0 0 0)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(201,245,218,0.55) 0%, rgba(255,255,255,0.2) 46%, rgba(255,227,222,0.55) 100%)",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-3 -right-1 font-serif text-[4.6rem] leading-none text-ink/10"
                      >
                        {pillar.mark}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ArtSlot
                          name={pillar.art}
                          size={124}
                          color="green"
                          className="opacity-90"
                        />
                      </div>
                      <div className="grain absolute inset-0" aria-hidden="true" />
                      <div
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15"
                        style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
                        aria-hidden="true"
                      />
                      <figcaption className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.16em] text-ink/45">
                        <span>Fig. {pillar.mark}</span>
                        <span>{pillar.art}</span>
                      </figcaption>
                    </figure>
                  </div>

                  <div
                    className={cn(
                      "col-span-12 md:row-start-1",
                      flip
                        ? "md:col-span-9 md:col-start-4"
                        : "md:col-span-8 md:col-start-1"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/35">
                        {pillar.mark} / 04
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-ink/25 md:block"
                      >
                        {pillar.id.replace("-", " ")}
                      </span>
                    </div>

                    <h3
                      data-pillar-word
                      className="relative mt-1 max-w-full break-words font-serif text-[clamp(2.5rem,9vw,7.2rem)] font-medium leading-[0.88] tracking-[-0.045em]"
                    >
                      <span
                        className="block text-transparent"
                        style={{ WebkitTextStroke: "0.016em rgba(7,19,13,0.26)" }}
                      >
                        {pillar.word}
                      </span>
                      <span
                        data-pillar-fill
                        aria-hidden="true"
                        className="absolute inset-0 block text-ink"
                        style={{ clipPath: "inset(0 100% 0 0)" }}
                      >
                        {pillar.word}
                      </span>
                    </h3>

                    <p className="mt-4 max-w-[46ch] font-sans text-[15px] leading-[1.62] text-forest/75 md:mt-5 md:text-[16px]">
                      {pillar.line}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
