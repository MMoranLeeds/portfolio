export interface ProjectVideoTranscript {
  captionsSrc?: string;
  transcriptSrc: string;
  transcript: string[];
}

// Generated from reviewed drafts by npm run transcript:publish.
// PUBLISHED_TRANSCRIPTS_JSON
// prettier-ignore
export const projectVideoTranscripts: Record<string, ProjectVideoTranscript> = {
  "huugo-promotion": {
    "captionsSrc": "/videos/captions/huugo-promotion.en.vtt",
    "transcriptSrc": "/videos/captions/huugo-promotion.en.txt",
    "transcript": [
      "Meet Huugo, your AI shopping assistant from Fruugo. For your next adventure or a little comfort at home. Through changing seasons and moments worth celebrating. Tell Huugo what you're looking for and let's find it together. Countless moments. One Huugo. Every country, every moment. Huugo from Fruugo."
    ]
  },
  "accessible-trades-workflow": {
    "captionsSrc": "/videos/captions/accessible-trades-workflow.en.vtt",
    "transcriptSrc": "/videos/captions/accessible-trades-workflow.en.txt",
    "transcript": [
      "Start by entering where the work is needed and choosing a suitable search distance. Describe the difficulty you want to address and Accessible Trades suggests relevant trade categories for you to review before searching. Compare nearby companies using details such as distance, supporting evidence and stated coverage. Switch to the map to understand where registered offices are located within the search area. Enhanced profiles bring useful company information together including services, recent work, supporting evidence, customer review summaries and practical project details. Contact options make it easier to continue your research directly with the company. The planning and support area also provides guidance for different stages of a home adaptation including an initial disabled facilities grant checker. Answer six simple questions to explore whether a disabled facilities grant route may be relevant. The checker does not ask for income, savings or medical details. The result explains whether the route may be worth exploring and highlights the next steps including a needs assessment, any applicable financial assessment and securing approval before work begins."
    ]
  }
};
