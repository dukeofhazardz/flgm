import * as React from "react";
import { ArtSlot } from "@/components/ui/art-slot";
import { Folio } from "@/components/ui/folio";
import { SectionTag } from "@/components/ui/section-tag";
import { ABOUT_HERO } from "@/data/about";
import { CHURCH } from "@/data/church";

/**
 * AboutHero — the magazine opener.
 *
 * The identity line becomes a four-line pull-quote set at masthead scale.
 * The stairs study sits in the signature arch, cut from dawn light, with the
 * grain and rules doing the work a photograph would normally do.
 */
export function AboutHero(): React.ReactElement {
  return (
    <section
      id="who-we-are"
      data-section="about-hero"
      data-header-theme="light"
      className="relative overflow-x-clip bg-white text-ink"
    >
      <div className="relative mx-auto max-w-[1680px] px-5 pb-16 pt-[116px] md:px-8 md:pb-24 md:pt-[132px] lg:px-10 lg:pb-32 lg:pt-[148px]">
        <header className="grid grid-cols-12 items-baseline gap-3 border-b border-ink/12 pb-5 md:gap-6">
          <div className="col-span-8 flex items-baseline gap-4 md:col-span-6">
            <SectionTag className="text-ink/45">§ 01 — Who we are</SectionTag>
            <span aria-hidden="true" className="hidden h-px w-14 bg-ink/20 md:block" />
          </div>
          <p className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-4 md:block">
            {ABOUT_HERO.folio}
          </p>
          <Folio className="col-span-4 text-right text-[9px] uppercase tracking-[0.2em] text-ink/45 md:col-span-2">
            No. 01 / 06
          </Folio>
        </header>

        <div className="mt-10 grid grid-cols-12 items-end gap-x-3 gap-y-10 md:mt-14 md:gap-x-6 lg:mt-16">
          <div className="col-span-12 md:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-red" aria-hidden="true" />
              The house, the people, the purpose
            </p>

            <h1 className="mt-4 max-w-[13ch] font-serif text-[clamp(3.2rem,10.4vw,9.8rem)] font-medium leading-[0.84] tracking-[-0.05em] text-ink">
              <span className="mb-5 block font-sans text-[clamp(0.7rem,1.2vw,0.9rem)] font-medium uppercase leading-[1.5] tracking-[0.22em] text-deep-green">
                Who we are
              </span>
              <span className="block">A House</span>
              <span className="block italic">of Grace.</span>
              <span className="mt-2 block">A People</span>
              <span className="block italic">of Purpose.</span>
            </h1>
          </div>

          <figure className="col-span-12 mx-auto w-full max-w-[330px] md:col-span-4 md:mx-0 md:max-w-none lg:ml-auto lg:max-w-[360px]">
            <div
              className="relative aspect-[3/4] overflow-hidden border border-ink/12 bg-tint-white"
              style={{
                borderTopLeftRadius: 999,
                borderTopRightRadius: 999,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #F4F9EC 0%, #F8FCEF 34%, #EAF1DE 72%, #DDEBC4 100%)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(70% 52% at 50% 92%, rgba(255,227,222,0.6) 0%, rgba(255,227,222,0) 74%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-center">
                <ArtSlot
                  name={ABOUT_HERO.art}
                  size={300}
                  color="ink"
                  className="translate-y-4 opacity-80"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute -left-1 top-9 select-none font-serif text-[9rem] font-medium leading-none text-ink/10"
              >
                01
              </span>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/15"
                style={{
                  borderTopLeftRadius: 999,
                  borderTopRightRadius: 999,
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 border-t border-ink/10 bg-white/80 px-3 py-2 font-mono text-[7px] uppercase tracking-[0.16em] text-ink/70">
                <span>Fig. 01 — Ascent</span>
                <span className="hidden lg:inline">Resurrection Ground</span>
              </div>
            </div>
            <p className="mt-3 hidden text-right font-mono text-[8px] uppercase leading-[1.7] tracking-[0.18em] text-ink/50 lg:block">
              {CHURCH.address}
            </p>
          </figure>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-x-3 gap-y-6 border-t border-ink/12 pt-6 md:mt-16 md:gap-x-6 md:pt-7">
          <p className="col-span-12 max-w-[30ch] font-serif text-[clamp(1.4rem,2.8vw,2.25rem)] font-medium leading-[1.18] tracking-[-0.02em] text-ink/85 lg:col-span-4">
            A community founded on the finished work of Jesus Christ.
          </p>
          <div className="col-span-12 grid gap-5 md:grid-cols-2 md:gap-x-6 lg:col-span-7 lg:col-start-6">
            {ABOUT_HERO.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "max-w-[42ch] text-[16px] leading-[1.62] text-ink/75 md:col-span-2 md:text-[17px]"
                    : "max-w-[38ch] text-[15px] leading-[1.62] text-ink/70"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
