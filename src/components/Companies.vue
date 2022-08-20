<template>
  <section data-section-companies aria-label="Companies I've worked with">
    <ul>
      <li v-for="(client, i) in companies" v-bind:key="i">
        <img
          v-bind:src="
            '/img/companies/' +
            client.name.replace(/\s+/g, '-').toLowerCase() +
            '.svg'
          "
          v-bind:alt="client.name + ' logo'"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { ICompanies } from "@/models/companies";

const companiesModule = namespace("companies");

@Component
export default class Companies extends Vue {
  @companiesModule.Getter companies!: Array<ICompanies>;
}
</script>