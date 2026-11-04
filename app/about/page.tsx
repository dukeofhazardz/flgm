import { AboutBeliefs } from "@/components/sections/about/beliefs";
import { AboutHero } from "@/components/sections/about/hero";
import { AboutHistory } from "@/components/sections/about/history";
import { AboutLeadership } from "@/components/sections/about/leadership";
import { AboutMission } from "@/components/sections/about/mission";
import { AboutVision } from "@/components/sections/about/vision";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Who we are, the vision we carry, the mission we serve, the convictions we hold, and the leadership of Forever Life and Grace Mission.",
  path: "/about",
});

/**
 * About — the identity issue.
 *
 * Night opener → mist history → white sticky vision deck → mist mission index
 * → night beliefs → white leadership and directory. The page is the composition
 * layer; all copy and confirmation flags live in `data/`.
 */
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutHistory />
      <AboutVision />
      <AboutMission />
      <AboutBeliefs />
      <AboutLeadership />
    </main>
  );
}
