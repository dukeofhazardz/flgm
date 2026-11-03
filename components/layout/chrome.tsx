"use client";

import * as React from "react";
import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

/**
 * Chrome — global shell on every page.
 * SmoothScroll (one Lenis + GSAP sync) → Preloader, Header (with live strip),
 * PageTransition, Footer.
 */

export function Chrome({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <SmoothScroll>
      <div className="relative z-0 flex min-h-screen flex-col">
        <Preloader />
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
