import { ContactDetails } from "@/components/sections/contact/details";
import { ContactFormSection } from "@/components/sections/contact/form-section";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactMap } from "@/components/sections/contact/map";
import { CHURCH } from "@/data/church";

export const metadata = {
  title: `Contact & Location — ${CHURCH.name}`,
  description:
    "Church address, three enquiry lines, service times, a Google Maps card with directions, and a message form for Forever Life and Grace Mission, Gwarinpa, Abuja.",
  openGraph: {
    title: "Contact & Location — Forever Life and Grace Mission",
    description:
      "Resurrection Ground, Gwarinpa, Abuja. Three enquiry lines, service times, and a map to plan your visit.",
    type: "website" as const,
  },
};

/**
 * Contact — the location issue.
 *
 * Night cover with the timetable → white address and enquiry lines → mist map
 * and visit plan → white message desk. The map pin and YouTube link remain
 * flagged until the church confirms them.
 */
export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactDetails />
      <ContactMap />
      <ContactFormSection />
    </main>
  );
}
