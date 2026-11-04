"use client";

import * as React from "react";
import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { VelocityType } from "@/components/motion/velocity-type";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { CustomCursor } from "@/components/motion/cursor";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

/**
 * Chrome — global shell on every page.
 *
 * SmoothScroll (one Lenis + GSAP sync) → Preloader, Header (with live strip),
 * PageTransition (horizon wipe), the site-wide motion layer, Footer.
 *
 * The motion layer is deliberately global: one reveal language, one velocity
 * provider, one pointer, so every page moves the same way without each section
 * wiring its own ScrollTrigger.
 */

export function Chrome({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <SmoothScroll>
      <div className="relative z-0 flex min-h-screen flex-col">
        <Preloader />
        <Header />
        <PageTransition>{children}</PageTransition>
        <ScrollReveal />
        <VelocityType />
        <CursorSpotlight />
        <CustomCursor />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
