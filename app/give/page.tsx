import { AccountTicket } from "@/components/sections/give/account-ticket";
import { GiveCategories } from "@/components/sections/give/categories";
import { GiveClose } from "@/components/sections/give/close";
import { GiveHero } from "@/components/sections/give/hero";
import { HomeBuilding } from "@/components/sections/home/home-building";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giving",
  description:
    "Giving with grace and building for generations: the official FLGM church account, approved giving categories, and the 1,000-capacity auditorium vision in Gwarinpa, Abuja.",
  path: "/give",
});

/**
 * Giving — the stewardship issue.
 *
 * Night cover → white account ticket → night blueprint → mist category ledger
 * → night giving notice. There is no payment form and no checkout; the church's
 * supplied account details are the whole transaction surface.
 */
export default function GivePage() {
  return (
    <main>
      <GiveHero />
      <AccountTicket />
      <HomeBuilding variant="give" />
      <GiveCategories />
      <GiveClose />
    </main>
  );
}
