"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { MISSION } from "@/data/mission";
import { cn } from "@/lib/utils";

function splitMission(description: string): { title: string; body: string } {
  const separator = description.indexOf(": ");
  if (separator === -1) return { title: description, body: "" };
  return {
    title: description.slice(0, separator),
    body: description.slice(separator + 2),
  };
}

/**
 * AboutMission — six numbered rows with a sticky progress index.
 *
 * The index is a real reading rail: its line fills as the reader passes each
 * row, and the active number is marked. Position animation is transform only.
 */
export function AboutMission(): React.ReactElement {
  const [active, setActive] = useState(0);
  const rows = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = rows.current.filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.missionIndex);
          if (Number.isFinite(index)) setActive(index);
        });
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      data-section="about-mission"
      data-header-theme="light"
      className="relative bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 04 — Our mission</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Six ways we work out the vision
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 04 / 06
          </Folio>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-14">
          <h2 className="max-w-[11ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            What we <span className="italic">do.</span>
          </h2>
          <p className="max-w-[34ch] text-[15px] leading-[1.62] text-deep-green md:text-[16px]">
            Our mission is the vision in motion: six commitments that shape the
            teaching, the fellowship, and the life of the house.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-3 md:mt-14 md:gap-x-6">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/35">
                The index
              </p>

              <div className="mt-5 flex gap-5">
                <span
                  aria-hidden="true"
                  className="relative block w-px shrink-0 bg-ink/15"
                  style={{ minHeight: 220 }}
                >
                  <span
                    className="absolute inset-x-0 top-0 block origin-top bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      height: "100%",
                      transform: `scaleY(${(active + 1) / MISSION.length})`,
                    }}
                  />
                </span>

                <ol className="flex flex-col gap-3.5">
                  {MISSION.map((item, index) => {
                    const { title } = splitMission(item.description);
                    return (
                      <li key={item.id}>
                        <a
                          href={`#mission-${item.id}`}
                          aria-current={active === index ? "step" : undefined}
                          className={cn(
                            "group flex items-baseline gap-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors",
                            active === index
                              ? "text-ink"
                              : "text-ink/35 hover:text-ink/70"
                          )}
                        >
                          <span
                            className={cn(
                              "w-4 tabular-nums transition-colors",
                              active === index ? "text-crimson-text" : "text-ink/30"
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="max-w-[26ch] leading-[1.6]">{title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <p className="mt-7 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/25">
                {String(active + 1).padStart(2, "0")} / 06
              </p>
            </div>
          </aside>

          <div className="col-span-12 border-t border-ink/20 lg:col-span-8 lg:col-start-5">
            {MISSION.map((item, index) => {
              const { title, body } = splitMission(item.description);
              const isActive = active === index;

              return (
                <article
                  key={item.id}
                  id={`mission-${item.id}`}
                  data-mission-index={index}
                  ref={(node) => {
                    rows.current[index] = node;
                  }}
                  className={cn(
                    "group scroll-mt-28 border-b border-ink/15 px-1 py-6 transition-colors duration-300 md:grid md:grid-cols-12 md:items-baseline md:gap-x-4 md:py-8",
                    isActive ? "bg-white/70" : "bg-transparent"
                  )}
                >
                  <p
                    className={cn(
                      "font-serif text-[clamp(3rem,7vw,7.2rem)] font-medium leading-[0.82] tracking-[-0.06em] tabular-nums transition-colors duration-300 md:col-span-2",
                      isActive ? "text-brand-green" : "text-ink/20"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="mt-3 md:col-span-10 md:mt-0">
                    <h3 className="max-w-[25ch] font-serif text-[clamp(1.55rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[54ch] text-[16px] leading-[1.62] text-deep-green md:text-[17px]">
                      {body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
