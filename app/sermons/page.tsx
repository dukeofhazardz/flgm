import { FeaturedMessage } from "@/components/sections/sermons/featured";
import { SermonsHero } from "@/components/sections/sermons/hero";
import { SermonLibrary } from "@/components/sections/sermons/library";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sermons & Messages",
  description:
    "Teachings, sermons, worship sessions, testimonies, and messages from Forever Life and Grace Mission — establishing believers in grace, eternal life, sonship, and Kingdom influence.",
  path: "/sermons",
});

/**
 * Sermons — the library issue.
 *
 * Night cover with the book study in the arch → mist featured message held
 * with an editorial waiting state → white searchable archive. No message,
 * speaker, or Scripture is invented; the data layer is empty until approval.
 */
export default function SermonsPage() {
  return (
    <main>
      <SermonsHero />
      <FeaturedMessage />
      <SermonLibrary />
    </main>
  );
}
