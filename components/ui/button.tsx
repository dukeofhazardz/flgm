"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Button — flat, one fill colour, square-cornered.
 * Brand green fill uses INK text (white on #00C853 fails contrast at 2.2:1).
 * Red is reserved for small accents, never a big field beside green.
 * Never animate width/height — only transform + opacity.
 *
 * `asChild` clones a single child (normally a Next.js Link) and merges the
 * button classes and props onto it, so we never nest a link inside a button.
 */

type Variant = "brand" | "outline" | "outline-light" | "text-link" | "red";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  brand: "bg-brand-green text-ink hover:bg-dawn-mint",
  outline: "border border-ink/70 bg-transparent text-ink hover:bg-ink hover:text-white",
  "outline-light":
    "border border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
  "text-link":
    "px-0 text-ink underline decoration-signal-red decoration-2 underline-offset-[6px] hover:text-crimson-text",
  red: "bg-signal-red text-white hover:bg-crimson-text",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-[12px] tracking-[0.08em] uppercase font-mono",
  md: "px-6 py-3.5 text-[15px]",
  lg: "px-8 py-4 text-[15px]",
};

const BASE =
  "group/btn inline-flex items-center justify-center gap-2 rounded-none font-sans font-medium " +
  "transition-[transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-transparent";

export function Button({
  className,
  variant = "brand",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
