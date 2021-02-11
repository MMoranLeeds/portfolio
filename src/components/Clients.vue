<template>
  <section data-section-clients>
    <ul>
      <li v-for="(client, i) in clients" v-bind:key="i">
        <img
          v-bind:src="'/img/clients/' + client.reference + '.svg'"
          v-bind:alt="client.clientName + ' logo'"
          width="500"
          height="100"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Clients",

  data() {
    return {
      clients: [],
      axiosError: false,
      handleLoading: true,
    };
  },
  methods: {
    fetchProjects: function () {
      const baseURI = "/statics/clients.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.clients = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
        })
        .finally(() => {
          this.handleLoading = false;
        });
    },
  },
  created() {
    this.fetchProjects();
  },
};
</script>