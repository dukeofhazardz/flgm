import { WatchHero } from "@/components/sections/watch-and-pray/hero";
import { WatchState } from "@/components/sections/watch-and-pray/watch-state";
import { WatchProgramme } from "@/components/sections/watch-and-pray/programme";
import { WatchSchedule } from "@/components/sections/watch-and-pray/schedule";
import { WatchLedger } from "@/components/sections/watch-and-pray/ledger";
import { WatchThemes } from "@/components/sections/watch-and-pray/themes";
import { WatchJoin } from "@/components/sections/watch-and-pray/join";
import { WatchCommunity } from "@/components/sections/watch-and-pray/community";
import { WatchRecordings } from "@/components/sections/watch-and-pray/recordings";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

export const metadata = {
  title: "Watch and Pray — 11 November to 30 December 2026",
  description:
    "Fifty mornings of strategic prayer, worship, testimony, and digital outreach. Daily at 5:30 AM WAT, 11 November — 30 December 2026.",
  openGraph: {
    title: "Watch and Pray — Fifty mornings of prayer and outreach",
    description: WATCH_AND_PRAY.theme,
    type: "website" as const,
  },
};

/**
 * Watch and Pray — a fifty-day prayer and testimony outreach.
 *
 * Night (the hero and the live hour) → white (the programme) → mist (the daily
 * order) → night (the fifty-day ledger) → white (themes) → forest (the
 * invitation) → mist (the community goal) → white (the archive). The clock is
 * read from Africa/Lagos; the page never presumes a visitor is in Abuja.
 *
 * The page is the composition layer only. All programme facts live in
 * `data/watchAndPray.ts`; all time logic lives in `lib/watch-and-pray.ts`.
 */

export default function WatchAndPrayPage() {
  return (
    <main>
      <WatchHero />

      {/* ── The hour, read live from Africa/Lagos ── */}
      <section
        id="now"
        data-header-theme="dark"
        className="relative overflow-x-clip bg-night text-white"
      >
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-80"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 0%, rgba(0,200,83,0.1) 0%, rgba(0,200,83,0) 72%)",
          }}
        />

        <div className="relative mx-auto max-w-[1680px] px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:px-10">
          <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/12 pb-5 md:gap-6">
            <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                § 00 — The Hour
              </span>
              <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
            </div>
            <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:col-span-4 md:block">
              Africa/Lagos · UTC+01
            </p>
            <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:col-span-2">
              Live state
            </span>
          </header>

          <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-12 md:items-end md:gap-6">
            <p className="max-w-[16ch] font-serif text-[clamp(1.7rem,3.4vw,2.7rem)] font-medium italic leading-[1.06] tracking-[-0.025em] text-white/90 md:col-span-6">
              The watch, in real time.
            </p>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] text-white/55 md:col-span-5 md:col-start-8">
              The hour below is read from Abuja. Before the first morning it
              counts down; through the fifty days it names the day; after the
              last it holds the replays.
            </p>
          </div>

          <div className="mt-7 md:mt-8">
            <WatchState />
          </div>
        </div>
      </section>

      <WatchProgramme />
      <WatchSchedule />
      <WatchLedger />
      <WatchThemes />
      <WatchJoin />
      <WatchCommunity />
      <WatchRecordings />
    </main>
  );
}
