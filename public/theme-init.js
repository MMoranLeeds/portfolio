// Classic, blocking head script: set the palette before the browser paints the page.
(() => {
  const key = "portfolio-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const valid = (value) => ["system", "light", "dark"].includes(value);
  let preference = "system";
  try {
    const saved = window.localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch {
    /* The current-tab choice still works when storage is unavailable. */
  }
  const apply = () => {
    const resolved =
      preference === "system" ? (media.matches ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.style.colorScheme = resolved;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", resolved === "dark" ? "#141d1b" : "#21483c");
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };
  window.portfolioTheme = {
    get preference() {
      return preference;
    },
    setPreference(value) {
      if (!valid(value)) return;
      preference = value;
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* Optional persistence. */
      }
      apply();
    },
  };
  media.addEventListener("change", () => {
    if (preference === "system") apply();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : "system";
    apply();
  });
  apply();
})();

// Apply motion before paint, independently of the colour-theme preference.
(() => {
  const key = "portfolio-motion";
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const valid = (value) => ["system", "reduce", "full"].includes(value);
  let preference = "system";
  try {
    const saved = window.localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch {
    /* Current-tab choices still work without storage. */
  }
  const resolve = () =>
    preference === "system" ? (media.matches ? "reduce" : "full") : preference;
  const apply = () => {
    document.documentElement.dataset.motion = resolve();
    document.documentElement.dataset.motionPreference = preference;
    window.dispatchEvent(new Event("portfolio-motion-change"));
  };
  window.portfolioMotion = {
    get preference() {
      return preference;
    },
    get resolved() {
      return resolve();
    },
    setPreference(value) {
      if (!valid(value)) return;
      preference = value;
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* Optional persistence. */
      }
      apply();
    },
  };
  media.addEventListener("change", () => {
    if (preference === "system") apply();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : "system";
    apply();
  });
  apply();
})();
