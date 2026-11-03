"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HorizonWipe } from "@/components/motion/horizon-wipe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PageTransition — arch wipe between routes.
 * Refreshes Lenis and ScrollTrigger after navigation.
 */

interface WindowWithLenisc {
  __lenis?: {
    resize?: () => void;
    scroll?: number;
  };
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
    // Skip first render (no wipe on initial load).
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    setWiping(true);
    const t = setTimeout(() => {
      setWiping(false);
      // Refresh Lenis dimensions and ScrollTrigger after navigation.
      const lenis = (window as unknown as WindowWithLenisc).__lenis;
      if (lenis && typeof lenis.resize === "function") {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 550);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {children}
      <HorizonWipe visible={wiping} />
    </>
  );
}
