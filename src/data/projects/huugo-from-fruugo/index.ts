import cardBackground from "@/assets/images/dist/cards/ventura-bg-960.webp";
import { projectCover } from "../shared/coverImages";
import { huugoImage } from "./images";
import type { Project } from "@/types/project";
import mobileFallback from "@/assets/images/mobile-placeholders/huugo-from-fruugo.svg";

export const huugoProject: Project = {
  slug: "huugo-from-fruugo",
  overview: {
    outcome:
      "Took the CTO's proof of concept into a launched AI shopping experience, leading UX and implementing most of the frontend. The production page achieved a Lighthouse performance score of 99/100, while early gross transaction value reached 18.4 times the associated AI-model spend.",
    period: "Q3 2026",
    launchDate: "2026-10-08",
    launchLabel: "8 October 2026",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    ...{
      label: "Portrait identity illustration",
      alt: "Portrait artwork of Huugo's blue character with shopping and search speech bubbles.",
      caption:
        "Huugo identity artwork, presented in portrait format rather than as an interface screenshot.",
    },
  },
  socialPreview: {
    path: "/images/social/huugo-from-fruugo.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Huugo from Fruugo case study by Matthew Moran, featuring the AI shopping assistant.",
  },
  video: {
    sectionId: "delivery",
    title: "Introducing Huugo",
    playLabel: "Watch launch film",
    src: "/videos/huugo-promotion.mp4",
    poster: projectCover("huugo-shopping-journey").src,
    caption:
      "The promotional film used to announce the launch of Huugo, Fruugo's AI shopping assistant.",
    width: 1280,
    height: 720,
  },
  title: "Huugo from Fruugo",
  category: "Fruugo · Agentic AI shopping",
  summary:
    "Developing a technical proof of concept into a shopper-facing AI experience, with familiar interactions, front-end delivery and a scalable character identity.",
  role: "UX research and design, front-end implementation, identity and creative workflows",
  status: "Launched 8 October 2026 · early campaign results",
  tags: [
    "UX research & design",
    "Front-end implementation",
    "AI creative workflows",
  ],
  url: "https://huugo.fruugo.com/",
  seoDescription:
    "How Matthew Moran developed Fruugo's AI shopping proof of concept into a shopper-facing experience, designed Huugo's identity and used internal feedback to guide iteration before launch.",
  sourcesIntro:
    "Public market research provided context for exploring conversational shopping.",
  cover: {
    cardBackground,
    ...projectCover("huugo-shopping-journey"),
    alt: "Huugo experience overview: describe a shopping goal, inspect and refine options, then choose the next action.",
    caption:
      "Illustrated experience overview. Actual interface captures and character artwork are shown below.",
    width: 960,
    height: 400,
  },
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        "The project began with a bare-bones HTML proof of concept created by Fruugo's CTO. Conversations with Google and market research into agentic commerce highlighted a strategic opportunity: prepare the marketplace for shoppers expressing their needs through AI assistants, while exploring a new route to GTV.",
        "After demonstrating the concept to the wider business and board, the CTO asked me to develop the UX. The challenge was to turn a working technical demonstration into an experience that shoppers could understand, use and trust. A shopper might know the occasion, budget or problem they are buying for without knowing the right product name or search terms.",
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "I owned the full UI and UX design and implemented most of the frontend. I researched established AI interaction patterns, used AI to prototype the designs quickly, then developed the interface states and responsive behaviour.",
        "A frontend engineer worked alongside me on the final implementation, helping with more technical aspects. The CTO created the original proof of concept, and the wider engineering team delivered backend model orchestration and commerce services.",
        "I also created Huugo's identity and a reusable workflow for character variants and campaign assets across markets.",
      ],
    },
    {
      id: "research",
      title: "Research and findings",
      paragraphs: [
        "I reviewed ChatGPT, Claude and Gemini to understand familiar interaction patterns, including editable prompts, response states and conversational refinement. This informed the composer and the ways shoppers can adjust a request.",
        "I implemented editable voice-to-text using the Web Speech API. Alongside the conversation, shoppers needed product details, comparison, basket controls and clear information about delivery, variants and costs.",
      ],
      points: [
        {
          title: "US$3-5tn in projected agentic commerce by 2030",
          description:
            "McKinsey's forecast for global consumer-goods commerce mediated by AI agents illustrates the scale of the strategic opportunity. This market context helped frame Fruugo's exploration of conversational shopping.",
        },
      ],
      sourceIds: ["mckinsey-commerce"],
    },
    {
      id: "design",
      title: "Design approach and decisions",
      paragraphs: [
        "I brought together established conversational patterns, structured shopping information and an identity that could remain recognisable across different languages and occasions.",
      ],
      blocks: [
        {
          id: "shopper-experience",
          title: "Help shoppers move from conversation to checkout",
          paragraphs: [
            "I combined the conversation with product cards, suggested actions and a basket. The front-end work included composer states, editable dictation, dialogs, counters and responsive layouts. Text input remains available alongside voice; the character supports the interface without replacing labels or status feedback.",
          ],
          images: [
            huugoImage(
              "chat",
              "Implemented interface",
              "Huugo conversation with product cards, suggested shopping content and a composer containing microphone and send controls.",
              "Conversation and structured product cards share the same shopping surface.",
            ),
            huugoImage(
              "basket",
              "Basket and checkout handoff",
              "Enlarged detail of Huugo's basket showing shipping information, cost breakdown and Checkout on Fruugo button.",
              "Basket detail enlarged around delivery, totals and the checkout handoff.",
            ),
          ],
        },
        {
          id: "identity",
          title: "A recognisable identity with room for local context",
          paragraphs: [
            "I chose a rounded blue character with eyes, using Fruugo's brand blues to connect the identity to the marketplace. The eyes provide an expressive focal point and can direct attention towards another element. Keeping the face simple was intended to reduce competing visual cues.",
            "I used a non-human form to avoid assigning the character a particular human ethnicity. Removable accessories allow the same recognisable identity to adapt to local occasions and cultural contexts, with artwork and messaging selected for each market.",
            "Huugo has no mouth. Meaning is communicated through interface and campaign text that can be localised and maintained in translation files. Eye direction and accessories support that message; essential actions and information remain available in text.",
          ],
          imageLayout: "grid",
          images: [
            huugoImage(
              "master",
              "Huugo master character",
              "Huugo's rounded blue body and white oval eyes, without a mouth, limbs or event accessories.",
              "The master defines the silhouette, proportions and eye style used across variants.",
            ),
            huugoImage(
              "campaign-tennis",
              "Campaign concept · tennis",
              "Huugo with a tennis visor and racket beside strawberries, with Serve up summer and Shop with Huugo copy.",
              "An occasion-led concept that could open an editable shopping conversation about tennis and picnic essentials.",
            ),
            huugoImage(
              "campaign-baking",
              "Campaign concept · baking",
              "Huugo wearing a chef hat and apron with baking props, with Ready, set, bake copy.",
              "Accessories and localisable copy adapt the identity while preserving the recognisable blue character.",
            ),
            huugoImage(
              "campaign-festival",
              "Campaign concept · festivals",
              "Huugo in a colourful hat and rain poncho with camping equipment, with Pack for the encore copy.",
              "A separate shopping occasion using the same identity framework.",
            ),
          ],
        },
        {
          id: "creative-workflow",
          title: "From character design to an agent-supported workflow",
          paragraphs: [
            "I documented the master artwork and creative constraints in reusable instructions. Event research informs the brief and accessory choices, with character generation and advert composition followed by human review.",
            "This makes the approach repeatable across markets and placements without redefining Huugo for each campaign. The workflow currently uses GPT-based generation.",
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Validation and iteration",
      paragraphs: [
        "Before launch, an internal deployment gathered 29 staff responses between 29 September and 7 October 2026: 27 desktop or laptop experiences and two mobile experiences. Eighteen respondents said they would probably or definitely use the assistant instead of normal search.",
        "The feedback led to changes in the basket and technical fixes with Engineering. It also identified opening recommendations as an area for further review.",
      ],
      points: [
        {
          title: "Delivery charges: make the cost visible",
          description:
            "Staff reported delivery-cost surprises. I made applicable charges clearer in the basket, increasing their prominence and adjusting the content hierarchy so shoppers could see them before checkout.",
        },
        {
          title:
            "Discounts and conversation continuity: resolve technical faults",
          description:
            "Feedback exposed bugs affecting discount continuity and retained conversation progress. I passed these to the relevant engineering team, who addressed the technical faults alongside the final frontend implementation.",
        },
        {
          title: "Opening recommendations: continue reviewing relevance",
          description:
            "Some staff found the initial suggestions useful; others felt they were too promotional. This remains a priority for evaluating how much content to show before a shopper describes their need.",
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery and outcomes",
      eyebrow: "Performance and early commercial results",
      paragraphs: [
        "Huugo launched on 8 October 2026, supported by an email activation campaign across three market groups. The campaign introduced the new experience with a promotional offer, providing an initial route for shoppers to discover and use the assistant.",
        "Fast page loading times were prioritised during front-end development so shoppers could begin interacting quickly. A Lighthouse audit of the production page recorded a performance score of 99/100, with First Contentful Paint at 0.7 seconds and Largest Contentful Paint at 0.8 seconds. These results demonstrate a fast-loading interface; conversational response speed is a separate part of the experience.",
        "The early launch reporting recorded 1,302 opened conversations and 481 engaged conversations, generating £1,011 in GTV against £55 in AI-model usage costs. This equates to £18.38 in transaction value for every £1 of model spend, with model costs representing 5.4% of GTV.",
        "The launch established a working route from conversation to purchase. The next phase will evaluate how well it serves shoppers across markets and traffic sources.",
      ],
      evidence: [
        {
          value: "99/100",
          label: "Lighthouse performance",
          detail:
            "A production-page Lighthouse audit recorded a near-perfect performance score, reflecting the focus on fast page loading during design and development.",
          sourceId: "performance-audit",
        },
        {
          value: "18.4×",
          label: "GTV relative to AI-model spend",
          detail:
            "£1,011 in early GTV against £55 in model usage costs. AI-model spend represented 5.4% of transaction value, excluding other project and operating costs.",
          sourceId: "launch-results",
        },
        {
          value: "0.8s",
          label: "Largest Contentful Paint",
          detail:
            "The same Lighthouse run recorded 0.8s LCP and 0.7s First Contentful Paint, supporting a fast-loading entry into the shopping experience.",
          sourceId: "performance-audit",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning and next steps",
      paragraphs: [
        "The project showed how AI-assisted prototyping could help turn a technical concept into a live shopping experience. Staff feedback exposed practical gaps in the basket and journey continuity that needed attention alongside the recommendations themselves.",
        "The next step is shopper testing across languages and levels of AI familiarity, focusing on recommendation usefulness, refinement, price and delivery confidence, and checkout continuity.",
        "Proposed next phase work includes Marketplace homepage integration and event-led Google Ads that open relevant shopping conversations. A tennis advert could start an editable request for rackets, clothing or balls.",
      ],
    },
  ],
  sources: [
    {
      id: "mckinsey-commerce",
      publisher: "McKinsey & Company",
      title:
        "The agentic commerce opportunity: How AI agents are ushering in a new era for consumers and merchants",
      url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants",
      date: "17 October 2025",
      note: "Forecast for global consumer-goods commerce mediated by AI agents by 2030. Market context, rather than a result of the Huugo project.",
    },
  ],
};
