import { AnnualWeek } from "@/components/sections/events/annual";
import { EventsCalendar } from "@/components/sections/events/calendar";
import { EventsHero } from "@/components/sections/events/hero";
import { pageMetadata } from "@/lib/seo";
import { eventsJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Events & Programmes",
  description:
    "Upcoming worship services, conferences, special celebrations, and ministry activities at Forever Life and Grace Mission, Gwarinpa, Abuja.",
  path: "/events",
});

/**
 * Events — the calendar issue.
 *
 * Night cover with the date rail → white ticket rows with live filters and
 * Flip re-flow → mist annual programme week strip. All times are WAT.
 */
export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Confirmed events only; Carol Service and First Fruit remain unset.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd()) }}
      />
      <main>
        <EventsHero />
        <EventsCalendar />
        <AnnualWeek />
      </main>
    </>
  );
}
