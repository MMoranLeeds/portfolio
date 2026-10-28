<script setup lang="ts">
import { companyGroups } from "@/data/companies";
</script>

<template>
  <section class="companies-section" aria-labelledby="companies-heading">
    <h3 id="companies-heading">Organisations I've designed for</h3>
    <p>
      A selection of organisations I've worked with through in-house roles and
      client projects at networx.
    </p>
    <div
      v-for="group in companyGroups"
      :key="group.title"
      class="company-group"
    >
      <h4>{{ group.title }}</h4>
      <p v-if="group.description" class="company-context">
        {{ group.description }}
      </p>
      <ul class="company-logos" role="list">
        <li v-for="company in group.companies" :key="company.name">
          <img
            :src="company.src"
            :alt="company.name"
            :width="company.width"
            :height="company.height"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.companies-section {
  padding-block: 3rem;
  border-bottom: 1px solid var(--line);
}
.company-group {
  margin-top: 2rem;
}
.company-group h4 {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  font-weight: 600;
  color: var(--ink);
}
.company-context {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
.company-logos {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}
.company-logos li {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 6rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 6px;
}
.company-logos img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 3.75rem;
  object-fit: contain;
}
@media (max-width: 599px) {
  .company-logos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media print {
  .company-logos li {
    break-inside: avoid;
  }
}
</style>
