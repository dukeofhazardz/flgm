import { CHURCH } from "@/data/church";

export const metadata = {
  title: `About — ${CHURCH.name}`,
  description: `${CHURCH.identityLine} — Learn about our vision, mission, beliefs, and leadership.`,
};

/**
 * About — foundation page. Visual sections are archived and will be rebuilt.
 * Renders church identity only so the scroll foundation can be verified.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-ink leading-[1.05] tracking-tight">
        About Us
      </h1>
      <p className="mt-4 text-base text-ink/70 leading-relaxed max-w-3xl">
        {CHURCH.identityLine}
      </p>
      <p className="mt-6 text-sm text-ink/50">
        {CHURCH.address}
      </p>
    </main>
  );
}
