"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — the single Lenis instance for the whole app.
 *
 * Lenis is synced to GSAP ScrollTrigger and driven by the GSAP ticker. The
 * instance is exposed on `window.__lenis` so the header, mobile menu and
 * preloader can stop/start it without ever creating a second one.
 *
 * Touch devices and `prefers-reduced-motion` get native scrolling. Lenis is
 * destroyed — never merely stopped — on unmount, which restores native scroll.
 */

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let instance: Lenis | null = null;

export function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    // Native scroll on touch / reduced motion. Nothing to drive.
    if (reduced || coarse) {
      document.documentElement.classList.add("lenis-native");
      return undefined;
    }

    if (!instance) {
      instance = new Lenis({
        duration: 1.05,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        autoRaf: false,
        respectReducedMotion: true,
        anchors: false,
      });
    }

    const lenis = instance;
    window.__lenis = lenis;
    lenis.start();

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout has settled by now; make every trigger measure the real document.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      // Destroying restores native scrolling immediately. Keeping a stopped
      // instance with no RAF ticker would freeze the page.
      lenis.destroy();
      if (instance === lenis) instance = null;
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, []);

  return <div className="min-h-screen">{children}</div>;
}
