const configuredId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";
export const gaMeasurementId = /^G-[A-Z0-9]+$/.test(configuredId)
  ? configuredId
  : "";
export const analyticsConfigured = Boolean(gaMeasurementId);
export const consentStorageKey = "moran-portfolio-cookie-consent";
export const consentVersion = 1;
export const consentLifetimeMs = 180 * 24 * 60 * 60 * 1000;
