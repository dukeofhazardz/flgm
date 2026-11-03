"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArchWipe } from "@/components/motion/arch-wipe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page transition wrapper.
 * Arch wipe between routes. Refreshes Lenis and ScrollTrigger after each
 * navigation so scroll-linked animations stay in sync.
 */

interface WindowWithLenisc {
  __lenis?: Lenis;
}

export function PageTransition({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const pathname = usePathname();
  const [wiping, setWiping] = useState(false);
  const isInitial = useRef(true);

  useEffect(() => {
    // Skip the first render (no wipe on initial load).
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    // Wipe in when the route changes.
    setWiping(true);
    const t = setTimeout(() => {
      // Wipe out: reveal the new page.
      setWiping(false);
      // Refresh Lenis dimensions and ScrollTrigger after navigation.
      const lenis = (window as unknown as WindowWithLenisc).__lenis;
      if (lenis && typeof lenis.resize === "function") {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 550); // matches arch-wipe duration
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {children}
      <ArchWipe visible={wiping} />
    </>
  );
}
