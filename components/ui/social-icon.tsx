import * as React from "react";
import type { SocialId } from "@/data/socials";
import { cn } from "@/lib/utils";

/**
 * SocialIcon — the platform marks as inline SVG.
 *
 * lucide-react no longer ships brand icons, so the four accounts the church
 * actually uses are drawn here. They inherit `currentColor`, so each link keeps
 * its own text and hover colour. Decorative only: the link's label supplies the
 * accessible name.
 */

interface SocialIconProps {
  id: SocialId;
  className?: string;
}

export function SocialIcon({ id, className }: SocialIconProps): React.ReactElement {
  const shared = {
    viewBox: "0 0 24 24",
    className: cn("h-4 w-4 shrink-0", className),
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (id) {
    case "facebook":
      return (
        <svg {...shared} fill="currentColor">
          <path d="M13.4 21v-7.6h2.55l.38-2.96H13.4V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46a21 21 0 0 0-2.29-.12c-2.26 0-3.81 1.38-3.81 3.92v2.18H7.78v2.96h2.56V21h3.06Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...shared} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3.3" y="3.3" width="17.4" height="17.4" rx="4.8" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          {...shared}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 3v10.9a3.9 3.9 0 1 1-3.2-3.8" />
          <path d="M14 3c.3 2.3 1.9 3.9 4.2 4.1" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...shared} fill="currentColor">
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10.1 15.1V8.9l5.2 3.1-5.2 3.1Z" />
        </svg>
      );
  }
}
