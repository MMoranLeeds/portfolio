export const shareStudioPath = "/_studio/share-image";
// Local by default. Hosted access needs separately configured server-side protection.
export const shareStudioEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_SHARE_STUDIO === "true";
