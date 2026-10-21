<script setup lang="ts">
import { profile, emailHref } from "@/config/profile";
import { site } from "@/config/site";
import { cv } from "@/data/cv";
import "@/assets/styles/cv.css";
const portfolioUrl = site.indexable ? site.origin : profile.portfolioUrl;
const printCv = async () => {
  await document.fonts.ready;
  window.print();
};
</script>
<template>
  <div class="cv-workspace">
    <nav class="cv-toolbar" aria-label="CV actions">
      <RouterLink to="/">Back to portfolio</RouterLink>
      <button type="button" @click="printCv">Print / save as PDF</button>
      <p>Choose A4, 100% scale and turn off browser headers and footers.</p>
    </nav>
    <article class="cv-document" aria-label="Curriculum vitae">
      <section class="cv-page" aria-labelledby="cv-name">
        <header class="cv-header">
          <p class="cv-eyebrow">Curriculum vitae</p>
          <h1 id="cv-name">{{ profile.name }}</h1>
          <p class="cv-role">{{ profile.role }}</p>
          <p class="cv-contact">
            <a :href="emailHref">{{ profile.email }}</a> ·
            <a :href="profile.phoneHref">{{ profile.phone }}</a> ·
            {{ cv.location }}
          </p>
          <p class="cv-contact">
            <a :href="portfolioUrl">{{
              portfolioUrl.replace(/^https?:\/\//, "")
            }}</a>
            · <a :href="profile.linkedin">linkedin.com/in/matthewmoran5</a>
          </p>
        </header>
        <section class="cv-summary" aria-labelledby="cv-profile">
          <h2 id="cv-profile">Profile</h2>
          <p>{{ cv.summary }}</p>
        </section>
        <section aria-labelledby="cv-experience">
          <h2 id="cv-experience">Experience</h2>
          <section
            v-for="job in cv.experience.slice(0, 1)"
            :key="job.organisation"
            class="cv-job"
          >
            <div class="cv-job-heading">
              <h3>{{ job.organisation }}</h3>
              <p>{{ job.dates }}</p>
            </div>
            <p class="cv-job-role">{{ job.role }}</p>
            <p v-for="paragraph in job.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
            <ul v-if="'achievements' in job" class="cv-achievements">
              <li v-for="achievement in job.achievements" :key="achievement">
                {{ achievement }}
              </li>
            </ul>
          </section>
        </section>
        <section aria-labelledby="cv-capabilities">
          <h2 id="cv-capabilities">Capabilities</h2>
          <p>{{ cv.capabilities.join(" · ") }}</p>
        </section>
        <footer class="cv-page-footer">
          <span>{{ profile.name }} · Current experience</span><span>1 / 2</span>
        </footer>
      </section>
      <section
        class="cv-page cv-page--career"
        aria-labelledby="cv-earlier-experience"
      >
        <header class="cv-continuation">
          <p>{{ profile.name }} · {{ profile.role }}</p>
          <h2 id="cv-earlier-experience">Earlier experience</h2>
        </header>
        <section
          v-for="job in cv.experience.slice(1)"
          :key="job.organisation"
          class="cv-job"
        >
          <div class="cv-job-heading">
            <h3>{{ job.organisation }}</h3>
            <p>{{ job.dates }}</p>
          </div>
          <p class="cv-job-role">{{ job.role }}</p>
          <p v-for="paragraph in job.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </section>
        <section class="cv-education" aria-labelledby="cv-education">
          <h2 id="cv-education">Education</h2>
          <p>
            {{ cv.education.qualification }} · {{ cv.education.institution }}
          </p>
        </section>
        <section
          class="cv-independent-work"
          aria-labelledby="cv-independent-work"
        >
          <h2 id="cv-independent-work">Independent product work</h2>
          <p>{{ cv.independentWork }}</p>
        </section>
        <section class="cv-portfolio" aria-labelledby="cv-portfolio">
          <h2 id="cv-portfolio">Portfolio</h2>
          <p>
            Case studies covering localisation, merchant onboarding, Agentic AI shopping
            and Accessible Trades.
          </p>
          <a :href="`${portfolioUrl}/#case-studies`"
            >{{ portfolioUrl.replace(/^https?:\/\//, "") }}/#case-studies</a
          >
        </section>
        <section
          v-if="cv.recommendations.length"
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
          <span>{{ profile.name }} · Career and recommendations</span
          ><span>2 / 2</span>
        </footer>
      </section>
    </article>
  </div>
</template>
