import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { LiteYouTube } from "@/components/ui/lite-youtube";
import { SectionTag } from "@/components/ui/section-tag";
import { WATCH_AND_PRAY } from "@/data/watchAndPray";

/**
 * WatchRecordings — the replays archive.
 *
 * When approved recordings exist, each one renders as a lite YouTube embed.
 * Today the archive holds none, so the page shows a composed empty state with
 * the archive's structure — never a blank panel.
 */

export function WatchRecordings(): React.ReactElement {
  const recordings = WATCH_AND_PRAY.recordings;

  return (
    <section
      id="recordings"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 07 — Archive</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Sessions · scriptures · testimonies
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 10 / 10
          </Folio>
        </header>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-14">
          <h2 className="max-w-[13ch] font-serif text-[clamp(2.7rem,6.4vw,6rem)] font-medium leading-[0.94] tracking-[-0.045em]">
            The <span className="italic">archive</span>
          </h2>
          <p className="max-w-[36ch] text-[15px] leading-[1.6] text-deep-green">
            Daily sessions, themes, scriptures, testimonies, declarations, and
            programme summaries will be kept here.
          </p>
        </div>

        {recordings.length > 0 ? (
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2">
            {recordings.map((recording) => (
              <article key={recording.id}>
                {recording.youtubeId ? (
                  <LiteYouTube
                    videoId={recording.youtubeId}
                    title={recording.title}
                  />
                ) : null}
                <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                  <h3 className="font-serif text-[1.4rem] font-medium leading-tight tracking-[-0.02em]">
                    {recording.title}
                  </h3>
                  <time className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/40">
                    {recording.date}
                  </time>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-10 border-t border-ink/15 pt-8 md:mt-14 md:grid-cols-12 md:gap-8 md:pt-10">
            <div className="md:col-span-6">
              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                Archive status
                <span className="mx-1 hidden text-ink/20 sm:inline" aria-hidden="true">
                  /
                </span>
                No recordings published yet
              </p>

              <h3 className="mt-6 max-w-[15ch] font-serif text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                The first morning is still <span className="italic">ahead</span>.
              </h3>

              <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.62] text-deep-green">
                Recordings will appear here as the programme begins: the daily
                prayer sessions, the theme and scripture for each day, testimonies,
                prayer declarations, and links to the replays.
              </p>

              <div className="mt-8 grid max-w-[420px] grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40">
                    Programme
                  </p>
                  <p className="mt-1.5 font-serif text-[1.15rem] font-medium leading-tight">
                    11 Nov — 30 Dec 2026
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40">
                    Daily
                  </p>
                  <p className="mt-1.5 font-serif text-[1.15rem] font-medium leading-tight">
                    5:30 AM WAT
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#join"
                  className="inline-flex min-h-11 items-center gap-2 bg-night px-5 py-3 font-sans text-[14px] font-medium text-white transition-colors duration-200 hover:bg-forest"
                >
                  Join the daily prayer
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
                <Link
                  href="/watch-and-pray/calendar"
                  className="inline-flex min-h-11 items-center gap-2 border border-ink/30 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/70 transition-colors duration-200 hover:border-ink hover:bg-mist"
                >
                  Add to calendar
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <figure>
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden bg-night"
                  style={{
                    borderTopLeftRadius: 999,
                    borderTopRightRadius: 999,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #02600D 0%, #408609 34%, #33A402 68%, #33A402 88%, #C4D120 100%)",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-70"
                    style={{
                      background:
                        "radial-gradient(60% 45% at 50% 78%, rgba(196,209,32,0.55) 0%, rgba(196,209,32,0) 70%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArtSlot name="book" size={170} color="white" className="opacity-90" />
                  </div>
                  <div className="grain absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-x-5 top-[26%] flex items-start justify-between font-mono text-[7.5px] uppercase tracking-[0.18em] text-white/86">
                    <span>Fig. 07</span>
                    <span>Kept mornings</span>
                  </div>
                  <p className="absolute inset-x-5 bottom-6 font-serif text-[clamp(1.4rem,3vw,2.1rem)] font-medium italic leading-[1.05] tracking-[-0.02em] text-white">
                    Every morning, kept.
                  </p>
                </div>
                <figcaption className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                  The archive will open with the first session.
                </figcaption>
              </figure>
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-ink/15 pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
              What the archive holds
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/30">
              Date → Theme → Recording → Scripture → Testimony → Resources
            </p>
          </div>
          <ol className="mt-4 grid grid-cols-2 border-l border-t border-ink/12 sm:grid-cols-3 lg:grid-cols-6">
            {WATCH_AND_PRAY.archiveStructure.map((item, index) => (
              <li
                key={item}
                className="border-b border-r border-ink/12 p-3 md:p-4"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-serif text-[1.05rem] font-medium leading-tight tracking-[-0.01em] text-ink/85">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
