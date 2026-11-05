"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * HeroMasthead — the masthead.
 *
 * Roman and italic words are separate spans so the intro can raise them one at
 * a time, and so each word can answer the cursor with its own Fraunces weight.
 * On desktop a second, outlined copy sits exactly on top, revealed only where
 * the pointer light lands — the hidden layer beneath the type.
 */

interface HeroMastheadProps {
  variant: "desktop" | "mobile";
  className?: string;
}

interface Line {
  words: string[];
  italic?: boolean;
  /** Extra classes for the line. */
  lineClass?: string;
  /** Font-size multiplier within the masthead. */
  scale?: number;
}

const DESKTOP_LINES: Line[] = [
  { words: ["Forever", "Life"] },
  { words: ["and", "Grace"], italic: true, lineClass: "ml-auto", scale: 1.08 },
  { words: ["Mission"], scale: 1.26 },
];

const MOBILE_LINES: Line[] = [
  { words: ["Forever"] },
  { words: ["Life"], lineClass: "justify-start" },
  { words: ["and", "Grace"], italic: true, lineClass: "justify-start", scale: 0.7 },
  { words: ["Mission"] },
];

function Word({
  children,
  ghost,
  scale,
  italic,
}: {
  children: string;
  ghost?: boolean;
  scale?: number;
  italic?: boolean;
}): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-block overflow-hidden align-bottom",
        italic
          ? "px-[0.18em] -mx-[0.18em] pt-[0.12em] -mt-[0.12em] pb-[0.14em] -mb-[0.14em]"
          : "pb-[0.14em] -mb-[0.14em]"
      )}
    >
      <span
        data-word={ghost ? undefined : ""}
        className="hero-word inline-block"
        style={scale ? { fontSize: `${scale}em` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}

function Lines({
  lines,
  ghost,
  desktop,
}: {
  lines: Line[];
  ghost?: boolean;
  desktop?: boolean;
}): React.ReactElement {
  return (
    <>
      {lines.map((line, index) => (
        <div
          key={`${line.words.join("-")}-${index}`}
          data-line={ghost ? undefined : index + 1}
          className={cn(
            "flex w-max items-baseline gap-[0.1em] whitespace-nowrap",
            line.lineClass,
            line.italic && "hero-line-italic",
            desktop && index === 1 && "short:-mt-[0.76em] landscape-short:mt-0 landscape-short:ml-0"
          )}
          style={
            desktop && line.scale ? { fontSize: `${line.scale}em` } : undefined
          }
        >
          {line.words.map((word) => (
            <Word
              key={word}
              ghost={ghost}
              italic={line.italic}
              scale={!desktop ? line.scale : undefined}
            >
              {word}
            </Word>
          ))}
        </div>
      ))}
    </>
  );
}

export function HeroMasthead({
  variant,
  className,
}: HeroMastheadProps): React.ReactElement {
  const root = useRef<HTMLDivElement>(null);
  const desktop = variant === "desktop";
  const lines = desktop ? DESKTOP_LINES : MOBILE_LINES;

  useEffect(() => {
    if (!desktop) return undefined;
    const el = root.current;
    if (!el) return undefined;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    const scene = el.closest<HTMLElement>("[data-hero-scene]") ?? el;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    let centres: { el: HTMLElement; x: number; y: number }[] = [];

    const measure = () => {
      const host = el.getBoundingClientRect();
      centres = words.map((word) => {
        const rect = word.getBoundingClientRect();
        return {
          el: word,
          x: rect.left + rect.width / 2 - host.left,
          y: rect.top + rect.height / 2 - host.top,
        };
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    let frame = 0;
    let px = 0;
    let py = 0;
    let live = false;

    const paint = () => {
      frame = 0;
      scene.style.setProperty("--px", `${px}px`);
      scene.style.setProperty("--py", `${py}px`);

      for (const centre of centres) {
        const distance = Math.hypot(px - centre.x, py - centre.y);
        const near = Math.max(0, 1 - distance / 300);
        const weight = Math.round(360 + 180 * near);
        const soft = Math.round(14 + 70 * near);
        centre.el.style.setProperty("--wght", String(weight));
        centre.el.style.setProperty("--soft", String(soft));
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
      if (!live) {
        live = true;
        scene.style.setProperty("--ghost", "1");
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      live = false;
      scene.style.setProperty("--ghost", "0");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const centre of centres) {
        centre.el.style.removeProperty("--wght");
        centre.el.style.removeProperty("--soft");
      }
    };

    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      scene.style.removeProperty("--ghost");
      if (frame) cancelAnimationFrame(frame);
    };
  }, [desktop]);

  return (
    <div
      ref={root}
      data-masthead={variant}
      className={cn("relative", className)}
      style={{ "--fit": "1" } as React.CSSProperties}
    >
      <h1
        aria-label="Forever Life and Grace Mission"
        className={cn(
          "hero-h1 relative z-10 font-serif font-medium tracking-[-0.04em] text-white",
          desktop
            ? "hidden md:block landscape-short:block"
            : "block md:hidden landscape-short:hidden"
        )}
      >
        <Lines lines={lines} desktop={desktop} />
      </h1>

      {desktop ? (
        <div
          aria-hidden="true"
          className="hero-ghost hero-h1 pointer-events-none absolute inset-0 hidden select-none font-serif font-medium tracking-[-0.04em] md:block landscape-short:block"
        >
          <Lines lines={lines} ghost desktop />
        </div>
      ) : null}
    </div>
  );
}
