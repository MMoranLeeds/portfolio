import { fruugoAudience as audience } from "./fruugoAudience";
import { introduction } from "./portfolio";
import { featuredPeerReviews } from "./peerReviews";
const beckyRecommendation = featuredPeerReviews().find(
  (review) => review.id === "becky-lovell-2026",
);
if (!beckyRecommendation?.fullQuote?.length)
  throw new Error("CV requires Becky’s full LinkedIn recommendation");
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
    "B2B and B2C research",
    "GA4, Hotjar and Maze",
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
        "Lead UI and UX design across Fruugo’s global shopper marketplace and merchant products, combining research, design direction and hands-on delivery.",
      ],
      achievements: [
        `Owned a company-wide accessibility audit and coordinated improvements across shopper and merchant products for a marketplace reporting ${audience.visits.headline} website visits in ${audience.visitYear} (Fruugo Corporate). Used WCAG Level AA to identify barriers and worked with Engineering and Legal to prioritise changes supporting European Accessibility Act readiness.`,
        "UX team lead, maintaining shared design direction and mentoring colleagues across multiple workstreams. Introduced embedded designers to give product teams a dedicated UX contact, and recruited and onboarded two designers.",
        "Brought colleagues into discovery using Opportunity Solution Trees, connecting research findings with opportunities and comparing possible solutions before committing to a direction.",
        "Led a contextual multilingual audit to turn shopper trust concerns and merchant translation problems into priorities for typography and language controls across Marketplace, Checkout and merchant tools.",
        "Used Hotjar recordings, GA4 journey data and completion-time evidence to simplify merchant onboarding. Agreed with Sales and Technical Integration which questions could move to integration, reducing the information merchants needed to provide upfront.",
        "Developed an AI shopping assistant from the CTO’s proof of concept, leading UX, frontend implementation and product character identity.",
        "Created and maintained the shared Figma component library, aligning with engineers on React components in Storybook. Enabled designers to build realistic, multilingual prototypes without recreating established patterns for each project.",
      ],
    },
    {
      organisation: "Incommunities Housing Association",
      dates: "2019 to 2022",
      role: "UI/UX design and frontend development",
      paragraphs: [
        "Led UI/UX design and frontend development for in-house systems. Created and maintained consistent, responsive interfaces across devices, with accessibility built into the design and implementation.",
        "Worked with stakeholders, managers and engineers to understand user and business needs and improve existing services.",
      ],
    },
    {
      organisation: "networx Recruitment",
      dates: "2013 to 2019",
      role: "Design, progressing to Senior Designer",
      paragraphs: [
        "Designed mobile-first web applications for recruitment clients, working independently and within a wider team. Worked directly with clients to create clear, accessible interfaces and supported junior designers as I moved into a senior role.",
      ],
    },
  ],
  independentWork:
    "Created and continue to maintain Accessible Trades, taking a live accessibility-focused service through discovery, design, frontend development and ongoing improvements.",
  recommendations: [
    {
      ...beckyRecommendation,
      quoteParagraphs: beckyRecommendation.fullQuote,
      context: beckyRecommendation.fullQuoteContext,
    },
  ],
};
