import { LegalDocument } from "@/components/sections/legal/legal-document";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Safeguarding & Confidentiality",
  description:
    "The safeguarding and confidentiality commitments of Forever Life and Grace Mission.",
  path: "/safeguarding",
  noIndex: true,
});

const DRAFT_NOTE =
  "Draft for review. This policy has not yet been formally adopted. A named safeguarding lead and a formal reporting procedure still need to be appointed and published.";

export default function SafeguardingPage() {
  return (
    <LegalDocument
      folio="Policy / 04"
      title="Safeguarding & Confidentiality"
      standfirst="Every person who comes through our doors should be safe, respected, and able to speak freely."
      updated="4 November 2026"
      draftNote={DRAFT_NOTE}
      sections={[
        {
          title: "Our commitment",
          paragraphs: [
            "Forever Life and Grace Mission is committed to the safety and wellbeing of children, young people, and vulnerable adults who take part in the life of the church.",
            "Safeguarding is part of how the church cares for people. It is not a separate programme or an administrative afterthought.",
          ],
        },
        {
          title: "Who this policy covers",
          paragraphs: [
            "This policy applies to everyone who represents the church, including pastors, leaders, staff, volunteers, and anyone serving with children, young people, or vulnerable adults.",
            "It also describes what you can expect if you raise a concern with the church, whether you are a member, a visitor, or a family member.",
          ],
        },
        {
          title: "Expected conduct",
          paragraphs: [
            "Leaders and volunteers are expected to act with integrity, respect, and care. They should listen to children and vulnerable adults, take their concerns seriously, and avoid being alone with a child or vulnerable adult where that can reasonably be avoided.",
            "Bullying, harassment, discrimination, and any form of abuse are not acceptable in the life of the church.",
          ],
        },
        {
          title: "Raising a concern",
          paragraphs: [
            "If you are concerned about the safety or wellbeing of a child, young person, or vulnerable adult, please speak to a pastor or a church leader in person, or call one of the published enquiry lines.",
            "If someone is in immediate danger, contact the appropriate emergency service in Nigeria first. The church's internal process should never delay emergency help.",
          ],
        },
        {
          title: "How a concern is handled",
          paragraphs: [
            "A concern is received with care and recorded by the person who receives it. Information is shared only with those who need it in order to respond and to keep people safe.",
            "The church will consider what support the person raising the concern needs, what immediate steps are required, and whether the matter should be referred to the appropriate authorities.",
          ],
        },
        {
          title: "Confidentiality",
          paragraphs: [
            "Prayer requests, counselling conversations, and personal information shared with the pastoral team are treated as confidential. Access is limited to authorised personnel.",
            "Confidentiality is not absolute. It may be limited where there is a risk of serious harm, where a child or vulnerable adult needs protection, or where disclosure is required by law.",
          ],
        },
        {
          title: "Personal information",
          paragraphs: [
            "Personal information connected with a safeguarding concern is handled in line with the church's Privacy Policy and is kept only as long as necessary.",
          ],
        },
        {
          title: "Review",
          paragraphs: [
            "This policy will be reviewed once the church appoints a named safeguarding lead and approves a formal reporting procedure. Until then it remains a draft commitment, published so that expectations are clear.",
          ],
        },
      ]}
    />
  );
}
