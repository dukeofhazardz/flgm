import { Button } from "@/components/ui/button";
import { SectionTag } from "@/components/ui/section-tag";
import { LiveClock } from "@/components/ui/live-clock";
import { DayCounter } from "@/components/ui/day-counter";
import { ArtSlot } from "@/components/ui/art-slot";
import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import { HorizonDivider } from "@/components/motion/horizon-divider";
import { KineticHeading } from "@/components/motion/kinetic-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Styleguide",
  description: "Design system styleguide for Forever Life and Grace Mission.",
  path: "/styleguide",
  noIndex: true,
});

/**
 * Styleguide — shows colours, type scale, buttons, and every motion primitive.
 * Hidden route used for visual QA via browser-use screenshots.
 */

export default function Styleguide() {
  return (
    <main className="min-h-screen p-6 text-ink bg-white">
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-ink leading-[1.05] tracking-tighter mb-6">
        FLGM Styleguide — The Daybreak Edition
      </h1>

      {/* Colours */}
      <section className="my-16 border-b border-ink/10 pb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-6">Colour System</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            ["White", "#ffffff", "text-ink"],
            ["Night", "#04180f", "text-white"],
            ["Forest", "#0b3b24", "text-white"],
            ["Ink", "#07130d", "text-white"],
            ["Brand Green", "#00c853", "text-ink"],
            ["Dawn Mint", "#c9f5da", "text-ink"],
            ["Mist", "#f2f8f3", "text-ink"],
            ["Blush", "#ffe3de", "text-ink"],
            ["Crimson-text", "#b80000", "text-white"],
            ["Signal Red", "#fc0000", "text-ink"],
            ["Tint White", "#f7fdf8", "text-ink"],
          ].map(([name, hex, textClass]) => (
            <div
              key={name}
              className="p-4 rounded-none border border-ink/10 flex flex-col items-center gap-2"
            >
              <div
                className={`w-12 h-12 rounded-none ${textClass}`}
                style={{ backgroundColor: hex }}
              />
              <span className="text-[10px] font-mono font-medium text-ink/60 uppercase">
                {name}
              </span>
              <span className="text-[10px] font-mono text-ink/40">{hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section className="my-16 border-b border-ink/10 pb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-6">Type Scale</h2>
        <div className="space-y-4">
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T0 — clamp(4rem, 14vw, 14rem)</span>
            <span className="font-serif font-bold text-ink" style={{ fontSize: "clamp(4rem, 14vw, 14rem)", lineHeight: "0.95" }}>
              We Get Better Every Day!
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T1 — clamp(2.5rem, 8vw, 5rem)</span>
            <span className="font-serif font-bold text-ink" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: "1.05" }}>
              Section Heading
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T2 — clamp(1.75rem, 5vw, 3rem)</span>
            <span className="font-serif font-bold text-ink" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", lineHeight: "1.1" }}>
              Page Headline
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T3 — clamp(1.25rem, 3vw, 1.75rem)</span>
            <span className="font-serif text-ink" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", lineHeight: "1.4" }}>
              Subheading
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T4 — 17px (body min)</span>
            <span className="text-ink leading-relaxed" style={{ fontSize: "17px" }}>
              Body text at minimum 17px on mobile for older visitors.
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T5 — 15px</span>
            <span className="text-ink/70 text-sm" style={{ fontSize: "15px" }}>
              Captions and labels
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] text-crimson-text uppercase tracking-wider block mb-1">T6 — 12px</span>
            <span className="text-ink/50 text-[12px]">
              Fine print and legal
            </span>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="my-16 border-b border-ink/10 pb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-6">Buttons</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="brand" size="md">Plan Your Visit</Button>
          <Button variant="outline" size="md">Join Watch and Pray</Button>
          <Button asChild variant="text-link" size="md">
            <a href="/give">Support the Building Project</a>
          </Button>
          <Button variant="red" size="sm">Give</Button>
        </div>
      </section>

      {/* Motion primitives */}
      <section className="my-16 border-b border-ink/10 pb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-6">Motion Primitives</h2>

        <div className="mb-8">
          <SectionTag>§ 01 — Reveal</SectionTag>
          <Reveal className="mb-4">
            <h3 className="font-serif text-xl font-bold text-ink">Scroll reveal section</h3>
            <p className="text-ink/70 leading-relaxed">Reveals heading → text → picture with 30–80ms stagger.</p>
          </Reveal>
        </div>

        <div className="mb-8">
          <SectionTag>§ 02 — Marquee</SectionTag>
          <Marquee speed={30}>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">Grace</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">•</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">Eternal Life</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">•</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">Sonship</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">•</span>
            <span className="text-sm font-semibold text-ink/60 tracking-widest uppercase">Kingdom Influence</span>
          </Marquee>
        </div>

        <div className="mb-8">
          <SectionTag>§ 03 — Magnetic</SectionTag>
          <Magnetic strength={0.3} className="inline-block">
            <Button variant="brand" size="sm">Magnetic Button</Button>
          </Magnetic>
        </div>

        <div className="mb-8">
          <SectionTag>§ 04 — HorizonDivider</SectionTag>
          <HorizonDivider className="my-8" />
        </div>

        <div className="mb-8">
          <SectionTag>§ 05 — ArtSlot / ImageSlot</SectionTag>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <ArtSlot name="sun" size={120} color="green" />
            <ArtSlot name="stairs" size={120} color="white" className="bg-night" />
            <ArtSlot name="doorway" size={120} color="ink" />
            <ArtSlot name="book" size={120} color="green" />
            <ArtSlot name="rays" size={120} color="white" className="bg-night" />
            <ArtSlot name="hands" size={120} color="ink" />
          </div>
          <div className="mt-4">
            <ImageSlot name="sun" size={200} architecturalConcept />
          </div>
        </div>

        <div className="mb-8">
          <SectionTag>§ 06 — LiveClock / DayCounter</SectionTag>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <LiveClock />
            <DayCounter />
          </div>
        </div>
      </section>

      {/* Cursor spotlight demo */}
      <section className="my-16 border-b border-ink/10 pb-8 bg-night text-white min-h-[400px] flex items-center justify-center relative overflow-hidden">
        <SectionTag className="absolute top-6 left-6">§ 07 — Cursor Spotlight</SectionTag>
        <CursorSpotlight />
        <h2 className="font-serif text-5xl font-bold text-white leading-[1.05]">
          Move your cursor here
        </h2>
        <p className="mt-4 text-dawn-mint/80">Soft green spotlight follows cursor on dark sections.</p>
      </section>

      {/* KineticHeading demo */}
      <section className="my-16">
        <SectionTag>§ 08 — KineticHeading</SectionTag>
        <KineticHeading className="font-serif text-6xl md:text-8xl font-bold text-ink block cursor-pointer">
          Grace
        </KineticHeading>
      </section>
    </main>
  );
}
