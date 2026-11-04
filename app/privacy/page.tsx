import { LegalDocument } from "@/components/sections/legal/legal-document";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Forever Life and Grace Mission handles personal information submitted through this website.",
  path: "/privacy",
  noIndex: true,
});

const DRAFT_NOTE =
  "Draft for review. This policy has not yet been formally adopted by the church and should be approved before the website begins collecting personal data.";

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      folio="Policy / 01"
      title="Privacy Policy"
      standfirst="What we collect when you use this website, why we hold it, and how you can ask us to correct or remove it."
      updated="4 November 2026"
      draftNote={DRAFT_NOTE}
      sections={[
        {
          title: "Who we are",
          paragraphs: [
            "This website is operated by Forever Life and Grace Mission, Resurrection Ground, beside Davina Hills Resort, off 1st Avenue, Gwarinpa, Abuja, Nigeria.",
            "The church is the controller of the personal information described in this policy. Questions can be raised in person at the church or through any of the published enquiry lines.",
          ],
        },
        {
          title: "Information you give us",
          paragraphs: [
            "Some pages invite you to send information through a form. We only receive what you choose to type into it.",
          ],
          points: [
            "Your name and telephone number, and an email address if you supply one.",
            "The content of a prayer request, counselling request, enquiry, or message.",
            "Details you include when registering a visit, requesting membership information, or volunteering to serve.",
            "Any other information you add to a form's message field.",
          ],
        },
        {
          title: "Information collected automatically",
          paragraphs: [
            "We do not use advertising cookies or third-party analytics on this site. The website stores two small session values in your browser: one remembers that the opening curtain has already played, and one remembers that you dismissed the live update strip. Both are cleared when your session ends and neither identifies you.",
            "Our hosting provider may record standard technical logs, such as the time of a request, the page requested, and the browser type, in order to keep the site secure and available.",
          ],
        },
        {
          title: "Why we use your information",
          paragraphs: [
            "We use the information you submit to respond to your enquiry, pray with you, arrange pastoral counselling, follow up a visit or membership request, process a volunteer registration, or address a safeguarding concern.",
            "We do not sell personal information, and we do not use it for advertising.",
          ],
        },
        {
          title: "Prayer, counselling and confidentiality",
          paragraphs: [
            "Prayer and counselling requests are treated as confidential. Access is limited to the authorised pastoral team who need the information in order to respond.",
            "Confidentiality may be limited where there is a risk of serious harm, where a child or vulnerable adult needs protection, or where the church is required by law to disclose information.",
          ],
        },
        {
          title: "How long we keep it",
          paragraphs: [
            "We keep information only for as long as it is needed for the purpose it was given, or for as long as the church's records obligations require. When it is no longer needed, it is deleted or securely disposed of.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You may ask what personal information the church holds about you, ask for it to be corrected, or ask for it to be deleted. You can also withdraw a request at any time.",
            "Because the church does not publish an email address, please make these requests in person at Resurrection Ground or by calling one of the published enquiry lines so that your identity can be confirmed.",
          ],
        },
        {
          title: "Changes to this policy",
          paragraphs: [
            "This policy will be reviewed when the website begins collecting personal data and whenever the church's practice changes. The date at the top of this page shows the most recent revision.",
          ],
        },
      ]}
    />
  );
}
