import { fruugoAudience as audience } from "./fruugoAudience";
import type { PortfolioSection } from "@/types/portfolio";

export const introduction = {
  headline: "Turning customer insights into clear, accessible products.",
  emphasis: [
    "lead e-commerce design",
    "accessible experiences for a global audience",
    "B2B recruitment software and internal enterprise systems",
    `${audience.visits.headline} website visits in ${audience.visitYear}`,
    `${audience.countries} countries`,
  ],
  source: audience.source,
  paragraphs: [
    "I’m a Lead Product Designer with 13+ years of experience across UX, UI and frontend development. At Fruugo, I lead e-commerce design across shopper and merchant products, focusing on accessible experiences for a global audience. I combine hands-on research and delivery with setting design direction and mentoring colleagues, drawing on a background in B2B recruitment software and internal enterprise systems.",
    `My work at Fruugo spans the B2B Merchant Portal, merchant onboarding and the consumer marketplace. Fruugo reports ${audience.visits.headline} website visits in ${audience.visitYear} and a marketplace spanning ${audience.countries} countries. Working at this scale means considering different languages, cultures and access needs in shared design decisions.`,
    "I also take products from idea to launch, including Huugo, Fruugo’s AI shopping assistant, and my independent services Accessible Trades and NextRamble.",
  ],
} as const;

export const approachSections: readonly PortfolioSection[] = [
  {
    id: "user-research-and-insights",
    number: "03",
    navLabel: "User research & insights",
    title: "User research & insights",
    emphasis: [
      "GA4",
      "Hotjar",
      "surveys and interviews",
      "B2B and B2C users",
      "applicant tracking system (ATS)",
      "A/B testing",
      "Maze",
      "Opportunity Solution Trees (OSTs)",
    ],
    paragraphs: [
      "I combine quantitative and qualitative research to understand where people struggle and which problems need our attention. GA4 helps me investigate journeys and drop-off points, while Hotjar recordings and heatmaps show how people interact with the interface.",
      "I use surveys and interviews with B2B and B2C users to understand the reasons behind that behaviour. Designing an employer-facing applicant tracking system (ATS) alongside candidate application journeys taught me to consider how administrative decisions affect the external experience. I connect user findings with business and operational needs.",
      "I use Opportunity Solution Trees (OSTs) to involve colleagues from across the organisation in discovery. We connect evidence with opportunities and explore several possible solutions before agreeing what to investigate and test.",
      "I also use production A/B testing and Maze to explore design changes. My Maze work includes internal checkout testing. After release, I review behaviour and feedback to understand what changed and where more work is needed.",
    ],
  },
  {
    id: "accessibility-and-systems",
    number: "04",
    navLabel: "Accessibility & systems",
    title: "Accessibility & systems",
    emphasis: [
      "company-wide accessibility audit",
      "primary contact",
      "European Accessibility Act readiness",
      `${audience.visits.headline} website visits in ${audience.visitYear}`,
      `${audience.countries} countries`,
      "WCAG Level AA",
      "Figma library",
      "shared design system",
      "desktop, tablet and mobile",
      "React",
      "Storybook",
      "Google Material Symbols",
    ],
    paragraphs: [
      `I owned Fruugo's company-wide accessibility audit and coordinated improvements across shopper and merchant products for a marketplace reporting ${audience.visits.headline} website visits in ${audience.visitYear}, across ${audience.countries} countries. As the primary contact, I brought Design, Engineering and Legal together to prioritise barriers against WCAG Level AA and saw the agreed work through to completion, supporting European Accessibility Act readiness. My frontend experience helped me turn findings into practical implementation guidance, connecting technical changes with their impact on users.`,
      "At Incommunities, I created a shared design system across internal housing applications used by Legal, Finance, Customer Service and other teams. I redesigned and developed interfaces for desktop, tablet and mobile, preserving familiar workflows while replacing inconsistent Bootstrap themes. This enabled staff to update systems away from the office.",
      `I own Fruugo's Figma library, which I created with reusable components, interaction patterns, documentation and multilingual prototypes. I work with frontend developers to align it with React components in Storybook, and review implementations with the other designers.`,
      "Internal and external designers use the library to build realistic prototypes without recreating established patterns for each project. I maintain it as requirements change, including flexible slots where components need to accommodate different content.",
      "I also standardised iconography using Google Material Symbols, replacing several separate libraries with a shared set across Marketplace and merchant tools. Clear labels, keyboard interaction, visible focus and feedback remain part of how we use those components.",
    ],
  },
  {
    id: "leadership-and-collaboration",
    number: "05",
    navLabel: "Leadership & collaboration",
    title: "Leadership & collaboration",
    emphasis: [
      "design direction",
      "embedded designers",
      "end-to-end recruitment",
      "onboarding",
      "Mentoring",
      "atomic design",
    ],
    paragraphs: [
      `I lead design across Fruugo's B2B merchant software and consumer marketplace, setting design direction and acting as the main contact for UX across the business. I work with colleagues and external partners to keep our products aligned with a shared design language.`,
      `I worked with Product to introduce embedded designers into the Shop, Retailer and Onboarding teams. This gave each product team a named design contact involved in its day-to-day work. We meet weekly to share findings, support one another and maintain consistency across products.`,
      `I have led end-to-end recruitment and onboarding for designers across Fruugo, Incommunities and networx. At Fruugo, this included maternity cover and a permanent position. I defined roles, worked with HR and recruitment on shortlisting, and interviewed candidates alongside my delivery work. I then handled onboarding, including software access, product context and a clear route to support.`,
      `I also helped reshape a colleague's role to support their progression into a lead position, reflecting the responsibility they had taken on and the expectations of the business.`,
      `Mentoring is part of how I work day to day. During our move from Adobe XD to Figma, I shared what I had learned about the tools and frontend implementation. I also helped designers apply atomic design so they could work confidently with reusable components.`,
      `For a recent CTA update across Marketplace and the Merchant Portal, another designer and I agreed the shared approach. She then owned the Marketplace research and design changes across the affected pages. This let us improve consistency across products while giving her ownership of a substantial piece of work.`,
    ],
  },
  {
    id: "technical-skills",
    number: "06",
    navLabel: "Technical skills",
    title: "Technical skills",
    emphasis: [
      "prototype interfaces",
      "frontend implementation",
      "repeatable workflow for SaaS-style product videos",
      "Recordly",
      "review the output against the user need",
    ],
    paragraphs: [
      `I use AI to explore ideas, prototype interfaces and reduce repetitive work. For Huugo, Fruugo's AI shopping assistant, this helped me move from initial design into frontend implementation and create a reusable workflow for character variants and campaign assets.`,
      `I developed a repeatable workflow for SaaS-style product videos, combining AI-assisted production with screen recordings made in Recordly. This lets me produce videos independently with a short turnaround, bringing together work that would typically involve several contributors. I applied the workflow to create a product video for Accessible Trades.`,
      `I give these workflows clear constraints and review the output against the user need. The aim is to make useful approaches repeatable for the wider team, while keeping design decisions and implementation quality under our control.`,
    ],
    skillsIntro:
      "My work combines design and research tools with hands-on development. I use these across discovery, prototyping, implementation and ongoing product improvements.",
    skillGroups: [
      {
        title: "Design & prototyping",
        items: ["Figma", "Adobe Creative Cloud"],
      },
      {
        title: "Research & evaluation",
        items: ["Maze", "Hotjar", "Google Analytics 4 (GA4)"],
      },
      {
        title: "Collaboration & planning",
        items: ["Mural", "Lucidchart", "Jira"],
      },
      {
        title: "Frontend development",
        items: ["Vue 3", "React", "TypeScript", "JavaScript", "HTML", "CSS"],
      },
      {
        title: "Backend & data",
        items: ["Node.js", "Express", "SQLite"],
      },
      {
        title: "AI-assisted workflows",
        items: ["Claude", "ChatGPT", "Gemini", "Custom Agent Workflows", "Research Synthesis"],
      },
    ],
    links: [
      { label: "Read the Huugo case study", to: "/work/huugo-from-fruugo" },
      {
        label: "See the Accessible Trades video workflow",
        to: "/work/accessible-trades#ai-video-workflow",
      },
    ],
  },
];

export const projectSection: PortfolioSection = {
  id: "accessible-trades",
  number: "06",
  navLabel: "Accessible Trades",
  title: "Creating and growing Accessible Trades",
  paragraphs: [
    "Alongside my day-to-day role, I created Accessible Trades, a nationwide service helping people find and research companies that may provide accessible home adaptations. I continue to maintain and develop it as user needs emerge.",
    "Research into the problem area helped me identify a gap in how people discover relevant companies and navigate the adaptation process. Needs vary from person to person, depending on their circumstances, their home and what they want to do more independently.",
    "The challenge reaches beyond finding a tradesperson. People may be navigating changes to their health, mobility or independence while trying to understand unfamiliar services and make important decisions about their home.",
    "I took the product through discovery, design and technical implementation, bringing together company discovery, supporting evidence and practical planning guidance. Handling the process end to end meant taking responsibility for the wider journey, the interface and the working service.",
    "Accessible Trades helps people explore their needs, save potential companies and prepare questions before making contact. It also supports the surrounding decisions, including assessments, funding, permissions and comparing quotations.",
    "An important part of the approach is making the limits of the information clear. A company record or supporting source can help someone research their options, but it does not establish whether that company is right for their circumstances.",
    "The service reflects my wider commitment to championing accessibility throughout my work. Building and supporting a live product alongside my full-time role gives me a practical way to apply that commitment, helping people make progress with a clearer understanding of their options.",
  ],
};

export const navigation = [
  { id: "introduction", number: "01", label: "Introduction" },
  { id: "case-studies", number: "02", label: "Case studies" },
  ...approachSections.map(({ id, number, navLabel }) => ({
    id,
    number,
    label: navLabel,
  })),
  {
    id: "testimonials-and-experience",
    number: "07",
    label: "Testimonials & experience",
  },
  { id: "contact", number: "08", label: "Contact" },
] as const;
