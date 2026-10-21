// Shared contact details for the portfolio and printable CV.
export const profile = {
  name: "Matthew Moran",
  role: "Lead Product Designer",
  email: "matthewdm@live.co.uk",
  phone: "07759 952035",
  phoneHref: "tel:+447759952035",
  linkedin: "https://www.linkedin.com/in/matthewmoran5/",
  cvUrl: "/cv",
  portfolioUrl: "https://mdmoran.netlify.app",
  githubUrl: "https://github.com/MMoranLeeds/portfolio",
  projectUrl: "https://accessibletrades.co.uk/",
} as const;

const emailSubject = "Portfolio enquiry";
const emailBody = [
  "Hi Matt,",
  "",
  "I’ve had a look at your portfolio and would like to discuss an opportunity with you.",
  "",
  "Thanks,",
].join("\r\n");

export const emailHref =
  `mailto:${profile.email}` +
  `?subject=${encodeURIComponent(emailSubject)}` +
  `&body=${encodeURIComponent(emailBody)}`;
