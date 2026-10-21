<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { ProjectImage } from "@/types/project";
import ImageLightbox from "@/components/portfolio/ImageLightbox.vue";
import { useRoute } from "vue-router";
import { findProject, projects } from "@/data/projects/index";
import ArrowIcon from "@/components/ui/ArrowIcon.vue";
import ActionLink from "@/components/ui/ActionLink.vue";
import ProjectVideoPlayer from "@/components/portfolio/ProjectVideoPlayer.vue";
import ProjectFigure from "@/components/portfolio/ProjectFigure.vue";
import PeerReviews from "@/components/portfolio/PeerReviews.vue";
import { projectPeerReviews } from "@/data/peerReviews";
import NotFoundView from "./NotFoundView.vue";
import CaseStudyProgress from "@/components/portfolio/CaseStudyProgress.vue";
import { caseStudyReading } from "@/utils/caseStudyReading";
import { projectMobilePreview } from "@/data/projects/shared/mobilePreview";
import MobileProjectPreview from "@/components/portfolio/MobileProjectPreview.vue";
import { projectHeaderImage } from "@/data/projects/shared/cardImages";
import CaseStudyContents from "@/components/portfolio/CaseStudyContents.vue";
const article = ref<HTMLElement | null>(null);
const readingEnd = ref<HTMLElement | null>(null);
const lightbox = ref<InstanceType<typeof ImageLightbox>>();
const lightboxAvailable = ref(false);
onMounted(() => {
  lightboxAvailable.value =
    typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
});
const openImage = (image: ProjectImage, trigger: HTMLElement) =>
  lightbox.value?.open(image, trigger);
const route = useRoute();
watch(
  () => route.path,
  () => lightbox.value?.close(false),
);
const project = computed(() => findProject(String(route.params.slug)));
const overview = computed(() => project.value?.overview);
// Follow the same registry order as the homepage, including future additions.
const nextProject = computed(() => {
  if (!project.value || projects.length < 2) return undefined;
  const index = projects.findIndex((item) => item.slug === project.value?.slug);
  return index < 0 ? undefined : projects[(index + 1) % projects.length];
});
const headerImage = computed(() =>
  project.value ? projectHeaderImage(project.value) : undefined,
);
const mobile = computed(() =>
  project.value ? projectMobilePreview(project.value) : undefined,
);
const reading = computed(() =>
  project.value
    ? caseStudyReading(project.value, projectPeerReviews(project.value.slug))
    : null,
);
const sourceLabel = (id: string) =>
  project.value?.sources?.find((source) => source.id === id)?.publisher ||
  "Source";
</script>
<template>
  <article
    v-if="project"
    ref="article"
    class="case-study"
    aria-labelledby="case-study-title"
  >
    <RouterLink
      class="action-link case-return case-return--top"
      to="/#case-studies"
    >
      <span class="case-return-arrow" aria-hidden="true"><ArrowIcon /></span>
      <span>Back to case studies</span>
    </RouterLink>
    <header class="case-header">
      <p class="eyebrow">{{ project.category }}</p>
      <h1 id="case-study-title">{{ project.title }}</h1>
      <p v-if="reading" class="case-reading-time">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" />
        </svg>
        Approx. {{ reading.minutes }} min read
      </p>
      <p class="case-summary">{{ project.summary }}</p>
      <section
        v-if="overview"
        class="case-outcome"
        aria-labelledby="case-outcome-title"
      >
        <h2 id="case-outcome-title">At a glance</h2>
        <p>{{ overview.outcome }}</p>
      </section>
      <dl class="case-facts">
        <div>
          <dt>My role</dt>
          <dd>{{ project.role }}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{{ project.status }}</dd>
        </div>
        <div v-if="overview">
          <dt>Project period</dt>
          <dd>{{ overview.period }}</dd>
        </div>
        <div v-if="overview?.launchDate">
          <dt>Launched</dt>
          <dd>
            <time :datetime="overview.launchDate">{{
              overview.launchLabel
            }}</time>
          </dd>
        </div>
      </dl>
      <ActionLink v-if="project.url" :href="project.url" external>{{
        project.externalLinkLabel || `Visit ${project.title}`
      }}</ActionLink>
    </header>
    <div
      class="case-cover-pair"
      :class="{ 'case-cover-pair--single': !mobile }"
    >
      <ProjectFigure
        v-if="headerImage"
        :image="headerImage"
        eager
        :interactive="lightboxAvailable"
        @open="openImage"
      />
      <MobileProjectPreview
        v-if="mobile"
        :preview="mobile"
        overlay
        :interactive="lightboxAvailable"
        @open="openImage"
      />
    </div>
    <p v-if="mobile" class="case-mobile-note">
      {{ mobile.label }} · {{ mobile.caption }}
    </p>
    <CaseStudyContents :key="project.slug" :sections="project.sections" />
    <section
      v-for="section in project.sections"
      :key="section.id"
      class="case-section"
      :aria-labelledby="`case-${section.id}`"
    >
      <p v-if="section.eyebrow" class="eyebrow">{{ section.eyebrow }}</p>
      <h2 :id="`case-${section.id}`" class="case-section-heading" tabindex="-1">
        {{ section.title }}
      </h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
      <ProjectVideoPlayer
        v-if="project.video?.sectionId === section.id"
        :key="project.slug"
        :video="project.video!"
      />
      <ul
        v-if="section.evidence?.length"
        class="case-evidence"
        aria-label="Research and project evidence"
      >
        <li v-for="item in section.evidence" :key="item.label">
          <p class="evidence-value">{{ item.value }}</p>
          <h3>{{ item.label }}</h3>
          <p>{{ item.detail }}</p>
        </li>
      </ul>
      <ul v-if="section.points?.length" class="case-points">
        <li v-for="point in section.points" :key="point.title">
          <h3>{{ point.title }}</h3>
          <p>{{ point.description }}</p>
        </li>
      </ul>
      <ol v-if="section.steps?.length" class="case-steps">
        <li v-for="step in section.steps" :key="step.title">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>
      <p v-if="section.sourceIds?.length" class="section-sources">
        Further reading:
        <a v-for="id in section.sourceIds" :key="id" :href="`#source-${id}`">{{
          sourceLabel(id)
        }}</a>
      </p>
      <section
        v-for="block in section.blocks"
        :key="block.id"
        class="case-decision"
        :aria-labelledby="`case-${section.id}-${block.id}`"
      >
        <h3 :id="`case-${section.id}-${block.id}`">{{ block.title }}</h3>
        <p v-for="paragraph in block.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
        <aside
          v-if="block.placeholder"
          class="case-image-placeholder"
          :aria-label="block.placeholder.title"
        >
          <p class="figure-label">{{ block.placeholder.title }}</p>
          <p>{{ block.placeholder.description }}</p>
        </aside>
        <div
          v-if="block.images?.length"
          class="case-image-sequence"
          :class="{ 'case-image-sequence--grid': block.imageLayout === 'grid' }"
        >
          <ProjectFigure
            v-for="image in block.images"
            :key="image.src"
            :image="image"
            :interactive="lightboxAvailable"
            @open="openImage"
          />
        </div>
      </section>
      <ProjectFigure
        v-if="section.image"
        :image="section.image"
        :interactive="lightboxAvailable"
        @open="openImage"
      />
    </section>
    <PeerReviews
      id="project-peer-reviews"
      :reviews="projectPeerReviews(project.slug)"
      title="Working together on this project"
    />
    <section
      v-if="project.sources?.length"
      class="case-section case-references"
      aria-labelledby="case-sources"
    >
      <h2 id="case-sources">Sources and evidence</h2>
      <p class="source-intro">
        {{
          project.sourcesIntro ||
          "Public research accessed 12 October 2026. These are published reports, not open raw datasets. Project delivery is described from my contribution and project notes; proposed capabilities are labelled separately."
        }}
      </p>
      <ol class="case-source-list">
        <li
          v-for="source in project.sources"
          :id="`source-${source.id}`"
          :key="source.id"
          tabindex="-1"
        >
          <p class="source-publisher">
            {{ source.publisher }} · {{ source.date }}
          </p>
          <a
            v-if="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ source.title
            }}<span class="visually-hidden"> (opens in a new tab)</span></a
          >
          <p v-else class="source-title">{{ source.title }}</p>
          <p>{{ source.note }}</p>
        </li>
      </ol>
    </section>
    <p v-if="project.url" class="case-live-link">
      <ActionLink :href="project.url" external>{{
        project.externalLinkLabel || `Visit ${project.title}`
      }}</ActionLink>
    </p>
    <div ref="readingEnd" aria-hidden="true" />
    <nav class="case-end" aria-label="Case study links">
      <RouterLink class="action-link case-return" to="/#case-studies">
        <span class="case-return-arrow" aria-hidden="true"><ArrowIcon /></span>
        <span>Back to case studies</span>
      </RouterLink>
      <RouterLink
        v-if="nextProject"
        class="action-link case-next"
        :to="`/work/${nextProject.slug}`"
        rel="next"
      >
        <span>Next case study: {{ nextProject.title }}</span>
        <ArrowIcon />
      </RouterLink>
    </nav>
    <ImageLightbox ref="lightbox" />
    <CaseStudyProgress
      :article="article"
      :end="readingEnd"
      :slug="project.slug"
    />
  </article>
  <NotFoundView v-else />
</template>
<style scoped>
.case-outcome {
  border-inline-start: 3px solid var(--line);
  padding-inline-start: 1rem;
  margin-block: 1.5rem;
}
.case-outcome h2 {
  font-size: 0.9375rem;
  margin-block-end: 0.5rem;
}
.case-outcome p {
  margin: 0;
}
.case-section-heading {
  scroll-margin-block-start: 2rem;
}
.case-section-heading:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 0.3rem;
}
.case-live-link {
  margin-block: 1.5rem 0;
}
.case-end {
  align-items: center;
}
.case-return,
.case-next {
  min-width: 0;
  max-width: 100%;
}
.case-return > span,
.case-next > span {
  min-width: 0;
  overflow-wrap: anywhere;
}
@media (max-width: 599px) {
  .case-end {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
.case-return--top {
  margin-bottom: 1.5rem;
}
.case-return-arrow {
  display: inline-flex;
  flex-shrink: 0;
  transform: rotate(180deg);
}
/* Cover stays full width; the mobile preview overlays its right edge. */
.case-cover-pair {
  position: relative;
}
.case-cover-pair :deep(.mobile-project-preview) {
  position: absolute;
  width: 17%;
  max-width: 126px;
  top: 3%;
  right: 2%;
  z-index: 1;
}
.case-mobile-note {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 0.5rem;
}
.case-reading-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.875rem;
  margin: 0.75rem 0 1.25rem;
}
.case-reading-time svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
</style>
