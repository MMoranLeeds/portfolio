import { createApp, createSSRApp } from "vue";
import App from "./App.vue";
import { createPortfolioRouter } from "./router";

export function createPortfolioApp(server = false, hydrate = false) {
  const app = server || hydrate ? createSSRApp(App) : createApp(App);
  const router = createPortfolioRouter(server);
  app.use(router);
  return { app, router };
}
