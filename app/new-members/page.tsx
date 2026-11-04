import { NewMembersClose } from "@/components/sections/new-members/close";
import { NewMembersFormSection } from "@/components/sections/new-members/form-section";
import { NewMembersHero } from "@/components/sections/new-members/hero";
import { NewMembersJourney } from "@/components/sections/new-members/journey";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "New Members",
  description:
    "Your journey with Forever Life and Grace Mission begins here. Register your visit, request membership information, and see how the church follows up.",
  path: "/new-members",
});

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
