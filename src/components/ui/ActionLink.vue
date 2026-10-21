<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
withDefaults(
  defineProps<{ href: string; variant?: 'primary' | 'secondary' | 'text'; external?: boolean }>(),
  { variant: 'text', external: false },
)
</script>
<template>
  <a
    :href="href"
    :class="['action-link', `action-link--${variant}`]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot /> <ArrowIcon />
    <span v-if="external" class="visually-hidden"> (opens in a new tab)</span>
  </a>
</template>
