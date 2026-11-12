"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { LiteYouTube } from "@/components/ui/lite-youtube";
import { SectionTag } from "@/components/ui/section-tag";
import {
  SERMONS,
  SERMON_CATEGORIES,
  type Sermon,
  type SermonCategoryId,
} from "@/data/sermons";
import { cn } from "@/lib/utils";

type Filter = "all" | SermonCategoryId;

function categoryLabel(id: SermonCategoryId): string {
  return SERMON_CATEGORIES.find((category) => category.id === id)?.label ?? "Message";
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function SermonCard({ sermon }: { sermon: Sermon }): React.ReactElement {
  return (
    <article className="group flex h-full flex-col border border-ink/12 bg-white">
      {sermon.youtubeId ? (
        <LiteYouTube videoId={sermon.youtubeId} title={sermon.title} />
      ) : (
        <div className="relative aspect-video overflow-hidden border-b border-ink/10 bg-tint-white">
          <div className="absolute inset-0 flex items-center justify-center opacity-45">
            <ArtSlot name="book" size={190} color="ink" />
          </div>
          <p className="absolute inset-x-4 bottom-3 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/60">
            Audio message
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-crimson-text">
            {categoryLabel(sermon.category)}
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/35">
            {formatDate(sermon.date)}
          </p>
        </div>

        <h3 className="mt-3 max-w-[24ch] font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          {sermon.title}
        </h3>
        <p className="mt-2 font-mono text-[8.5px] uppercase leading-[1.7] tracking-[0.14em] text-ink/40">
          {sermon.speaker} · {sermon.speakerRole}
        </p>
        <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.58] text-deep-green">
          {sermon.description}
        </p>
        {sermon.scripture.length > 0 ? (
          <p className="mt-3 font-serif text-[1rem] italic leading-[1.5] text-deep-green">
            {sermon.scripture.join(" · ")}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/35">
            {sermon.service}
          </span>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink/55"
          >
            <BookOpen className="h-4 w-4" strokeWidth={1.4} />
          </span>
        </div>
      </div>
    </article>
  );
}

function EmptyArchive({
  isArchiveEmpty,
  filtered,
}: {
  isArchiveEmpty: boolean;
  filtered: boolean;
}): React.ReactElement {
  return (
    <div className="relative mt-8 overflow-hidden border border-ink/12 bg-mist text-ink md:mt-10">
      <div className="relative grid grid-cols-12 items-center gap-x-3 gap-y-8 p-5 md:gap-x-6 md:p-9 lg:p-11">
        <div className="col-span-12 md:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/50">
            <span className="h-1.5 w-1.5 bg-signal-red" aria-hidden="true" />
            {isArchiveEmpty ? "The archive · 00 messages" : "No matching messages"}
          </p>

          <p className="mt-4 max-w-[13ch] font-serif text-[clamp(2.5rem,7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            {isArchiveEmpty ? (
              <>
                A quiet archive, <span className="italic text-deep-green">for now.</span>
              </>
            ) : (
              <>
                Nothing here <span className="italic text-deep-green">yet.</span>
              </>
            )}
          </p>

          <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.62] text-ink/70 md:text-[16px]">
            {isArchiveEmpty
              ? "The FLGM message library is being prepared. The first published message will appear here with its speaker, date, Scripture, and video — nothing is staged or invented in the meantime."
              : "No published message matches this search or category. Try another word, or return to the full library."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {filtered ? (
              <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/50">
                Clear the filter above to see everything
              </span>
            ) : (
              <Link
                href="/watch-and-pray"
                className="inline-flex min-h-11 items-center gap-2 border border-ink/30 px-3.5 py-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/80 transition-colors hover:border-brand-green hover:text-ink"
              >
                Watch and Pray
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            )}
          </div>

          <p className="mt-6 max-w-[48ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.16em] text-ink/45">
            Messages are published with church approval. Audio, video, and
            transcripts will live with each published message.
          </p>
        </div>

        <figure className="col-span-10 col-start-2 mx-auto w-full max-w-[280px] md:col-span-4 md:col-start-9 md:max-w-none">
          <div
            className="relative aspect-[4/5] overflow-hidden border border-ink/12 bg-tint-white"
            style={{ borderTopLeftRadius: 999, borderTopRightRadius: 999 }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #F4F9EC 0%, #F8FCEF 48%, #EAF1DE 82%, #DDEBC4 100%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(62% 50% at 50% 92%, rgba(196,209,32,0.35) 0%, rgba(196,209,32,0) 76%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ArtSlot name="rays" size={210} color="ink" className="opacity-70" />
            </div>
            <span
              aria-hidden="true"
              className="absolute left-2 top-9 select-none font-serif text-[clamp(5rem,12vw,8rem)] font-medium leading-none text-ink/10"
            >
              00
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
              <span>Fig. 01 — The open page</span>
              <span>Ready</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  );
}

/**
 * SermonLibrary — eight chips, live search, and the future card grid.
 *
 * At launch `SERMONS` is empty, so the designed empty state is the main
 * composition. When approved messages arrive, the same controls filter a card
 * grid with lite YouTube facades; nothing loads from YouTube until pressed.
 */
export function SermonLibrary(): React.ReactElement {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SERMONS.filter((sermon) => {
      if (!sermon.confirmed) return false;
      if (filter !== "all" && sermon.category !== filter) return false;
      if (!needle) return true;
      return [
        sermon.title,
        sermon.speaker,
        sermon.description,
        sermon.service,
        ...sermon.scripture,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  const isFiltered = filter !== "all" || query.trim().length > 0;
  const noResults = filtered.length === 0;

  return (
    <section
      id="library"
      data-section="sermons-library"
      data-header-theme="light"
      className="relative bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-8 md:py-28 lg:px-10 lg:py-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 03 — The library</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-4 md:block">
            Eight categories · one Word
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/35 md:col-span-2">
            No. 03 / 03
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-6 md:mt-14 md:gap-x-6">
          <h2 className="col-span-12 max-w-[11ch] font-serif text-[clamp(2.7rem,7vw,6.6rem)] font-medium leading-[0.9] tracking-[-0.05em] md:col-span-7">
            The <span className="italic">archive.</span>
          </h2>
          <p className="col-span-12 max-w-[42ch] text-[16px] leading-[1.62] text-deep-green md:col-span-4 md:col-start-9 md:text-[17px]">
            Search every published message by title, speaker, Scripture, or
            category. The archive opens with the first approved message.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 grid grid-cols-12 items-end gap-x-3 gap-y-4 border-y border-ink/12 py-5 md:mt-10 md:gap-x-6">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <label
              htmlFor="sermon-search"
              className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/35"
            >
              Search the library
            </label>
            <div className="mt-2 flex items-center gap-3 border border-ink/18 bg-mist/50 px-3 py-2 focus-within:border-ink">
              <Search className="h-4 w-4 shrink-0 text-ink/35" strokeWidth={1.5} aria-hidden="true" />
              <input
                id="sermon-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, speaker, or Scripture"
                className="min-h-10 w-full bg-transparent font-sans text-[15px] text-ink placeholder:text-ink/35 focus:outline-none"
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className="col-span-12 font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.16em] text-ink/35 md:col-span-5 md:text-right"
          >
            {filtered.length === 1 ? "One message" : `${String(filtered.length).padStart(2, "0")} messages`}
            {isFiltered ? " · filtered" : " · full library"}
          </p>
        </div>

        {/* Category chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
            className={cn(
              "min-h-11 border px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]",
              filter === "all"
                ? "border-ink bg-ink text-white"
                : "border-ink/18 text-ink/60 hover:border-ink/50 hover:text-ink"
            )}
          >
            All messages
          </button>
          {SERMON_CATEGORIES.map((category) => {
            const selected = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "min-h-11 border px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.14em] transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97]",
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-ink/18 text-ink/60 hover:border-ink/50 hover:text-ink"
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {noResults ? (
          <EmptyArchive
            isArchiveEmpty={SERMONS.length === 0}
            filtered={isFiltered}
          />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {filtered.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/35">
          <p>Nothing is invented. Every entry is a published message.</p>
          <p>Audio · video · transcript</p>
        </div>
      </div>
    </section>
  );
}
