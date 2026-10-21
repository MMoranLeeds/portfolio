import { onMounted, onBeforeUnmount, ref } from "vue";
import "@/assets/styles/floating-tooltips.css";

/** Matches the sidebar tooltips: hover/focus to show, leave/blur/Escape to dismiss. */
export function useTooltip() {
  const active = ref(false);
  const show = () => {
    active.value = true;
  };
  const hide = () => {
    active.value = false;
  };
  const dismiss = (event: KeyboardEvent) => {
    if (event.key === "Escape") hide();
  };
  onMounted(() => window.addEventListener("keydown", dismiss));
  onBeforeUnmount(() => window.removeEventListener("keydown", dismiss));
  return { active, show, hide };
}
