import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * LegalDocument — the shared shell for the draft policy pages.
 *
 * A quiet white editorial page: folio rail, serif headline, numbered sections
 * and a plain-language route back to the church. It declares
 * `data-header-theme="light"` so the masthead opens in its solid white state.
 */

export interface LegalSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}

interface LegalDocumentProps {
  folio: string;
  title: string;
  standfirst: string;
  updated: string;
  draftNote: string;
  sections: LegalSection[];
}

export function LegalDocument({
  folio,
  title,
  standfirst,
  updated,
  draftNote,
  sections,
}: LegalDocumentProps): React.ReactElement {
  return (
    <main data-header-theme="light" className="relative bg-white text-ink">
      <div className="mx-auto max-w-[1680px] px-5 pb-24 pt-[128px] md:px-8 lg:px-10 lg:pt-[150px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[136px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-forest/65">
                {folio}
              </p>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-14 bg-brand-green"
              />
              <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ink/45">
                Last updated
                <br />
                {updated}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
              >
                Contact the church
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            <header>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-1.5 rounded-full bg-signal-red"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                  Church policy
                </span>
              </div>
              <h1 className="mt-5 max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
                {title}
              </h1>
              <p className="mt-6 max-w-[60ch] font-sans text-[17px] leading-[1.65] text-ink/70 md:text-[19px]">
                {standfirst}
              </p>
              <p className="mt-8 border-l-2 border-brand-green pl-4 font-sans text-[13px] leading-relaxed text-ink/55">
                {draftNote}
              </p>
            </header>

            <div className="mt-14 space-y-12">
              {sections.map((section, index) => (
                <section key={section.title} className="border-t border-ink/10 pt-8">
                  <div className="flex gap-5">
                    <span className="pt-1 font-mono text-[10px] tabular-nums text-forest/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-serif text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[28px]">
                        {section.title}
                      </h2>
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-4 font-sans text-[16px] leading-[1.7] text-ink/70"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.points ? (
                        <ul className="mt-5 space-y-2.5">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-brand-green"
                              />
                              <span className="font-sans text-[16px] leading-[1.65] text-ink/70">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <footer className="mt-16 border-t border-ink/10 pt-8">
              <p className="max-w-[60ch] font-sans text-[16px] leading-[1.7] text-ink/70">
                Questions about this policy can be raised in person at Resurrection
                Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja,
                or by calling one of the published enquiry lines.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink underline decoration-brand-green decoration-2 underline-offset-[6px] transition-colors hover:text-forest"
              >
                Contact and location
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
