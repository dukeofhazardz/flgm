import { PrayerClose } from "@/components/sections/prayer/close";
import { PrayerFormSection } from "@/components/sections/prayer/form-section";
import { PrayerHero } from "@/components/sections/prayer/hero";
import { CHURCH } from "@/data/church";

export const metadata = {
  title: `Prayer & Counselling — ${CHURCH.name}`,
  description:
    "Submit a prayer request, ask for pastoral counselling, or speak directly with the church team at Forever Life and Grace Mission, Gwarinpa, Abuja.",
  openGraph: {
    title: "Prayer & Counselling — Forever Life and Grace Mission",
    description:
      "We are here to pray with you. Confidential prayer requests and pastoral support.",
    type: "website" as const,
  },
};

/**
 * Prayer — the pastoral issue.
 *
 * Night cover → mist request desk with a sticky confidentiality rail → night
 * direct line. The form only reports success after the server accepts it.
 */
export default function PrayerPage() {
  return (
    <main>
      <PrayerHero />
      <PrayerFormSection />
      <PrayerClose />
    </main>
  );
}
