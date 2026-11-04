import { FeaturedMessage } from "@/components/sections/sermons/featured";
import { SermonsHero } from "@/components/sections/sermons/hero";
import { SermonLibrary } from "@/components/sections/sermons/library";
import { CHURCH } from "@/data/church";

export const metadata = {
  title: `Sermons & Messages — ${CHURCH.name}`,
  description:
    "Teachings, sermons, worship sessions, testimonies, and messages from Forever Life and Grace Mission — establishing believers in grace, eternal life, sonship, and Kingdom influence.",
  openGraph: {
    title: "Sermons & Messages — Forever Life and Grace Mission",
    description:
      "The teaching library of the house: eight categories, published messages, and the featured word of the week.",
    type: "website" as const,
  },
};

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
