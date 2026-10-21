export interface PortfolioSection {
  id: string;
  number: string;
  navLabel: string;
  title: string;
  paragraphs: readonly string[];
  /** Curated phrases to emphasise, keeping content as safely escaped plain text. */
  emphasis?: readonly string[];
  /** Optional internal links rendered beneath the section copy. */
  links?: readonly { label: string; to: string }[];
}
