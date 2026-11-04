import { LegalDocument } from "@/components/sections/legal/legal-document";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Giving Policy",
  description:
    "How voluntary giving to Forever Life and Grace Mission is received, recorded, and used.",
  path: "/giving-policy",
  noIndex: true,
});

const DRAFT_NOTE =
  "Draft for review. This policy has not yet been formally adopted and should be confirmed alongside the church's account and finance procedures.";

export default function GivingPolicyPage() {
  return (
    <LegalDocument
      folio="Policy / 03"
      title="Giving Policy"
      standfirst="Giving at Forever Life and Grace Mission is voluntary, cheerful, and handled through officially approved church channels."
      updated="4 November 2026"
      draftNote={DRAFT_NOTE}
      sections={[
        {
          title: "Giving is voluntary",
          paragraphs: [
            "All contributions to the church are voluntary. No one is pressured to give, and giving is never a condition of belonging, pastoral care, or participation in church life.",
            "Giving is understood as an expression of gratitude, partnership, and commitment to the work of God's Kingdom.",
          ],
        },
        {
          title: "Approved channels",
          paragraphs: [
            "Giving should be made only through the channels published by the church. The account currently published on this website is:",
          ],
          points: [
            "Account name: Forever Life And Grace Mission",
            "Bank: Moniepoint MFB",
            "Account number: 6023762744",
          ],
        },
        {
          title: "What giving supports",
          paragraphs: [
            "Contributions support the advancement of the Gospel, ministry activities, spiritual development, and the Church Building Project. Published giving categories include tithes, offerings, the Church Building Project, Harvest Thanksgiving, missions and evangelism, special church programmes, and general ministry support.",
          ],
        },
        {
          title: "No online checkout",
          paragraphs: [
            "This website does not process card payments and does not operate a payment gateway. It publishes the church's account details so that a transfer can be made through your own bank or payment app.",
            "If anyone contacts you claiming to collect money on behalf of the church through a different account, please verify the details with the church before sending anything.",
          ],
        },
        {
          title: "Records and enquiries",
          paragraphs: [
            "The church keeps a record of giving for accountability and ministry planning. If you need a giving enquiry investigated, please contact the church through the published enquiry lines with the date, amount, and reference of the transfer.",
          ],
        },
        {
          title: "The Church Building Project",
          paragraphs: [
            "The building project is a vision to establish a 1,000-capacity auditorium in Gwarinpa, Abuja. Images of the proposed auditorium are architectural concepts, not photographs of completed construction, and are labelled as such on the website.",
            "Giving toward the project does not create an ownership interest in church property or a right to a particular seat, plaque, or naming opportunity.",
          ],
        },
        {
          title: "Corrections and refunds",
          paragraphs: [
            "If a transfer is made in error, contact the church as soon as possible so that the matter can be reviewed. Any correction or refund is handled by the church's finance process and confirmed directly with the giver; this website cannot reverse a transfer.",
          ],
        },
      ]}
    />
  );
}
