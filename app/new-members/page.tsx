import { NewMembersClose } from "@/components/sections/new-members/close";
import { NewMembersFormSection } from "@/components/sections/new-members/form-section";
import { NewMembersHero } from "@/components/sections/new-members/hero";
import { NewMembersJourney } from "@/components/sections/new-members/journey";
import { CHURCH } from "@/data/church";

export const metadata = {
  title: `New Members — ${CHURCH.name}`,
  description:
    "Your journey with Forever Life and Grace Mission begins here. Register your visit, request membership information, and see how the church follows up.",
  openGraph: {
    title: "New Members — Forever Life and Grace Mission",
    description:
      "A first visit, a returning faith, a church family. Register and let the church walk with you.",
    type: "website" as const,
  },
};

/**
 * New Members — the welcome issue.
 *
 * Night cover with a route study → white registration desk → mist six-station
 * follow-up rail → night welcome. No names, photographs, or promises are
 * invented; the follow-up process is described exactly as supplied.
 */
export default function NewMembersPage() {
  return (
    <main>
      <NewMembersHero />
      <NewMembersFormSection />
      <NewMembersJourney />
      <NewMembersClose />
    </main>
  );
}
