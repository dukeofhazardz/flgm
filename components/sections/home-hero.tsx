"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { CHURCH } from "@/data/church";
import { Button } from "@/components/ui/button";
import { HeroAtmosphere } from "@/components/sections/home/hero-atmosphere";
import { HeroMasthead } from "@/components/sections/home/hero-masthead";
import { NextGathering } from "@/components/sections/home/next-gathering";

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeHero — the sunrise masthead.
 *
 * Desktop pins the scene for ~2.2 screens: the sun lifts off the ridge and
 * lights from the core outward, the masthead drifts, the sky runs
 * Night → forest → mint-and-blush dawn, and a caption closes the scene before
 * the white morning of the next section takes over.
 *
 * On wide screens the small copy lives inside the rag of the masthead — the
 * paragraph beside "and Grace", the actions beside "Mission" — so the type can
 * be as large as the band allows without ever crowding the copy. Below that
 * width the same content stacks under the masthead.
 */

const HERO_COPY =
  "Where the life of God, the grace of Jesus Christ and the revelation of sonship empower believers to live purposeful, victorious lives.";

/** Compact enough to sit side by side in a landscape phone's right column. */
const ACTION_COMPACT =
  "landscape-short:min-h-11 landscape-short:px-2.5 landscape-short:py-2 landscape-short:text-[12px] landscape-short:tracking-normal landscape-short:whitespace-nowrap";

function HeroActions({ stacked }: { stacked?: boolean }): React.ReactElement {
  return (
    <div
      className={
        stacked
          ? "flex flex-col items-stretch gap-2.5"
          : "flex flex-wrap items-center gap-3 landscape-short:flex-nowrap landscape-short:gap-2"
      }
    >
      <Button
        asChild
        size="md"
        variant="brand"
        className={stacked ? "w-full" : ACTION_COMPACT}
      >
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
        variant="outline-light"
        className={stacked ? "w-full" : ACTION_COMPACT}
      >
        <Link href="/watch-and-pray" data-cursor="Watch">
          Join Watch and Pray
        </Link>
      </Button>
    </div>
  );
}

function HeroSupportLink({ className }: { className?: string }): React.ReactElement {
  return (
    <Link
      href="/give"
      data-cursor="Give"
      className={`inline-flex items-center gap-2 whitespace-nowrap border-b border-signal-red pb-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-white/90 transition-colors hover:text-white ${className ?? ""}`}
    >
      Support the Church Building Project
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

function HeroAddress({ className }: { className?: string }): React.ReactElement {
  return (
    <p
      className={`font-mono text-[9px] uppercase leading-[1.8] tracking-[0.1em] text-white/76 ${className ?? ""}`}
    >
      {CHURCH.address}
    </p>
  );
}

export function HomeHero(): React.ReactElement {
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const stage = scene.current;
    if (!root || !stage) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const band = root.querySelector<HTMLElement>("[data-masthead-band]");
      const frames = new Set<number>();
      let disposed = false;

      const schedule = (fn: () => void) => {
        const id = requestAnimationFrame(() => {
          frames.delete(id);
          if (!disposed) fn();
        });
        frames.add(id);
      };

      // ── Fit each visible masthead to the band it actually has ──
      const fitOne = (host: HTMLElement | null, attempt = 0) => {
        if (!host || !band) return;
        const h1 = host.querySelector<HTMLElement>(".hero-h1");
        if (!h1) return;
        // The inactive variant is display:none — leave its --fit alone.
        if (!h1.offsetParent || !h1.offsetWidth) return;

        const availableW = band.clientWidth;
        const availableH = band.clientHeight;
        if (availableW < 8 || availableH < 8) {
          // The band has not been laid out yet (font swap, grid settle, a
          // rotation mid-frame). Retry on the next frame, then pin a safe
          // scale — never fall through to the unconstrained CSS size.
          if (attempt < 8) {
            schedule(() => fitOne(host, attempt + 1));
          } else {
            host.style.setProperty("--fit", "0.55");
          }
          return;
        }

        // Measure at natural size, then scale the block into the band.
        host.style.setProperty("--fit", "1");

        const landscapeShort = window.matchMedia(
          "(orientation: landscape) and (max-height: 520px)"
        ).matches;
        const shortRow =
          !landscapeShort &&
          window.matchMedia("(min-width: 768px) and (max-height: 779px)").matches;
        const lines = Array.from(h1.querySelectorAll<HTMLElement>("[data-line]"));
        // Lines are w-max, so offsetWidth is the true width of the set type.
        // The landscape-short masthead stacks three lines in a narrow column,
        // so its natural width is the widest single line, not a merged row.
        const naturalW = lines.length
          ? shortRow && lines.length >= 3
            ? Math.max(lines[0].offsetWidth + lines[1].offsetWidth + 32, lines[2].offsetWidth)
            : Math.max(...lines.map((line) => line.offsetWidth))
          : h1.scrollWidth;
        const naturalH = h1.offsetHeight;

        if (!naturalW || !naturalH) {
          if (attempt < 8) {
            schedule(() => fitOne(host, attempt + 1));
          } else {
            host.style.setProperty("--fit", "0.55");
          }
          return;
        }

        // 0.94 leaves optical air around the block.
        const scale = Math.min(availableW / naturalW, availableH / naturalH) * 0.94;
        const clamped = Number.isFinite(scale)
          ? Math.max(0.35, Math.min(scale, 2.4))
          : 0.55;
        host.style.setProperty("--fit", String(clamped));
      };

      const fit = () => {
        fitOne(root.querySelector<HTMLElement>('[data-masthead="desktop"]'));
        fitOne(root.querySelector<HTMLElement>('[data-masthead="mobile"]'));
      };

      fit();
      ScrollTrigger.refresh();

      const resize = new ResizeObserver(() => fit());
      if (band) resize.observe(band);

      // The band observer misses a rotation that swaps which masthead is
      // visible, and mobile browsers change the visual viewport when the
      // toolbar collapses. Re-fit on all three, debounced to one frame.
      const refit = () => schedule(fit);
      const remeasure = () =>
        schedule(() => {
          fit();
          ScrollTrigger.refresh();
        });
      window.addEventListener("resize", remeasure);
      window.addEventListener("orientationchange", remeasure);
      window.visualViewport?.addEventListener("resize", refit);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (disposed) return;
          fit();
          ScrollTrigger.refresh();
        });
      }

      const cleanup = () => {
        disposed = true;
        for (const id of frames) cancelAnimationFrame(id);
        frames.clear();
        resize.disconnect();
        window.removeEventListener("resize", remeasure);
        window.removeEventListener("orientationchange", remeasure);
        window.visualViewport?.removeEventListener("resize", refit);
      };

      if (reduced) {
        gsap.set("[data-hero-forest], [data-hero-glow], [data-hero-bloom]", { opacity: 1 });
        gsap.set("[data-hero-spill], [data-hero-rim], [data-hero-warm]", { opacity: 1 });
        gsap.set("[data-hero-sun]", { yPercent: -110 });
        gsap.set("[data-hero-sun-lit], [data-hero-sun-halo]", { opacity: 1 });
        gsap.set("[data-hero-sun-dark]", { opacity: 0 });
        gsap.set("[data-hero-town], [data-hero-dawn]", { opacity: 1 });
        return cleanup;
      }

      // ── Entrance ──
      gsap.set("[data-word]", { yPercent: 116 });
      gsap.set("[data-hero-rule]", { clipPath: "inset(0 100% 0 0)" });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });

      intro
        .to("[data-word]", { yPercent: 0, duration: 1.1, stagger: 0.05 }, 0)
        .from("[data-meta-inner]", { opacity: 0, y: 10, duration: 0.7, stagger: 0.08 }, 0.1)
        .to("[data-hero-rule]", { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power2.inOut" }, 0.5)
        .from("[data-hero-tagline]", { opacity: 0, y: 8, duration: 0.6 }, 0.34)
        .from("[data-bottom-inner]", { opacity: 0, y: 18, duration: 0.8 }, 0.42)
        .from("[data-hero-sun-body]", { scale: 0.94, opacity: 0.5, duration: 1.4, ease: "power2.out" }, 0);

      // ── Scroll: the sunrise ──
      const build = (distance: number, pin: boolean) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: pin ? "top top" : "top top",
            end: pin ? () => `+=${window.innerHeight * distance}` : "bottom top",
            pin,
            scrub: pin ? 0.7 : 0.6,
            anticipatePin: pin ? 1 : 0,
            invalidateOnRefresh: true,
          },
        });

        tl.to("[data-hero-sun]", { yPercent: -104, scale: 1.04, duration: 0.92 }, 0.02)
          .to("[data-hero-forest]", { opacity: 1, duration: 0.9 }, 0)
          .to("[data-hero-glow]", { opacity: 1, scaleY: 1.3, duration: 0.95 }, 0.02)
          .to("[data-hero-rim]", { opacity: 1, duration: 0.2 }, 0.05)
          .to("[data-hero-meta]", { opacity: 0, y: -10, duration: 0.12 }, 0.02)
          .to("[data-hero-tagline]", { opacity: 0, y: -8, duration: 0.12 }, 0.02)
          .to("[data-hero-bottom]", { opacity: 0, y: 14, duration: 0.14 }, 0.04)
          .to("[data-hero-spotlight]", { opacity: 0, duration: 0.16 }, 0.04)
          .to("[data-masthead-band]", { scale: 1.04, transformOrigin: "50% 45%", duration: 0.9 }, 0)
          .to('[data-line="1"]', { yPercent: -10, duration: 0.7 }, 0)
          .to('[data-line="2"]', { yPercent: -7, duration: 0.7 }, 0)
          .to('[data-line="3"]', { yPercent: -3, duration: 0.7 }, 0)
          .to('[data-line="4"]', { yPercent: -3, duration: 0.7 }, 0)
          .to("[data-hero-scrim]", { opacity: 0, duration: 0.16 }, 0.08)
          .to("[data-masthead-band]", { opacity: 0, duration: 0.18 }, 0.12)
          .to("[data-hero-bloom]", { opacity: 1, duration: 0.36 }, 0.1)
          .to("[data-hero-warm]", { opacity: 1, duration: 0.4 }, 0.24)
          .to("[data-hero-spill]", { opacity: 1, duration: 0.4 }, 0.16)
          .to("[data-hero-sun-dark]", { opacity: 0, duration: 0.14 }, 0.16)
          .to("[data-hero-sun-lit]", { opacity: 1, duration: 0.2 }, 0.22)
          .to("[data-hero-sun-halo]", { opacity: 1, duration: 0.28 }, 0.24)
          .to("[data-hero-rays]", { opacity: 0.85, duration: 0.3 }, 0.44)
          .to("[data-hero-town]", { opacity: 1, duration: 0.22 }, 0.46)
          .fromTo(
            "[data-hero-dawn]",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.14, ease: "power1.out" },
            0.3
          )
          .to({}, { duration: 0.2 }, 0.8);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      };

      const mm = gsap.matchMedia();
      // Desktop pins the sunrise for a full scene. Below 1024px there is no
      // pin at all — iOS Safari's collapsing toolbar makes pinned full-height
      // scenes jump, and the copy still reads while the hero scrolls out.
      //
      // Queries must not overlap or two timelines build at once:
      //   pin     → wide and tall enough
      //   no pin  → narrow but tall (tablet / phone portrait)
      //   no pin  → anything 520px tall or shorter (landscape phones)
      mm.add("(min-width: 1024px) and (min-height: 521px)", () => build(1.8, true));
      mm.add("(max-width: 1023px) and (min-height: 521px)", () => build(1, false));
      mm.add("(max-height: 520px)", () => build(1, false));

      return () => {
        mm.revert();
        cleanup();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-night">
      <div
        ref={scene}
        data-hero-scene
        data-header-theme="dark"
        className="relative min-h-[100svh] w-full overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #02600D 0%, #02600D 44%, #1B6E0C 64%, #2A780B 84%, #38820A 100%)",
        }}
      >
        <HeroAtmosphere />

        <div
          data-hero-content
          className="relative z-20 flex min-h-[100svh] flex-col px-5 pb-4 pt-[104px] md:px-8 md:pb-6 lg:px-10 lg:pb-6 lg:pt-[120px] landscape-short:grid landscape-short:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] landscape-short:grid-rows-[1fr_1fr] landscape-short:gap-x-4 landscape-short:gap-y-2 landscape-short:px-5 landscape-short:pb-3 landscape-short:pt-[84px]"
        >
          {/* ── Top rail: identity + tagline ── */}
          <div data-hero-meta className="flex items-start justify-between gap-6 landscape-short:hidden">
            <p
              data-meta-inner
              className="font-mono text-[8.5px] uppercase leading-[1.7] tracking-[0.2em] text-white/82 md:text-[10px] md:tracking-[0.22em]"
            >
              A House of Grace
              <span className="mx-2 text-dawn-mint" aria-hidden="true">
                •
              </span>
              A People of Purpose
            </p>

            <div data-meta-inner className="hidden shrink-0 text-right md:block">
              <p className="font-serif text-[clamp(1rem,1.55vw,1.5rem)] font-medium italic leading-none tracking-[-0.015em] text-dawn-mint">
                {CHURCH.tagline}
              </p>
              <span data-hero-rule className="mt-2 block w-full origin-left">
                <svg viewBox="0 0 240 10" fill="none" className="block h-[6px] w-full" aria-hidden="true">
                  <path
                    d="M1.5 7.4C57 2.6 137 2.2 238.5 5.8"
                    stroke="#C4D120"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* ── Mobile tagline ── */}
          <div
            data-hero-tagline
            className="mt-3 md:hidden landscape-short:col-start-2 landscape-short:row-start-1 landscape-short:mt-0 landscape-short:block landscape-short:self-end"
          >
            <p className="inline-flex flex-col items-start">
              <span className="font-serif text-[clamp(1.05rem,4.6vw,1.5rem)] font-medium italic leading-none tracking-[-0.015em] text-brand-green landscape-short:text-[clamp(0.95rem,1.7vw,1.3rem)]">
                {CHURCH.tagline}
              </span>
              <span data-hero-rule className="mt-1.5 block w-[min(210px,54vw)] origin-left">
                <svg viewBox="0 0 240 10" fill="none" className="block h-[6px] w-full" aria-hidden="true">
                  <path
                    d="M1.5 7.4C57 2.6 137 2.2 238.5 5.8"
                    stroke="#C4D120"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>
          </div>

          {/* ── Masthead band (+ the copy that lives in its rag, wide screens) ── */}
          <div
            data-masthead-band
            className="relative mt-2 flex min-h-0 flex-1 flex-col justify-center lg:mt-1 landscape-short:col-start-1 landscape-short:row-span-2 landscape-short:row-start-1 landscape-short:mt-0"
          >
            <div
              className="pointer-events-none absolute inset-0 z-30 hidden roomy:grid"
              style={{ gridTemplateRows: "1fr 1.08fr 1.26fr" }}
            >
              <div className="row-start-2 flex items-center">
                <div className="pointer-events-auto w-[clamp(250px,26vw,320px)]">
                  <p className="font-sans text-[15.5px] leading-[1.55] text-white/94">{HERO_COPY}</p>
                  <HeroAddress className="mt-3" />
                </div>
              </div>

              <div className="row-start-3 flex items-end justify-end pb-0.5">
                <div className="pointer-events-auto flex w-[318px] flex-col items-stretch gap-3">
                  <NextGathering className="text-[8px] tracking-[0.06em]" />
                  <HeroActions stacked />
                  <HeroSupportLink className="self-start text-[8px] tracking-[0.1em]" />
                </div>
              </div>
            </div>

            <HeroMasthead variant="mobile" className="md:hidden landscape-short:hidden" />
            <HeroMasthead variant="desktop" className="hidden md:block landscape-short:block" />
          </div>

          {/* ── Stacked band: tablet and small laptop ── */}
          <div
            data-hero-bottom
            className="shrink-0 roomy:hidden landscape-short:col-start-2 landscape-short:row-start-2 landscape-short:mt-0 landscape-short:self-start"
          >
            <div
              data-bottom-inner
              className="hidden md:grid md:grid-cols-12 md:items-end md:gap-8 landscape-short:grid landscape-short:grid-cols-1 landscape-short:items-start landscape-short:gap-1.5"
            >
              <div className="md:col-span-6 landscape-short:col-span-full landscape-short:col-start-1">
                <p className="max-w-[38ch] font-sans text-[15px] leading-[1.5] text-white/92 landscape-short:max-w-none landscape-short:text-[12.5px] landscape-short:leading-[1.45]">
                  {HERO_COPY}
                </p>
                <HeroAddress className="mt-3 max-w-[48ch] short:hidden landscape-short:hidden" />
                
              </div>

              <div className="md:col-span-6 md:col-start-7 xl:col-span-5 xl:col-start-8 landscape-short:col-span-full landscape-short:col-start-1">
                <NextGathering className="mt-3 landscape-short:mt-0 landscape-short:mb-1.5" />
                <HeroActions />
                <HeroSupportLink className="mt-3.5 landscape-short:hidden" />
              </div>
            </div>

            {/* Mobile: thumb-reach actions */}
            <div data-bottom-inner className="flex flex-col gap-2.5 md:hidden landscape-short:hidden">
              <NextGathering className="mb-1" />
              <Button asChild size="md" variant="brand" className="w-full">
                <Link href="/contact">
                  Plan Your Visit
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="md" variant="outline-light" className="w-full">
                <Link href="/watch-and-pray">Join Watch and Pray</Link>
              </Button>
              <HeroSupportLink className="mt-0.5 self-start pb-1" />
            </div>

            {/* Folio line */}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 lg:mt-5 lg:pt-3 landscape-short:hidden">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/66 lg:text-[9px] lg:tracking-[0.2em]">
                No. 01
                <span className="mx-2 text-white/15" aria-hidden="true">
                  /
                </span>
                Gwarinpa, Abuja
              </p>
              <span className="flex items-center gap-2.5" aria-hidden="true">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/66 lg:text-[9px] lg:tracking-[0.2em]">
                  Scroll
                </span>
                <span className="relative block h-6 w-px overflow-hidden bg-white/15 lg:h-8">
                  <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-2.5 w-px bg-dawn-mint" />
                </span>
              </span>
            </div>
          </div>

          {/* ── Folio line: wide screens ── */}
          <div
            data-hero-bottom
            className="mt-4 hidden shrink-0 items-center justify-between border-t border-white/10 pt-3.5 roomy:flex landscape-short:hidden"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
              No. 01
              <span className="mx-2 text-white/15" aria-hidden="true">
                /
              </span>
              Gwarinpa, Abuja
            </p>
            <span className="flex items-center gap-2.5" aria-hidden="true">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">Scroll</span>
              <span className="relative block h-8 w-px overflow-hidden bg-white/15">
                <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-2.5 w-px bg-dawn-mint" />
              </span>
            </span>
          </div>
        </div>

        {/* ── Closing caption: the day begins ── */}
        <div
          data-hero-dawn
          className="pointer-events-none absolute inset-x-0 bottom-[9%] z-[9] flex items-center gap-3 px-5 opacity-0 md:px-8 lg:px-10 landscape-short:bottom-[4%]"
        >
          <span aria-hidden="true" className="block h-px w-8 bg-dawn-mint/40 md:w-12" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-dawn-mint/95 md:text-[10px]">
            Dawn over Gwarinpa
          </span>
        </div>
      </div>
    </section>
  );
}
