import cardBackground from "@/assets/images/dist/cards/big-sur-colour-night-bg-960.webp";
import type { Project } from "@/types/project";
import { designSystemImage } from "./images";

export const designSystemProject: Project = {
  slug: "design-system-integration",
  title: "Connecting Fruugo’s design system and code",
  category: "Fruugo · Design systems and AI",
  summary:
    "Building on design-system work since 2013, I connected Fruugo’s component library with Figma through Claude and MCP to support reviewed updates between design and code.",
  role: "Shared Figma library ownership, design-system integration, component alignment and implementation review",
  status: "Active internal workflow",
  tags: [
    "Design systems",
    "Cross-team delivery",
    "AI-assisted workflows",
  ],
  seoDescription:
    "Building on design-system experience since 2013, Matthew Moran connected Fruugo’s component library with Figma through Claude and MCP, retaining existing code review and library publishing processes.",
  card: {
    presentation: "artwork",
    summary:
      "Extending Fruugo’s shared design system with reviewed, AI-assisted updates between Figma and code.",
    outcome:
      "Connected Figma and code for Design and Frontend, with a reviewed calendar fix increasing text contrast from 3.49:1 to 11.80:1.",
    alt: "Figma and code connected through Claude and MCP, with updates supported in both directions.",
  },
  overview: {
    rationaleLabel: "Problem",
    evaluationLabel: "My approach",
    rationale:
      "Keep the design library aligned with maintained components as AI-assisted workflows become part of design and frontend delivery.",
    evaluation:
      "Connected Fruugo’s existing component library with Figma through Claude and MCP, then demonstrated a reviewed update in each direction.",
    outcome:
      "The connected library is available to Fruugo’s Design and Frontend teams. Completed FAB and calendar updates demonstrate both directions, with calendar text contrast improved from 3.49:1 to 11.80:1.",
    period: "2026",
  },
  cover: {
    cardBackground,
    ...designSystemImage(
      "overview",
      "Connected component library",
      "Chip variants in the Figma library beside their corresponding solid and outline examples in Storybook.",
      "Fruugo’s maintained component library provides the foundation for the connected Figma design system.",
      "12 / 5",
    ),
  },
  socialPreview: {
    path: "/images/social/design-system-integration.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Connecting Fruugo’s design system and code, an active bidirectional workflow through Claude and MCP.",
  },
  sourcesIntro:
    "The contrast calculations below use the calendar’s specified colours. WCAG references explain the normal-text thresholds.",
  sources: [
    {
      id: "calendar-contrast-before",
      publisher: "WebAIM",
      title: "Original calendar colour pairing",
      url: "https://webaim.org/resources/contrastchecker/?fcolor=D4E3F1&bcolor=007CBB",
      date: "17 November 2026",
      note: "Secondary blue and pale blue: calculated contrast 3.49:1.",
    },
    {
      id: "calendar-contrast-after",
      publisher: "WebAIM",
      title: "Updated calendar colour pairing",
      url: "https://webaim.org/resources/contrastchecker/?fcolor=D4E3F1&bcolor=212529",
      date: "17 November 2026",
      note: "Fruugo black and pale blue: calculated contrast 11.80:1.",
    },
    {
      id: "text-contrast-criteria",
      publisher: "W3C",
      title: "WCAG 2.2 text-contrast criteria",
      url: "https://www.w3.org/TR/WCAG22/#contrast-minimum",
      date: "WCAG 2.2",
      note: "Normal-text minimums: 4.5:1 at AA (1.4.3), 7:1 at AAA (1.4.6).",
    },
  ],
  sections: [
    {
      id: "problem",
      title: "The problem and goal",
      paragraphs: [
        "Design systems have been part of my design and frontend work since 2013. This case study focuses on the next step: using AI-assisted workflows to keep Fruugo’s established design system connected to its maintained component library.",
        "When design and implementation drift apart, teams have to interpret which values, variants and behaviours to follow. I connected Fruugo’s existing React library with Figma through Claude and Model Context Protocol (MCP), so agreed changes can move in either direction with their component context intact.",
      ],
    },
    {
      id: "contribution",
      title: "My role and approach",
      paragraphs: [
        "At networx, I used Sass variables, mixins and interpolation to make frontend patterns consistent and maintainable. At Incommunities, I defined the company-wide design system and visual language across internal applications, replacing inconsistent themes with interfaces that worked on desktop, tablet and mobile.",
        "At Fruugo, I created and maintain the shared Figma library, working with frontend developers to align components, interaction patterns and documentation with the existing React library in Storybook. The 2026 integration extends that responsibility. I created the connected Figma file, aligned its components and shared values, and established the workflow between tools.",
        "The integration is available to Fruugo’s Design and Frontend teams. I enabled frontend colleagues to explore rapid prototyping by making the Claude and MCP workflow available alongside their Figma access. Wider use of the update workflow is still developing.",
        "The implementation uses React, but the approach is framework agnostic: understand the existing component APIs, shared values and supported states before asking an agent to make changes.",
      ],
    },
    {
      id: "system",
      title: "Make the maintained library usable in Figma",
      paragraphs: [
        "The Figma file brings foundations, icons, actions, form fields, selection controls, navigation, overlays and tables into a structure designers can use. Components and tokens come from Fruugo’s maintained component and shared styles packages.",
        "For example, the Chip library exposes solid and outline variants, colours and sizes alongside their Storybook equivalents. Its primary fill is bound to the same shared colour used in source, making that decision traceable between design and code.",
        "Fruugo’s marketplace across 40+ countries needs components that accommodate translated content, including longer labels. I previously used Figma string variables to explore designs with translated text. I now use Figma’s AI translation capability for design exploration, reducing the need to maintain separate language variants at that stage. The aim remains to examine content in the interface; production translation management remains separate.",
      ],
      blocks: [
        {
          id: "component-mapping",
          title: "Connect variants, states and shared values",
          paragraphs: [],
          images: [
            designSystemImage(
              "components",
              "Component alignment",
              "The Chip’s Solid, Primary, Regular properties in Figma, its primary colour variable and the corresponding shared colour and SCSS source excerpts.",
              "The Chip’s primary fill uses the same shared colour in Figma and the component source.",
              "8 / 5",
            ),
          ],
        },
      ],
    },
    {
      id: "maintenance",
      title: "Support updates in both directions",
      paragraphs: [
        "The two examples below show changes starting in opposite tools. I checked the affected states and used the existing shared values, keeping each update scoped to the intended component change.",
      ],
      blocks: [
        {
          id: "code-to-figma",
          title: "Carry a FAB colour change into Figma",
          paragraphs: [
            "I changed the primary floating action button’s default background in source from brand blue to the shared secondary blue and checked it in Storybook. I then asked Claude to compare it with Figma and propose updates before applying them.",
            "The comparison identified the primary default fill as the mismatch. I approved the update and confirmed that the matching hover colour was intentional, with a stronger shadow providing feedback. Claude bound the Figma default variant to the existing secondary-blue variable and aligned its description and source documentation. The secondary variants were retained.",
          ],
          images: [
            designSystemImage(
              "code-update",
              "1 · Code to Figma · Source change",
              "Before and after SCSS diff changing the primary FloatingActionButton default background from fruugo-blue to fruugo-blue-secondary, with white icon colour retained.",
              "The component source changes the primary FAB’s default background to the shared secondary-blue colour.",
              "780 / 452",
            ),
            {
              ...designSystemImage(
                "fab-storybook",
                "2 · Rendered change in Storybook",
                "The question-mark floating action button before in brand blue and after in the darker secondary blue.",
                "Storybook shows the primary FAB before and after the source change.",
                "560 / 255",
              ),
              previewMaxWidth: "35rem",
            },
            designSystemImage(
              "fab-review",
              "3 · Compare before applying",
              "Matt’s instruction to propose updates, Claude’s code-to-Figma comparison and a table identifying the primary default fill as the mismatched variant.",
              "Claude compared the implementation with Figma and proposed the affected update before making changes.",
              "1150 / 1131",
            ),
            designSystemImage(
              "fab-applied",
              "4 · Human approval and MCP update",
              "Matt’s approval retaining the intended hover behaviour, followed by the MCP action and confirmation of the Figma variable binding and description update.",
              "I approved the update and confirmed the intended hover behaviour before the Figma change was applied.",
              "1150 / 617",
            ),
            designSystemImage(
              "fab-figma",
              "5 · Matching component states in Figma",
              "Figma FloatingActionButton set with two secondary-blue primary variants and white and off-white secondary variants.",
              "The Figma component set reflects the updated default colour while retaining its other states.",
              "691 / 291",
            ),
          ],
        },
        {
          id: "figma-to-code",
          title: "Carry a calendar contrast change into code",
          paragraphs: [
            "I changed the calendar’s In range text in Figma from secondary blue (#007CBB) to Fruugo black (#212529), retaining the pale-blue background (#D4E3F1). For these colours, contrast increases from 3.49:1 to 11.80:1. The original pairing falls below the normal-text AA minimum of 4.5:1 and AAA minimum of 7:1; the new pairing exceeds both text-contrast thresholds.",
            "I asked Claude to inspect the Figma state through MCP and update the component library. The diff changes the in-range and in-selecting-range text in the shared date-picker stylesheet, so the fix sits in the reusable component rather than a screen-specific override. I checked the DateRangePicker in Storybook, including the distinct range endpoints. This verifies the colour change, not complete accessibility compliance or deployment to every consuming product.",
          ],
          images: [
            designSystemImage(
              "token-change",
              "1 · Figma to code · Design decision",
              "Figma calendar-day variants with In range selected, showing text/default and surface/selected-subtle in the colour properties.",
              "The revised in-range colour pairing increases normal-text contrast from 3.49:1 to 11.80:1.",
              "900 / 592",
            ),
            designSystemImage(
              "claude-review",
              "2 · Prompt and MCP inspection",
              "Matt’s instruction to apply the calendar contrast update, Claude’s Figma inspection and the resulting shared stylesheet edit.",
              "I directed Claude to inspect the updated Figma state through MCP and apply it to the component library.",
              "1150 / 621",
            ),
            designSystemImage(
              "calendar-source-diff",
              "3 · Change in the component source",
              "Before and after repository diff changing in-range and in-selecting-range text from fruugo-blue-secondary to fruugo-black, with pastel-blue retained as the background.",
              "The shared stylesheet changes the text colour for both range states while retaining the background.",
              "780 / 348",
            ),
            designSystemImage(
              "calendar-storybook",
              "4 · Rendered result in Storybook",
              "DateRangePicker in Storybook with 11 to 21 November 2026 selected, dark intermediate-day text on pale blue and distinct blue range endpoints.",
              "The rendered date-range picker shows the design decision applied to the working component.",
              "703 / 487",
            ),
          ],
        },
      ],
    },
    {
      id: "judgement",
      title: "Govern changes through existing review processes",
      paragraphs: [
        "Figma-to-code changes follow Fruugo’s existing commit and code-review process before reaching production. Design intent still needs human review, and engineers retain responsibility for reviewing the implementation. The MCP connection does not bypass those steps.",
        "For code-to-Figma updates, I review the proposed component changes before applying them. Publishing the updated Figma library includes a message explaining the reason for the change, giving colleagues context when reviewing the library update. The FAB example shows the comparison, my approval and the resulting change.",
        "The Chip audit showed why that judgement matters. It exposed hard-coded component values without matching tokens. I reverted the entire token-binding experiment because Figma-only changes would have created a different system. No changes from that experiment were retained. The useful result was a clear list of gaps in token coverage that need a joint design and engineering decision.",
      ],
    },
    {
      id: "outcomes",
      title: "Delivery and outcomes",
      paragraphs: [
        "Fruugo’s Design and Frontend teams now have access to the connected library, with reviewed updates demonstrated in both directions. The FAB example carries an implementation decision into Figma; the calendar example carries a design decision into a shared stylesheet and improves normal-text contrast from 3.49:1 to 11.80:1.",
        "This extends my ongoing design-system ownership into an AI-assisted workflow while retaining established review processes. The result is a working connection that makes component decisions traceable across design and implementation.",
      ],
    },
    {
      id: "next-steps",
      title: "Next steps",
      paragraphs: [],
      points: [
        {
          title: "Resolve token gaps together",
          description:
            "Review the Chip audit with Frontend and agree which values need shared tokens, which should use the existing scale and which should remain component-specific.",
        },
        {
          title: "Clarify the contribution route",
          description:
            "Make the route for Figma-originated changes explicit, including design review, engineering review and the link between a code change and its Figma library update.",
        },
        {
          title: "Understand adoption",
          description:
            "Record completed updates in each direction and gather team feedback to understand where the workflow helps and where guidance needs improving.",
        },
      ],
    },
  ],
};
