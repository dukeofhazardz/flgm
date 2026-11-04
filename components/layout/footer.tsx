"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHURCH } from "@/data/church";
import { CONTACT } from "@/data/contact";
import { GIVING } from "@/data/giving";
import { NAV_ITEMS } from "@/data/nav";
import { RollLink } from "@/components/ui/roll-link";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer — the close of the issue.
 * Night field, grain, a width-filling tagline that rises as it enters, then
 * address, phone lines, quick links, socials, giving details and policy links.
 * The copyright year is resolved on the client so nothing prerenders a clock.
 */

function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  React.useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );
  return { copied, copy };
}

export function Footer(): React.ReactElement {
  const { copied, copy } = useCopy(GIVING.accountNumber);
  const hydrated = useHydrated();
  const year = hydrated ? new Date().getFullYear() : null;
  const taglineRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const el = taglineRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 42, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 96%",
            end: "top 48%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      data-header-theme="dark"
      className="relative overflow-hidden bg-night text-white"
    >
      <div className="grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1680px] px-5 pb-8 pt-20 md:px-8 lg:px-10 lg:pt-28">
        {/* Giant close line */}
        <div className="overflow-hidden pb-[0.06em]">
          <h2
            ref={taglineRef}
            data-velocity
            className="font-serif text-[clamp(2.7rem,10.4vw,11rem)] font-medium italic leading-[0.86] tracking-[-0.045em]"
          >
            {CHURCH.tagline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-8">
          {/* Identity + address + phones */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="font-serif text-[21px] font-semibold tracking-[-0.02em]">
              Forever Life
              <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-white/45">
                and Grace Mission
              </span>
            </Link>
            <p className="mt-6 max-w-[34ch] font-sans text-[14px] leading-relaxed text-white/60">
              {CHURCH.address}
            </p>
            <div className="mt-7 flex flex-col gap-2">
              {CONTACT.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex w-fit items-center gap-2.5 py-1 font-mono text-[12px] tracking-[0.04em] text-white/80 transition-colors hover:text-dawn-mint"
                >
                  <span className="block h-1 w-1 rounded-full bg-signal-red" aria-hidden="true" />
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
              Visit
            </h3>
            <ul className="mt-5 space-y-2.5">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <RollLink
                    href={item.href}
                    className="inline-flex min-h-[28px] items-center font-sans text-[14px] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </RollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
              Connect
            </h3>
            <ul className="mt-5 space-y-2.5">
              {CONTACT.socials.map((social) => (
                <li key={social.platform}>
                  {social.confirmed && social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[28px] items-center gap-1.5 font-sans text-[14px] text-white/65 transition-colors hover:text-white"
                    >
                      {social.platform}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[28px] items-center gap-1.5 font-sans text-[14px] text-white/25">
                      {social.platform}
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em]">
                        soon
                      </span>
                    </span>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[28px] items-center font-sans text-[14px] text-white/65 transition-colors hover:text-white"
                >
                  Contact the church
                </Link>
              </li>
            </ul>
          </div>

          {/* Giving */}
          <div className="md:col-span-12 lg:col-span-3 lg:col-start-10">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
              Giving
            </h3>
            <dl className="mt-5 space-y-1.5">
              <div>
                <dt className="sr-only">Account name</dt>
                <dd className="font-sans text-[14px] font-medium text-white/85">
                  {GIVING.accountName}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Bank</dt>
                <dd className="font-sans text-[13px] text-white/55">{GIVING.bank}</dd>
              </div>
              <div>
                <dt className="sr-only">Account number</dt>
                <dd className="font-mono text-[16px] tracking-[0.12em] text-dawn-mint">
                  {GIVING.accountNumber}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={copy}
              className="mt-4 inline-flex items-center gap-2 border border-white/20 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-dawn-mint hover:text-dawn-mint"
            >
              {copied ? (
                <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Copy className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
              )}
              <span aria-live="polite">{copied ? "Copied" : "Copy account number"}</span>
            </button>
            <p className="mt-4 max-w-[30ch] font-sans text-[11px] leading-relaxed text-white/35">
              Voluntary giving through officially approved church channels only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              © {year ?? 2026} {CHURCH.name}
            </p>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 md:block" />
            <a
              href="https://www.dukehouse.tech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site by Dukehouse Tech (opens in a new tab)"
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white/80"
            >
              Site by Dukehouse Tech
            </a>
          </div>
          <nav aria-label="Policies" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Use", "/terms"],
              ["Giving Policy", "/giving-policy"],
              ["Safeguarding", "/safeguarding"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-mono text-[9px] uppercase tracking-[0.16em] text-white/35",
                  "transition-colors hover:text-white/80"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
