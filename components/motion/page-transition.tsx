"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HorizonWipe, type WipePhase } from "@/components/motion/horizon-wipe";
import { prefersReducedMotion } from "@/lib/motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PageTransition — route changes happen behind the horizon.
 *
 * Internal links are intercepted once, at the document, on the capture phase:
 * the horizon rises *and* the route is pushed at the same moment, so the two
 * happen in parallel. The sheet is only taken away once the new route has
 * actually painted, which means a slow route reads as a held beat rather than
 * a flash of the page you just left.
 *
 * Keyboard activations (`event.detail === 0`), modifier clicks, new tabs,
 * downloads, hash links and reduced-motion visitors all navigate natively —
 * motion never delays a keyboard user.
 *
 * ScrollTrigger and Lenis are re-measured after every arrival so pinned
 * sections and reveals are correct on the new page.
 */

interface WindowWithLenis {
  __lenis?: {
    resize?: () => void;
    scrollTo?: (target: number | string, options?: { immediate?: boolean }) => void;
  };
}

const COVER_MS = 420;
/** If the route has not landed by now, stop being clever and load the page. */
const ESCAPE_MS = 3200;

export function PageTransition({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<WipePhase>("idle");
  const pendingHref = useRef<string | null>(null);
  const fromPath = useRef<string | null>(null);
  const landed = useRef(false);
  const covered = useRef(false);
  const mounted = useRef(false);

  /** Uncover only when the horizon is up *and* the new route has painted. */
  const uncover = useCallback(() => {
    if (!covered.current || !landed.current) return false;

    const lenis = (window as unknown as WindowWithLenis).__lenis;
    lenis?.scrollTo?.(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    lenis?.resize?.();
    ScrollTrigger.refresh();
    setPhase("reveal");
    return true;
  }, []);

  // Remember the route we left, so only our own push uncovers the page.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (fromPath.current && pathname !== fromPath.current) {
      landed.current = true;
      uncover();
    }
  }, [pathname, uncover]);

  const push = useCallback(
    (href: string) => {
      pendingHref.current = href;
      fromPath.current = pathname;
      landed.current = false;
      covered.current = false;
      setPhase("cover");
      // Start the route while the sheet is still travelling: by the time the
      // screen is covered the new tree is usually ready to swap in.
      router.push(href);

      window.setTimeout(() => {
        if (pendingHref.current !== href) return;
        if (landed.current) return;
        // The client router is stuck. Hand the navigation to the browser.
        window.location.assign(href);
      }, ESCAPE_MS);
    },
    [pathname, router]
  );

  // One delegated listener for every internal link on the site.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // detail === 0 means keyboard activation (Enter on a focused link).
      if (event.detail === 0) return;
      if (prefersReducedMotion()) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (!href.startsWith("/") || href.startsWith("//")) return;
      if (href.startsWith("/#") || href.includes("#")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.noWipe === "true") return;

      const next = href.split("?")[0];
      if (next === pathname) return;

      event.preventDefault();
      event.stopPropagation();
      push(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, push]);

  // The sheet has covered the screen. If the route is already here, uncover.
  const handleCovered = useCallback(() => {
    covered.current = true;
    uncover();
  }, [uncover]);

  const handleRevealed = useCallback(() => {
    pendingHref.current = null;
    landed.current = false;
    covered.current = false;
    setPhase("idle");
    const lenis = (window as unknown as WindowWithLenis).__lenis;
    lenis?.resize?.();
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {children}
      <HorizonWipe phase={phase} onCovered={handleCovered} onRevealed={handleRevealed} />
    </>
  );
}

export { COVER_MS, ESCAPE_MS };
