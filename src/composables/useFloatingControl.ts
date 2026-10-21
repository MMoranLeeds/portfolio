import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import { floatingOffset } from "@/utils/floatingControls";

export function useFloatingControl(
  element: Ref<HTMLElement | null>,
  selectors: string,
  enabled: () => boolean = () => true,
) {
  const offset = ref(0);
  const fits = ref(true);
  let frame = 0;
  let mounted = false;
  let resize: ResizeObserver | undefined;
  let mutation: MutationObserver | undefined;
  let observed = new Set<Element>();
  const update = () => {
    frame = 0;
    if (!element.value) return;
    if (!enabled()) {
      offset.value = 0;
      fits.value = true;
      return;
    }
    const obstacles = [
      ...document.querySelectorAll<HTMLElement>(selectors),
    ].filter(
      (node) =>
        node !== element.value &&
        node.getClientRects().length &&
        getComputedStyle(node).visibility !== "hidden",
    );
    const targets = new Set<Element>([element.value, ...obstacles]);
    for (const node of observed)
      if (!targets.has(node)) resize?.unobserve(node);
    for (const node of targets) if (!observed.has(node)) resize?.observe(node);
    observed = targets;
    const rect = element.value.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const result = floatingOffset(
      {
        left: rect.left,
        right: rect.right,
        top: rect.top + offset.value,
        bottom: rect.bottom + offset.value,
      },
      obstacles.map((node) => node.getBoundingClientRect()),
    );
    const changed =
      offset.value !== result.offset || fits.value !== result.fits;
    offset.value = result.offset;
    fits.value = result.fits;
    // A lower control can move without resizing. Notify the controls stacked above it.
    if (changed)
      window.dispatchEvent(new Event("portfolio-floating-layout-change"));
  };
  const schedule = () => {
    if (mounted && !frame) frame = requestAnimationFrame(update);
  };
  onMounted(() => {
    mounted = true;
    if (typeof ResizeObserver !== "undefined")
      resize = new ResizeObserver(schedule);
    mutation = new MutationObserver(schedule);
    mutation.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("portfolio-floating-layout-change", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    document.fonts?.ready.then(schedule);
    schedule();
  });
  onBeforeUnmount(() => {
    mounted = false;
    cancelAnimationFrame(frame);
    resize?.disconnect();
    mutation?.disconnect();
    observed.clear();
    window.removeEventListener("resize", schedule);
    window.removeEventListener("portfolio-floating-layout-change", schedule);
    window.visualViewport?.removeEventListener("resize", schedule);
    window.visualViewport?.removeEventListener("scroll", schedule);
  });
  return { offset, fits };
}
