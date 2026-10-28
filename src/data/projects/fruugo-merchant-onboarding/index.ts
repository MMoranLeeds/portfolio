import cardBackground from "@/assets/images/dist/cards/golden-gate-bg-960.webp";
import { projectCover } from "../shared/coverImages";
import type { Project } from "@/types/project";
import { onboardingImage } from "./images";

// January feedback supplied by Matt. The year and survey scale anchors were not supplied.
// Completion time is the fastest observed submission, not a mean or controlled comparison.
import mobileFallback from "@/assets/images/mobile-placeholders/fruugo-merchant-onboarding.svg";

export const onboardingProject: Project = {
  slug: "fruugo-merchant-onboarding",
  overview: {
    outcome:
      "Simplified the merchant application by moving integration questions to a more appropriate stage and improving guidance throughout the journey. An early survey of 24 respondents returned a 4.5/5 rating for ease of completion.",
    period: "Q4 2025",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    ...{
      label: "Mobile application entry",
      alt: "Fruugo mobile onboarding page with Start application and Resume application choices.",
      caption:
        "The mobile entry point offers clear routes to start or resume an application.",
    },
  },
  socialPreview: {
    path: "/images/social/fruugo-merchant-onboarding.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Merchant onboarding at Fruugo case study by Matthew Moran, with the merchant interface.",
  },
  card: {
    alt: "Desktop homepage for Fruugo's merchant application.",
    header: {
      label: "",
      alt: "Desktop homepage for Fruugo's merchant application, matching the case-study card.",
      caption: "The desktop entry point for Fruugo's merchant application.",
      previewAspectRatio: "12 / 5",
      previewPosition: "top",
    },
  },
  title: "Merchant onboarding",
  category: "Fruugo · Merchant experience",
  summary:
    "Shortening the application, moving integration questions to the right stage and connecting the information teams need to review new merchants.",
  role: "UX design, behavioural research, cross-team collaboration and implementation refinement",
  status: "Live, with ongoing post-launch review",
  tags: ["Merchant onboarding", "Data-informed design", "Cross-team delivery"],
  seoDescription:
    "How Matthew Moran helped simplify Fruugo's merchant application using Hotjar and GA4, cross-team collaboration and connected data flows, with early survey and completion-time evidence.",
  cover: {
    cardBackground,
    ...projectCover("fruugo-merchant-onboarding"),
    alt: "Perspective presentation of Fruugo's merchant onboarding interface, showing document requirements, upload controls and completion progress.",
    caption:
      "Merchant onboarding interface presented as a perspective cover illustration.",
    width: 960,
    height: 400,
  },
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        "Merchants faced a lengthy application that asked for information before it was needed. Many questions belonged to the later integration stage, adding effort to the initial application without helping most merchants progress.",
        "Simplifying the form also meant understanding the needs of the teams reviewing and supporting applicants. The challenge was to ask for less upfront while retaining the information needed for review, verification and integration.",
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "I worked with Product, Sales, Account Management, Technical Integration and Engineering to simplify the application. I used completion-time evidence to help agree which information was needed to assess a merchant and which could wait until integration.",
        "I led the form design changes and used Hotjar recordings and GA4 journey data to refine the implementation. The work also involved coordinating with process automation engineers so teams could access information already provided.",
      ],
    },
    {
      id: "research",
      title: "Research and findings",
      paragraphs: [
        "Hotjar recordings and GA4 drop-off points helped us investigate how merchants completed the application. Recordings showed reliance on browser translation plugins and uncertainty around required financial and tax information. The plugins did not always translate the experience reliably.",
        "A specific problem was the gap between familiar formatting and technical validation. Merchants added spaces or dashes to identifiers such as IBAN, BIC and sales tax/VAT numbers, but the application rejected inputs that did not match its formatting rules. To the merchant, the information could look correct without being accepted by the system.",
        "The original application spread questions across three input columns and mixed integration requirements with product declarations. These findings informed clearer grouping, fewer low-value questions and more explicit formatting guidance.",
      ],
    },
    {
      id: "decisions",
      title: "Design approach and decisions",
      paragraphs: [
        "The redesign separated reducing the amount we asked from improving how we asked it. Some requirements moved to integration, some questions were removed, and others became more specific so the information would be useful to the teams receiving it.",
      ],
      blocks: [
        {
          id: "information-at-the-right-stage",
          title: "Agree what belongs in the application",
          paragraphs: [
            "The hardest decision was agreeing which questions to remove or move. Sales wanted enough information to assess prospective merchants, while Technical Integration wanted the details needed to connect their systems. Both teams had valid needs, but collecting everything upfront made the application longer before a merchant had been assessed.",
            "I brought completion-time evidence into those discussions to show the effort we were asking of merchants. This helped us agree that the application should capture enough information to assess their suitability, with further technical details collected during direct contact with the integration team. Those conversations would still be needed even if the merchant had answered the questions earlier.",
            "Moving questions also meant making sure teams could access information already provided. I worked with the engineering team responsible for process automation on a shared data flow between the CRM and internal tools. The approach kept merchant information in sync across systems, with teams requesting additional details when they were needed.",
          ],
        },
        {
          id: "useful-questions",
          title: "Replace declarations with useful information",
          paragraphs: [
            "“Do you sell recognised brands?” offered a yes/no declaration that was difficult to verify and gave integration teams little detail. This was replaced with specific brand information to support prioritisation. The Figma design separates third-party brands, own brands and contextual guidance, rather than relying on a broad assertion.",
            "“Product images meet Fruugo image requirements” was removed entirely. A self-declared answer did not establish image quality, so retaining the question added work without dependable evidence.",
            "The original three-column page mixed several topics. The design groups related information and uses fewer input columns, with guidance alongside the relevant questions. This makes the intended reading order clearer without treating a lower question count as the only measure of improvement.",
          ],
          images: [
            onboardingImage(
              "before-products",
              "Before · original application",
              "Original integration and product page with three columns of inputs, including recognised-brand and image-compliance yes/no questions.",
              "The original page mixed integration preferences with product declarations. The recognised-brand and image-compliance questions provided limited evidence for later decisions.",
            ),
            onboardingImage(
              "after-brands",
              "After · Figma design",
              "Figma brand and category design with separate third-party and own-brand groups, brand names and contextual support guidance.",
              "Specific brand names and contextual guidance give integration teams more useful information than a broad yes/no declaration.",
            ),
          ],
        },
        {
          id: "format-support",
          title: "Make financial details easier to enter",
          paragraphs: [
            "Merchants entered banking and tax identifiers using familiar spaces and dashes, but the form rejected them without explaining why.",
            "I introduced input masking, clearer inline guidance and expanded IBAN and SWIFT/BIC labels. These changes explain the required format at the point of entry and help merchants correct errors.",
          ],
          images: [
            onboardingImage(
              "before-payment",
              "Before · original application",
              "Original payment page with account-holder, BIC and IBAN fields arranged across three columns. Populated values are redacted.",
              "Short identifier labels offered limited guidance, while recordings showed merchants struggling with the required input formats.",
            ),
            onboardingImage(
              "after-bank-routing",
              "After · Figma design",
              "Revised banking details with expanded IBAN and SWIFT/BIC labels and guidance about the selected currency and banking region. Values are redacted.",
              "Clearer labels and contextual guidance explain which banking information is required.",
            ),
          ],
        },
        {
          id: "contextual-guidance",
          title: "Make document requirements clear and manageable",
          paragraphs: [
            "I brought the document checklist, upload controls and progress together, with clear descriptions of what merchants needed to provide.",
            "The interface explains that they can return later to gather missing documents. This makes the requirements easier to manage without forcing completion in one sitting.",
          ],
          images: [
            onboardingImage(
              "after-document-guidance",
              "Design detail · Figma",
              "Revised document-upload screen with a requirements checklist, document categories, completion progress and guidance on returning later. File identifiers are redacted.",
              "Document requirements sit alongside the upload controls, helping merchants understand what to provide and what remains to complete.",
            ),
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Validation and iteration",
      paragraphs: [
        "After launch, we reviewed recordings and journey data alongside the feedback collected at the end of the application. This helped us investigate both completion behaviour and how merchants felt about the effort involved.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery and outcomes",
      paragraphs: [
        "Working with the process automation engineers and the teams responsible for review, verification and integration, we connected application data with Salesforce, Monday.com and in-house tools. Keeping the information in sync gave teams a shared source of merchant data and reduced manual handling as applications progressed.",
        "The early post-launch Hotjar survey received 24 responses. Merchants gave positive average ratings for the effort required and how long completion felt.",
        "The fastest start-to-finish submission recorded in Hotjar was 8 minutes 7 seconds. The previous application had been reported as taking approximately 20 minutes; the newer figure represents the quickest observed completion, rather than an average.",
      ],
      evidence: [
        {
          value: "4.5 / 5",
          label: "Perceived completion effort",
          detail:
            "Average effort rating from the early post-launch Hotjar survey, with 24 total responses.",
        },
        {
          value: "4.3 / 5",
          label: "Perceived time to complete",
          detail:
            "Average rating for how long completion felt, from the same survey.",
        },
        {
          value: "8m 7s",
          label: "Fastest observed submission",
          detail:
            "Quickest start-to-finish application in the early Hotjar review, rather than the average completion time.",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning and next steps",
      paragraphs: [
        "This project reinforced that simplifying onboarding depends on agreeing when information is needed, as well as improving the form itself. Showing the effort involved helped me build agreement across teams, while the shared data flow supported their work after the application.",
        "The next step is to build on the early feedback by examining completion rates, typical completion times and where merchants still leave the journey. Reviewing these alongside verification quality and application-review effort would help identify further improvements for merchants and internal teams.",
      ],
    },
  ],
};
