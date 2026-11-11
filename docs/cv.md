# Maintaining the CV

The public CV remains at `/cv`. The web page and PDF use the same Vue template and TypeScript content. There is no PDF service, image export or additional dependency.

## Content

- `src/data/cv.ts`: employment history, grouped achievements, skills, independent products and education.
- `src/data/portfolio.ts`: the opening paragraph and technical-tool groups, shared with the portfolio. The CV references these directly.
- `src/data/peerReviews.ts`: the full LinkedIn recommendation, shared with the portfolio.
- `src/config/profile.ts`: name, title, contact details and links.
- `src/views/CvView.vue`: structure and the print action.
- `src/assets/styles/cv.css`: screen, responsive and A4 print layouts.

Recruitment experience spans Fruugo, Incommunities and networx. Do not describe the Fruugo recruitment count as a career total. Keep role titles and dates factual. Add certifications only when held.

## Saving a PDF

1. Open `/cv` after running or deploying the portfolio.
2. Select **Print / save as PDF**, beside **Back to portfolio**.
3. Choose **Save as PDF**, **A4**, **100% scale**, no margins and turn off browser headers and footers. Enable background graphics to retain the paper colour, if desired.
4. Check the page count and preview before saving. The current content is intended for two pages. Content additions or different system fonts can change pagination.
5. Check that the PDF text can be selected, copied and searched. Keep the text-based export, rather than converting pages to images.

The CV has one layout, with experience alongside skills and tools on desktop and in print. On smaller screens it becomes a readable single column. Print controls are excluded from the PDF.
