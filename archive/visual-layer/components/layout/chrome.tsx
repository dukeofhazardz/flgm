"use client";

import * as React from "react";
import { Preloader } from "@/components/layout/preloader";
import { Header } from "@/components/layout/navbar";
import { LiveStrip } from "@/components/layout/live-strip";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/layout/cursor";
import { PageTransition } from "@/components/motion/page-transition";

/**
 * Chrome — global shell rendered on every page.
 * Composes preloader, header, live strip, page transition, cursor, and footer.
 * Page content is projected via children inside PageTransition.
 */

export function Chrome({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex flex-col min-h-screen relative z-0">
      <Preloader />
      <Header />
      <LiveStrip />
      <PageTransition>{children}</PageTransition>
      <Cursor />
      <Footer />
    </div>
  );
}
