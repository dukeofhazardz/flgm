import * as React from "react";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { cn } from "@/lib/utils";

/**
 * SectionHeader — the folio rule used at the top of every section.
 * Tag left, contextual note centre, issue number right. Purely a navigational
 * device, never an eyebrow slogan above a headline.
 */

interface SectionHeaderProps {
  tag: string;
  note?: string;
  folio: string;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  tag,
  note,
  folio,
  dark = false,
  className,
}: SectionHeaderProps): React.ReactElement {
  return (
    <header
      className={cn(
        "grid grid-cols-12 items-baseline gap-3 border-b pb-5 md:gap-6",
        dark ? "border-white/12" : "border-ink/12",
        className
      )}
    >
      <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
        <SectionTag className={dark ? "text-white/45" : "text-ink/45"}>
          {tag}
        </SectionTag>
        <span
          aria-hidden="true"
          className={cn("hidden h-px w-14 md:block", dark ? "bg-white/20" : "bg-ink/20")}
        />
      </div>
      {note ? (
        <p
          className={cn(
            "hidden font-mono text-[9px] uppercase tracking-[0.2em] md:col-span-4 md:block",
            dark ? "text-white/35" : "text-ink/35"
          )}
        >
          {note}
        </p>
      ) : null}
      <Folio
        className={cn(
          "col-span-4 text-right text-[9px] uppercase tracking-[0.2em] md:col-span-2",
          note ? "" : "md:col-start-11",
          dark ? "text-white/35" : "text-ink/35"
        )}
      >
        {folio}
      </Folio>
    </header>
  );
}
