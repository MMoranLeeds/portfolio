<script setup lang="ts">
import { navigation } from "@/data/portfolio";
defineProps<{ activeId: string }>();
defineEmits<{ navigate: [id: string] }>();
</script>
<template>
  <ol class="section-navigation">
    <li v-for="item in navigation" :key="item.id">
      <RouterLink
        :to="`/#${item.id}`"
        :aria-current="activeId === item.id ? 'location' : undefined"
        @click="$emit('navigate', item.id)"
      >
        <span class="nav-number" aria-hidden="true">{{ item.number }}</span
        ><span>{{ item.label }}</span>
      </RouterLink>
    </li>
  </ol>
</template>
