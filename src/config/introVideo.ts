import poster from "@/assets/images/dist/profile.webp";

/** Replace this configuration when Matt's recorded introduction is ready. */
export const introVideo = {
  enabled: true,
  title: "A little about me",
  launcherLabel: "Watch my introduction",
  aboutSummary: "Hi I'm Matt, a Lead Product Designer based in West Yorkshire.",
  aboutDetails: [
    "I enjoy understanding what makes something difficult to use, then working with people to make it clearer.",
    "I'm an accessibility advocate. Inclusive design has shaped much of my career, from the questions I ask in research to the interfaces I help build. At Fruugo, I've owned the company-wide accessibility audit across shopper and merchant products.",
    "I combine research with hands-on development to turn those principles into working products.",
  ],
  src: "/videos/meet-matt-2.mp4",
  poster,
  // Portrait presentation is independent of the source recording dimensions.
  frameAspectRatio: "9 / 16",
  width: 1280,
  height: 700,
  captionsSrc: "/videos/captions/meet-matt.en.vtt",
};
export const introVideoOpenEvent = "portfolio-intro-video-open";
