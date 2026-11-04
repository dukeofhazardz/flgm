import { PrayerClose } from "@/components/sections/prayer/close";
import { PrayerFormSection } from "@/components/sections/prayer/form-section";
import { PrayerHero } from "@/components/sections/prayer/hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prayer & Counselling",
  description:
    "Submit a prayer request, ask for pastoral counselling, or speak directly with the church team at Forever Life and Grace Mission, Gwarinpa, Abuja.",
  path: "/prayer",
});

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
