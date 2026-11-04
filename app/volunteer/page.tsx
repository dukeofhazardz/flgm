import { VolunteerAfter } from "@/components/sections/volunteer/after";
import { VolunteerAreas } from "@/components/sections/volunteer/areas";
import { VolunteerFormSection } from "@/components/sections/volunteer/form-section";
import { VolunteerHero } from "@/components/sections/volunteer/hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Volunteer",
  description:
    "Join the mission. Reach lives. Build disciples. Register to serve in evangelism, discipleship, prayer, visitor welcome, or digital outreach at Forever Life and Grace Mission.",
  path: "/volunteer",
});

/**
 * Volunteer — the mission issue.
 *
 * Night cover with a five-column elevation → white service roster → mist
 * three-step registration desk → night after-registration rail with the
 * commitment and Matthew 28:19. No invented roles or leadership names.
 */
export default function VolunteerPage() {
  return (
    <main>
      <VolunteerHero />
      <VolunteerAreas />
      <VolunteerFormSection />
      <VolunteerAfter />
    </main>
  );
}
