import { ContactDetails } from "@/components/sections/contact/details";
import { ContactFormSection } from "@/components/sections/contact/form-section";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactMap } from "@/components/sections/contact/map";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Location",
  description:
    "Church address, three enquiry lines, service times, a Google Maps card with directions, and a message form for Forever Life and Grace Mission, Gwarinpa, Abuja.",
  path: "/contact",
});

/**
 * Contact — the location issue.
 *
 * Night cover with the timetable → white address and enquiry lines → mist map
 * and visit plan → white message desk. The map pin remains flagged until the
 * church confirms it; the YouTube channel and email are now published.
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
