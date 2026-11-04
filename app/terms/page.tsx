import { LegalDocument } from "@/components/sections/legal/legal-document";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply to your use of the Forever Life and Grace Mission website.",
  path: "/terms",
  noIndex: true,
});

const DRAFT_NOTE =
  "Draft for review. These terms have not yet been formally adopted by the church and should be approved before launch.";

export default function TermsPage() {
  return (
    <LegalDocument
      folio="Policy / 02"
      title="Terms of Use"
      standfirst="The simple terms that apply when you read, watch, or send something through this website."
      updated="4 November 2026"
      draftNote={DRAFT_NOTE}
      sections={[
        {
          title: "Using this website",
          paragraphs: [
            "By using this website you accept these terms. If you do not accept them, please do not use the site.",
            "The website is provided for information about Forever Life and Grace Mission, its programmes, and its life together as a church.",
          ],
        },
        {
          title: "Not an emergency service",
          paragraphs: [
            "This website is not a substitute for emergency help, medical care, or professional legal advice. If you or someone else is in immediate danger, contact the appropriate emergency service in Nigeria.",
            "A prayer or counselling request sent through this website is read by the church team during normal working activity; it is not monitored around the clock.",
          ],
        },
        {
          title: "Content and ownership",
          paragraphs: [
            "The text, design, artwork, and code of this website belong to Forever Life and Grace Mission or are used with permission. You may read, share links to, and print pages for personal, non-commercial use.",
            "You may not copy the site's design or content into another website, publication, or product without written permission from the church.",
          ],
        },
        {
          title: "What you send us",
          paragraphs: [
            "When you submit a form, you confirm that the information is accurate and that you are entitled to share it. Please do not send another person's private information without their consent.",
            "Do not use the forms to send unlawful, abusive, threatening, or deliberately misleading material.",
          ],
        },
        {
          title: "Links to other services",
          paragraphs: [
            "This website links to social media pages and to Google Maps. Those services have their own terms and privacy practices, and the church does not control them.",
          ],
        },
        {
          title: "Giving",
          paragraphs: [
            "Giving information is published so that members, friends, and partners can give voluntarily through officially approved church channels. The separate Giving Policy explains how giving is handled.",
          ],
        },
        {
          title: "Availability and changes",
          paragraphs: [
            "The church may change, suspend, or withdraw any part of the website without notice. Programme times and event details can also change; the published enquiry lines are the authoritative way to confirm them.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: [
            "These terms are intended to be governed by the laws of the Federal Republic of Nigeria. This clause should be confirmed with the church's legal adviser before the policy is adopted.",
          ],
        },
      ]}
    />
  );
}
