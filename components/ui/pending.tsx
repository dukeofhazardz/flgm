"use strict";

import { cn } from "@/lib/utils";

/**
 * <Pending> — tasteful placeholder for unconfirmed content (confirmed:false).
 * Renders children when confirmed; otherwise a restrained "Details coming soon"
 * state. Never exposes internal notes or invented facts on the public site.
 */

interface PendingProps {
  confirmed?: boolean;
  children?: React.ReactNode;
  label?: string;
  className?: string;
}

export function Pending({
  confirmed = false,
  children,
  label,
  className,
}: PendingProps) {
  if (confirmed) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center py-12 text-crimson-text text-sm font-sans uppercase tracking-[0.12em] border border-crimson-text/30 rounded-none bg-white/50",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true">•</span>
        {label ?? "Details coming soon"}
        <span aria-hidden="true">•</span>
      </span>
    </div>
  );
}
