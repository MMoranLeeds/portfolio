<template>
  <section data-section-clients>
    <ul>
      <li v-for="(client, i) in clients" v-bind:key="i">
        <img
          v-bind:src="'/img/clients/' + client.name.replace(/\s+/g, '-').toLowerCase() + '.svg'"
          v-bind:alt="client.name + ' logo'"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { IClients } from "@/models/clients";

const clientsModule = namespace("clients");

@Component
export default class Clients extends Vue {
  @clientsModule.Getter clients!: Array<IClients>;
}
</script>