import { fruugoAudience as audience } from "@/data/fruugoAudience";
import cardBackground from "@/assets/images/dist/cards/sequoia-bg-960.webp";
import { projectCover } from "../shared/coverImages";
import { localisationImage } from "./images";
import type { Project } from "@/types/project";

// Merchant Portal language screenshots show the test implementation, awaiting production deployment.
// The screenshot methodology is Matt's direct account; figures below are from the briefing.
import mobileFallback from "@/assets/images/mobile-placeholders/fruugo-localisation.svg";

export const localisationProject: Project = {
  slug: "fruugo-localisation",
  overview: {
    outcome:
      "Turned multilingual research into typography and language-control improvements across Fruugo's shopper and merchant products. The Marketplace language picker and Merchant Portal font update are now live, with further changes awaiting deployment.",
    period: "Q3 2026 · Ongoing rollout",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    ...{
      label: "Portrait localisation illustration",
      alt: "Portrait artwork with Latin, Chinese, Korean and Cyrillic characters on blue and white speech-bubble tiles.",
      caption:
        "Multilingual typography illustrated in portrait format; this is not an interface screenshot.",
    },
  },
  socialPreview: {
    path: "/images/social/fruugo-localisation.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Localisation at Fruugo case study by Matthew Moran, with multilingual character artwork.",
  },
  title: "Localisation at Fruugo",
  category: "Fruugo · Company-wide UX",
  summary:
    "From shopper trust concerns to a contextual multilingual audit, clearer typography and language controls across Fruugo.",
  role: "UX research, multilingual auditing, prioritisation and cross-team design direction",
  status:
    "Marketplace language picker and Merchant Portal typography live; Marketplace typography and Merchant Portal language picker awaiting deployment",
  tags: ["UX research", "AI-assisted auditing", "Global product design"],
  url: "https://www.fruugo.co.uk/",
  externalLinkLabel: "Visit Fruugo marketplace",
  seoDescription:
    "How Matthew Moran used shopper research and a Puppeteer and AI-assisted multilingual audit to drive Fruugo's typography, language-selection and merchant-localisation programme.",
  sourcesIntro:
    "Interviews, behavioural data and a contextual interface audit informed the work. Platform scale is drawn from Fruugo's published corporate figures. The figures show marketplace reach and audit coverage. The Marketplace language picker and Merchant Portal font change are live in production. Marketplace typography and checkout wording changes, and the Merchant Portal language picker shown in test, are awaiting deployment.",
  cover: {
    cardBackground,
    ...projectCover("fruugo-localisation-overview"),
    alt: "Localisation programme: readable typography across scripts, shopper control of country and language, and a personal interface language for merchant tools.",
    caption:
      "Programme overview, illustrating the three connected changes rather than showing production screens.",
    width: 960,
    height: 400,
  },
  sources: [{ ...audience.source }],
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        `The programme spanned shopper and merchant products on a marketplace reporting ${audience.visits.headline} website visits in ${audience.visitYear}, across ${audience.countries} countries. Face-to-face interviews with Polish-speaking shoppers exposed a trust problem: inconsistent characters made the marketplace look unreliable. Some participants associated the typography with possible fraud and felt uncertain about purchasing again. A small visual defect had become a barrier to confidence.`,
        "Hotjar recordings revealed a related problem in merchant tools. Merchants used browser translation to understand English instructions, but translations sometimes changed the meaning of operational terminology. The goal was to make shopping and merchant tasks clearer in the languages people use, through typography, contextual translations and personal language choice.",
      ],
      evidence: [
        {
          value: audience.visits.card,
          label: "Website visits in 2025",
          detail:
            "Annual website visits published by Fruugo. This is a traffic measure, rather than a count of individual shoppers.",
          sourceId: audience.source.id,
        },
        {
          value: audience.retailers.card,
          label: "Retailers on the marketplace",
          detail:
            "Businesses selling through Fruugo, as reported on its corporate website. This is not a count of Merchant Portal users.",
          sourceId: audience.source.id,
        },
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "Translation work had repeatedly been considered too large to tackle. I challenged that constraint by building a local capture workflow covering just under 800 Marketplace views per supported language, then using AI analysis to identify and prioritise issues in context.",
        "I took the findings directly to the CTO, Product and the Marketplace technical lead. I collaborated with the other lead UX designer on the typography direction, language controls and required interface updates for marketplace users and merchants.",
      ],
    },
    {
      id: "research",
      title: "Research and findings",
      paragraphs: [
        "Reviewing translations in a CSV removed the context needed to judge their meaning. I used Puppeteer to capture the configured Marketplace across discovery, product pages, accounts, help, policies and checkout in each supported language.",
        "AI analysis identified candidate problems and suggested corrections. I prioritised misleading labels and trust barriers, then asked colleagues who speak the relevant languages to review them in context. Coverage varied between languages.",
        "Merchant registration data and observed translation behaviour helped prioritise Simplified Chinese. I kept personal language choice separate from a merchant's registered country, allowing each user to choose the language they prefer.",
      ],
      evidence: [
        {
          value: audience.countries,
          label: "Countries served",
          detail:
            "Fruugo's published international footprint gives context to the different regional expectations considered in the work.",
          sourceId: audience.source.id,
        },
        {
          value: audience.languages,
          label: "Languages supported",
          detail:
            "Languages reported by Fruugo, illustrating the need for consistent typography and understandable interface text across markets.",
          sourceId: audience.source.id,
        },
        {
          value: "~800",
          label: "Screenshots per language",
          detail:
            "Just under 800 contextual interface captures per supported language.",
        },
      ],
      steps: [
        {
          title: "Capture in context",
          description:
            "Use the configured Marketplace and Puppeteer to capture the interface across language variants.",
        },
        {
          title: "Surface candidate issues",
          description:
            "Use AI to identify patterns and propose corrections alongside the surrounding interface.",
        },
        {
          title: "Prioritise by user impact",
          description:
            "Escalate misleading task labels and trust barriers before smaller, workable inconsistencies.",
        },
        {
          title: "Validate flagged changes",
          description:
            "Ask internal speakers of the relevant languages to check the proposed changes in context.",
        },
      ],
      blocks: [
        {
          id: "checkout-evidence",
          title: "German checkout: a small label with a large consequence",
          paragraphs: [
            "Beside the shopper's completed email details, ‘E-Mail sicheres Abmelden' used wording associated with logging out. At checkout, that could make the user uncertain about their account state or whether their details had been retained. The updated screen uses ‘Angemeldet als', meaning ‘Signed in as'.",
            "The revised wording makes the account state clearer at checkout. Its effect on shopper confidence and completion will be reviewed after release.",
          ],
          images: [
            localisationImage(
              "checkout-before",
              "Before · German checkout",
              "German checkout label: E-Mail sicheres Abmelden.",
              "The previous label suggests logging out beside completed email details.",
            ),
            localisationImage(
              "checkout-after",
              "After · implemented, awaiting deployment",
              "Updated German checkout label: Angemeldet als.",
              "The revised label communicates that the shopper is signed in.",
            ),
          ],
        },
      ],
    },
    {
      id: "design",
      title: "Design approach and decisions",
      paragraphs: [
        "The audit connected individual defects to shared design decisions. I focused on readable typography, language choice independent of store country, and clear separation between a merchant's personal interface preference and their company's reply language.",
      ],
      blocks: [
        {
          id: "typography",
          title: "Typography: consistent characters across languages",
          paragraphs: [
            "Neuzeit Grotesk lacked some characters needed by supported languages, so labels fell back to a different font. We selected Noto Sans for broader script coverage and more consistent typography. It also removed the Adobe Typekit dependency and let us use the same typeface in Google Workspace documents.",
            "The same Polish category labels are enlarged below. Look at the accented ‘ó' in ‘ogród' and ‘Wystrój', and how it sits with the surrounding letters. Polish-speaking participants noticed the inconsistency even when it was easy for other readers to miss. Text also wraps differently after the font change, reinforcing the need to check layouts using real translations.",
            "Noto Sans is now live in the Merchant Portal. The Marketplace font change is implemented but awaiting production deployment, as shown in the Polish examples below. Noto Sans requires appropriate fonts for the scripts being displayed. I recommended font-display: swap to keep text visible during loading, and the frontend team implemented the loading changes.",
          ],
          images: [
            localisationImage(
              "polish-before",
              "Before · Neuzeit Grotesk",
              "Enlarged Polish category labels in the previous font: Dom i ogród and Wystrój i wyposażenie domu.",
              "The Polish labels show accented characters falling back to a different font.",
            ),
            localisationImage(
              "polish-after",
              "After · Marketplace Noto Sans, awaiting deployment",
              "The same Polish labels in Noto Sans, with the second label wrapping onto another line.",
              "Updated typography, showing the same words and their revised character shapes and wrapping.",
            ),
          ],
        },
        {
          id: "shopper-controls",
          title: "Shopper controls: separate language from country",
          paragraphs: [
            "I collaborated on a picker that lets shoppers select their language independently from the country store, now live in production on Marketplace. Currency and payment methods remain visible before they select Update, helping people understand the store context.",
            "The flag trigger sits in the header, with a consistent position across desktop and mobile. A compact footer trigger replaces the previous country and language lists. Language names and selected-country text support recognition, rather than relying on a flag to represent language.",
            "The design includes warnings where changing stores could discard shopping progress. Keyboard operation, focus return and longer translated labels are part of the interaction requirements. With the picker now live, language-selection usage and feedback will inform further refinements.",
          ],
          images: [
            localisationImage(
              "header-trigger",
              "Header trigger · live in production",
              "Country flag trigger in the Marketplace header beside the help and account controls.",
              "The header makes language and country choice accessible earlier in the shopping journey.",
            ),
            localisationImage(
              "picker",
              "Language and country picker · live in production",
              "Marketplace dialog with independent Language and Shop in selectors, currency, payment methods and Update button.",
              "Independent choices, with store currency and payment context visible before applying the change.",
            ),
            localisationImage(
              "footer-before",
              "Before · footer country and language lists",
              "Previous Marketplace footer containing a long country list and an English language label.",
              "The previous footer spreads store choices across many links.",
            ),
            localisationImage(
              "footer-after",
              "After · compact footer trigger, live in production",
              "Updated footer trigger showing United Kingdom and English beside a country flag.",
              "A single trigger shows the current country and language and opens the shared picker.",
            ),
          ],
        },
        {
          id: "merchant-tools",
          title: "Merchant Portal: personal interface language",
          paragraphs: [
            "I designed a personal language picker in the Merchant Portal header, implemented in the test environment for English and Simplified Chinese and awaiting production deployment. Merchants can choose the language they prefer for their own work without changing their company's customer-reply language. Their interface preference persists across views.",
            "The change reaches beyond the picker: navigation, dashboard headings, task instructions and actions adapt to Simplified Chinese. The examples below show the same order, enquiry and dispute tasks in both languages. This gives merchants a supported alternative to browser translation, helping them work in familiar language while retaining consistent product terminology.",
            "The aim is to reduce language barriers to selling, supporting Fruugo's ambition to let anyone, anywhere sell. Easier comprehension and more efficient task completion are the intended benefits; their impact will be assessed after release.",
            "Changing interface language refreshes the current page. The interaction design includes a warning about unsaved edits and offers a way to keep editing before the refresh discards input. A translation-feedback route helps merchants report terminology that does not make sense in context.",
          ],
          images: [
            localisationImage(
              "merchant-picker",
              "Personal language choice · awaiting production deployment",
              "Merchant Portal header with the Interface language menu open, English selected, Simplified Chinese available and a translation-feedback link.",
              "A close-up of the implemented picker. Language names support recognition alongside the flags.",
            ),
            {
              ...localisationImage(
                "merchant-english-detail",
                "English · dashboard task cards",
                "English dashboard cards for Pending orders, Open enquiries, Disputes and Boost my sales, with instructions and View actions.",
                "The same operational tasks before switching language. Open the image to see the full English dashboard.",
              ),
              fullSrc: localisationImage("merchant-english", "", "", "")
                .fullSrc,
            },
            {
              ...localisationImage(
                "merchant-chinese-detail",
                "Simplified Chinese · after language change",
                "The same dashboard task cards in Simplified Chinese, with translated order, enquiry and dispute instructions and actions.",
                "Task headings, guidance and actions adapt together. Open the image to see the full translated dashboard, including navigation and header controls.",
              ),
              fullSrc: localisationImage("merchant-chinese", "", "", "")
                .fullSrc,
            },
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Validation and iteration",
      paragraphs: [
        "Colleagues who speak the relevant languages reviewed the flagged findings in the interface. Their feedback helped check terminology and prioritise changes with Product and Engineering.",
        "The Marketplace language picker and Merchant Portal font change are live in production. The Merchant Portal language screenshots show the test implementation, with production deployment still pending. Ongoing validation covers keyboard and screen-reader behaviour, mobile reflow, translated strings and font loading, alongside post-launch behaviour and feedback.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery and outcomes",
      paragraphs: [
        "The work turned a translation problem that had been difficult to scope into agreed priorities across Marketplace, Checkout and merchant tools. We established a repeatable audit process, selected shared typography and designed clearer language controls.",
        "The Marketplace language and country picker is live in production, alongside the Noto Sans font change in the Merchant Portal. The Marketplace font change and Merchant Portal language picker remain awaiting deployment. Merchant Portal language switching is available in test for English and Simplified Chinese. I will review usage and feedback from the live changes, then assess shopper confidence and merchant task completion as the remaining updates are released.",
      ],
      points: [
        {
          title: "Research made actionable",
          description:
            "Contextual capture and targeted human review created a practical route from findings to delivery priorities.",
        },
        {
          title: "Merchant Portal typography live",
          description:
            "Noto Sans is live in the Merchant Portal, with the Marketplace font change awaiting deployment. Script coverage and loading remain part of the shared approach.",
        },
        {
          title: "Marketplace language picker live",
          description:
            "Shoppers can open the picker from the header flag or footer and choose their language independently from the country store.",
        },
        {
          title: "Merchant Portal language picker awaiting deployment",
          description:
            "English and Simplified Chinese adapt the Merchant Portal interface in the test environment. Production deployment is still pending.",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning and next steps",
      paragraphs: [
        "Localisation needs interface context. A character shape or short label can look minor but affect confidence at an important step. Automation made the review manageable, while native-language feedback helped us interpret the findings.",
        "I will review usage and feedback from the live Marketplace language picker and Merchant Portal typography, extending that review as Marketplace typography and Merchant Portal language switching reach production. Ongoing checks will cover longer labels, right-to-left layouts, keyboard operation and font loading as templates and translations change.",
      ],
    },
  ],
};
