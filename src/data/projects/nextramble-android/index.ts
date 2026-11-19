import type { Project } from "@/types/project";
import { androidImage } from "./images";

export const nextRambleAndroidProject: Project = {
  slug: "nextramble-android",
  title: "NextRamble for Android",
  category: "Personal · Native Android design",
  summary:
    "Adapting my live group-walking service into a native Android experience, using Material 3, platform interactions and a working build on my own phone.",
  role: "Independent UX/UI design, Figma theming and AI-assisted native prototyping",
  status: "Working Android test build · Not publicly released",
  tags: ["Material 3", "Native Android design", "Platform accessibility"],
  seoDescription:
    "Matthew Moran’s native Android design exploration for NextRamble, connecting a branded Material 3 Figma library with a working Jetpack Compose build and device-specific interactions.",
  card: {
    presentation: "native",
    summary:
      "Taking a live walking service into native Android, with branded Material 3 components and platform interactions.",
    outcome:
      "Translated NextRamble’s web experience into a native Android app, adapting navigation, interactions and branded Material 3 components, with the design realised in a working device-tested build.",
    alt: "NextRamble for Android, showing the actual app in light and dark themes inside phone frames.",
  },
  overview: {
    rationaleLabel: "Problem",
    evaluationLabel: "My approach",
    rationale:
      "The web service already supports group planning. I explored how a native companion could make finding the next walk and preparing to leave feel familiar on Android.",
    evaluation:
      "Adapted the journeys in Figma using Material 3, connected the theme to a Kotlin and Jetpack Compose build, and reviewed the running app on my Samsung Galaxy S23 FE.",
    outcome:
      "A working native test build connected to the existing service, with light and dark themes, haptic feedback confirmation and hand-offs to Android apps.",
    period: "Personal exploration · November 2026 · Ongoing",
  },
  cover: androidImage(
    "overview",
    "Working Android build · Light and dark themes",
    "NextRamble’s Android Home screen in light and dark themes, with the next confirmed walk, meeting-point action and bottom navigation.",
    "Screens from the working Android build. The existing web service remains a separate case study; this exploration focuses on native interaction design.",
  ),
  socialPreview: {
    path: "/images/social/nextramble-android.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "NextRamble for Android, a working native design exploration with light and dark app screens.",
  },
  sections: [
    {
      id: "problem",
      title: "The problem: adapt the task, not just the screen size",
      paragraphs: [
        "I had already designed and launched NextRamble as a web service for discovering walking groups, comparing proposals and confirming an outing. The Android exploration asked a different question: how should that service behave as a native companion when someone wants to check their next walk, respond and get ready to leave?",
        "I kept the same group-planning model, while adapting navigation, controls and feedback to the platform. A responsive web page could already fit a phone; the purpose here was to explore what native interaction could add.",
      ],
    },
    {
      id: "role-and-scope",
      title: "My role and the working scope",
      paragraphs: [
        "I owned the interaction design, visual direction and Figma theming, then used AI-assisted implementation to develop and iterate on a Kotlin and Jetpack Compose app in Android Studio. Running a local build on my Samsung Galaxy S23 FE let me move beyond a linked-screen prototype and inspect real scrolling, system controls and device feedback.",
        "The build connects to the web service’s Firebase authentication and shared planning data. It includes discovery, walk details, attendance, group membership, planning and profile preferences. Signed-out sample content supports exploration. Some tasks, including group settings and walking-area guides, deliberately open the web service rather than duplicating everything natively. Push notifications and public app-store distribution remain outside the initial delivered scope.",
      ],
    },
    {
      id: "material-design",
      title: "Keep familiar patterns, bring the NextRamble identity",
      paragraphs: [
        "I started with Google’s Material 3 Design Kit in Figma and used Material Theme Builder to apply the already defined NextRamble identity. Colour roles, typography and component states provided a shared structure for the design file and Compose theme, including separate light and dark schemes.",
        "I retained familiar patterns such as bottom navigation, filter chips, sheets and date and time pickers, rather than drawing a bespoke version of every control. Jakob’s Law informed that choice: established patterns can help people transfer expectations. Material 3 gave me a familiar starting point while leaving room for NextRamble’s identity. I still need to validate whether those patterns help people complete this particular journey.",
      ],
      sourceIds: ["material3", "jakobs-law"],
      blocks: [
        {
          id: "themes",
          title: "One theme structure, two appearances",
          paragraphs: [
            "The app uses semantic colour roles in shared components, with an appearance preference for system, light or dark. The green brand identity carries across both themes without treating dark mode as a simple colour inversion.",
          ],
          imageLayout: "grid",
          images: [
            androidImage(
              "light-01-home",
              "Android Home · Light theme",
              "Light-themed NextRamble Home screen with a countryside header, the next walk, Copy meeting point and four navigation destinations.",
              "The confirmed walk and meeting-point action are available from Home.",
            ),
            androidImage(
              "dark-01-home",
              "Android Home · Dark theme",
              "The same NextRamble Home screen in its dark theme, retaining the content hierarchy and navigation.",
              "The dark scheme preserves the same task structure and branded colour roles.",
            ),
          ],
        },
      ],
    },
    {
      id: "discovery",
      title: "Make discovery recoverable",
      paragraphs: [
        "Home, Explore, My walks and Profile organise the core destinations. Search supports towns, postcodes and group names, with distance, pace and usual-day filters in a bottom sheet. This gives people a way to narrow the list without losing the search context.",
        "An empty result is part of the journey. The public-walks state explains that groups choose whether to share walks publicly, then offers a wider search. Location is optional and requested when the person chooses the location control; typing a place remains an alternative.",
      ],
      blocks: [
        {
          id: "search-states",
          title: "Results, refinement and a route out of an empty state",
          paragraphs: [],
          imageLayout: "grid",
          images: [
            androidImage(
              "light-09-search-results",
              "Search · Group results",
              "NextRamble search results with Groups and Walks tabs, distance and pace chips, and a nearby group card.",
              "Keep the selected place and active filters visible alongside results.",
            ),
            androidImage(
              "light-10-search-filters",
              "Search · Filters sheet",
              "Material 3 bottom sheet with distance, walking pace and usual-day filters, Clear all and Show 1 group actions.",
              "Use familiar chips and a bottom sheet to refine discovery.",
            ),
            androidImage(
              "light-11-search-walks-tab",
              "Search · No public walks",
              "An empty public-walks result explains why no walks appear nearby and offers Search within 25 miles.",
              "Explain the result and offer a concrete recovery action.",
            ),
          ],
        },
      ],
    },
    {
      id: "native-interactions",
      title: "Use the platform where it helps the task",
      paragraphs: [
        "The walk detail screen brings the meeting point, attendance response and route expectations together. Copying a meeting point provides brief haptic feedback alongside visible confirmation, using Android’s system clipboard notification on Android 13 and above, or an in-app message on earlier versions. Haptics respect the user’s device settings and supplement the visual feedback.",
        "Open in maps hands the place to an installed maps app. Add to calendar opens a pre-filled calendar event for the person to review and save, without asking NextRamble to read their calendar. The interface explains that this is a one-off copy and later plan changes are not synchronised. Invitations similarly use Android’s share sheet. These are task-specific native behaviours, rather than a recreation of the web controls.",
      ],
      sourceIds: ["haptics"],
      blocks: [
        {
          id: "platform-actions",
          title: "Prepare for the walk and share with others",
          paragraphs: [],
          imageLayout: "grid",
          images: [
            androidImage(
              "light-04-walk-details",
              "Walk details · Actions and attendance",
              "Walk details show the meeting point, Copy meeting point, Open in maps, Going, Maybe and Not going choices, and Add to calendar.",
              "The screenshot shows the controls; haptic feedback is implemented in the working build.",
            ),
            androidImage(
              "light-21-invite",
              "Group administration · Share invitation",
              "Invite walkers screen explains that recipients request a place and an admin decides, with a Share link button.",
              "Sharing an invitation retains the group’s membership approval boundary.",
            ),
          ],
        },
        {
          id: "planning-controls",
          title: "Use Material controls for dates and times",
          paragraphs: [
            "Starting a vote needs both a closing date and a closing time. I used the standard Material date and time controls, keeping those choices consistent with the rest of the Android experience.",
            "I themed the Material 3 date and time pickers with NextRamble’s colour palette and typography, bringing standard components into the brand’s visual language while retaining their established interaction patterns.",
          ],
          imageLayout: "grid",
          images: [
            androidImage(
              "light-18-date-picker",
              "Planning · Date picker",
              "Material date-picker dialog above NextRamble’s Start a walk vote screen, with Cancel and OK actions.",
              "The date picker follows the app’s Material 3 theme.",
            ),
            androidImage(
              "light-19-time-picker",
              "Planning · Time picker",
              "Material clock-style time picker for the vote’s closing time, with Cancel and OK actions.",
              "The time control keeps platform behaviour instead of introducing a custom dial.",
            ),
          ],
        },
      ],
    },
    {
      id: "accessibility",
      title: "Carry accessibility intent into native semantics",
      paragraphs: [
        "My web experience was useful, but the implementation model changed. HTML headings provide a ranked document structure and screen-reader navigation. Compose instead exposes an accessibility semantics tree. I used heading markers, meaningful action labels and grouped content, rather than assuming that visual typography alone would communicate structure to TalkBack.",
        "For example, a walk row is designed as one actionable TalkBack stop, with its status, date, title, meeting context and group read together. Decorative children are excluded to avoid repeated announcements. The resulting grouping and reading order still need systematic TalkBack testing on the device.",
        "The project also includes previews for 200% font scaling, dark appearance and landscape. These make review easier, but do not replace checking clipping, focus, announcements and touch interaction on real devices. I would validate the core journey with TalkBack users and retain visible feedback when haptics are disabled.",
      ],
      sourceIds: ["compose-semantics", "web-headings"],
    },
    {
      id: "outcome-and-next-steps",
      title: "What this demonstrates, and what comes next",
      paragraphs: [
        "I took an existing live service into a working native Android build, connecting Figma theming with real components and platform integrations. My local S23 FE testing established that I could install and use the build, and gave me a practical way to review its behaviour. It does not establish wider device compatibility, improved task completion or user adoption.",
        "The next step is to observe walkers finding their next outing, responding and opening the meeting point. I would record task completion, hesitation and recovery, then compare the experience with the mobile web service before deciding whether a public Android release is justified. This is Android design experience; I would evaluate iOS separately against its own platform conventions.",
      ],
      points: [
        {
          title: "Validate the core journey",
          description:
            "Observe real group members checking a confirmed walk, responding and preparing to leave, including people with different access needs.",
        },
        {
          title: "Check platform edge cases",
          description:
            "Review TalkBack, large text, landscape, location denial, offline and stale data, and unavailable map or calendar handlers across more devices.",
        },
        {
          title: "Decide the release scope",
          description:
            "Use the findings to prioritise improvements and evaluate public distribution, rather than treating a working prototype as evidence of demand.",
        },
      ],
    },
  ],
  sourcesIntro:
    "The screenshots are from my working Android build. Platform documentation informed implementation; it does not independently validate this app’s usability or accessibility.",
  sources: [
    {
      id: "material3",
      publisher: "Android Developers",
      title: "Material Design 3 in Compose",
      url: "https://developer.android.com/develop/ui/compose/designsystems/material3",
      date: "Platform reference",
      note: "Colour roles, typography, components and Material Theme Builder.",
    },
    {
      id: "jakobs-law",
      publisher: "Laws of UX",
      title: "Jakob’s Law",
      url: "https://lawsofux.com/jakobs-law/",
      date: "Design principle",
      note: "Informed the use of familiar patterns, rather than serving as evidence of this app’s usability.",
    },
    {
      id: "haptics",
      publisher: "Android Developers",
      title: "Add haptic feedback to events",
      url: "https://developer.android.com/develop/ui/views/haptics/haptic-feedback",
      date: "Platform reference",
      note: "Event-based haptics and platform preferences.",
    },
    {
      id: "compose-semantics",
      publisher: "Android Developers",
      title: "Semantics in Jetpack Compose",
      url: "https://developer.android.com/develop/ui/compose/accessibility/semantics",
      date: "Platform reference",
      note: "Accessibility semantics, headings, labels and grouping.",
    },
    {
      id: "web-headings",
      publisher: "W3C Web Accessibility Initiative",
      title: "Page structure: headings",
      url: "https://www.w3.org/WAI/tutorials/page-structure/headings/",
      date: "Accessibility reference",
      note: "The web comparison: meaningful headings support structure and navigation.",
    },
  ],
};
