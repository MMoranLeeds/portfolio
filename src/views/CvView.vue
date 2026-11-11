<script setup lang="ts">
import { profile, emailHref } from "@/config/profile";
import { site } from "@/config/site";
import { cv } from "@/data/cv";
import "@/assets/styles/cv.css";

const portfolioUrl = site.indexable ? site.origin : profile.portfolioUrl;
const currentRole = cv.experience[0]!;
const earlierRoles = cv.experience.slice(1);
const printCv = async () => {
  await document.fonts.ready;
  window.print();
};
</script>

<template>
  <div class="cv-workspace">
    <nav class="cv-toolbar" aria-label="CV actions">
      <RouterLink to="/">Back to portfolio</RouterLink>
      <button type="button" class="cv-print-button" @click="printCv">
        Print / save as PDF
      </button>
    </nav>

    <article class="cv-document" aria-label="Curriculum vitae">
      <section class="cv-page" aria-labelledby="cv-name">
        <div class="cv-header">
          <h1 id="cv-name">{{ profile.name }}</h1>
          <p class="cv-role">{{ profile.role }}</p>
          <ul class="cv-contact" aria-label="Contact details">
            <li>{{ cv.location }}, UK</li>
            <li>
              <a :href="emailHref">{{ profile.email }}</a>
            </li>
            <li>
              <a :href="profile.phoneHref">{{ profile.phone }}</a>
            </li>
            <li>
              <a :href="portfolioUrl">{{
                portfolioUrl.replace(/^https?:\/\//, "")
              }}</a>
            </li>
            <li>
              <a :href="profile.linkedin">linkedin.com/in/matthewmoran5</a>
            </li>
          </ul>
          <p class="cv-summary">{{ cv.summary }}</p>
        </div>

        <div class="cv-columns">
          <section class="cv-experience" aria-labelledby="cv-experience">
            <h2 id="cv-experience">Work experience</h2>
            <section class="cv-job">
              <h3>{{ currentRole.organisation }}</h3>
              <p class="cv-job-role">{{ currentRole.role }}</p>
              <p class="cv-dates">{{ currentRole.dates }}</p>
              <p>{{ currentRole.summary }}</p>
              <section
                v-for="group in currentRole.achievementGroups"
                :key="group.title"
                class="cv-achievement-group"
              >
                <h4>{{ group.title }}</h4>
                <ul class="cv-achievements">
                  <li v-for="achievement in group.items" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </section>
            </section>
          </section>

          <div class="cv-supporting">
            <section aria-labelledby="cv-skills">
              <h2 id="cv-skills">Skills</h2>
              <div
                v-for="group in cv.skillGroups"
                :key="group.title"
                class="cv-skill-group"
              >
                <h3>{{ group.title }}</h3>
                <p>{{ group.items.join(" · ") }}</p>
              </div>
            </section>
            <section aria-labelledby="cv-tools">
              <h2 id="cv-tools">Tools & technology</h2>
              <div
                v-for="group in cv.tools"
                :key="group.title"
                class="cv-skill-group cv-tool-group"
              >
                <h3>{{ group.title }}</h3>
                <p>{{ group.items.join(" · ") }}</p>
              </div>
            </section>
            <section class="cv-education" aria-labelledby="cv-education">
              <h2 id="cv-education">Education</h2>
              <h3>{{ cv.education.institution }}</h3>
              <p>{{ cv.education.qualification }}</p>
            </section>
          </div>
        </div>
        <footer class="cv-page-footer">
          <span>{{ profile.name }} · {{ profile.role }}</span
          ><span>1 / 2</span>
        </footer>
      </section>

      <section
        class="cv-page cv-page--career"
        aria-labelledby="cv-earlier-experience"
      >
        <div class="cv-continuation">
          {{ profile.name }} · {{ profile.role }}
        </div>
        <div class="cv-columns cv-career-columns">
          <section aria-labelledby="cv-earlier-experience">
            <h2 id="cv-earlier-experience">Earlier experience</h2>
            <section
              v-for="job in earlierRoles"
              :key="job.organisation"
              class="cv-job"
            >
              <h3>{{ job.organisation }}</h3>
              <p class="cv-job-role">{{ job.role }}</p>
              <p class="cv-dates">{{ job.dates }}</p>
              <p>{{ job.summary }}</p>
              <ul v-if="'achievements' in job" class="cv-achievements">
                <li v-for="achievement in job.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </section>
          </section>

          <section
            class="cv-independent-work"
            aria-labelledby="cv-independent-work"
          >
            <h2 id="cv-independent-work">Independent product work</h2>
            <section
              v-for="project in cv.independentProjects"
              :key="project.name"
              class="cv-independent-project"
            >
              <h3>{{ project.name }}</h3>
              <p>{{ project.summary }}</p>
              <a :href="project.url">{{
                project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              }}</a>
            </section>
            <div class="cv-portfolio">
              <h3>Explore the case studies</h3>
              <p>Research, decisions and outcomes across six projects.</p>
              <a :href="`${portfolioUrl}/#case-studies`"
                >{{ portfolioUrl.replace(/^https?:\/\//, "") }}/#case-studies</a
              >
            </div>
          </section>
        </div>

        <section
          class="cv-recommendations"
          aria-labelledby="cv-recommendations"
        >
          <h2 id="cv-recommendations">Recommendation</h2>
          <figure
            v-for="review in cv.recommendations"
            :key="review.id"
            class="cv-recommendation"
          >
            <blockquote>
              <p v-for="paragraph in review.quoteParagraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </blockquote>
            <figcaption>
              {{ review.name }} · {{ review.role }}
              <span class="cv-recommendation-context">{{
                review.context
              }}</span>
            </figcaption>
          </figure>
        </section>
        <footer class="cv-page-footer">
          <span>{{ profile.name }} · {{ profile.role }}</span
          ><span>2 / 2</span>
        </footer>
      </section>
    </article>
  </div>
</template>
