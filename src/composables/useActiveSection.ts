import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { syncSectionHash } from "@/router/sectionSync";

/** Update the highlight while scrolling; replace the hash when scrolling settles. */
export function useActiveSection(ids: readonly string[]) {
  const route = useRoute();
  const router = useRouter();
  const initial = route.hash.slice(1);
  const activeId = ref(ids.includes(initial) ? initial : (ids[0] ?? ""));
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let replacing = false;
  let mounted = false;
  const syncUrl = async () => {
    timer = undefined;
    if (!mounted || replacing || route.name !== "home") return;
    replacing = true;
    try {
      await syncSectionHash(router, activeId.value);
    } finally {
      replacing = false;
      if (
        mounted &&
        route.name === "home" &&
        route.hash !== `#${activeId.value}`
      )
        queueSync();
    }
  };
  const queueSync = () => {
    clearTimeout(timer);
    // Let an explicit click, deep link or Back/Forward scroll finish before replacing its hash.
    timer = setTimeout(syncUrl, 150);
  };
  const update = () => {
    frame = 0;
    if (!mounted || route.name !== "home") return;
    const position = window.innerHeight * 0.3;
    let candidate = ids[0] ?? "";
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= position)
        candidate = id;
    }
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    )
      candidate = ids[ids.length - 1] ?? candidate;
    activeId.value = candidate;
    queueSync();
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  watch(
    () => route.fullPath,
    async () => {
      clearTimeout(timer);
      if (route.meta.sectionScrollSync) return;
      await nextTick();
      schedule();
    },
  );
  onMounted(() => {
    mounted = true;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  });
  onUnmounted(() => {
    mounted = false;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    cancelAnimationFrame(frame);
    clearTimeout(timer);
  });
  return { activeId };
}
