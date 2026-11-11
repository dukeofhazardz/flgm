"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { Pending } from "@/components/ui/pending";
import { WELCOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeWelcome — the welcome letter, set as a magazine spread.
 *
 * One drop cap, two text columns, a giant pull-quote, and a designed
 * "details coming soon" card for the Chief Pastor's note. No name is invented.
 * The pull-quote drifts word-by-word against the scroll; a hairline rule sews
 * the two columns together.
 */
export function HomeWelcome(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const quote = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-letter-drift]").forEach((line, i) => {
        gsap.fromTo(
          line,
          { xPercent: i % 2 === 0 ? 3 : -3 },
          {
            xPercent: i % 2 === 0 ? -3 : 3,
            ease: "none",
            scrollTrigger: {
              trigger: quote.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          }
        );
      });

      const rule = section.querySelector<HTMLElement>("[data-letter-rule]");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rule.parentElement,
              start: "top 82%",
              end: "bottom 55%",
              scrub: 0.7,
            },
          }
        );
      }

      gsap.fromTo(
        "[data-letter-rise]",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="welcome"
      data-section="welcome"
      data-header-theme="light"
      className="relative overflow-hidden bg-mist text-ink"
    >
      {/* A single warm horizon bleeding in from the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,227,222,0.9) 0%, rgba(196,209,32,0.45) 45%, rgba(255,255,255,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 04 — Welcome</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block md:text-left">
            A letter to the house
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 04 / 10
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-14">
          {/* ── Letter ── */}
          <div className="col-span-12 lg:col-span-8">
            <p
              data-letter-rise
              className="font-serif text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium italic leading-none tracking-[-0.02em] text-deep-green"
            >
              {WELCOME.salutation}
            </p>

            <h2
              data-letter-rise
              className="mt-5 max-w-[16ch] font-serif text-[clamp(2.2rem,5.6vw,5rem)] font-medium leading-[0.94] tracking-[-0.035em] text-balance"
            >
              Welcome to Forever Life <span className="italic">and Grace</span> Mission
            </h2>

            <div className="relative mt-8 md:mt-10">
              <div className="letter-columns columns-1 gap-10 font-sans text-[17px] leading-[1.62] text-deep-green md:columns-2 md:gap-12 md:text-[17.5px]">
                {WELCOME.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={
                      index === 0
                        ? "mb-5 first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[5.4rem] first-letter:font-medium first-letter:leading-[0.68] first-letter:tracking-[-0.05em] first-letter:text-ink"
                        : "mb-5"
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                {/* A hairline that sews the spread together. */}
                <span
                  aria-hidden="true"
                  data-letter-rule
                  className="absolute -left-5 top-0 hidden h-full w-px origin-top bg-brand-green/50 md:block"
                />
              </div>

              <p className="mt-4 border-t border-ink/12 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
                Welcome message · Forever Life and Grace Mission
              </p>
            </div>
          </div>

          {/* ── Pastor's note — pending, no names ── */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10">
            <div className="relative overflow-hidden bg-forest p-6 text-white md:p-7">
              {/* Arch study, drawn in hairlines. */}
              <svg
                viewBox="0 0 220 300"
                fill="none"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] w-full opacity-40"
                aria-hidden="true"
              >
                <path
                  d="M35 300V132C35 83 68.6 43 110 43s75 40 75 89v168"
                  stroke="#C4D120"
                  strokeWidth="1"
                />
                <path
                  d="M62 300V140c0-35 21.5-63 48-63s48 28 48 63v160"
                  stroke="#C4D120"
                  strokeWidth="0.6"
                  strokeDasharray="3 5"
                />
                <path d="M35 300h150" stroke="#C4D120" strokeWidth="1" />
              </svg>
              <div className="grain absolute inset-0" aria-hidden="true" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
                  <SectionTag className="text-dawn-mint/92">A note from the Chief Pastor</SectionTag>
                </div>

                <p className="mt-5 max-w-[20ch] font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.05] tracking-[-0.025em]">
                  A word for the family is being prepared.
                </p>
                <p className="mt-3 max-w-[30ch] font-sans text-[13px] leading-[1.6] text-white/86">
                  This issue will carry the pastoral letter once it is approved.
                </p>

                <Pending
                  confirmed={false}
                  label="Details coming soon"
                  className="mt-6 justify-start border-0 bg-transparent px-0 py-0 text-[10px] tracking-[0.16em] text-dawn-mint/92"
                />

                <div className="mt-8 border-t border-white/15 pt-4">
                  <span aria-hidden="true" className="block h-px w-20 bg-dawn-mint/50" />
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/72">
                    Chief Pastor · Forever Life and Grace Mission
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-right font-mono text-[8px] uppercase tracking-[0.18em] text-ink/35">
              Fig. 04 — Pastoral note
            </p>
          </aside>
        </div>

        {/* ── Pull-quote ── */}
        <div ref={quote} className="mt-14 border-t border-ink/12 pt-8 md:mt-20 md:pt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <blockquote className="max-w-[18ch] font-serif text-[clamp(2.6rem,8.6vw,8.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              <span data-letter-drift className="block will-change-transform">
                We are <span className="italic">glad</span>
              </span>
              <span data-letter-drift className="block will-change-transform">
                you are here.
              </span>
            </blockquote>

            <div className="flex flex-col items-start gap-3 pb-2">
              <span aria-hidden="true" className="h-px w-16 bg-signal-red md:w-24" />
              <p className="max-w-[24ch] font-sans text-[13px] leading-[1.6] text-ink/55">
                From the welcome message to every visitor who finds us online.
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
                {WELCOME.salutation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
