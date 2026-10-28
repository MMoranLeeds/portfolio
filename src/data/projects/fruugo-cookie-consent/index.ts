import type { Project, ProjectContentBlock } from "@/types/project";
import cardBackground from "@/assets/images/dist/cards/big-sur-bg-960.webp";
import mobileFallback from "@/assets/images/mobile-placeholders/fruugo-cookie-consent.svg";
import { consentImage, type ConsentImageName } from "./images";

function evidenceImages(
  names: ConsentImageName[],
  title: string,
  description: string,
): Pick<ProjectContentBlock, "images" | "placeholder"> {
  const descriptions: Record<string, [string, string, string]> = {
    "desktop-before": [
      "Before · Desktop consent",
      "Legacy Fruugo desktop cookie consent modal with competing action styles.",
      "The original desktop consent modal, with three filled action buttons and the earlier privacy wording.",
    ],
    "desktop-after": [
      "After · Desktop production",
      "Updated Fruugo desktop cookie consent modal with one filled primary action and visible outlined optional-cookie rejection.",
      "The redesigned desktop consent panel, with clearer wording, outlined alternatives and a blue Accept all cookies action.",
    ],
    "mobile-before": [
      "Before · Mobile consent",
      "Legacy Fruugo mobile consent modal with Accept all, Manage and Decline all buttons.",
      "The original mobile consent modal, with stacked Accept all, Manage and Decline all actions.",
    ],
    "mobile-after": [
      "After · Mobile production",
      "Updated Fruugo mobile consent modal explaining necessary and optional cookies, with visible accept, customise and reject actions.",
      "The current production mobile panel keeps all consent actions visible, including one-click rejection of optional cookies.",
    ],
  };
  const images = names.flatMap((name) => {
    const details = descriptions[name]!;
    const image = consentImage(name, ...details);
    return image ? [image] : [];
  });
  return {
    images: images.length ? images : undefined,
    placeholder:
      images.length < names.length ? { title, description } : undefined,
  };
}

export const cookieConsentProject: Project = {
  slug: "fruugo-cookie-consent",
  title: "Cookie consent at Fruugo",
  category: "Fruugo · Optimising cookie consent",
  summary:
    "A/B testing a redesigned modal for a high-traffic consent touchpoint - securing a 10-percentage-point lift in acceptance that sustained through worldwide rollout.",
  role: "UX discovery, interaction design, UI copy, design rationale and Legal liaison",
  status: "Live worldwide since 7 April 2026",
  tags: ["A/B testing", "Behavioural analysis", "Cross-team influence"],
  seoDescription:
    "How Matthew Moran led Fruugo's cookie consent redesign, using behavioural data, Legal collaboration and country-based A/B testing before worldwide rollout.",
  overview: {
    outcome:
      "The first comparison recorded 66.3% acceptance with the old modal and 76.3% with the redesign. The improvement held as more markets joined, with both production environments reaching 76–79% after global rollout.",
    period: "November 2025 to April 2026",
    launchDate: "2026-04-07",
    launchLabel: "7 April 2026 · Worldwide rollout",
  },
  cover: {
    cardBackground,
    ...consentImage(
      "overview",
      "",
      "Current Fruugo desktop cookie consent panel with Reject optional cookies, Customise preferences and Accept all cookies visible.",
      "The redesigned desktop consent panel, with accept, customise and reject actions.",
    )!,
    previewAspectRatio: "12 / 5",
  },
  mobile: {
    fallbackSrc: mobileFallback,
    label: "Mobile consent modal",
    alt: "Updated Fruugo cookie consent modal on mobile.",
    caption:
      "The mobile consent experience, with visible accept, customise and reject actions.",
  },
  socialPreview: {
    path: "/images/social/fruugo-cookie-consent.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Cookie consent at Fruugo, a case study by Matthew Moran. A 10-percentage-point initial acceptance difference followed by worldwide rollout.",
  },
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        "Fruugo's consent modal was a frequent first interaction with the marketplace, but its presentation felt disconnected from the shopping experience. Dense, company-first copy sat above three equally prominent filled buttons. The orange Decline all action competed with Accept all, while its wording implied that even necessary cookies could be disabled.",
        "The business wanted more shoppers to opt into optional cookies, supporting measurement, advertising and experimentation. I approached this as a design problem with a clear constraint: improve the explanation and hierarchy while keeping rejection visible and straightforward. Acceptance alone would not establish the commercial outcome, so downstream effects also needed Data Science review.",
      ],
    },
    {
      id: "contribution",
      title: "My role and collaboration",
      paragraphs: [
        "I led the UX work, owning discovery, the desktop and mobile designs, UI copy and the rationale behind the changes. I worked directly with Legal on transparency and dark-pattern concerns, and supported the Shop product team through implementation, QA and the review of results.",
        "Frontend engineers built the modal and QA tested it. Product coordinated delivery and the experiment with Data Science, who selected the initial countries and assessed the wider advertising and transaction effects. My responsibility was to connect the shopper experience with those business and delivery requirements.",
      ],
    },
    {
      id: "research",
      title: "What the behavioural evidence showed",
      paragraphs: [
        "The pre-release dashboard recorded around 64,500 consent submissions over seven days. Only four selected an analytics-only or advertising-only combination. Almost every recorded decision was therefore accept or reject in that snapshot. This supported prioritising a clear first decision, while retaining access to more detailed preferences.",
        "That all-traffic snapshot recorded 69.7% acceptance. The later experiment control recorded 66.3%, covering a different period and country mix. I kept those figures separate rather than combining the most favourable baseline and result. Reviews across Fruugo products also exposed inconsistent policy access, terminology and keyboard interaction that needed coordination beyond the visual redesign.",
      ],
    },
    {
      id: "decisions",
      title: "Design decisions and trade-offs",
      paragraphs: [
        "The redesign needed to be easier to understand, recognisably part of Fruugo and commercially purposeful. I treated the prominence of the accept action as an explicit design choice to review and test, rather than assuming a cleaner interface would automatically improve outcomes.",
      ],
      blocks: [
        {
          id: "hierarchy",
          title: "Give the main decision a clearer hierarchy",
          paragraphs: [
            "I replaced the three competing filled buttons with one filled Fruugo-blue Accept all cookies action and outlined alternatives. On desktop, the primary action aligned with the controls on the right. Reject optional cookies remained visible alongside the other actions, with the same button height and a one-click choice, rather than being hidden behind a preferences screen.",
            "This intentionally gave acceptance more visual emphasis. I brought that choice into Legal's review alongside the wording and available alternatives, making the balance between persuasion and user choice part of the design discussion.",
          ],
          ...evidenceImages(
            ["desktop-before", "desktop-after"],
            "Desktop comparison · Images to add",
            "The original and redesigned desktop consent modals, showing the wording and available actions.",
          ),
        },
        {
          id: "wording",
          title: "Explain the choice accurately",
          paragraphs: [
            "I changed Decline all to Reject optional cookies and separated necessary cookies from optional uses in the copy. The revised content introduced the shopping context, explained how long the preference would be saved and retained access to the Cookie Policy. Customise preferences remained available for people wanting more control.",
            "I worked through Legal's review of button display and language, updating the designs in response. More detailed cookie information was scoped separately, so this release did not depend on presenting the entire cookie inventory in the first interaction.",
          ],
          ...evidenceImages(
            ["mobile-before", "mobile-after"],
            "Mobile comparison · Images to add",
            "The original and redesigned mobile consent modals, showing the wording and available actions.",
          ),
        },
        {
          id: "localisation",
          title: "Account for language before and after build",
          paragraphs: [
            "I explored the designs across four languages in Figma to check text expansion, and the release included language selection within the modal. During test expansion, missing strings appeared in several locales and required an engineering hotfix. This reinforced the distinction between checking a translated layout in design and verifying the actual translation files in production.",
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Testing in production",
      paragraphs: [
        "The country-based A/B test began on 17 March 2026. New Zealand, Ireland and Finland received the redesign through Production B, while Production A retained the old modal in other markets. Grafana reporting split consent submissions by environment. The primary measure was the share selecting Accept all, with Data Science monitoring advertising and transaction effects.",
        "This was an environment split by country, rather than user-level randomisation. Country differences, concurrent tracking changes and a service disruption limited causal interpretation. The results supported a practical rollout decision; they did not establish a significance level or isolate the contribution of each individual design change.",
      ],
      steps: [
        {
          title: "18 March · Initial comparison",
          description:
            "Accept all was 66.3% in the control and 76.3% in the new-modal group, a difference of 10 percentage points.",
        },
        {
          title: "24–25 March · Expansion",
          description:
            "Switzerland, Sweden and Austria joined the new-modal environment. Acceptance reached about 78%, compared with about 66% in the remaining control markets.",
        },
        {
          title: "7–13 April · Worldwide rollout",
          description:
            "The new modal reached all markets on 7 April. By 13 April, both environments recorded 76–79% acceptance, supporting the earlier improvement beyond the initial test countries.",
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery and outcomes",
      paragraphs: [
        "The redesigned modal recorded a 10-percentage-point higher acceptance rate in the initial comparison, rising from 66.3% to 76.3%. Following worldwide rollout on 7 April 2026, acceptance reached 76–79% across both production environments by 13 April, supporting a sustained improvement beyond the original test markets. These rates measure the share of recorded consent submissions selecting Accept all.",
        "Data Science's final assessment was positive for advertising clicks, impressions and gross transaction value, without assigning a dependable percentage to the GTV change. I kept that distinction between the observed consent result and the more complex commercial effect. The modal's button treatment also informed the wider Marketplace button styles, which another designer developed into the shared pattern.",
      ],
      evidence: [
        {
          value: "+10pp",
          label: "Initial acceptance difference",
          detail:
            "66.3% control versus 76.3% new modal on 18 March 2026. Country-based groups, measured as a share of consent submissions.",
        },
        {
          value: "76–79%",
          label: "Acceptance after rollout",
          detail:
            "Share of recorded consent submissions selecting Accept all in both production environments on 13 April 2026, after worldwide rollout.",
        },
        {
          value: "Worldwide",
          label: "Production rollout",
          detail:
            "Released across Fruugo's marketplace on 7 April 2026 following the staged experiment.",
        },
      ],
    },
    {
      id: "learning",
      title: "What I took forward",
      paragraphs: [
        "This work showed how a small, repeated interaction can connect UX quality with a wider business objective. Behavioural data helped focus the first decision, Legal collaboration shaped the alternatives and language, and production testing provided a stronger basis for rollout than visual preference alone.",
        "I would separate the effects of wording and hierarchy in a follow-up experiment, alongside research into whether shoppers understand each choice. Further work on detailed cookie information also needs its own scope and validation. A higher acceptance rate is useful evidence, but it does not by itself demonstrate understanding or settle every privacy question.",
      ],
    },
  ],
};
