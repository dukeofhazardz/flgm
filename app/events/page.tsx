import { AnnualWeek } from "@/components/sections/events/annual";
import { EventsCalendar } from "@/components/sections/events/calendar";
import { EventsHero } from "@/components/sections/events/hero";
import { CHURCH } from "@/data/church";

export const metadata = {
  title: `Events & Programmes — ${CHURCH.name}`,
  description:
    "Upcoming worship services, conferences, special celebrations, and ministry activities at Forever Life and Grace Mission, Gwarinpa, Abuja.",
  openGraph: {
    title: "Events & Programmes — Forever Life and Grace Mission",
    description:
      "Five gatherings across 2026–2027, plus the annual programme of the house.",
    type: "website" as const,
  },
};

/**
 * Events — the calendar issue.
 *
 * Night cover with the date rail → white ticket rows with live filters and
 * Flip re-flow → mist annual programme week strip. All times are WAT.
 */
export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <EventsCalendar />
      <AnnualWeek />
    </main>
  );
}
