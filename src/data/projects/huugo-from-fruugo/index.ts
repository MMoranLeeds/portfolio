import cardBackground from "@/assets/images/dist/cards/ventura-bg-960.webp";
import { projectCover } from "../shared/coverImages";
import { huugoImage } from "./images";
import type { Project } from "@/types/project";
import mobileFallback from "@/assets/images/mobile-placeholders/huugo-from-fruugo.svg";

export const huugoProject: Project = {
  slug: "huugo-from-fruugo",
  title: "Huugo from Fruugo",
  category: "Fruugo · Marketplace AI shopping",
  summary:
    "Taking a standalone AI shopping proof of concept into Fruugo’s marketplace, with contextual entry points, a coherent fallback and reusable campaign workflows.",
  role: "UX research and design, front-end implementation, identity and AI creative workflows",
  status: "Live across 10 markets · Black Friday marketplace rollout",
  tags: [
    "AI creative workflows",
    "Front-end implementation",
    "UX research & design",
  ],
  url: "https://www.fruugo.co.uk/?language=en",
  externalLinkLabel: "View the marketplace in English",
  seoDescription:
    "How Matthew Moran took Huugo from a standalone AI shopping proof of concept into Fruugo’s marketplace, combining UX, frontend delivery, staged rollout and reusable campaign workflows.",
  card: {
    summary:
      "Taking a proven standalone AI shopping concept into the marketplace, with contextual discovery and a coherent fallback.",
    outcome:
      "Validated through a standalone email campaign, where shoppers engaged and purchased, then progressed into production marketplace integration across 10 markets.",
    alt: "Fruugo’s Netherlands homepage with Huugo search, product scenes and contextual shopping entry points.",
  },
  overview: {
    rationaleLabel: "Problem",
    rationale:
      "Establish whether shoppers would use conversational shopping and purchase through it before committing to integration across the marketplace.",
    evaluationLabel: "My approach",
    evaluation:
      "Led UX and substantial frontend delivery from standalone validation to marketplace integration, including a non-AI fallback and repeatable, country-specific campaign workflows.",
    outcome:
      "The standalone email campaign recorded engagement and purchases, supporting the decision to integrate. Following the Netherlands launch, the Black Friday marketplace experience is now live across 10 markets.",
    period:
      "2026 · standalone launch in October, marketplace integration in November",
    launchDate: "2026-10-08",
    launchLabel:
      "Standalone: 8 October · marketplace: 17 November · Black Friday rollout: 19 November 2026",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    label: "Marketplace on mobile",
    alt: "Mobile Netherlands homepage showing Huugo, the shopping prompt and a route to browse categories.",
    caption:
      "The mobile homepage introduces Huugo while keeping conventional browsing available.",
  },
  socialPreview: {
    path: "/images/social/huugo-from-fruugo.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Huugo from Fruugo, from standalone AI shopping proof of concept to marketplace integration.",
  },
  cover: {
    cardBackground,
    ...huugoImage(
      "marketplace-home",
      "Huugo in the marketplace",
      "Netherlands marketplace homepage with Huugo search, four interactive product scenes and themed character entry points.",
      "The Netherlands marketplace viewed in English, with conversational shopping alongside familiar routes to browse products.",
    ),
  },
  video: {
    sectionId: "delivery",
    title: "Introducing the standalone experience",
    playLabel: "Watch the original launch film",
    src: "/videos/huugo-promotion.mp4",
    poster: projectCover("huugo-shopping-journey").src,
    caption:
      "The original standalone launch film, before Huugo was integrated into the marketplace.",
    width: 1280,
    height: 720,
  },
  sections: [
    {
      id: "problem",
      title: "The problem and a staged approach",
      paragraphs: [
        "A shopper may know the occasion, budget or problem they are buying for without knowing the right product name.",
        "A standalone experience was first developed and introduced through an email campaign. This let the business observe engagement and purchasing before committing to marketplace-wide integration, reducing the risk of substantial work that might otherwise need to be reversed.",
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "I led the UI and UX design and implemented most of the standalone frontend, working with a frontend engineer on the final implementation. Engineering owned model orchestration and commerce services.",
        "For the marketplace phase, I led the homepage experience and used rapid, AI-assisted prototyping to work through implementation with Engineering. I also created Huugo’s identity creation and the agents and skills that support country-specific scenes, character variants and advertising assets.",
      ],
    },
    {
      id: "delivery",
      title: "Prove the shopping journey before integrating",
      paragraphs: [
        "Reviewing familiar conversational patterns and combining editable prompts with structured product cards, suggested actions, comparison and basket controls. Internal testing gathered staff responses and informed clearer delivery charges and engineering fixes to conversation and discount continuity.",
        "The standalone launched on 8 October 2026 through an email activation campaign. Early reporting recorded 1,302 opened conversations, 481 engaged conversations and £1,011 in GTV against £55 of AI-model usage costs. Shoppers were interacting and purchasing through the flow, supporting the decision to progress into the marketplace.",
        "The £18.38 GTV per £1 of model spend describes transaction value against one operating cost. It does not establish profitability or incremental sales. These standalone results remain separate from the later marketplace reporting.",
      ],
      image: huugoImage(
        "chat",
        "The standalone proof of concept",
        "Original standalone Huugo conversation with structured product cards and shopping controls.",
        "The standalone experience provided a route to test engagement and purchasing before marketplace integration.",
      ),
      sourceIds: ["standalone-results"],
    },
    {
      id: "design",
      title: "Two experiences, one coherent homepage",
      paragraphs: [
        "I designed a refreshed homepage that works both with and without Huugo. The non-AI version launched first in the Netherlands, followed by the integrated assistant on 17 November. Keeping the layout and browsing routes coherent means the marketplace can retain its refreshed experience if the business disables AI because of availability or model-usage costs.",
        "The integrated version offers several ways to begin: the hero input, contextual product hotspots, mission links, a floating Ask Huugo button and supporting calls to action. The conversation opens in a side sheet, keeping shoppers within the marketplace.",
        "Conventional search and category browsing remain available for shoppers who prefer them. On mobile, the interface adapts to a narrower viewport while retaining these choices.",
      ],
      blocks: [
        {
          id: "marketplace-conversation",
          title: "Move from discovery into a conversation",
          paragraphs: [],
          images: [
            huugoImage(
              "marketplace-chat",
              "Marketplace conversation",
              "Huugo side sheet open over the Netherlands homepage, showing product recommendations and a message input.",
              "Product discovery and the assistant share the same marketplace journey.",
            ),
            huugoImage(
              "marketplace-mobile-chat",
              "Conversation on mobile",
              "English-language Huugo conversation on mobile, showing product recommendations, prices, shopping actions and the message input.",
              "The mobile conversation keeps product information and the composer together within the marketplace.",
            ),
          ],
        },
        {
          id: "contextual-entry",
          title: "Make the starting point relevant",
          paragraphs: [
            "Product scenes connect recognisable needs with an editable conversation. Country-specific research informs which products appear, while hotspots offer a direct route to ask Huugo about items in the scene.",
          ],
          images: [
            huugoImage(
              "marketplace-scenes",
              "Contextual shopping scenes",
              "Four scenes covering personal care, wellbeing, car parts and home entertainment, each with product hotspots and related shopping links.",
              "Scenes provide contextual entry points alongside the open-ended search prompt.",
            ),
          ],
        },
      ],
    },
    {
      id: "creative-workflow",
      title: "From character design to an agent-supported workflow",
      paragraphs: [
        "I created reusable agents and ChatGPT skills that turn country-specific product research into homepage scenes and Huugo variants. Product insights inform the brief; photorealistic scenes and character accessories are generated within minutes, then reviewed for relevance and consistency.",
        "Huugo’s recognisable blue silhouette and eyes stay consistent while removable accessories connect the character to products and occasions. Essential meaning stays in localisable interface text rather than relying on the illustration.",
        "I extended the asset-generation skill to support RTB House advertising: 13 languages and 12 sizes produce 156 variants per campaign. In my workflow, generating a campaign set takes approximately ten minutes; this is an observed production time, with human review remaining part of release preparation.",
        "Together with reusable campaign styling, these workflows let me prepare new market and seasonal variants quickly without rebuilding the experience for each campaign.",
      ],
      blocks: [
        {
          id: "creative-guardrails",
          title: "Build IP safeguards into the workflow",
          paragraphs: [
            "I built explicit third-party intellectual property guardrails into the asset-generation skill, rather than relying on the image model’s default safeguards. Briefs referencing brands, programmes or sports teams are translated into original, generic themes before generation. The instructions exclude third-party logos, slogans, recognisable characters, celebrity likenesses and distinctive costume or setting combinations, while preserving Huugo’s own identity.",
            "The workflow requires review of generated imagery and accompanying copy for unexpected branding, resemblance or implied sponsorship. Problematic versions are regenerated, simplified or withheld. Requests to use licensed third-party material require confirmation of rights-holder permission or Fruugo Legal approval for the intended use, alongside approved assets and any usage restrictions.",
            "These controls reduce risk; they do not provide legal clearance or guarantee that an output cannot infringe rights. Human review remains part of release preparation, with final commercial clearance left to Fruugo’s legal process where required.",
          ],
        },
      ],
      image: huugoImage(
        "marketplace-identity",
        "Product-led Huugo variants",
        "Huugo with personal care, wellbeing, car maintenance and headphone accessories across four shopping tiles.",
        "A shared character identity adapts to the same product themes as the surrounding scenes.",
      ),
    },
    {
      id: "black-friday",
      title: "Applying the workflow: Black Friday",
      paragraphs: [
        "Black Friday brought the shared experience into a live seasonal campaign across 10 markets. Applying the reusable campaign workflow to adapt the styling, product scenes and Huugo artwork while retaining the same shopping interactions and conventional browsing routes.",
        "The homepage pairs a dark campaign hero and turquoise accents with a Black Friday Huugo variant, gift packaging and sale tags. The prompt invites shoppers to find Black Friday deals, while contextual scenes offer starting points for gifting, technology and home purchases. Hotspots connect products in those scenes to Huugo predetermined conversations speeding up the shopping experience perception.",
        "This demonstrates how the workflow supports a coordinated campaign without redesigning the underlying experience for every event. The advertising workflow extends that campaign across languages and placements. Campaign-specific engagement, sales and model costs are the next measures to review; the earlier Netherlands findings describe the initial launch rather than Black Friday performance.",
      ],
      blocks: [
        {
          id: "black-friday-desktop",
          title: "A campaign built on the shared homepage",
          paragraphs: [],
          images: [
            huugoImage(
              "black-friday-desktop",
              "Black Friday desktop homepage",
              "Fruugo’s UK Black Friday homepage with seasonal Huugo artwork, a shopping prompt and contextual product scenes.",
              "The Black Friday campaign adapts the shared marketplace homepage while retaining familiar shopping controls.",
            ),
          ],
        },
        {
          id: "black-friday-mobile",
          title: "Carry the campaign into mobile shopping",
          paragraphs: [],
          images: [
            huugoImage(
              "black-friday-mobile",
              "Black Friday on mobile",
              "Mobile UK Black Friday homepage showing seasonal Huugo artwork, the shopping prompt and routes to browse categories.",
              "The campaign carries into mobile with conversational shopping and conventional browsing available.",
            ),
          ],
        },
        {
          id: "black-friday-advertising",
          title: "Extend the campaign across advertising placements",
          paragraphs: [],
          images: [
            huugoImage(
              "black-friday-advertising",
              "Black Friday advertising · English",
              "All 12 English Black Friday Huugo advertising formats, including portrait, square, rectangle and wide banner layouts.",
              "The English campaign set demonstrates all 12 advertising sizes. The reusable workflow also supports the wider 13-language campaign output.",
            ),
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Staged deployment and early findings",
      paragraphs: [
        "The refreshed non-AI homepage was reviewed over 13–16 November against equivalent days one and two weeks earlier. Netherlands engagement reached 20.9%, up 2.0–2.1 percentage points. Belgium provided directional context, with a smaller sample and a different traffic mix.",
        "For the integrated Huugo homepage, the initial 17–18 November read recorded 23.9% engagement, up 2.6–3.6 percentage points against the corresponding historical periods. These sequential deployment windows are not a randomised A/B test, so their difference cannot isolate Huugo’s incremental effect.",
        "Lower deep scrolling needs further investigation. It could reflect shoppers finding content earlier, a change in page length or reduced exploration. I am reviewing downstream actions and recordings rather than treating it as evidence of improvement by itself.",
      ],
      evidence: [
        {
          value: "230",
          label: "Sessions opening Huugo",
          detail:
            "Netherlands homepage, 17–18 November: 8.5% of 2,716 engaged homepage sessions, or 2.0% of 11,376 homepage landings.",
          sourceId: "nl-integration",
        },
        {
          value: "23.9%",
          label: "Homepage engagement rate",
          detail:
            "Netherlands, initial integrated reporting window. Up 2.6–3.6 percentage points against the equivalent historical windows, not a causal comparison with the refreshed fallback.",
          sourceId: "nl-integration",
        },
      ],
      blocks: [
        {
          id: "entry-point-analysis",
          title: "Understand which routes shoppers use",
          paragraphs: [
            "A separate all-marketplace GA4 export for 17–19 November recorded 391 Huugo side-sheet opening events: 246 from homepage input, 110 across 25 recorded mission labels, 31 from the Ask button and four from the homepage CTA. It also recorded 27 product-card ‘Tell me more’ clicks.",
            "These are event counts, not unique sessions. The rollup covers a different scope and window from the Netherlands report. Mission labels show contextual routes being used, but do not distinguish scene hotspots from other mission links. I am checking that coverage before judging individual controls.",
          ],
        },
      ],
      sourceIds: ["nl-fallback", "nl-integration", "ga4-entry-points"],
    },
    {
      id: "learning",
      title: "Learning and next steps",
      paragraphs: [
        "The standalone phase provided evidence to justify the next investment. Marketplace integration then brought the assistant into an existing shopping journey, with a fallback that keeps the refreshed homepage useful when AI is unavailable.",
        "Following the initial Netherlands launch, the Black Friday variant was deployed on 19 November 2026 across Australia, Switzerland, Germany, Denmark, Finland, the United Kingdom, Norway, New Zealand, Sweden and the Netherlands. This brings marketplace integration to 10 markets in total. The staged approach allows Product, Design and Engineering to review behaviour and operational performance before further expansion.",
        "My next focus is entry-point tracking, recommendation usefulness, Hotjar recordings and commercial performance alongside model costs.",
      ],
    },
  ],
  sourcesIntro:
    "Results are summarised from internal launch reporting and GA4 analysis. Reporting windows, scope and attribution limits are stated alongside the findings; internal dashboards and exports are not reproduced.",
  sources: [
    {
      id: "standalone-results",
      publisher: "Fruugo",
      title: "Standalone launch and email campaign reporting",
      date: "October 2026",
      note: "Initial conversation, GTV and model-cost reporting for the standalone experience. Separate from November marketplace results; transaction value is not profit or incremental sales.",
    },
    {
      id: "nl-fallback",
      publisher: "Fruugo · GA4 analysis",
      title: "Refreshed non-Huugo Netherlands homepage",
      date: "17 November 2026",
      note: "13–16 November versus the same weekdays one and two weeks earlier. Belgium is a directional comparator with a smaller base and different traffic mix.",
    },
    {
      id: "nl-integration",
      publisher: "Fruugo · GA4 analysis",
      title: "Netherlands Huugo homepage and entry journeys",
      date: "19 November 2026",
      note: "Initial 17–18 November reporting window. Small comparator sample, sequential rollout and checkout-domain session resets limit causal and commercial attribution.",
    },
    {
      id: "ga4-entry-points",
      publisher: "Fruugo · GA4",
      title: "All-marketplace Huugo events export",
      date: "17–19 November 2026",
      note: "Sessions with Huugo segment, all-marketplace rollup. 418 events across 236 reported total users: 391 side-sheet opening events and 27 Tell me more clicks.",
    },
  ],
};
