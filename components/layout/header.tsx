"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/FLGM-Logo.png";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import gsap from "gsap";
import { CHURCH } from "@/data/church";
import { CONTACT } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { LiveClock } from "@/components/ui/live-clock";
import { LiveStrip } from "@/components/layout/live-strip";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

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
 * Header — editorial masthead.
 *
 * Sits over the dark hero as transparent type, then resolves into a blurred
 * white bar once a `[data-header-theme="light"]` section reaches the top.
 * Hides on scroll down, returns on scroll up. One live Abuja clock, one
 * Connect dropdown, one full-screen mobile menu. Never creates a second Lenis.
 */

export function Header({ className }: { className?: string }): React.ReactElement {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
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

  // One scroll reader for the whole header. Native scroll position is the
  // source of truth (Lenis scrolls the document natively), so this works with
  // or without the smooth-scroll layer.
  useEffect(() => {
    const read = () => {
      raf.current = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      setScrolled(y > 8);

      if (y <= 96) {
        setHidden(false);
      } else if (delta > 3) {
        setHidden(true);
      } else if (delta < -3) {
        setHidden(false);
      }

      // Which section owns the top of the viewport?
      const probe = 46;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme]")
      );
      const active = sections.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });
      const owner = active ?? sections[0];
      setTheme(owner?.dataset.headerTheme === "dark" ? "dark" : "light");
    };

    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

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

  const dark = theme === "dark";

  return (
    <>
      <header
        ref={headerRef}
        data-header
        data-theme={theme}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
          className
        )}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,color] duration-400",
            dark ? "text-white" : "text-ink",
            scrolled
              ? dark
                ? "border-white/10 bg-night/75 backdrop-blur-xl supports-[backdrop-filter]:bg-night/60"
                : "border-ink/10 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75"
              : dark
                ? "border-white/10 bg-transparent"
                : "border-ink/5 bg-white/45 backdrop-blur-md"
          )}
        >
          <div className="mx-auto flex h-[66px] max-w-[1680px] items-center gap-6 px-5 md:px-8 lg:h-[74px] lg:px-10">
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
                sizes="(min-width: 1024px) 160px, 128px"
                className="h-9 w-auto lg:h-10"
              />
              <span className="sr-only">{CHURCH.name}</span>
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
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-opacity",
                    activeId === item.id ? "opacity-100" : "opacity-65 hover:opacity-100"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-[1px] h-[2px] origin-left bg-signal-red transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      activeId === item.id ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              ))}

              <div ref={connectRef} className="relative">
                <button
                  type="button"
                  onClick={toggleConnect}
                  aria-expanded={connectOpen}
                  aria-controls="connect-menu"
                  className="flex items-center gap-1 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] opacity-65 transition-opacity hover:opacity-100"
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
                className="hidden text-[10px] uppercase tracking-[0.14em] opacity-70 md:block"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-4 w-px md:block",
                  dark ? "bg-white/20" : "bg-ink/15"
                )}
              />
              <Button asChild size="sm" variant="brand" className="hidden md:inline-flex">
                <Link href="/contact">Plan Your Visit</Link>
              </Button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "-mr-2 flex h-11 w-11 items-center justify-center lg:hidden",
                  menuOpen && "pointer-events-none opacity-0"
                )}
              >
                <Menu className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </div>

        <LiveStrip theme={theme} />
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
        <div className="flex h-[66px] shrink-0 items-center justify-between px-5">
          <span className="font-serif text-[17px] font-semibold tracking-[-0.02em]">
            Forever Life
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

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
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/30">
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
                className="font-sans text-[14px] leading-snug text-white/65 transition-colors hover:text-white"
                style={{ minHeight: 44 }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-5 pt-8">
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Abuja
              </span>
              <LiveClock showZone className="text-[12px] uppercase tracking-[0.16em]" />
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
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
