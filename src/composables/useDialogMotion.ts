import { onBeforeUnmount, onMounted, type Ref } from "vue";
import "@/assets/styles/dialogs.css";

/** Keep native modality/focus trapping until the shared exit animation finishes. */
export function useDialogMotion(
  dialog: Ref<HTMLDialogElement | null | undefined>,
) {
  let pending: (() => void) | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let removeEndListener: (() => void) | undefined;
  let media: MediaQueryList | undefined;
  const reduced = () => {
    const preference = document.documentElement.dataset.motion;
    return (
      preference === "reduce" ||
      (preference !== "full" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    );
  };
  function reset() {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
    removeEndListener?.();
    removeEndListener = undefined;
    pending = undefined;
    if (dialog.value) delete dialog.value.dataset.dialogPhase;
  }
  function enter() {
    reset();
    if (dialog.value?.open && !reduced())
      dialog.value.dataset.dialogPhase = "opening";
  }
  function close(immediate = false) {
    const element = dialog.value;
    if (!element?.open) return;
    const nativeClose = () => {
      if (typeof element.close === "function") element.close();
      else {
        element.removeAttribute("open");
        element.dispatchEvent(new Event("close"));
      }
    };
    if (immediate || reduced()) {
      reset();
      nativeClose();
      return;
    }
    if (pending) return;
    element.dataset.dialogPhase = "closing";
    const surface = element.querySelector<HTMLElement>(".dialog-surface");
    const finish = () => {
      reset();
      if (element.open) nativeClose();
    };
    if (!surface) {
      finish();
      return;
    }
    const style = getComputedStyle(surface);
    const duration = Math.max(
      ...style.animationDuration
        .split(",")
        .map(
          (value) =>
            parseFloat(value) * (value.trim().endsWith("ms") ? 1 : 1000),
        ),
    );
    if (
      style.animationName === "none" ||
      !Number.isFinite(duration) ||
      duration <= 0
    ) {
      finish();
      return;
    }
    pending = finish;
    const ended = (event: AnimationEvent) => {
      if (
        event.target === surface &&
        event.animationName === "portfolio-dialog-exit"
      )
        finish();
    };
    surface.addEventListener("animationend", ended);
    removeEndListener = () =>
      surface.removeEventListener("animationend", ended);
    // Also close if animationend is cancelled, unavailable or interrupted.
    timer = setTimeout(finish, duration + 60);
  }
  const motionChanged = () => {
    if (reduced()) {
      if (pending) pending();
      else reset();
    }
  };
  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", motionChanged);
    window.addEventListener("portfolio-motion-change", motionChanged);
  });
  onBeforeUnmount(() => {
    reset();
    media?.removeEventListener("change", motionChanged);
    window.removeEventListener("portfolio-motion-change", motionChanged);
  });
  return { enter, close, reset };
}
