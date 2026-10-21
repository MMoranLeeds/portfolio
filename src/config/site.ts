// Set this in .env.production before deploying. No portfolio domain was supplied.
const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
const parsed = new URL(configuredUrl || "http://localhost:4173");
if (
  !["http:", "https:"].includes(parsed.protocol) ||
  parsed.pathname !== "/" ||
  parsed.search ||
  parsed.hash ||
  parsed.username ||
  parsed.password
) {
  throw new Error(
    "VITE_SITE_URL must be an HTTP(S) origin, without a path, credentials, query or hash.",
  );
}
export const site = {
  origin: parsed.origin,
  indexable:
    Boolean(configuredUrl) &&
    !["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname),
};
