import { onMounted, onUnmounted, ref } from "vue";
export type MotionPreference = "system" | "reduce" | "full";
declare global {
  interface Window {
    portfolioMotion?: {
      readonly preference: MotionPreference;
      readonly resolved: "reduce" | "full";
      setPreference(value: MotionPreference): void;
    };
  }
}
export function useMotion() {
  const preference = ref<MotionPreference>("system");
  const resolved = ref<"reduce" | "full">("full");
  const available = ref(false);
  const update = () => {
    available.value = Boolean(window.portfolioMotion);
    preference.value = window.portfolioMotion?.preference ?? "system";
    resolved.value = window.portfolioMotion?.resolved ?? "full";
  };
  onMounted(() => {
    update();
    window.addEventListener("portfolio-motion-change", update);
  });
  onUnmounted(() =>
    window.removeEventListener("portfolio-motion-change", update),
  );
  const setPreference = (value: MotionPreference) =>
    window.portfolioMotion?.setPreference(value);
  return { preference, resolved, available, setPreference };
}
