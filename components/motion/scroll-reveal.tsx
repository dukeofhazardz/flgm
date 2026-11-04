"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, REVEAL } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal — one reveal language for the whole site.
 *
 * Every page's sections are discovered at runtime: each section's content
 * container contributes its top-level rows (the rail, the headline block, the
 * body copy, the art) and those rows settle in as they enter. Headings rise
 * further than rails; siblings are staggered 65ms apart. Nothing is hand-wired
 * per page, so a section added tomorrow reveals like every other section.
 *
 * Rules honoured:
 * - transform + opacity only, once per row;
 * - nothing is hidden ahead of time: the entrance is a `from` tween fired the
 *   moment a row crosses the line, so content is legible with JS off, and no
 *   inline style lands on a node React has not hydrated yet;
 * - rows already on screen at mount are left alone (no flash on load);
 * - pinned / choreographed regions opt out with `data-no-reveal`;
 * - reduced motion removes the travel entirely: a cross-fade only.
 */

const SKIP_SELECTOR =
  "[data-no-reveal], [data-hero-scene], [data-vision-stage], [data-skip-reveal]";

function isDecorative(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el);
  if (style.position === "absolute" || style.position === "fixed") return true;
  if (style.display === "none" || style.visibility === "hidden") return true;
  if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "TEMPLATE") {
    return true;
  }
  // Pure decoration: hidden from assistive tech and empty.
  if (el.getAttribute("aria-hidden") === "true" && !el.textContent?.trim()) return true;
  return false;
}

/** The wrapper that holds a section's readable content. */
function contentContainer(section: HTMLElement): HTMLElement {
  const children = Array.from(section.children) as HTMLElement[];
  const pick = children.find((child) => !isDecorative(child) && child.children.length > 0);
  return pick ?? section;
}

function collectRows(): HTMLElement[] {
  const roots = Array.from(document.querySelectorAll<HTMLElement>("main")).flatMap(
    (main) => Array.from(main.querySelectorAll<HTMLElement>("section"))
  );

  const rows: HTMLElement[] = [];
  for (const section of roots) {
    if (section.closest("[data-no-reveal]") || section.matches(SKIP_SELECTOR)) continue;
    const container = contentContainer(section);
    if (container.matches(SKIP_SELECTOR)) continue;
    for (const row of Array.from(container.children) as HTMLElement[]) {
      // A row that *is*, or wraps, a choreographed region is left to its owner.
      if (row.matches(SKIP_SELECTOR) || row.querySelector(SKIP_SELECTOR)) continue;
      if (isDecorative(row)) continue;
      const rect = row.getBoundingClientRect();
      if (rect.height < 2 || rect.width < 2) continue;
      rows.push(row);
    }
  }
  return rows;
}

export function ScrollReveal(): null {
  const pathname = usePathname();
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      cleanup.current?.();

      const reduced = prefersReducedMotion();
      const vh = window.innerHeight;
      const animate: HTMLElement[] = [];

      for (const row of collectRows()) {
        const rect = row.getBoundingClientRect();
        // Already on screen at mount: it is not "entering", leave it alone.
        if (rect.top < vh * 0.88) continue;
        animate.push(row);
      }

      if (!animate.length) {
        cleanup.current = null;
        return;
      }

      const distanceOf = (row: HTMLElement) =>
        row.tagName === "HEADER" ? REVEAL.railDistance : REVEAL.distance;

      const batches = ScrollTrigger.batch(animate, {
        start: REVEAL.start,
        once: true,
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch: Element[]) => {
          const rows = batch as HTMLElement[];
          if (reduced) {
            // Movement removed: the row simply fades in.
            gsap.fromTo(
              rows,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.42,
                ease: "power1.out",
                stagger: 0.04,
                overwrite: "auto",
              }
            );
            return;
          }
          gsap.fromTo(
            rows,
            {
              opacity: 0,
              y: (index: number) => distanceOf(rows[index]),
            },
            {
              opacity: 1,
              y: 0,
              duration: REVEAL.duration,
              ease: "power3.out",
              stagger: REVEAL.stagger,
              overwrite: "auto",
              clearProps: "transform,opacity",
            }
          );
        },
      });

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onMedia = () => {
        if (!media.matches) return;
        gsap.to(animate, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          overwrite: "auto",
          clearProps: "transform,opacity",
        });
      };
      media.addEventListener("change", onMedia);

      cleanup.current = () => {
        media.removeEventListener("change", onMedia);
        batches.forEach((trigger) => trigger.kill());
        gsap.killTweensOf(animate);
        gsap.set(animate, { clearProps: "transform,opacity" });
      };
    };

    // The first paint may still be streaming. Two frames after `load` puts the
    // measurement past font swap and the preloader's overlay, so the viewport
    // test sees final geometry. Route changes need no such wait.
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanup.current?.();
      cleanup.current = null;
    };
  }, [pathname]);

  return null;
}
