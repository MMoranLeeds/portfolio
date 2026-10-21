import "./assets/main.css";
import { createPortfolioApp } from "./app";
import { metadataFor, updateDocumentMetadata } from "./seo/metadata";
import { initialiseCookieConsent } from "./composables/useCookieConsent";
import { initialiseAnalytics } from "./services/analytics";
const { app, router } = createPortfolioApp(
  false,
  !!document.getElementById("app")?.firstElementChild,
);
router.afterEach((to) => updateDocumentMetadata(metadataFor(to.path)));
router.isReady().then(() => {
  app.mount("#app");
  initialiseCookieConsent();
  initialiseAnalytics(router);
});
