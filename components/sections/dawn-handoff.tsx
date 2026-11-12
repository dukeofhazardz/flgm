import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CHURCH } from "@/data/church";

/**
 * DawnHandoff — the second section of the home page.
 *
 * The white hero hands over to a quiet mist field that says something the hero
 * does not: the house's identity and where to find it. No illustration and no
 * repeated welcome copy — type, address, and one route into the story.
 */

export function DawnHandoff(): React.ReactElement {
  return (
    <section
      data-section="dawn"
      data-header-theme="light"
      className="relative bg-mist text-ink"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-8 md:py-32 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2 md:col-start-1 md:row-start-1">
            <p className="flex items-baseline gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40 md:flex-col md:gap-2">
              <span>§ 02</span>
              <span className="hidden h-10 w-px bg-ink/15 md:block" aria-hidden="true" />
              <span>Welcome</span>
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-3 md:row-start-1">
            <h2 className="max-w-[18ch] font-serif text-[clamp(2.1rem,4.6vw,4.4rem)] font-medium leading-[0.94] tracking-[-0.035em]">
              A House of Grace. A People of Purpose.
            </h2>
            <p className="mt-7 max-w-[54ch] font-sans text-[17px] leading-[1.6] text-deep-green md:text-[18px]">
              Where the life of God is revealed, the grace of Jesus Christ is
              celebrated, and believers are established in their identity as sons
              of God.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:row-start-1 md:border-l md:border-ink/10 md:pl-6 lg:pl-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40">
              Find us
            </p>
            <p className="mt-4 max-w-[34ch] font-sans text-[15px] leading-[1.65] text-ink/70">
              {CHURCH.address}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 border-b border-signal-red pb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
            >
              Read our story
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto h-px max-w-[1680px] bg-ink/10" />
    </section>
  );
}
