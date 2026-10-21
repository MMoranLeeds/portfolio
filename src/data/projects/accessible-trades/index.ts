import cardBackground from "@/assets/images/dist/cards/tahoe-bg-960.webp";
import { accessibleTradesImage } from "./images";
import type { Project } from "@/types/project";
import { profile } from "@/config/profile";
import { projectCover } from "../shared/coverImages";
import mobileFallback from "@/assets/images/mobile-placeholders/accessible-trades.svg";

export const accessibleTradesProject: Project = {
  slug: "accessible-trades",
  overview: {
    outcome:
      "Designed, built and launched an independent service spanning the public website, backend API and administration tools, with 240 evidence-supported listings and council coverage across England. The MND Association has begun using and sharing the service internally.",
    period: "Personal project · Q2 2026 development · Ongoing development",
    launchDate: "2026-07-19",
    launchLabel: "19 July 2026",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    ...{
      label: "Mobile homepage",
      alt: "Accessible Trades mobile homepage showing location search, search distance and a Next button.",
      caption: "Location search and distance selection on the mobile homepage.",
    },
  },
  socialPreview: {
    path: "/images/social/accessible-trades.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Accessible Trades case study by Matthew Moran, with the home adaptation service.",
  },
  video: {
    id: "ai-video-workflow",
    sectionId: "delivery",
    title: "Streamlining product video production",
    src: "/videos/accessible-trades-workflow.mp4",
    poster: projectCover("accessible-trades-journey").src,
    caption:
      "An Accessible Trades product video, produced using AI and Recordly.",
    paragraphs: [
      "I combined AI-assisted video production with screen recordings made in Recordly to create a repeatable workflow for product videos. The aim was to reduce the time and resources needed to turn a working interface into a clear product demonstration.",
      "I used this workflow to produce the Accessible Trades video independently, bringing together work that would typically involve several contributors within a short production cycle.",
    ],
    playLabel: "Watch product video",
    width: 1280,
    height: 720,
  },
  title: "Accessible Trades",
  category: "Personal · Home adaptation service",
  summary:
    "Creating and running a home-adaptation service across England, now used and shared internally by the MND Association.",
  role: "End-to-end product ownership, research, UX design, full-stack implementation and ongoing operation",
  status: "Live proof of concept, with ongoing development and feedback",
  tags: ["Product discovery", "Accessible design", "Full-stack delivery"],
  url: profile.projectUrl,
  seoDescription:
    "How Matthew Moran created Accessible Trades, connecting accessible UX, a Vue frontend, a Node.js API and company data to help people across England find home-adaptation specialists.",
  cover: {
    cardBackground,
    ...accessibleTradesImage(
      "overview",
      "",
      "Accessible Trades homepage with a location-based search for home-adaptation specialists and guidance for planning the work.",
      "A starting point for finding adaptation specialists and preparing the next steps.",
      "12 / 5",
    ),
  },
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        "The idea began while I was arranging work on my own home. Finding a reliable tradesperson made me consider how much harder that search could be for someone needing specialist adaptations. My advocacy for web accessibility prompted me to investigate whether a dedicated service already addressed that need.",
        "In the services I reviewed, I found limited local coverage and adaptation categories within broader trades directories. I did not find a comparable service combining England-wide company discovery, supporting evidence and practical planning tools. My goal was to create a clearer starting point for people needing adaptations and those helping them.",
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "I created and continue to run Accessible Trades, owning the product from the initial idea through to launch and ongoing development. My responsibilities span research, product direction, UX design, frontend and backend development, data management, hosting and SEO. I built both the public experience and the administration tools used to maintain its information.",
        "I work directly with the MND Association’s partnerships team and nationwide support team. They have started using and sharing the service internally, and their feedback helps shape its direction and priorities.",
      ],
    },
    {
      id: "research",
      title: "Research and findings",
      paragraphs: [
        "My research combined competitor review, public statistics on ageing and home-adaptation needs, council information and investigation of Companies House records. The public information helped establish the context; reviewing existing services helped identify gaps in discovery and planning.",
        "Council information and procurement notices could identify companies involved in adaptation work, but the information was spread across separate sources and was not always presented as a practical route to contact a company. I investigated business activity codes as a way to identify candidate companies, then used additional public evidence to assess their relevance.",
        "I also found that planning guidance and tools were scattered across local and national websites. A carer supporting someone in another council area could consult information for their own address rather than the property needing work. These findings shaped both the company-discovery experience and tools that begin with the circumstances of the home being adapted.",
      ],
    },
    {
      id: "decisions",
      title: "Design approach and decisions",
      paragraphs: [
        "I designed the service around three connected needs: finding relevant companies, understanding the evidence behind a listing and preparing the next step. The aim was to make useful information available together while keeping its limits clear.",
      ],
      blocks: [
        {
          id: "discovery",
          title: "Make specialist discovery practical",
          paragraphs: [
            "Location and trade filters help people narrow the search around the work they need. Results bring together company information, available contact methods and supporting evidence, with the option to save companies for later consideration.",
            "I used automated data discovery and AI-assisted review to investigate potential company matches, followed by manual checks. This made broader coverage manageable without treating a business activity code or an AI suggestion as proof that a company provides suitable adaptation work.",
          ],
          images: [
            accessibleTradesImage(
              "search-results",
              "Live service · Company search",
              "Accessible Trades search results with location and trade filters, company cards, evidence indicators, contact actions and save controls.",
              "Search filters and company cards bring discovery, supporting information and next actions together.",
            ),
          ],
        },
        {
          id: "supporting-evidence",
          title: "Show what supports a company listing",
          paragraphs: [
            "I connected company records with relevant procurement evidence and reviewed public websites, adaptation services, previous-work examples and reviews where available. For submitted requests, I also checked the applicant’s details against the public company information. These checks help assess a listing; they do not guarantee workmanship or suitability for an individual project.",
            "The company profile distinguishes company-supplied information from supporting evidence reviewed by Accessible Trades. For example, Bradford Council’s April 2024 award notice names Lonsdale Contracts Ltd on a framework for disabled facilities adaptation work. Linking that evidence gives people context they can inspect before making their own enquiries.",
          ],
          images: [
            accessibleTradesImage(
              "company-profile",
              "Live service · Company profile",
              "Lonsdale Contracts company profile, with previous-work images, a separately labelled supporting-evidence section and company-supplied credentials.",
              "The profile separates company-supplied information from reviewed procurement evidence and links to the supporting source.",
              "4 / 3",
              "top 55%",
            ),
          ],
        },
        {
          id: "planning-support",
          title: "Help people understand their next step",
          paragraphs: [
            "I brought planning guidance, saved companies and preparation tools into the same service. This supports people who need to understand funding routes or organise questions before they are ready to contact a trades company.",
            "The funding-route checker uses a short sequence of questions and explains its limits upfront: it is an initial guide, not a council eligibility decision or grant calculation. A separate postcode-based council finder starts with the property where the work is needed, helping carers reach the relevant council even when they live elsewhere.",
          ],
          images: [
            accessibleTradesImage(
              "funding-guidance",
              "Live service · Funding guidance",
              "The DFG eligibility checker explains that it is an initial guide and asks which UK nation the home needing adaptation is in.",
              "The checker starts with the home’s location and makes clear that the relevant authority must confirm eligibility and any award.",
              "4 / 3",
              "center 25%",
            ),
          ],
        },
      ],
    },
    {
      id: "implementation",
      title: "Building and maintaining the service",
      paragraphs: [
        "I built the public website and a separate administration interface with Vue 3 and TypeScript, connected to a Node.js and Express API. SQLite databases hold company records, location data and supporting evidence. This lets the interface bring information from several sources into one search and company profile.",
      ],
      blocks: [
        {
          id: "search-implementation",
          title: "Connect search behaviour to the evidence",
          paragraphs: [
            "A business activity code alone does not establish whether a company is relevant to someone's adaptation needs. I combined location and trade matching with supporting evidence, distinguishing current, historic and undated records in the ranking. Inactive and suppressed companies are excluded from search results.",
            "The API validates search filters and queries imported company data, returning consistently ordered, paginated results. In the frontend, I prevent older responses from replacing newer searches when people change their filters. Separate loading, error and retry states keep failures recoverable without losing the search context.",
          ],
        },
        {
          id: "administration-workflow",
          title: "Make information manageable after launch",
          paragraphs: [
            "I built an administration workflow for reviewing company details, claimed-profile status and supporting evidence. Changes can be prepared locally and sent to production through authenticated API routes, with server-side validation and a recorded reason for publishing.",
            "Data-file backups and an audit history support review and recovery. This gives me a practical way to maintain listing information without changing frontend code, while keeping administrative editing separate from the public website.",
          ],
        },
        {
          id: "reference-data-refresh",
          title: "Check replacement data before activating it",
          paragraphs: [
            "Company information changes over time, so maintaining the underlying data is part of maintaining the experience. I built a refresh process that imports and validates a candidate Companies House database before it can replace the active one. A refresh lock prevents overlapping runs, and activation retains the previous database with recovery handling if the file swap fails.",
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Validation and iteration",
      paragraphs: [
        "I launched the service as a proof of concept and used a business social-media profile to explain its benefits and invite feedback. I also established direct feedback channels with the MND Association’s partnerships and nationwide support teams.",
        "I am gathering feedback and reviewing usage data from visitors who consent to analytics, to identify where the experience needs to improve.",
        "Server-side regression tests cover search-radius boundaries, evidence ranking, pagination, company-status filtering and profile expiry. These turn product rules into repeatable checks, including keeping evidence-backed ordering consistent across pages and excluding dissolved companies.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery and outcomes",
      paragraphs: [
        "As of October 2026, the service has 240 evidence-supported company listings and its council coverage spans England. The MND Association has started using the service and sharing it internally. Its partnerships team has agreed a planned Helpful Links listing, which remains pending the next full review in February 2027.",
        "The administration interface also brings together company-view and contact-interaction analytics where visitors have consented. This helps me investigate how people use listings alongside the feedback I receive.",
        "I deploy the public frontend through Netlify and run the API and persistent data on Render. I use semantic markup and checks with Lighthouse and axe when developing the interface. Hosting costs remain below £10 per month at the current scale.",
      ],
      evidence: [
        {
          value: "240",
          label: "Evidence-supported listings",
          detail:
            "Company listings available on the service as of October 2026.",
        },
        {
          value: "England",
          label: "Current council coverage",
          detail:
            "Council coverage across England, with further expansion to the rest of the UK over time.",
        },
        {
          value: "~£8.50 / month",
          label: "Service running cost",
          detail:
            "Total monthly cost of running the service at its current scale, with API hosting on Render as the only ongoing expense.",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning and next steps",
      paragraphs: [
        "The work reinforced that discovering a company is only one part of planning an adaptation. People may also need to understand local support, organise information and prepare a conversation. Designing the interface alongside the data and maintenance process helped me address that wider journey with a service I can continue to support.",
        "My next step is to gather more direct feedback from people using the service and the teams supporting them. I want to understand whether they can find relevant companies, reach the right council and prepare their next steps. Usage data can help identify questions to investigate, while conversations and task-based evaluation can explain where the experience needs to change.",
      ],
    },
  ],
};
