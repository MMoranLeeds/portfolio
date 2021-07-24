<template>
  <div>
    <router-link to="/" aria-label="Home page">
      <Icon name="logo" />
    </router-link>

    <ul class="external-links">
      <li v-for="(link, i) in navigation" v-bind:key="i">
        <a
          v-bind:href="link.url"
          target="_blank"
          v-bind:arial-label="link.ariaLabel"
          v-tooltip="link.ariaLabel"
          rel="noopener"
        >
          <Icon v-bind:name="link.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

const navigationModule = namespace("navigation");

@Component
export default class Navigation extends Vue {
  @navigationModule.Getter navigation!: Array<string>;
}
</script>
