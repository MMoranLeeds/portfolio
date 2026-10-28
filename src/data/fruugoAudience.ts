// Public platform context from Fruugo's corporate website, accessed 15 October 2026.
// Visits are not unique users; retailers are businesses, not portal user accounts.
export const fruugoAudience = {
  visitYear: 2025,
  visits: { headline: "300 million", card: "300m" },
  retailers: { headline: "4,500+", card: "4,500+" },
  countries: "40+",
  languages: "25+",
  source: {
    id: "fruugo-public-platform",
    publisher: "Fruugo Corporate",
    title: "About Fruugo · Public platform figures",
    url: "https://corporate.fruugo.com/",
    date: "Accessed 15 October 2026",
    note: "Reports 300 million website visits in 2025, 4,500+ retailers, 40+ countries and 25+ languages. Retailer, country and language figures are undated on the page. These describe platform scale rather than exposure to specific design changes.",
  },
} as const;
