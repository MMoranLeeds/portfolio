<script setup lang="ts">
import { profile, emailHref } from "@/config/profile";
import ActionLink from "@/components/ui/ActionLink.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <footer
    id="contact"
    class="contact-section"
    :class="{ 'contact-section--standalone': route.name !== 'home' }"
    aria-labelledby="contact-heading"
    tabindex="-1"
  >
    <div v-if="route.name === 'home'" class="chapter-number" aria-hidden="true">
      08<span />
    </div>
    <h2 id="contact-heading">Contact</h2>
    <p>
      If you’d like to discuss an opportunity or hear more about how I approach
      research, design and delivery, I’d be happy to talk.
    </p>
    <div class="contact-actions">
      <ActionLink :href="emailHref" class="contact-email" external>
        <span class="contact-email-label"
          >Email me at {{ profile.email }}</span
        > </ActionLink
      ><ActionLink :href="profile.phoneHref"
        >Call me on {{ profile.phone }}</ActionLink
      ><ActionLink :href="profile.linkedin" external
        >Connect with me on LinkedIn</ActionLink
      ><ActionLink :href="profile.cvUrl">View my CV</ActionLink>
    </div>
    <div class="footer-source">
      <p>Designed and built with Vue 3 and TypeScript.</p>
      <ActionLink :href="profile.githubUrl" external>
        View portfolio source on GitHub
      </ActionLink>
    </div>
    <p class="footer-note">
      © {{ new Date().getFullYear() }} {{ profile.name }}
    </p>
  </footer>
</template>

<style scoped>
.contact-section--standalone {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.footer-source {
  margin-top: 2rem;
}
.footer-source p {
  margin: 0;
  color: var(--muted);
  font-size: 0.875rem;
}
.contact-email {
  max-width: 100%;
}
.contact-email-label {
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
