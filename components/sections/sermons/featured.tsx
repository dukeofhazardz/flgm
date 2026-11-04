import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Play } from "lucide-react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { LiteYouTube } from "@/components/ui/lite-youtube";
import { SectionTag } from "@/components/ui/section-tag";
import { FEATURED_SERMON, SERMON_CATEGORIES, type Sermon } from "@/data/sermons";

function categoryLabel(sermon: Sermon): string {
  return (
    SERMON_CATEGORIES.find((category) => category.id === sermon.category)?.label ??
    "Message"
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function FeaturedPlayer({ sermon }: { sermon: Sermon }): React.ReactElement {
  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-8 md:gap-x-6">
      <div className="col-span-12 md:col-span-7">
        {sermon.youtubeId ? (
          <LiteYouTube videoId={sermon.youtubeId} title={sermon.title} />
        ) : (
          <div className="relative aspect-video overflow-hidden bg-night">
            <div className="absolute inset-0 flex items-center justify-center opacity-35">
              <ArtSlot name="book" size={260} color="white" />
            </div>
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                Audio message
              </p>
              <p className="mt-2 max-w-[22ch] font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.02em] text-white">
                {sermon.title}
              </p>
              {sermon.audioUrl ? (
                <audio controls src={sermon.audioUrl} className="mt-5 w-full max-w-[420px]">
                  Your browser does not support the audio element.
                </audio>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <div className="col-span-12 flex flex-col md:col-span-5">
        <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-crimson-text">
          Featured message · {categoryLabel(sermon)}
        </p>
        <h2 className="mt-3 max-w-[18ch] font-serif text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink">
          {sermon.title}
        </h2>
        <p className="mt-4 font-mono text-[9px] uppercase leading-[1.8] tracking-[0.16em] text-ink/40">
          {sermon.speaker} · {sermon.speakerRole}
          <br />
          {formatDate(sermon.date)} · {sermon.service}
        </p>
        <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.62] text-forest/75">
          {sermon.description}
        </p>
        {sermon.scripture.length > 0 ? (
          <p className="mt-4 font-serif text-[1.1rem] italic leading-[1.5] text-forest/80">
            {sermon.scripture.join(" · ")}
          </p>
        ) : null}
        <Link
          href="#library"
          className="mt-auto inline-flex min-h-11 items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-ink"
        >
          <Play className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Open the archive
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function EmptyFeature(): React.ReactElement {
  return (
    <div className="grid grid-cols-12 items-end gap-x-3 gap-y-8 md:gap-x-6">
      <div className="col-span-12 md:col-span-7">
        <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/35">
          <span className="block h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
          Featured message
        </p>
        <p className="mt-4 max-w-[14ch] font-serif text-[clamp(2.8rem,7.2vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.05em] text-ink">
          The first word is <span className="italic">on its way.</span>
        </p>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.62] text-forest/72 md:text-[17px]">
          The FLGM message library is being prepared. When the church publishes
          the first message, it will be featured here with the speaker, date,
          Scripture, and video.
        </p>
        <Link
          href="/watch-and-pray"
          className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65 transition-colors hover:text-ink"
        >
          Watch and Pray
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
        </Link>
      </div>

      <figure className="col-span-12 mx-auto w-full max-w-[320px] md:col-span-4 md:col-start-9 md:mx-0 md:ml-auto md:max-w-[360px]">
        <div
          className="relative aspect-[4/5] overflow-hidden bg-forest"
          style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #04180F 0%, #0B3B24 42%, #00C853 78%, #C9F5DA 100%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(70% 52% at 50% 90%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 76%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <ArtSlot
              name="book"
              size={280}
              color="white"
              className="translate-y-4 opacity-90"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute left-2 top-10 select-none font-serif text-[8rem] font-medium leading-none text-night/20"
          >
            00
          </span>
          <div className="grain absolute inset-0" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25"
            style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-night/55 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-white/80">
            <span>Fig. 01 — The Word</span>
            <span className="hidden lg:inline">Awaiting first publication</span>
          </div>
        </div>
      </figure>
    </div>
  );
}

/**
 * FeaturedMessage — the featured slot.
 *
 * With a confirmed sermon it renders a lite video (or audio) plus the full
 * metadata. With no approved message it renders a designed editorial holding
 * page — no invented title, speaker, or Scripture.
 */
export function FeaturedMessage(): React.ReactElement {
  return (
    <section
      id="featured"
      data-section="sermons-featured"
      data-header-theme="light"
      className="relative overflow-x-clip bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 02 — Featured message</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            One message, held up for the week
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 02 / 03
          </Folio>
        </header>

        <div className="mt-10 md:mt-14">
          {FEATURED_SERMON ? (
            <FeaturedPlayer sermon={FEATURED_SERMON} />
          ) : (
            <EmptyFeature />
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/35">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            Published with church approval
          </p>
          <p>Forever Life and Grace Mission · Gwarinpa</p>
        </div>
      </div>
    </section>
  );
}
