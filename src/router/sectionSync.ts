import type { Router } from "vue-router";

// Tag only in-flight, passive replacements. No marker is retained in history state.
const pending = new WeakMap<Router, string>();
export const isPendingSectionSync = (router: Router, fullPath: string) =>
  pending.get(router) === fullPath;
export async function syncSectionHash(router: Router, id: string) {
  const route = router.currentRoute.value;
  if (route.name !== "home" || route.hash === `#${id}`) return;
  const location = { path: route.path, query: route.query, hash: `#${id}` };
  const target = router.resolve(location).fullPath;
  pending.set(router, target);
  try {
    await router.replace(location);
  } finally {
    if (pending.get(router) === target) pending.delete(router);
  }
}
declare module "vue-router" {
  interface RouteMeta {
    sectionScrollSync?: boolean;
  }
}
