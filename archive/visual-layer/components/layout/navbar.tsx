"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { CHURCH } from "@/data/church";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Lenis from "lenis";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "watch-and-pray", label: "Watch and Pray", href: "/watch-and-pray" },
  { id: "sermons", label: "Sermons", href: "/sermons" },
  { id: "events", label: "Events", href: "/events" },
  { id: "give", label: "Give", href: "/give" },
] as const;

const CONNECT_ITEMS = [
  { id: "prayer", label: "Prayer and Counselling", href: "/prayer" },
  { id: "new-members", label: "New Members", href: "/new-members" },
  { id: "volunteer", label: "Volunteer", href: "/volunteer" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Derive active link during render (no setState in effect).
  const activeId = React.useMemo(() => {
    const match =
      NAV_LINKS.find((n) => n.href === pathname) ||
      CONNECT_ITEMS.find((c) => c.href === pathname);
    return match ? match.id : null;
  }, [pathname]);

  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Lenis scroll: update header data attributes directly (no React state in the render loop).
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      autoRaf: false,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined")
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onFrame = (time: number) => {
      lenis.raf(time);
      const scrollY = lenis.scroll || 0;
      const scrollingDown = scrollY > lastScrollY.current;
      lastScrollY.current = scrollY;

      header.dataset.scrolled = String(scrollY > 10);
      if (scrollY > 40) {
        header.dataset.hide = String(scrollingDown);
      } else {
        header.dataset.hide = "false";
      }
    };

    rafRef.current = requestAnimationFrame(onFrame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleMenu = useCallback(() => setOpen((o) => !o), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  // Focus trap: Esc closes.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  const headerClasses = cn(
    "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out",
    "border-b border-ink/5",
    className
  );

  return (
    <>
      <header
        ref={headerRef}
        className={headerClasses}
        data-scrolled="false"
        data-hide="false"
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-ink font-serif text-xl font-bold tracking-tight"
            title={`${CHURCH.name} — home`}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-ink text-[10px] font-bold">
              A
            </span>
            {CHURCH.name}
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-ink transition-colors relative",
                  activeId === item.id ? "text-brand-green" : "hover:text-brand-green"
                )}
              >
                {item.label}
                {activeId === item.id && (
                  <span
                    className="absolute -bottom-px left-0 w-full h-[2px] bg-brand-green transform scale-x-0 origin-center transition-transform duration-300 ease-out"
                  />
                )}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={toggleMenu}
                aria-expanded={open}
                aria-controls="connect-menu"
                className="flex items-center gap-2 text-sm font-medium text-ink hover:text-brand-green transition-colors"
              >
                Connect <ChevronDown className="w-4 h-4" />
              </button>
              <div
                id="connect-menu"
                className={cn(
                  "absolute top-full left-0 mt-2 w-56 bg-white border border-ink/10 py-3 shadow-lg",
                  open
                    ? "opacity-100 scale-100 translate-y-0 transition-all duration-200 ease-out"
                    : "opacity-0 scale-95 translate-y-2 pointer-events-hidden transition-all duration-200 ease-in"
                )}
              >
                {CONNECT_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-ink hover:bg-tint-white hover:text-brand-green transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Button asChild size="sm" variant="brand">
              <Link href="/contact">Plan Your Visit</Link>
            </Button>
          </div>

          <button
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-ink"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-white",
          open ? "translate-x-0" : "-translate-x-full transition-transform duration-400 ease-out",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <span id="mobile-menu-title" className="font-serif text-xl font-bold text-ink">
            {CHURCH.name}
          </span>
          <button onClick={closeMenu} aria-label="Close menu" className="p-2 text-ink">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="space-y-4">
            <h2 className="sr-only">Main navigation</h2>
            {[...NAV_LINKS, ...CONNECT_ITEMS].map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "block px-4 py-4 text-base font-medium text-ink hover:bg-tint-white hover:text-brand-green transition-colors rounded-none border-b border-ink/5 pb-4 last:border-0",
                  activeId === item.id ? "text-brand-green font-bold" : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <Button asChild variant="brand" className="w-full">
              <Link href="/contact" onClick={closeMenu}>
                Plan Your Visit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
