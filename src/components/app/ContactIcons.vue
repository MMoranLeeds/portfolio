<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { profile, emailHref } from "@/config/profile";
const activeTooltip = ref<string | null>(null);
const dismissTooltip = (event: KeyboardEvent) => {
  if (event.key === "Escape") activeTooltip.value = null;
};
onMounted(() => window.addEventListener("keydown", dismissTooltip));
onUnmounted(() => window.removeEventListener("keydown", dismissTooltip));
const links = [
  {
    label: `Email me at ${profile.email}`,
    href: emailHref,
    icon: "email",
    external: true,
  },
  {
    label: `Call me on ${profile.phone}`,
    href: profile.phoneHref,
    icon: "phone",
    external: false,
  },
  {
    label: `Connect with me on LinkedIn`,
    href: profile.linkedin,
    icon: "linkedin",
    external: true,
  },
  { label: `View my CV`, href: profile.cvUrl, icon: "cv", external: false },
];
</script>
<template>
  <nav class="sidebar-contacts" aria-label="Contact and CV">
    <a
      v-for="link in links"
      :key="link.icon"
      :href="link.href"
      :aria-label="`${link.label}${link.external ? ' (opens in a new tab)' : ''}`"
      :target="link.external ? '_blank' : undefined"
      :rel="link.external ? 'noopener noreferrer' : undefined"
      @mouseenter="activeTooltip = link.icon"
      @mouseleave="activeTooltip = null"
      @focus="activeTooltip = link.icon"
      @blur="activeTooltip = null"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        aria-hidden="true"
      >
        <template v-if="link.icon === 'email'">
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="m3 6 9 7 9-7" />
        </template>
        <template v-else-if="link.icon === 'phone'">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.57 2.79.69A2 2 0 0 1 22 16.92z"
          />
        </template>
        <template v-else-if="link.icon === 'linkedin'">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <!-- Filled letterforms keep the recognisable [in] mark inside an outline frame. -->
          <g fill="currentColor" stroke="none">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z"
              transform="translate(4.2 4.2) scale(.65)"
            />
          </g>
        </template>
        <template v-else>
          <path
            fill="currentColor"
            stroke="none"
            d="M12 14Q12.825 14 13.413 13.413Q14 12.825 14 12Q14 11.175 13.413 10.588Q12.825 10 12 10Q11.175 10 10.588 10.588Q10 11.175 10 12Q10 12.825 10.588 13.413Q11.175 14 12 14ZM8 18H16V17.425Q16 16.825 15.675 16.325Q15.35 15.825 14.775 15.575Q14.125 15.3 13.438 15.15Q12.75 15 12 15Q11.25 15 10.562 15.15Q9.875 15.3 9.225 15.575Q8.65 15.825 8.325 16.325Q8 16.825 8 17.425ZM18.5 22H5.5Q4.9 22 4.45 21.55Q4 21.1 4 20.5V3.5Q4 2.9 4.45 2.45Q4.9 2 5.5 2H13.4Q13.711 2 13.993 2.125Q14.275 2.25 14.475 2.45L19.55 7.525Q19.75 7.725 19.875 8.007Q20 8.289 20 8.6V20.5Q20 21.1 19.55 21.55Q19.1 22 18.5 22ZM18.5 20.5V8.65L13.35 3.5H5.5V20.5Z"
          />
        </template>
      </svg>
      <span
        v-if="activeTooltip === link.icon"
        class="contact-tooltip"
        aria-hidden="true"
        >{{ link.label }}</span
      >
    </a>
  </nav>
</template>
