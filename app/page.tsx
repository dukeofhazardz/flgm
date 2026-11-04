import { CHURCH } from "@/data/church";
import { HomeHero } from "@/components/sections/home-hero";
import { SignatureMarquee } from "@/components/sections/signature-marquee";
import { HomeVision } from "@/components/sections/home/home-vision";
import { HomeWelcome } from "@/components/sections/home/home-welcome";
import { HomeProgrammes } from "@/components/sections/home/home-programmes";
import { HomeWeek } from "@/components/sections/home/home-week";
import { HomeBuilding } from "@/components/sections/home/home-building";
import { HomeNextStep } from "@/components/sections/home/home-next-step";
import { HomeEvents } from "@/components/sections/home/home-events";

export const metadata = {
  title: CHURCH.name,
  description: `${CHURCH.identityLine} — ${CHURCH.tagline}`,
};

/**
 * Home — the Daybreak Edition.
 *
 * Sunrise masthead → creed ribbon → the white morning → the letter → the
 * programmes → the week → the house we are building → the next step → the
 * next three gatherings. Light and dark fields alternate; every section has
 * a section tag, a folio, and one deliberate motion moment.
 */

export default function Home() {
  return (
    <main>
      <HomeHero />
      <SignatureMarquee />
      <HomeVision />
      <HomeWelcome />
      <HomeProgrammes />
      <HomeWeek />
      <HomeBuilding />
      <HomeNextStep />
      <HomeEvents />
    </main>
  );
}
