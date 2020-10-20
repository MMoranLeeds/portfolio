<template>
  <section data-section-clients>
    <ul>
      <li v-for="(client, i) in clients" :key="i">
        <img
          v-bind:src="'/img/clients/' + client.reference + '.svg'"
          v-bind:alt="client.clientName + ' logo'"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "PersonalIntroduction",

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