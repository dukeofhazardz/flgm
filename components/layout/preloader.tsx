"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { CHURCH } from "@/data/church";
import { noopSubscribe } from "@/lib/use-hydrated";
import { useHydrated } from "@/lib/use-hydrated";

const SESSION_KEY = "flgm:preloader:seen";

function readSeen(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** The curtain is in the server HTML, so no flash of hero precedes it. */
const serverSeen = () => false;

/**
 * Preloader — first visit per session only.
 *
 * Night-green field, a horizon line draws, a sun lifts off it, the tagline
 * types in, then the two curtain halves split open on a clip-path to reveal
 * the hero. Hard-capped under 2.2s, skippable by click, key, wheel or touch.
 *
 * It never touches `body.overflow` and never stops Lenis, so scrolling is
 * available the instant the curtains part.
 */

export function Preloader(): React.ReactElement | null {
  const hydrated = useHydrated();
  const seen = useSyncExternalStore(noopSubscribe, readSeen, serverSeen);
  const [skipped, setSkipped] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const done = useRef(false);

  // `data-pre-seen` is set by an inline script before first paint, so returning
  // visitors never see the curtain even though it is in the server HTML.
  const active = !seen && !skipped;

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    timeline.current?.kill();
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* Storage can be blocked; the session simply sees it again. */
    }
    setSkipped(true);
  }, []);

  useEffect(() => {
    if (!active) return undefined;

    const panel = rootRef.current;
    if (!panel) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const timer = window.setTimeout(finish, 350);
      return () => window.clearTimeout(timer);
    }

    // GSAP shares one ticker across the app and the hero disables lag
    // smoothing, so a late first frame can fast-forward the whole sequence.
    // Build the timeline after paint so the clock starts when the curtain is up.
    let ctx: gsap.Context | null = null;
    let raf1 = 0;
    let raf2 = 0;

    const build = () => {
      ctx = gsap.context(() => {
        const chars = panel.querySelectorAll<HTMLElement>("[data-char]");
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: finish,
        });
        timeline.current = tl;

        tl.fromTo(
          "[data-pre-horizon]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
          0
        )
          .fromTo(
            "[data-pre-sun]",
            { y: 34, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55 },
            0.18
          )
          .fromTo(
            chars,
            { opacity: 0 },
            { opacity: 1, duration: 0.01, stagger: 0.028 },
            0.42
          )
          .to("[data-pre-content]", { opacity: 0, duration: 0.22, ease: "power2.in" }, 1.0)
          .to(
            "[data-pre-left]",
            { clipPath: "inset(0 100% 0 0)", duration: 0.62, ease: "power3.inOut" },
            1.1
          )
          .to(
            "[data-pre-right]",
            { clipPath: "inset(0 0 0 100%)", duration: 0.62, ease: "power3.inOut" },
            1.1
          )
          .to(panel, { opacity: 0, duration: 0.22, ease: "power2.out" }, 1.62);
      }, panel);
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(build);
    });

    const onSkip = () => {
      finish();
      ctx?.revert();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") onSkip();
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onSkip, { passive: true, once: true });
    window.addEventListener("touchstart", onSkip, { passive: true, once: true });

    // Hard cap: never hold the page longer than 2.2s.
    const cap = window.setTimeout(finish, 2150);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(cap);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onSkip);
      window.removeEventListener("touchstart", onSkip);
      ctx?.revert();
    };
  }, [active, finish]);

  if (!active) return null;

  const chars = Array.from(CHURCH.tagline);

  return (
    <div
      ref={rootRef}
      data-pre-root
      role="status"
      aria-label="Forever Life and Grace Mission. We Get Better Every Day."
      onClick={finish}
      className="fixed inset-0 z-[200] cursor-pointer overflow-hidden"
    >
      {/* A faint dawn glow behind the horizon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] z-0 h-[36vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/10 blur-[100px]"
      />

      {/* The two night curtains form the full field until they split. */}
      <div
        data-pre-left
        className="absolute inset-y-0 left-0 z-10 w-1/2 bg-night"
        style={{ clipPath: "inset(0 0 0 0)" }}
      />
      <div
        data-pre-right
        className="absolute inset-y-0 right-0 z-10 w-1/2 bg-night"
        style={{ clipPath: "inset(0 0 0 0)" }}
      />

      <div data-pre-content className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[760px] px-8">
          <div
            data-pre-horizon
            className="h-px w-full origin-left bg-gradient-to-r from-transparent via-brand-green to-transparent"
          />
          <div
            data-pre-sun
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 34%, #F2FFF7 0%, #C9F5DA 18%, #00C853 62%, #0B7F3B 100%)",
              boxShadow: "0 0 70px 18px rgba(0,200,83,0.35)",
            }}
          />
        </div>

        <p className="mt-16 px-8 text-center font-serif text-[clamp(1.5rem,4vw,2.6rem)] font-medium italic leading-none tracking-[-0.02em] text-white">
          {chars.map((char, index) => (
            <span key={`${char}-${index}`} data-char className="inline">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span className="caret-blink ml-1 inline-block h-[0.72em] w-[2px] translate-y-[0.08em] bg-brand-green align-baseline" />
        </p>

        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
          Gwarinpa · Abuja · 05:30 WAT
        </p>
      </div>
    </div>
  );
}
