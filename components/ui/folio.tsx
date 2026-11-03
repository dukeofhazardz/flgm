"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Folio — folio number in mono, used for page/section numbering.
 */

interface FolioProps {
  children: React.ReactNode;
  className?: string;
}

export function Folio({ children, className }: FolioProps): React.ReactElement {
  return (
    <span
      className={cn(
        "font-mono font-medium text-ink tracking-tighter",
        className
      )}
    >
      {children}
    </span>
  );
}
