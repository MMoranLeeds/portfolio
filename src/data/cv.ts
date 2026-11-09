import { fruugoAudience as audience } from "./fruugoAudience";
import { introduction } from "./portfolio";
import { featuredPeerReviews } from "./peerReviews";
const beckyRecommendation = featuredPeerReviews().find(
  (review) => review.id === "becky-lovell-2026",
);
if (!beckyRecommendation?.fullQuote?.length)
  throw new Error("CV requires Becky's full LinkedIn recommendation");
// Shared copy is referenced, rather than maintained as a second version.
// Employment dates, education and shorter role descriptions belong here.
export const cv = {
  summary: introduction.paragraphs[0],
  location: "West Yorkshire",
  education: {
    institution: "University of Derby",
    qualification: "BA (Hons) Graphic Design, 2:1",
  },
  capabilities: [
    "UX leadership and mentoring",
    "Recruitment and onboarding",
    "B2B software and internal tools",
    "A/B testing, GA4, Hotjar and Maze",
    "Opportunity Solution Trees",
    "Figma and design systems",
    "Accessibility and localisation",
    "Frontend delivery and AI prototyping",
  ],
  experience: [
    {
      organisation: "Fruugo",
      dates: "January 2022 to present",
      role: "Lead UI UX Designer",
      paragraphs: [
        "Lead UI and UX design across Fruugo’s B2B Merchant Portal, onboarding and consumer marketplace.",
      ],
      achievements: [
        "Led the consent redesign with Legal. Country-based production comparison recorded 66.3% versus 76.3% acceptance, with improvement sustained after worldwide rollout.",
        "Redesigned B2B onboarding with Sales and Technical Integration, deferring questions until needed. Fastest observed new submission: 8m 7s; early survey: 4.5/5 for perceived completion effort (24 responses).",
        "Lead UX direction and mentoring across workstreams. Introduced embedded designers and recruited and onboarded two designers.",
        `Owned the company-wide WCAG Level AA audit as primary contact, coordinating Engineering and Legal priorities for European Accessibility Act readiness. Fruugo reported ${audience.visits.headline} website visits in ${audience.visitYear} (Fruugo Corporate).`,
        "Created and maintain the shared Figma library, aligning with engineers’ React Storybook components for consistent, multilingual prototypes.",
        "Led a contextual multilingual audit and typography and language-control improvements across shopper and merchant products.",
        "Took Huugo, Fruugo’s AI shopping assistant, from the CTO’s proof of concept to launch, leading UX, most frontend implementation and character identity.",
        "Used Opportunity Solution Trees to involve colleagues in discovery and compare solutions against research findings.",
      ],
    },
    {
      organisation: "Incommunities Housing Association",
      dates: "2019 to 2022",
      role: "UI/UX design and frontend development",
      paragraphs: [
        "Led UX/UI design and frontend development for internal housing applications used by Legal, Finance, Customer Service and other teams. Created a shared design system, preserving familiar workflows and enabling housing tasks on desktop, tablet and mobile, including away from the office.",
      ],
    },
    {
      organisation: "networx Recruitment",
      dates: "2013 to 2019",
      role: "Design, progressing to Senior Designer",
      paragraphs: [
        "Designed a B2B applicant tracking system (ATS) for national and local employers and internal teams, covering campaigns, applications, branding and video interviews. Designed and built accessible candidate journeys across vacancy search, applications, document uploads, onboarding and HR integration. Supported clients and junior designers.",
      ],
    },
  ],
  independentWork:
    "Created and launched Accessible Trades for finding home-adaptation specialists, and NextRamble for planning group walks. Own product direction, research, UX/UI, frontend development, backend integration and ongoing maintenance.",
  recommendations: [
    {
      ...beckyRecommendation,
      quoteParagraphs: beckyRecommendation.fullQuote,
      context: beckyRecommendation.fullQuoteContext,
    },
  ],
};
