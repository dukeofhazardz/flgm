"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/FLGM-Logo.png";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHURCH } from "@/data/church";
import { CONTACT } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { LiveClock } from "@/components/ui/live-clock";
import { RollLink } from "@/components/ui/roll-link";
import { LiveStrip } from "@/components/layout/live-strip";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "watch-and-pray", label: "Watch and Pray", href: "/watch-and-pray" },
  { id: "sermons", label: "Sermons", href: "/sermons" },
  { id: "events", label: "Events", href: "/events" },
  { id: "give", label: "Give", href: "/give" },
] as const;

const CONNECT = [
  { id: "prayer", label: "Prayer and Counselling", href: "/prayer" },
  { id: "new-members", label: "New Members", href: "/new-members" },
  { id: "volunteer", label: "Volunteer", href: "/volunteer" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

/**
 * Routes whose first screen is a Night/Forest hero. The header opens in its
 * transparent white state there and in the solid white state everywhere else.
 * This is only the initial value for a route: once mounted, the section probe
 * below is the single source of truth.
 */
const DARK_HERO_ROUTES = new Set<string>([
  "/",
  "/about",
  "/watch-and-pray",
  "/sermons",
  "/events",
  "/give",
  "/prayer",
  "/new-members",
  "/volunteer",
  "/contact",
]);

function routeTheme(pathname: string): Theme {
  return DARK_HERO_ROUTES.has(pathname) ? "dark" : "light";
}

/**
 * Header — editorial masthead.
 *
 * Exactly two states, never a blend:
 *   over dark  → transparent bar, white type, white logo, Night live strip
 *   over light → solid white bar, Ink type, Mist live strip
 *
 * The section under the header is read with a one-pixel IntersectionObserver
 * band at the header's own height. No cached scroll maths survives a route
 * change, so a new page can never inherit the previous page's theme.
 * Hides on scroll down, returns on scroll up. One live Abuja clock, one
 * Connect dropdown, one full-screen mobile menu. Never creates a second Lenis.
 */

export function Header({ className }: { className?: string }): React.ReactElement {
  const pathname = usePathname();
  // Theme and hidden state are keyed by the route they were measured on. During
  // the render that sees a new `pathname`, the stale value simply cannot apply:
  // the header opens in the new page's own state, never the previous page's.
  const [themeState, setThemeState] = useState<{ path: string; theme: Theme }>({
    path: pathname,
    theme: routeTheme(pathname),
  });
  const [scrollState, setScrollState] = useState<{
    path: string;
    hidden: boolean;
    scrolled: boolean;
  }>({
    path: pathname,
    hidden: false,
    scrolled: false,
  });
  const theme = themeState.path === pathname ? themeState.theme : routeTheme(pathname);
  const hidden = scrollState.path === pathname ? scrollState.hidden : false;
  // Clear at the very top, frosted once the page has moved. Keyed by route so
  // a navigation always opens on the clear state before the first scroll tick.
  const scrolled = scrollState.path === pathname ? scrollState.scrolled : false;
  // Open state is tied to the route it was opened on. Navigating changes
  // `pathname`, so both panels close themselves without a reset effect.
  const [connectOn, setConnectOn] = useState<string | null>(null);
  const [menuOn, setMenuOn] = useState<string | null>(null);
  const connectOpen = connectOn === pathname;
  const menuOpen = menuOn === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const raf = useRef(0);

  const activeId = React.useMemo(() => {
    const hit =
      NAV.find((item) => item.href === pathname) ??
      CONNECT.find((item) => item.href === pathname);
    return hit?.id ?? null;
  }, [pathname]);

  // One probe for the whole header.
  //
  // A one-pixel IntersectionObserver band sits at the header's own height and
  // reports whichever `[data-header-theme]` section is under it. Intersection
  // entries are always measured against the live viewport, so a stale
  // `scrollY` from the page we just left cannot set the theme. On a route
  // change the state above already holds the new page's opening theme, then
  // this probe refines it once the new tree has painted.
  useEffect(() => {
    const route = pathname;
    const rafs: number[] = [];
    let observer: IntersectionObserver | null = null;
    let settling = true;
    let rebuildTimer = 0;

    const commit = (next: Theme) => {
      setThemeState((current) =>
        current.path === route && current.theme === next
          ? current
          : { path: route, theme: next }
      );
    };

    const sections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));

    const probeHeight = () =>
      Math.max(1, Math.round(headerRef.current?.getBoundingClientRect().height ?? 104));

    const ownerAt = (list: HTMLElement[], probe: number): HTMLElement | undefined => {
      let owner: HTMLElement | undefined;
      for (const el of list) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe + 1 && rect.bottom > probe + 1) owner = el;
      }
      return owner;
    };

    const sync = () => {
      const list = sections();
      if (!list.length) {
        commit("light");
        return;
      }
      const owner = ownerAt(list, probeHeight());
      if (owner) commit(owner.dataset.headerTheme === "dark" ? "dark" : "light");
    };

    const build = () => {
      observer?.disconnect();
      observer = null;
      const list = sections();
      if (!list.length) {
        commit("light");
        return;
      }
      if (typeof IntersectionObserver === "undefined") {
        sync();
        return;
      }
      const probe = probeHeight();
      // A 1px band from the header's bottom edge to the next pixel. Sections
      // are always taller than the band, so exactly one owns the line.
      const bottomInset = Math.max(0, window.innerHeight - probe - 1);
      observer = new IntersectionObserver(
        () => {
          // The first callback can arrive before the page transition has reset
          // the document to the top. Ignore that one; sync() runs once the
          // route has settled and the scroll event catches anything after.
          if (settling && window.scrollY > 8) return;
          sync();
        },
        {
          rootMargin: `-${probe}px 0px -${bottomInset}px 0px`,
          threshold: 0,
        }
      );
      list.forEach((section) => observer?.observe(section));
    };

    const scheduleBuild = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(build, 140);
    };

    const read = () => {
      raf.current = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      const nextHidden = y <= 96 ? false : delta > 3 ? true : delta < -3 ? false : null;
      const nextScrolled = y > 8;
      setScrollState((current) => {
        const next = nextHidden ?? current.hidden;
        return current.path === route &&
          current.hidden === next &&
          current.scrolled === nextScrolled
          ? current
          : { path: route, hidden: next, scrolled: nextScrolled };
      });
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(read);
    };

    lastY.current = window.scrollY;

    // Let the new page paint, re-measure every ScrollTrigger, then settle the
    // probe. The header has already rendered the correct opening state.
    rafs.push(
      requestAnimationFrame(() => {
        // Reloading mid-page must not leave the header clear over content.
        read();
        build();
        ScrollTrigger.refresh();
        rafs.push(
          requestAnimationFrame(() => {
            settling = false;
            sync();
          })
        );
      })
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleBuild);
    window.addEventListener("load", scheduleBuild);

    // Pinned sections inject spacers during refresh and fonts/images change the
    // document height; rebuild the band whenever the layout moves.
    const onRefresh = () => scheduleBuild();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleBuild) : null;
    if (ro && headerRef.current) ro.observe(headerRef.current);
    document.fonts?.ready.then(scheduleBuild).catch(() => { });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleBuild);
      window.removeEventListener("load", scheduleBuild);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      observer?.disconnect();
      ro?.disconnect();
      window.clearTimeout(rebuildTimer);
      rafs.forEach((id) => cancelAnimationFrame(id));
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [pathname]);

  // Freeze the smooth scroller while the menu is open, always release it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    window.__lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOn(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [menuOpen]);

  // Staggered line reveal for the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const panel = menuPanelRef.current;
    if (!panel) return undefined;
    const lines = panel.querySelectorAll<HTMLElement>("[data-menu-line]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(lines, { yPercent: 0, opacity: 1 });
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 118, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power4.out",
          stagger: 0.055,
          delay: 0.12,
        }
      );
    }, panel);
    return () => ctx.revert();
  }, [menuOpen]);

  // Dismiss the Connect dropdown on outside press or Escape.
  useEffect(() => {
    if (!connectOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (!connectRef.current?.contains(event.target as Node)) setConnectOn(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConnectOn(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [connectOpen]);

  const closeMenu = useCallback(() => setMenuOn(null), []);
  const toggleMenu = useCallback(
    () => setMenuOn((current) => (current === pathname ? null : pathname)),
    [pathname]
  );
  const toggleConnect = useCallback(
    () => setConnectOn((current) => (current === pathname ? null : pathname)),
    [pathname]
  );

  const dark = theme === "dark" || menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        data-header
        data-theme={theme}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          // No transform at all while visible: a transformed ancestor can
          // become a backdrop root and drop the glass in some browsers.
          hidden && !menuOpen ? "-translate-y-full" : "",
          className
        )}
      >
        {/*
          One glass surface spanning the nav bar AND the live strip. At the very
          top it is fully clear; once scrolled it becomes a frosted pane so the
          giant footer type cannot run through the nav. Background and
          backdrop-filter ease together over 300ms.
        */}
        <div
          data-header-glass
          className={cn(
            "transition-[background-color,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
            scrolled
              ? dark
                ? "bg-night/70 text-white backdrop-blur-xl backdrop-saturate-150"
                : "bg-white/80 text-ink backdrop-blur-xl backdrop-saturate-150"
              : dark
                ? "bg-transparent text-white backdrop-blur-[0px] backdrop-saturate-100"
                : "bg-transparent text-ink backdrop-blur-[0px] backdrop-saturate-100"
          )}
        >
          <div
            className={cn(
              "mx-auto flex h-[66px] max-w-[1680px] items-center gap-6 border-b px-5 md:px-8 lg:h-[74px] lg:px-10 landscape-short:h-[52px]",
              dark ? "border-white/10" : "border-ink/10"
            )}
          >
            {/* Wordmark — official logo still to be supplied. */}
            <Link
              href="/"
              aria-label={`${CHURCH.name} — home`}
              className="group flex shrink-0 items-center gap-2.5"
            >
              <Image
                src={logo}
                alt=""
                priority
                sizes="60px"
                className="h-9 w-auto shrink-0 object-contain lg:h-10"
              />
              {/* <svg
                viewBox="0 0 26 32"
                aria-hidden="true"
                className="h-[30px] w-[24px] shrink-0"
                fill="none"
              >
                <path
                  d="M1.5 30.5V14.2C1.5 7.9 6.6 2.8 12.9 2.8s11.4 5.1 11.4 11.4V30.5"
                  stroke="currentColor"
                  strokeWidth="1.15"
                />
                <path d="M1.5 30.5h23" stroke="currentColor" strokeWidth="1.15" />
              </svg> */}
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[17px] font-semibold tracking-[-0.02em]">
                  Forever Life
                </span>
                <span className="mt-[3px] font-mono text-[8.5px] uppercase tracking-[0.22em] opacity-65">
                  and Grace Mission
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary"
              className="ml-auto hidden items-center gap-6 lg:flex xl:gap-7"
            >
              {NAV.map((item) => (
                <RollLink
                  key={item.id}
                  href={item.href}
                  data-cursor={
                    item.id === "watch-and-pray"
                      ? "Watch"
                      : item.id === "give"
                        ? "Give"
                        : undefined
                  }
                  className={cn(
                    "relative py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-200",
                    activeId === item.id
                      ? dark
                        ? "text-white"
                        : "text-ink"
                      : dark
                        ? "text-white/90 hover:text-white"
                        : "text-deep-green hover:text-deep-green"
                  )}
                  trailing={
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-[1px] h-[2px] origin-left transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]",
                        dark ? "bg-signal-red" : "bg-brand-green",
                        activeId === item.id ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  }
                >
                  {item.label}
                </RollLink>
              ))}

              <div ref={connectRef} className="relative">
                <button
                  type="button"
                  onClick={toggleConnect}
                  aria-expanded={connectOpen}
                  aria-controls="connect-menu"
                  className={cn(
                    "flex items-center gap-1 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-200",
                    connectOpen
                      ? dark
                        ? "text-white"
                        : "text-ink"
                      : dark
                        ? "text-white/90 hover:text-white"
                        : "text-deep-green hover:text-deep-green"
                  )}
                >
                  Connect
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      connectOpen && "rotate-180"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                <div
                  id="connect-menu"
                  className={cn(
                    "absolute right-0 top-full mt-10 w-60 origin-top-right border border-ink/10 bg-white p-2 text-ink shadow-[0_24px_60px_-24px_rgba(7,19,13,0.35)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    connectOpen
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
                  )}
                >
                  {CONNECT.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2.5 font-sans text-[14px] leading-none text-ink/80 transition-colors hover:bg-mist hover:text-ink"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-ink/30">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right rail */}
            <div className="ml-auto flex shrink-0 items-center gap-4 lg:ml-6">
              <LiveClock
                showZone
                className={cn(
                  "hidden text-[10px] uppercase tracking-[0.14em] md:block lg:hidden xl:block landscape-short:hidden",
                  dark ? "text-white/92" : "text-deep-green"
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-4 w-px md:block lg:hidden xl:block landscape-short:hidden",
                  dark ? "bg-white/20" : "bg-ink/15"
                )}
              />
              <Button
                asChild
                size="sm"
                variant="brand"
                className="hidden md:inline-flex landscape-short:hidden"
              >
                <Link href="/contact">Plan Your Visit</Link>
              </Button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" strokeWidth={1.4} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.4} />
                )}
              </button>
            </div>
          </div>
          <LiveStrip theme={theme} />
        </div>
      </header>

      {/* Mobile menu — full-screen Night-green, staggered serif lines. */}
      <div
        ref={menuPanelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[65] flex flex-col bg-night text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div className="h-[66px] shrink-0 landscape-short:h-[52px]" aria-hidden="true" />

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-8">
          <nav aria-label="Mobile" className="mt-2 flex flex-col">
            {NAV.map((item) => (
              <span key={item.id} className="block overflow-hidden pb-1">
                <Link
                  data-menu-line
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline justify-between py-2 font-serif text-[clamp(2.1rem,9vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white"
                >
                  <span className={cn(activeId === item.id && "text-dawn-mint")}>
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/56">
                    0{NAV.indexOf(item) + 1}
                  </span>
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {CONNECT.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className="font-sans text-[14px] leading-snug text-white/88 transition-colors hover:text-white"
                style={{ minHeight: 44 }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-5 pt-8">
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/72">
                Abuja
              </span>
              <LiveClock showZone className="text-[12px] uppercase tracking-[0.16em]" />
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/72">
                Enquiry lines
              </p>
              <div className="mt-2 flex flex-col">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 py-1.5 font-sans text-[15px] text-white/85 transition-colors hover:text-dawn-mint"
                  >
                    <span className="h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <Button asChild variant="brand" className="w-full">
              <Link href="/contact" onClick={closeMenu}>
                Plan Your Visit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
