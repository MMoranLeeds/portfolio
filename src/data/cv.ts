import { introduction, approachSections } from "./portfolio";
import { featuredPeerReviews } from "./peerReviews";

const beckyRecommendation = featuredPeerReviews().find(
  (review) => review.id === "becky-lovell-2026",
);
if (!beckyRecommendation?.fullQuote?.length)
  throw new Error("CV requires Becky's full LinkedIn recommendation");

// One content model serves the public CV and its printed PDF.
// The profile, technical tools and recommendation reuse portfolio content.
export const cv = {
  summary: introduction.paragraphs[0],
  location: "West Yorkshire",
  education: {
    institution: "University of Derby",
    qualification: "BA (Hons) Graphic Design, 2:1",
  },
  skillGroups: [
    {
      title: "Research & strategy",
      items: [
        "User interviews",
        "Usability testing",
        "Journey analysis",
        "Opportunity Solution Trees",
        "A/B testing",
      ],
    },
    {
      title: "Design & accessibility",
      items: [
        "Product and interaction design",
        "Accessibility specialist",
        "Localisation",
        "Design system ownership and governance",
        "Responsive design",
        "Interactive prototyping",
      ],
    },
    {
      title: "Leadership",
      items: [
        "Design direction",
        "Recruitment and onboarding",
        "Mentoring",
        "Stakeholder alignment",
        "Embedded designers",
        "Agile Scrum",
      ],
    },
  ],
  tools:
    approachSections.find((section) => section.id === "technical-skills")
      ?.skillGroups ?? [],
  experience: [
    {
      organisation: "Fruugo",
      dates: "January 2022 to present",
      role: "Lead UI UX Designer",
      summary:
        "Lead e-commerce UX and UI across a global consumer marketplace, B2B Merchant Portal and merchant onboarding, combining hands-on delivery with shared design direction.",
      achievementGroups: [
        {
          title: "Research & commercial impact",
          items: [
            "Led the cookie consent redesign with Legal, balancing clear privacy choices with commercial measurement needs. The initial country-based production comparison recorded acceptance 10 percentage points higher, with improvement sustained after worldwide rollout.",
            "Redesigned B2B merchant onboarding with Sales and Technical Integration. Early survey feedback rated completion effort 4.5/5; the fastest observed completed application took 8m 7s.",
            "Led a contextual multilingual audit and typography and language-control improvements across shopper and merchant products. Used Opportunity Solution Trees to connect research findings with opportunities and compare solutions with colleagues.",
          ],
        },
        {
          title: "Accessibility & shared systems",
          items: [
            "Owned the company-wide WCAG Level AA audit as primary contact, coordinating improvements across Design, Engineering, and Legal to ensure European Accessibility Act (EAA) readiness.",
            "Created and maintain Fruugo’s shared design system, aligning Figma components, interaction patterns and documentation with React components in Storybook. Integrated Claude Code and Model Context Protocol (MCP) for bidirectional updates, retaining human design review and existing commit and code-review processes before production.",
          ],
        },
        {
          title: "Leadership & product delivery",
          items: [
            "Set design direction, mentor colleagues and lead recruitment and onboarding. Introduced embedded designers into product teams, with shared reviews and weekly collaboration to maintain consistency.",
            "Led Huugo’s UX from standalone proof of concept to marketplace integration, starting in the Netherlands, with substantial frontend delivery and reusable AI campaign workflows.",
            "Developed repeatable AI-assisted workflows for prototypes, campaign assets and product videos, reducing repetitive production work while maintaining shared design standards.",
          ],
        },
      ],
    },
    {
      organisation: "Incommunities Housing Association",
      dates: "2019 to 2022",
      role: "UI/UX design and frontend development",
      summary:
        "Internal housing applications used by Legal, Finance, Customer Service and other teams to coordinate housing and property-condition work.",
      achievements: [
        "Led UX/UI design and frontend development, replacing inconsistent Bootstrap themes with a shared design system while preserving familiar workflows.",
        "Made applications usable on desktop, tablet and mobile, enabling staff to complete tasks away from the office.",
        "Recruited and onboarded designers, sharing design direction and supporting their work.",
      ],
    },
    {
      organisation: "networx Recruitment",
      dates: "2013 to 2019",
      role: "Design, progressing to Senior Designer",
      summary:
        "B2B applicant tracking software for national and local employers and internal account management and sales teams.",
      achievements: [
        "Designed campaign management, application handling, configurable branding and video interviews for the employer-facing ATS.",
        "Designed and built accessible candidate journeys across vacancy search, branded applications, document uploads, onboarding and HR portal integration.",
        "Used Sass variables, mixins and reusable frontend patterns to maintain consistent interfaces across recruitment products and client branding.",
        "Worked directly with clients, recruited two designers and supported junior colleagues.",
      ],
    },
  ],
  independentProjects: [
    {
      name: "Accessible Trades",
      url: "https://accessibletrades.co.uk/",
      summary:
        "Created and launched a service for finding home-adaptation specialists, used and shared internally by the MND Association. Own research, UX/UI, Vue frontend, Node.js API, administration tools and maintenance.",
    },
    {
      name: "NextRamble",
      url: "https://nextramble.co.uk/",
      summary:
        "Created and launched a group-walking service for comparing routes and planning outings. Own product direction, UX/UI, Vue development, Firebase integration and ongoing improvements.",
    },
  ],
  recommendations: [
    {
      ...beckyRecommendation,
      quoteParagraphs: beckyRecommendation.fullQuote,
      context: beckyRecommendation.fullQuoteContext,
    },
  ],
};
