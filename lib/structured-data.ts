import { CHURCH } from "@/data/church";
import { CONTACT } from "@/data/contact";
import { EVENTS } from "@/data/events";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Structured data.
 *
 * Only confirmed facts are published: the name, the address, the three
 * supplied telephone lines and the three confirmed social profiles. The email
 * address is deliberately absent because it has not been supplied, and
 * unconfirmed events never reach the Event graph.
 */

const TELEPHONES = ["+2348089599066", "+2347068246902", "+2348037055043"];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "Resurrection Ground, beside Davina Hills Resort, off 1st Avenue",
  addressLocality: "Gwarinpa, Abuja",
  addressRegion: "FCT",
  addressCountry: "NG",
} as const;

const SAME_AS = CONTACT.socials
  .filter((social) => social.confirmed && social.url)
  .map((social) => social.url as string);

export const CHURCH_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${SITE_URL}/#church`,
  name: SITE_NAME,
  alternateName: "FLGM",
  url: SITE_URL,
  slogan: CHURCH.tagline,
  description: `${CHURCH.identityLine} ${CHURCH.tagline} A church in Gwarinpa, Abuja, Nigeria.`,
  address: POSTAL_ADDRESS,
  telephone: TELEPHONES,
  sameAs: SAME_AS,
} as const;

interface EventSource {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time24: string | null;
  description: string;
  confirmed: boolean;
}

/** ISO 8601 start/end with Nigeria's fixed +01:00 offset. */
function iso(date: string, time: string | null): string {
  return `${date}T${time ?? "00:00"}:00+01:00`;
}

export function eventsJsonLd(events: readonly EventSource[] = EVENTS) {
  const confirmed = events.filter((event) => event.confirmed && event.time24);

  return {
    "@context": "https://schema.org",
    "@graph": confirmed.map((event) => ({
      "@type": "Event",
      "@id": `${SITE_URL}/events#${event.id}`,
      name: event.title,
      description: event.description,
      startDate: iso(event.date, event.time24),
      endDate: iso(event.endDate ?? event.date, event.time24),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: `${SITE_NAME} — Resurrection Ground`,
        address: POSTAL_ADDRESS,
      },
      organizer: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    })),
  };
}
