"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { Folio } from "@/components/ui/folio";
import { ArtSlot } from "@/components/ui/art-slot";
import { NEXT_STEPS, STEP_FIELDS } from "@/data/home";
import { cn } from "@/lib/utils";

/**
 * HomeNextStep — five oversized routes into the life of the church.
 *
 * Hover (or keyboard focus) swaps the whole field colour, slides an arch study
 * out of the row, and turns the big arrow. On narrow screens the first tap
 * expands the row; the second tap follows the link.
 */
export function HomeNextStep(): React.ReactElement {
  const root = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = NEXT_STEPS.find((step) => step.id === activeId);
  const field = STEP_FIELDS[active?.tone ?? "white"];
  const border = `${field.foreground}24`;

  // Let the header re-read the section theme when the field changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("scroll"));
    }
  }, [field.dark]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (!narrow) return;
    if (openId !== id) {
      event.preventDefault();
      setOpenId(id);
      setActiveId(id);
    }
  };

  return (
    <section
      ref={root}
      id="next-step"
      data-section="next-step"
      data-header-theme={field.dark ? "dark" : "light"}
      className="relative overflow-hidden transition-[background-color,color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{ backgroundColor: field.background, color: field.foreground }}
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-24 lg:px-10 lg:py-28">
        <header
          className="grid grid-cols-12 items-baseline gap-3 border-b pb-5 md:gap-6"
          style={{ borderColor: border }}
        >
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag
              className={cn(field.dark ? "text-dawn-mint/65" : "text-ink/45")}
            >
              § 08 — Next Step
            </SectionTag>
            <span
              aria-hidden="true"
              className="hidden h-px w-14 md:block"
              style={{ backgroundColor: border }}
            />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] opacity-40 md:col-span-4 md:block md:text-left">
            There is a place for you
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] opacity-40 md:col-span-2">
            No. 08 / 10
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-6 md:mt-12">
          <h2 className="col-span-12 max-w-[15ch] font-serif text-[clamp(2.4rem,6vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.04em] md:col-span-7">
            Take your <span className="italic">next step.</span>
          </h2>
          <p className="col-span-12 max-w-[34ch] font-sans text-[15px] leading-[1.6] opacity-65 md:col-span-4 md:col-start-9">
            Plan a visit, join the family, watch online, send a prayer request, or serve.
          </p>
        </div>

        {/* ── Rows ── */}
        <div className="mt-8 md:mt-12" onMouseLeave={() => setActiveId(null)}>
          {NEXT_STEPS.map((step, index) => {
            const isOpen = narrow && openId === step.id;
            const isActive = activeId === step.id;

            return (
              <div
                key={step.id}
                className="border-t"
                style={{ borderColor: border }}
              >
                <Link
                  href={step.href}
                  onClick={(event) => handleClick(event, step.id)}
                  onMouseEnter={() => setActiveId(step.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(step.id)}
                  onBlur={() => setActiveId(null)}
                  aria-expanded={narrow ? isOpen : undefined}
                  className="group relative flex items-center gap-4 py-6 md:gap-8 md:py-8 lg:py-9"
                >
                  <span className="w-7 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] opacity-40 md:w-10">
                    0{index + 1}
                  </span>

                  <div
                    className="min-w-0 flex-1 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:pr-32"
                    style={{ transform: isActive ? "translateX(10px)" : "translateX(0)" }}
                  >
                    <h3 className="max-w-[22ch] font-serif text-[clamp(1.65rem,4.6vw,4.2rem)] font-medium leading-[0.95] tracking-[-0.035em]">
                      {step.label}
                    </h3>
                    <p className="mt-1.5 hidden max-w-[46ch] font-sans text-[14px] leading-[1.55] opacity-55 md:block">
                      {step.note}
                    </p>
                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] opacity-40 md:hidden">
                      {narrow ? (isOpen ? "Tap again to continue" : "Tap to open") : ""}
                    </p>
                  </div>

                  {/* Art slot — desktop hover reveal */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-16 top-1/2 hidden h-24 w-24 overflow-hidden md:block md:h-28 md:w-28 lg:right-24 lg:h-32 lg:w-32"
                    style={{
                      borderTopLeftRadius: 999,
                      borderTopRightRadius: 999,
                      clipPath: isActive ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                      transform: isActive
                        ? "translateY(-50%) rotate(-3deg)"
                        : "translateY(-42%) rotate(4deg)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "clip-path 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1), opacity 300ms ease-out",
                    }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background: field.dark
                          ? "linear-gradient(180deg, rgba(201,245,218,0.34) 0%, rgba(11,59,36,0.55) 52%, rgba(0,200,83,0.28) 100%)"
                          : "linear-gradient(180deg, rgba(201,245,218,0.55) 0%, rgba(255,255,255,0.14) 52%, rgba(255,227,222,0.5) 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ArtSlot
                        name={step.art}
                        color={field.dark ? "white" : "ink"}
                        size={84}
                        className="opacity-85"
                      />
                    </div>
                    <div className="grain absolute inset-0" />
                    <div
                      className="absolute inset-0 ring-1 ring-current ring-inset"
                      style={{
                        borderTopLeftRadius: 999,
                        borderTopRightRadius: 999,
                        color: field.dark ? "rgba(255,255,255,0.28)" : border,
                      }}
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center md:h-14 md:w-14"
                  >
                    <ArrowUpRight
                      className="h-8 w-8 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:h-10 md:w-10"
                      strokeWidth={1.1}
                      style={{ transform: isActive ? "rotate(45deg)" : "rotate(0deg)" }}
                    />
                  </span>
                </Link>

                {/* Mobile expansion — rendered on tap; only transform/opacity animate. */}
                <div className="md:hidden">
                  {isOpen && (
                    <div className="panel-in flex items-center gap-4 pb-6 pl-11">
                      <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden"
                        style={{
                          borderTopLeftRadius: 999,
                          borderTopRightRadius: 999,
                          background: field.dark
                            ? "linear-gradient(180deg, rgba(201,245,218,0.34) 0%, rgba(11,59,36,0.55) 52%, rgba(0,200,83,0.28) 100%)"
                            : "linear-gradient(180deg, rgba(201,245,218,0.5) 0%, rgba(255,255,255,0.12) 52%, rgba(255,227,222,0.5) 100%)",
                        }}
                        aria-hidden="true"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ArtSlot
                            name={step.art}
                            color={field.dark ? "white" : "ink"}
                            size={58}
                          />
                        </div>
                        <div className="grain absolute inset-0" />
                      </div>
                      <p className="max-w-[34ch] font-sans text-[14px] leading-[1.55] opacity-65">
                        {step.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="border-t" style={{ borderColor: border }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">
            Five doors · one family
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">
            Hover a row to change the room
          </p>
        </div>
      </div>
    </section>
  );
}
