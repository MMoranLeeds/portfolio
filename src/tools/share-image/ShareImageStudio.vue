<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted, watch } from "vue";
import {
  studioDefaults,
  studioImages,
  studioCaseStudies,
  caseStudyLayout,
  studioTemplates,
  linkedinDefaults,
} from "./config";
import type { StudioTemplate } from "./config";
import { drawShareImage, exportCanvas, forgetImage } from "./render";
import { useTheme } from "@/composables/useTheme";
import type { ThemePreference } from "@/composables/useTheme";
const canvas = ref<HTMLCanvasElement>();
const template = ref<StudioTemplate>("standard");
const dimensions = computed(() => studioTemplates[template.value]);
const visibleCards = computed(() =>
  template.value === "linkedin"
    ? []
    : template.value === "case-study"
      ? cards.slice(0, 1)
      : cards,
);
const selectedProject = ref(studioCaseStudies[0]!.slug);
const content = reactive({
  name: studioDefaults.name as string,
  role: studioDefaults.role as string,
  headline: studioDefaults.headline,
  supportingLine: linkedinDefaults.supportingLine,
});
const cards = reactive(
  studioDefaults.cards.map((card) => ({ ...card, customSrc: "" })),
);
const { preference, setPreference } = useTheme();
const status = ref("Preparing preview…");
const error = ref("");
const ready = ref(false);
const exporting = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let revision = 0;
let disposed = false;
const objectUrls = new Set<string>();
async function refresh() {
  const version = ++revision;
  ready.value = false;
  error.value = "";
  status.value = "Updating preview…";
  // Render away from the visible canvas so failed or superseded renders cannot be downloaded.
  const target = document.createElement("canvas");
  target.width = dimensions.value.width;
  target.height = dimensions.value.height;
  try {
    await drawShareImage(
      target,
      { ...content, template: template.value },
      cards.map((card) => ({
        ...card,
        ...(template.value === "case-study" ? caseStudyLayout : {}),
        src:
          card.customSrc ||
          studioImages.find((image) => image.id === card.imageId)!.src,
      })),
    );
    if (disposed || version !== revision || !canvas.value) return;
    canvas.value.width = target.width;
    canvas.value.height = target.height;
    canvas.value.getContext("2d")!.drawImage(target, 0, 0);
    ready.value = true;
    status.value = `Preview ready · ${target.width} × ${target.height} pixels`;
  } catch (e) {
    if (disposed || version !== revision) return;
    error.value = e instanceof Error ? e.message : "Preview failed.";
    status.value = "Preview needs attention.";
  }
}
function schedule() {
  ready.value = false;
  revision++;
  clearTimeout(timer);
  timer = setTimeout(refresh, 180);
}
function replaceImage(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (
    !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
    file.size > 15 * 1024 * 1024
  ) {
    error.value = "Choose a PNG, JPEG or WebP smaller than 15 MB.";
    input.value = "";
    return;
  }
  clearCustom(index);
  const url = URL.createObjectURL(file);
  objectUrls.add(url);
  cards[index]!.customSrc = url;
}
function clearCustom(index: number) {
  const url = cards[index]!.customSrc;
  if (url) {
    URL.revokeObjectURL(url);
    objectUrls.delete(url);
    forgetImage(url);
  }
  cards[index]!.customSrc = "";
}
async function download(format: "png" | "jpeg") {
  if (!ready.value || !canvas.value) return;
  exporting.value = true;
  error.value = "";
  try {
    const filename =
      template.value === "case-study"
        ? selectedProject.value
        : dimensions.value.filename;
    const linkedin = template.value === "linkedin";
    const blob = await exportCanvas(canvas.value, format);
    if (disposed) return;
    const url = URL.createObjectURL(blob);
    objectUrls.add(url);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${format === "jpeg" ? "jpg" : "png"}`;
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      objectUrls.delete(url);
    }, 1000);
    status.value = linkedin
      ? "Header downloaded. Upload it as your LinkedIn cover image."
      : "Image downloaded. Replace the public preview asset and redeploy to publish it.";
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Export failed.";
  } finally {
    exporting.value = false;
  }
}
function reset() {
  const project = studioCaseStudies.find(
    (item) => item.slug === selectedProject.value,
  )!;
  Object.assign(content, {
    name: studioDefaults.name,
    role: template.value === "case-study" ? project.role : studioDefaults.role,
    headline:
      template.value === "linkedin"
        ? linkedinDefaults.headline
        : template.value === "case-study"
          ? project.headline
          : studioDefaults.headline,
    supportingLine: linkedinDefaults.supportingLine,
  });
  cards.forEach((_, index) => {
    clearCustom(index);
    Object.assign(cards[index]!, studioDefaults.cards[index]);
  });
  if (template.value === "case-study") Object.assign(cards[0]!, project);
  schedule();
}
watch([template, selectedProject], reset);
function themeChanged(event: Event) {
  setPreference((event.target as HTMLSelectElement).value as ThemePreference);
}
watch([content, cards], schedule, { deep: true });
onMounted(() => {
  void refresh();
  window.addEventListener("portfolio-theme-change", schedule);
});
onUnmounted(() => {
  disposed = true;
  revision++;
  clearTimeout(timer);
  window.removeEventListener("portfolio-theme-change", schedule);
  for (const url of objectUrls) URL.revokeObjectURL(url);
});
</script>
<template>
  <div class="share-studio">
    <header class="studio-header">
      <p class="eyebrow">Portfolio tools</p>
      <h1>Share image studio</h1>
      <p>Create a preview from shared brand styles and project images.</p>
      <a href="/">Back to portfolio</a>
    </header>
    <div class="studio-layout">
      <form class="studio-controls" @submit.prevent>
        <h2>Content</h2>
        <label
          >Template<select v-model="template">
            <option value="standard">Portfolio · three images</option>
            <option value="case-study">Case study · featured image</option>
            <option value="linkedin">LinkedIn header · 1584 × 396</option>
          </select></label
        >
        <label v-if="template === 'case-study'"
          >Case study<select v-model="selectedProject">
            <option
              v-for="project in studioCaseStudies"
              :key="project.slug"
              :value="project.slug"
            >
              {{ project.headline }}
            </option>
          </select></label
        >
        <label v-if="template !== 'linkedin'"
          >Name<input v-model="content.name" maxlength="50"
        /></label>
        <label v-if="template !== 'linkedin'"
          >Role<input v-model="content.role" maxlength="55"
        /></label>
        <label
          >Headline<textarea
            v-model="content.headline"
            maxlength="100"
            rows="4"
          />
        </label>
        <label v-if="template === 'linkedin'"
          >Supporting line<input
            v-model="content.supportingLine"
            maxlength="100"
        /></label>
        <p v-if="template === 'linkedin'" class="studio-note">
          The headline fits into two lines. Add a line break to control the
          split, or leave it on one line to balance automatically. The left side
          stays clear for your profile photo.
        </p>
        <label
          >Site theme<select :value="preference" @change="themeChanged">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select></label
        >
        <fieldset v-for="(card, index) in visibleCards" :key="index">
          <legend>Project image {{ index + 1 }}</legend>
          <label
            >Source<select v-model="card.imageId" @change="clearCustom(index)">
              <option
                v-for="image in studioImages"
                :key="image.id"
                :value="image.id"
              >
                {{ image.label }}
              </option>
            </select></label
          >
          <label
            >Or choose a local image<input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              @change="replaceImage(index, $event)"
          /></label>
          <p v-if="card.customSrc" class="studio-note">
            Local image selected, used only in this session.
          </p>
          <label
            >Horizontal crop · {{ card.focusX }}%<input
              v-model.number="card.focusX"
              type="range"
              min="0"
              max="100"
          /></label>
          <label
            >Vertical crop · {{ card.focusY }}%<input
              v-model.number="card.focusY"
              type="range"
              min="0"
              max="100"
          /></label>
        </fieldset>
        <button type="button" @click="reset">Reset to code defaults</button>
      </form>
      <section class="studio-preview" aria-labelledby="studio-preview-heading">
        <h2 id="studio-preview-heading">Preview</h2>
        <canvas
          ref="canvas"
          :width="studioDefaults.width"
          :height="studioDefaults.height"
          role="img"
          :aria-label="`${content.name}: ${content.headline.replaceAll('\n', ' ')} with ${template === 'linkedin' ? 'LinkedIn header with a clear profile-photo area' : template === 'case-study' ? 'one project image' : 'three project previews'}.`"
          >Share image preview. Use a browser that supports canvas.</canvas
        >
        <p role="status" aria-live="polite">{{ status }}</p>
        <p v-if="error" role="alert" class="studio-error">{{ error }}</p>
        <div class="studio-actions">
          <button
            type="button"
            :disabled="!ready || exporting"
            @click="download('png')"
          >
            Download PNG</button
          ><button
            type="button"
            :disabled="!ready || exporting"
            @click="download('jpeg')"
          >
            Download JPEG
          </button>
        </div>
        <p v-if="template === 'linkedin'" class="studio-note">
          Download PNG or JPEG, then upload to LinkedIn as your cover image.
          Exports are exactly 1584 × 396 pixels and use the selected portfolio
          theme. No site deployment is needed.
        </p>
        <p v-else class="studio-note">
          Save the PNG to
          <code>{{
            template === "case-study"
              ? `public/images/social/${selectedProject}.png`
              : "public/images/portfolio-social-preview.png"
          }}</code
          >, then rebuild and deploy. Downloads do not change the live site. For
          JPEG or a different filename, update the path and MIME type in
          <code>src/config/socialPreview.ts</code>. Keep its image description
          accurate when replacing artwork.
        </p>
      </section>
    </div>
  </div>
</template>
<style scoped>
.share-studio {
  padding: 32px;
  max-width: 1500px;
  margin: auto;
}
.studio-header {
  margin-bottom: 28px;
}
.studio-header h1 {
  font-size: 2.3rem;
}
.studio-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}
.studio-controls {
  display: grid;
  gap: 16px;
}
.studio-controls label {
  display: grid;
  gap: 6px;
  font-size: 0.9rem;
}
.studio-controls fieldset {
  border: 1px solid var(--line);
  padding: 16px;
  display: grid;
  gap: 12px;
}
.studio-controls input:not([type="range"]),
.studio-controls textarea,
.studio-controls select {
  width: 100%;
  padding: 9px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--panel);
  color: var(--ink);
  font: inherit;
}
.studio-preview {
  position: sticky;
  top: 24px;
}
.studio-preview canvas {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
}
.studio-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.share-studio button {
  min-height: 44px;
  padding: 10px 16px;
  background: var(--action-bg);
  color: var(--action-text);
  border: 0;
  border-radius: 4px;
  font: inherit;
}
.share-studio button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.studio-note {
  font-size: 0.85rem;
  line-height: 1.5;
}
.studio-error {
  color: var(--ink);
  padding: 12px;
  border: 2px solid var(--focus);
}
@media (max-width: 850px) {
  .share-studio {
    padding: 20px;
  }
  .studio-layout {
    display: flex;
    flex-direction: column-reverse;
  }
  .studio-preview {
    position: static;
    width: 100%;
  }
  .studio-controls {
    width: 100%;
  }
}
</style>
