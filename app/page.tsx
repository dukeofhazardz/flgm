import { CHURCH } from "@/data/church";
import { HomeHero } from "@/components/sections/home-hero";
import { SignatureMarquee } from "@/components/sections/signature-marquee";
import { DawnHandoff } from "@/components/sections/dawn-handoff";

export const metadata = {
  title: CHURCH.name,
  description: `${CHURCH.identityLine} — ${CHURCH.tagline}`,
};

/**
 * Home — the Daybreak Edition.
 * Hero sunrise → outlined creed ribbon → the first white morning.
 */

export default function Home() {
  return (
    <main>
      <HomeHero />
      <SignatureMarquee />
      <DawnHandoff />
    </main>
  );
}
