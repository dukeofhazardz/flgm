"use strict";

import { cn } from "@/lib/utils";

/**
 * <ConceptLabel> — visible "Architectural concept" label.
 * Auditorium images must carry this label and must not be presented as
 * completed construction (content.md lines 241, 500–509).
 */

interface ConceptLabelProps {
  className?: string;
}

export function ConceptLabel({ className }: ConceptLabelProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-sans font-medium tracking-wider text-brand-red bg-white border border-brand-red/30",
        className,
      )}
    >
      Architectural concept
    </span>
  );
}
