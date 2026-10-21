import { onMounted, onUnmounted, ref } from "vue";
export type ThemePreference = "system" | "light" | "dark";
declare global {
  interface Window {
    portfolioTheme?: {
      readonly preference: ThemePreference;
      setPreference(value: ThemePreference): void;
    };
  }
}
export function useTheme() {
  // Match prerendered markup until mount; the head script already applies the palette.
  const preference = ref<ThemePreference>("system");
  const available = ref(false);
  const update = () => {
    available.value = Boolean(window.portfolioTheme);
    preference.value = window.portfolioTheme?.preference ?? "system";
  };
  onMounted(() => {
    update();
    window.addEventListener("portfolio-theme-change", update);
  });
  onUnmounted(() =>
    window.removeEventListener("portfolio-theme-change", update),
  );
  const setPreference = (value: ThemePreference) =>
    window.portfolioTheme?.setPreference(value);
  return { preference, available, setPreference };
}
