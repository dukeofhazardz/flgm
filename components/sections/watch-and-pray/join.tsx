import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarPlus } from "lucide-react";
import { SOCIALS } from "@/data/socials";
import { SocialIcon } from "@/components/ui/social-icon";

/**
 * WatchJoin — the daily invitation.
 * All four published accounts appear, using the shared list and platform marks
 * so every surface on the site shows the same icons.
 */

export function WatchJoin(): React.ReactElement {
  return (
    <section
      id="join"
      data-header-theme="dark"
      className="relative overflow-x-clip bg-forest text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 120% at 82% 10%, rgba(51,164,2,0.16) 0%, rgba(51,164,2,0) 62%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1680px] px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:px-10 lg:pb-32">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-white/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/76">
              § 05 — Join
            </span>
            <span aria-hidden="true" className="hidden h-px w-14 bg-white/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/66 md:col-span-4 md:block">
            Every morning · 5:30 AM WAT
          </p>
          <span className="col-span-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-white/66 md:col-span-2">
            No. 08 / 10
          </span>
        </header>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <h2 className="max-w-[11ch] font-serif text-[clamp(2.8rem,6.6vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.045em]">
              Join the daily <span className="italic">prayer</span>
            </h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.62] text-white/88">
              Join us every morning for prayer, spiritual engagement, and the
              advancement of God’s Kingdom.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/15 pt-6">
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/72">
                  Daily
                </p>
                <p className="mt-1.5 font-serif text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-none tracking-[-0.04em]">
                  5:30 <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/82">AM</span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/72">
                  Period
                </p>
                <p className="mt-1.5 max-w-[26ch] text-balance font-serif text-[1.35rem] font-medium italic leading-tight tracking-[-0.01em] text-white/85">
                  11 November — 30 December 2026
                </p>
              </div>
            </div>

            <Link
              href="/watch-and-pray/calendar"
              className="group mt-8 inline-flex min-h-11 items-center gap-2.5 border border-white/30 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/94 transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white hover:bg-white hover:text-ink active:scale-[0.98]"
            >
              <CalendarPlus className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Add the fifty days to your calendar
              <span className="sr-only">(.ics file)</span>
            </Link>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/72">
              Watch with us on
            </p>

            <ul className="mt-4">
              {SOCIALS.map((social) => (
                <li key={social.id} className="border-t border-white/15 last:border-b">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[74px] items-center gap-4 py-4 transition-colors duration-300 hover:text-dawn-mint md:min-h-[86px]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white/94 transition-colors duration-300 group-hover:border-brand-green group-hover:text-brand-green">
                      <SocialIcon id={social.id} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium leading-none tracking-[-0.03em]">
                        Join on {social.label}
                      </span>
                      <span className="mt-1.5 block truncate font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/72">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-white/66 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
