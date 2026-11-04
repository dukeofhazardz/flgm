"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * RollLink — a link whose letters roll over on hover.
 *
 * Each glyph sits in a 1em window with its own copy stacked underneath; on a
 * fine pointer the pair travels up by one line, one glyph at a time, 16ms
 * apart. Transform only, and the whole effect disappears under reduced motion
 * (colour feedback stays). The visible letters are decorative; the accessible
 * name is a single visually-hidden string, so screen readers never read it
 * letter by letter.
 */

interface RollLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "children"> {
  children: string;
  label?: string;
  /** Decorative extras (an underline, an arrow) rendered after the letters. */
  trailing?: React.ReactNode;
}

export function RollLink({
  children,
  label,
  trailing,
  className,
  ...props
}: RollLinkProps): React.ReactElement {
  const text = typeof children === "string" ? children : String(children);
  let index = 0;

  return (
    <Link {...props} className={cn("roll-link", className)}>
      <span className="roll-link__window" aria-hidden="true">
        {Array.from(text).map((char, i) => {
          if (char === " ") {
            return (
              <span key={`space-${i}`} className="roll-link__space">
                &nbsp;
              </span>
            );
          }
          const order = index++;
          return (
            <span
              key={`${char}-${i}`}
              className="roll-link__glyph"
              style={{ "--roll-index": order } as React.CSSProperties}
            >
              <span className="roll-link__face roll-link__face--in">{char}</span>
              <span className="roll-link__face roll-link__face--out" aria-hidden="true">
                {char}
              </span>
            </span>
          );
        })}
      </span>
      {trailing}
      <span className="sr-only">{label ?? text}</span>
    </Link>
  );
}
