"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionTag — small tracked label, e.g. "§ 02 — About".
 * No eyebrow labels above headings; this is a folio/section identifier.
 */

interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTag({
  children,
  className,
}: SectionTagProps): React.ReactElement {
  return (
    <span
      className={cn(
        "text-xs font-mono font-medium text-crimson-text tracking-wider uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
