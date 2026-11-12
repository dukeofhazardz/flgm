"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/HeroImage.png";
import { HOME_HERO } from "@/data/church";
import { Button } from "@/components/ui/button";

/**
 * HomeHero — the white opening spread.
 *
 * Two columns: the statement on the left, the cut-out portrait floating on the
 * page at the right. No frame, arch, ring or background field around the image,
 * and no pin or scroll-scrub: the page scrolls normally from the first pixel.
 * A gentle, staggered load-in is the only motion.
 */

/** useLayoutEffect on the client, useEffect during the prerender. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function HeroActions(): React.ReactElement {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-3">
      <Button asChild size="md" variant="brand" className="min-h-11">
        <Link href="/contact">
          Plan Your Visit
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </Link>
      </Button>
      <Button
        asChild
        size="md"
        variant="outline"
        className="min-h-11 border-ink/30 text-ink hover:border-ink hover:bg-transparent hover:text-ink"
      >
        <Link href="/watch-and-pray">Join Watch and Pray</Link>
      </Button>
    </div>
  );
}

function HeroSupportLink(): React.ReactElement {
  return (
    <Link
      href="/give"
      className="mt-5 inline-flex items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-ink/70 transition-colors hover:text-ink"
    >
      Support the Church Building Project
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

export function HomeHero(): React.ReactElement {
  const section = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const root = section.current;
    if (!root) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.09,
          clearProps: "transform",
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      data-section="hero"
      data-header-theme="light"
      className="relative bg-white text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-[96px] md:px-8 md:pb-24 lg:px-10 lg:pt-[120px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p
              data-hero-reveal
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40"
            >
              § 01 — Forever Life
            </p>

            <h1
              data-hero-reveal
              className="mt-5 max-w-[13ch] font-serif text-[clamp(2.4rem,6.4vw,6.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em] text-ink md:max-w-[10.5ch]"
            >
              {HOME_HERO.headline}
            </h1>

            <p
              data-hero-reveal
              className="mt-7 max-w-[44ch] font-sans text-[17px] leading-[1.6] text-ink/70 md:text-[18px]"
            >
              {HOME_HERO.subtext}
            </p>

            <div data-hero-reveal>
              <HeroActions />
              <HeroSupportLink />
            </div>
          </div>

          <div data-hero-reveal className="md:col-span-6">
            <Image
              src={heroImage}
              alt="Pastor Hephzibah Julia in a thoughtful pose, wearing an orange and green patterned garment, surrounded by green leaves and gold accents"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full max-w-[640px] object-contain md:ml-auto"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto h-px max-w-[1680px] bg-ink/10" />
    </section>
  );
}
