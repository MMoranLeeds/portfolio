export interface PeerReview {
  id: string;
  quote: string;
  /** Full recommendation, preserved as source paragraphs for longer layouts. */
  fullQuote?: readonly string[];
  fullQuoteContext?: string;
  name: string;
  role: string;
  context?: string;
  theme?: string;
  additionalQuote?: string;
  additionalContext?: string;
  projectSlug?: string;
  featured?: boolean;
}

// Curated verbatim excerpts from the 2026 feedback supplied by Matt.
// Roles for Kieran and Ryan were not supplied, so their attribution stays general.
// These are collaboration endorsements, not claims about a specific project.
export const peerReviews: PeerReview[] = [
  {
    id: "becky-lovell-2026",
    quote:
      "Matt is an outstanding UX designer who genuinely puts users at the heart of every decision he makes. He has a remarkable ability to balance business goals with real user needs, always backing up his design decisions with research and data rather than assumptions.",
    fullQuote: [
      "I've had the privilege of working with Matt for several years, and without hesitation, I can say he's the best colleague I've worked with in my career.",
      "Matt is an outstanding UX designer who genuinely puts users at the heart of every decision he makes. He has a remarkable ability to balance business goals with real user needs, always backing up his design decisions with research and data rather than assumptions. His passion for accessibility is something I deeply admire. He consistently champions inclusive design, ensuring people with a wide range of needs and abilities are considered throughout the design process. His empathy for users is evident in everything he does, and he never loses sight of designing products that work for everyone.",
      "Matt also has an impressive depth of technical knowledge, which allows him to collaborate seamlessly with engineers and make well-informed design decisions. He combines user-centred thinking, evidence-based decision making, technical expertise, and outstanding collaboration in a way that's incredibly rare.",
      "Beyond being an exceptional designer, Matt has been an incredible mentor. He's always been generous with his time, coaching me, encouraging my professional growth, and giving me the confidence to push myself further in my career. His support has had a lasting impact on my development, and I've learned so much from working alongside him.",
      "Any team would be fortunate to have Matt. He's not only an exceptional UX designer but also a genuinely kind, supportive, and inspiring person to work alongside. I hope I have the opportunity to continue working with him for many years to come.",
    ],
    fullQuoteContext: "LinkedIn recommendation, 22 July 2026",
    name: "Becky Lovell",
    role: "Lead UX Designer at Fruugo.com",
    context: "LinkedIn recommendation, July 2026",
    theme: "Evidence-led design",
    additionalQuote:
      "Matt is a dedicated mentor who invests deeply in the success of those around him. He excels at providing constructive, actionable feedback and creates a safe space for team members to iterate on their ideas.",
    additionalContext: "Peer feedback, 2026",
    featured: true,
  },
  {
    id: "Huw-evans-2026",
    quote:
      "Over the past year, Matt has matured from a lead designer into a strategic functional head. He has successfully navigated increased responsibility, leading multiple workstreams and mentoring team members through significant transitions.",
    name: "Huw Evans",
    theme: "Leadership and delivery",
    role: "Line manager at Fruugo",
    context: "Performance review, 2026",
    featured: true,
  },
  {
    id: "ryan-duncan-2026",
    quote:
      "His designs help ensure we are building features that are intuitive and user-focused, and his consideration for accessibility is particularly valuable in improving the overall quality of the product.",
    name: "Ryan Duncan",
    theme: "UX and accessibility",
    role: "Fruugo colleague",
    context: "Peer feedback, 2026",
    featured: true,
  },
  {
    id: "kieran-lynch-2026",
    quote:
      "He's also one of the easiest people to work with across team boundaries; he slots into different contexts quickly, communicates clearly, and never makes cross-functional work feel like an overhead.",
    name: "Kieran Lynch",
    theme: "Collaboration across teams",
    role: "Fruugo colleague",
    context: "Peer feedback, 2026",
    featured: true,
  },
];

export const featuredPeerReviews = () =>
  peerReviews.filter((review) => review.featured).slice(0, 4);
export const projectPeerReviews = (slug: string) =>
  peerReviews.filter((review) => review.projectSlug === slug).slice(0, 2);
