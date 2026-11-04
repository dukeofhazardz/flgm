import * as React from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

/**
 * WatchCommunity — the 12,000 community target as four platform rings.
 *
 * These are goals, not reported totals: every ring is drawn as an open target
 * with a 3,000 mark and a "goal" label. No progress is implied or invented.
 */

function GoalRing({
  platform,
  target,
}: {
  platform: string;
  target: number;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative aspect-square w-full max-w-[230px]">
        <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" aria-hidden="true">
          <circle cx="110" cy="110" r="104" stroke="#07130D" strokeOpacity="0.08" />
          <circle
            cx="110"
            cy="110"
            r="94"
            stroke="#07130D"
            strokeOpacity="0.22"
            strokeDasharray="1 6"
          />
          <circle cx="110" cy="110" r="78" stroke="#07130D" strokeOpacity="0.09" />

          {/* Twelve goal ticks; the top tick is the green aim. */}
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
            const x1 = 110 + Math.cos(angle) * 84;
            const y1 = 110 + Math.sin(angle) * 84;
            const x2 = 110 + Math.cos(angle) * 92;
            const y2 = 110 + Math.sin(angle) * 92;
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={index === 0 ? "#00C853" : "#07130D"}
                strokeOpacity={index === 0 ? 1 : 0.2}
                strokeWidth={index === 0 ? 2.4 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* A small green aim arc, fixed at the top: no invented progress. */}
          <path
            d="M110 18a92 92 0 0 1 46 12"
            stroke="#00C853"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="110" cy="18" r="2.4" fill="#FC0000" />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-medium leading-none tracking-[-0.05em] text-ink tabular-nums">
            {target.toLocaleString("en-GB")}
          </span>
          <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-ink/40">
            Goal
          </span>
        </div>
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55">
        {platform}
      </p>
    </div>
  );
}

export function WatchCommunity(): React.ReactElement {
  return (
    <section
      id="community"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 06 — Community</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            A goal, not a scoreboard
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 09 / 10
          </Folio>
        </header>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5">
            <h2 className="max-w-[8ch] font-serif text-[clamp(3.4rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em] tabular-nums">
              12,000
            </h2>
            <p className="mt-2 max-w-[18ch] font-serif text-[clamp(1.4rem,3vw,2.1rem)] font-medium italic leading-[1.1] tracking-[-0.02em] text-forest">
              followers and active members across four platforms
            </p>

            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.62] text-forest/70">
              The outreach sets a 3,000-person goal on each platform across the
              fifty days: a community to pray with, return to, and grow in grace.
            </p>

            <p className="mt-6 max-w-[34ch] border-t border-ink/15 pt-4 font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.14em] text-ink/40">
              Each ring is a target for the fifty days, not a reported total.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-l border-ink/10 pl-5 sm:gap-x-8 sm:pl-8 lg:grid-cols-4">
              {WATCH_AND_PRAY.community.platforms.map((platform) => (
                <GoalRing
                  key={platform.platform}
                  platform={platform.platform}
                  target={platform.target}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
