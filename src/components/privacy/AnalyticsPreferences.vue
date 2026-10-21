<script setup lang="ts">
import { analyticsConfigured } from "@/config/analytics";
import { useCookieConsent } from "@/composables/useCookieConsent";
import CookieDetails from "./CookieDetails.vue";
const { analyticsAllowed, choice, setAnalytics } = useCookieConsent();
</script>
<template>
  <section
    v-if="analyticsConfigured"
    class="analytics-preferences"
    aria-labelledby="analytics-preference-heading"
  >
    <h3 id="analytics-preference-heading">Cookies and analytics</h3>
    <p>Essential storage stays on. Google Analytics is optional.</p>
    <label class="analytics-toggle"
      ><input
        type="checkbox"
        :checked="analyticsAllowed"
        @change="setAnalytics(($event.target as HTMLInputElement).checked)"
      />
      Allow Google Analytics</label
    >
    <p class="analytics-choice" role="status">
      {{
        choice
          ? analyticsAllowed
            ? "Analytics is on. You can switch it off at any time."
            : "Analytics is off."
          : "Analytics is off until you choose to allow it."
      }}
    </p>
    <CookieDetails />
  </section>
</template>
<style scoped>
.analytics-preferences {
  padding: 1.5rem 0;
  border-top: 1px solid var(--line);
}
.analytics-preferences h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}
.analytics-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  color: var(--ink);
  font-weight: 600;
  cursor: pointer;
  margin: 0.75rem 0;
}
.analytics-toggle input {
  width: 20px;
  height: 20px;
  accent-color: var(--accent);
  flex-shrink: 0;
}
.analytics-choice {
  color: var(--muted);
  font-size: 0.8125rem;
}
</style>
