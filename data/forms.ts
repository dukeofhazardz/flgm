// Form copy and option lists, drawn from content.md.
// Prayer and counselling: lines 540–566.
// New members and follow-up: lines 597–638.
// Contact: lines 110–139 / 567–596.
// Volunteer: lines 849–1017.
//
// Nothing here is invented: every option and statement restates the church's
// supplied content. Internal notes, executive responsibility tables, and
// "preview only" warnings are deliberately not published.

export const PRAYER = {
  hero: {
    lines: ["We are here", "to pray", "with you."],
    lead: "At Forever Life and Grace Mission, we believe in the power of prayer, the comfort of God’s Word, and the importance of spiritual fellowship.",
    body: "Whether you are seeking prayer, spiritual guidance, pastoral support, or encouragement, we invite you to connect with us. Our pastoral team is committed to providing prayerful support and helping individuals grow in their understanding of God’s grace and purpose.",
  },
  form: {
    heading: "Submit a Prayer Request",
    lead: "Share your request with the church prayer or pastoral team.",
    requestTypes: [
      "Prayer Request",
      "Pastoral Counselling",
      "Spiritual Guidance",
      "Testimony",
      "Other",
    ],
    successTitle: "Your request is with us.",
    successBody:
      "Your message has been sent to the church prayer and pastoral team. It will be handled with care by the authorised team.",
  },
  confidentiality: [
    "Prayer requests are accessible only to authorised personnel.",
    "Personal information is handled with care.",
    "Confidentiality is respected, subject to appropriate safeguarding and legal obligations.",
    "Counselling appointments are subject to pastoral availability.",
    "The church does not publish personal prayer requests or testimonies without consent.",
  ],
} as const;

export const NEW_MEMBERS = {
  hero: {
    lines: ["Your journey", "with FLGM", "begins here."],
    lead: "We are delighted that you are interested in becoming part of Forever Life and Grace Mission.",
    body: "Whether you are a first-time visitor, a returning believer, or someone seeking a church family, we would love to connect with you. Our desire is to help you grow in grace, understand your identity in Christ, build meaningful relationships, and participate in the life of the church.",
  },
  form: {
    heading: "Connect with Our Church Family",
    lead: "Complete the form to request a visit, membership information, or follow-up from the church.",
    descriptors: [
      "First-time visitor",
      "Returning visitor",
      "Interested in membership",
      "Existing member seeking connection",
    ],
    interests: [
      "Sunday worship",
      "Watch and Pray",
      "House fellowship",
      "Sonship and Victory Ministry",
      "Evangelism and outreach",
      "Ministry service",
    ],
    followUp: ["Phone call", "WhatsApp", "Email", "In-person meeting"],
    successTitle: "You are welcome here.",
    successBody:
      "Your details have reached the church administration. The follow-up team will reach out using the preference you selected.",
  },
  journey: [
    {
      title: "You register",
      note: "Register online or in person when you visit.",
    },
    {
      title: "Administration receives it",
      note: "Church Administration receives the registration and prepares it for follow-up.",
    },
    {
      title: "The follow-up team reaches out",
      note: "The designated follow-up team contacts you using your preferred channel.",
    },
    {
      title: "You receive service information",
      note: "You receive the service and programme information you need to settle in.",
    },
    {
      title: "You are invited in",
      note: "You are invited to fellowship, discipleship, and ministry participation.",
    },
    {
      title: "The church keeps walking with you",
      note: "Follow-up progress is documented and reported to the appropriate leadership.",
    },
  ],
} as const;

export const VOLUNTEER = {
  hero: {
    lines: ["Join the", "Mission.", "Reach Lives."],
    lead: "At Forever Life and Grace Mission, we believe that every believer has a place in God’s purpose and a role to play in advancing the Kingdom.",
    body: "Through evangelism, discipleship, outreach, and fellowship, we are committed to reaching people with the message of grace and eternal life, establishing them in the faith, and helping them grow into mature disciples of Christ.",
    invite:
      "Whether you are passionate about evangelism, teaching the Word, praying for others, welcoming new believers, or supporting outreach activities, there is an opportunity for you to serve.",
  },
  areas: [
    {
      id: "evangelism",
      title: "Evangelism and Outreach",
      note: "Participate in community evangelism, personal witnessing, missions, and outreach programmes.",
    },
    {
      id: "discipleship",
      title: "Discipleship and Follow-Up",
      note: "Help nurture new converts, follow up with first-time visitors, teach biblical foundations, and support believers in their spiritual growth.",
    },
    {
      id: "prayer",
      title: "Prayer and Intercession",
      note: "Support evangelism and discipleship through prayer, intercession, and spiritual preparation.",
    },
    {
      id: "welcome",
      title: "Visitor Welcome and Integration",
      note: "Welcome new members and visitors, help them connect with the church, and guide them into fellowship and discipleship.",
    },
    {
      id: "digital",
      title: "Digital Evangelism and Media",
      note: "Share church messages online, support digital outreach, engage with online visitors, and help communicate the Gospel through social media.",
    },
  ],
  form: {
    heading: "Become an Evangelism and Discipleship Volunteer",
    lead: "Please complete the form below. A church representative will contact you regarding the next steps.",
    membership: ["Yes", "No", "I am a first-time visitor"],
    serviceAreas: [
      "Evangelism and Outreach",
      "Discipleship and Follow-Up",
      "Prayer and Intercession",
      "Visitor Welcome and Integration",
      "Digital Evangelism and Media",
      "I am willing to serve wherever needed",
    ],
    experience: [
      "I am new to evangelism or discipleship",
      "I have some experience",
      "I have substantial experience",
      "I have served as a ministry leader",
    ],
    skills: [
      "Evangelism",
      "Bible teaching",
      "Prayer and intercession",
      "Discipleship",
      "Follow-up and visitation",
      "Hospitality",
      "Digital evangelism",
      "Media and livestreaming",
      "Administration",
      "Counselling support",
    ],
    availability: [
      "Weekdays",
      "Weekends",
      "Both weekdays and weekends",
      "Flexible / as scheduled",
    ],
    consent:
      "I consent to FLGM contacting me regarding my volunteer registration and understand that my information will be handled confidentially.",
    successTitle: "Welcome to the mission.",
    successBody:
      "Your registration has reached the church team. A representative will contact you regarding the next steps.",
  },
  timeline: [
    {
      title: "Registration received",
      note: "The Church Executive Secretary or designated ministry coordinator reviews the volunteer’s details.",
    },
    {
      title: "Personal contact and confirmation",
      note: "You are contacted to confirm interest, availability, and preferred area of service.",
    },
    {
      title: "Orientation and discipleship training",
      note: "You receive ministry orientation, evangelism guidelines, and relevant discipleship training.",
    },
    {
      title: "Placement into a ministry team",
      note: "You are assigned to an appropriate evangelism, discipleship, prayer, follow-up, or digital outreach team.",
    },
    {
      title: "Ongoing engagement and reporting",
      note: "Your team coordinator provides schedules, support, and opportunities to participate in outreach and discipleship activities.",
    },
  ],
  commitment:
    "We are committed to building a culture of love, grace, accountability, spiritual growth, and effective service. Every volunteer will be encouraged to serve according to their gifts, availability, and level of preparation.",
  quote: {
    text: "Go ye therefore, and teach all nations…",
    source: "Matthew 28:19 (KJV)",
  },
} as const;

export const CONTACT_FORM = {
  heading: "Send Us a Message",
  lead: "Whether you are visiting for the first time, seeking spiritual guidance, interested in our programmes, or looking for a place to worship and fellowship, we would be delighted to connect with you.",
  enquiryTypes: [
    "General Enquiry",
    "Prayer Request",
    "Plan a Visit",
    "Church Programme",
    "Join a Ministry",
  ],
  successTitle: "Message received.",
  successBody:
    "Your message has reached the church team. Thank you for taking the time to connect with Forever Life and Grace Mission.",
} as const;

export const FORM_KINDS = ["prayer", "new-members", "volunteer", "contact"] as const;
export type FormKind = (typeof FORM_KINDS)[number];
