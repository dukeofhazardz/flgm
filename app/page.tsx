import { HomeHero } from "@/components/sections/home-hero";
import { DawnHandoff } from "@/components/sections/dawn-handoff";
import { SignatureMarquee } from "@/components/sections/signature-marquee";
import { HomeVision } from "@/components/sections/home/home-vision";
import { HomeWelcome } from "@/components/sections/home/home-welcome";
import { HomeProgrammes } from "@/components/sections/home/home-programmes";
import { HomeWeek } from "@/components/sections/home/home-week";
import { HomeBuilding } from "@/components/sections/home/home-building";
import { HomeNextStep } from "@/components/sections/home/home-next-step";
import { HomeEvents } from "@/components/sections/home/home-events";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata(
  "A House of Grace. A People of Purpose. We Get Better Every Day! — Resurrection Ground, Gwarinpa, Abuja, Nigeria."
);

/**
 * Home — the white edition.
 *
 * White hero → the identity handoff → creed ribbon → the vision → the letter →
 * the programmes → the week → the house we are building → the next step →
 * the next three gatherings. Sections alternate white and mist with hairlines
 * between them; the footer is the only green field on the page.
 */

export default function Home() {
  return (
    <main>
      <HomeHero />
      <DawnHandoff />
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
