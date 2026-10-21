import { onMounted, onBeforeUnmount, ref } from "vue";

export function useBackToTop() {
  const visible = ref(false);
  let frame = 0;
  let scrolling = false;
  let media: MediaQueryList | undefined;
  const update = () => {
    frame = 0;
    visible.value = window.scrollY > window.innerHeight;
    if (window.scrollY <= 1) scrolling = false;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const reduced = () => {
    const preference = document.documentElement.dataset.motion;
    return (
      preference === "reduce" ||
      (preference !== "full" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    );
  };
  const motionChanged = () => {
    if (scrolling && reduced()) {
      window.scrollTo({ top: 0, behavior: "instant" });
      scrolling = false;
    }
  };
  const interrupted = () => {
    scrolling = false;
  };
  let removeHeadingFocus: (() => void) | undefined;
  const backToTop = () => {
    const heading =
      document.querySelector<HTMLElement>("#main-content h1") ||
      document.getElementById("main-content");
    removeHeadingFocus?.();
    if (heading) {
      const temporary = !heading.hasAttribute("tabindex");
      if (temporary) heading.setAttribute("tabindex", "-1");
      const remove = () => {
        if (temporary) heading.removeAttribute("tabindex");
        heading.removeEventListener("blur", remove);
      };
      removeHeadingFocus = remove;
      heading.addEventListener("blur", remove, { once: true });
      heading.focus({ preventScroll: true });
    }
    const instant = reduced();
    scrolling = !instant;
    window.scrollTo({ top: 0, behavior: instant ? "instant" : "smooth" });
  };
  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", motionChanged);
    window.addEventListener("portfolio-motion-change", motionChanged);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pageshow", schedule);
    window.addEventListener("scrollend", interrupted);
    window.addEventListener("wheel", interrupted, { passive: true });
    window.addEventListener("touchstart", interrupted, { passive: true });
    window.addEventListener("keydown", interrupted);
    schedule();
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    removeHeadingFocus?.();
    media?.removeEventListener("change", motionChanged);
    window.removeEventListener("portfolio-motion-change", motionChanged);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", schedule);
    window.removeEventListener("scrollend", interrupted);
    window.removeEventListener("wheel", interrupted);
    window.removeEventListener("touchstart", interrupted);
    window.removeEventListener("keydown", interrupted);
  });
  return { visible, backToTop };
}
