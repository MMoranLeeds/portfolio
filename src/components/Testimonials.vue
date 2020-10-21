<template>
  <section data-section-testimonials>
    <carousel v-bind:per-page="1" v-bind:navigationEnabled="true" paginationActiveColor="#fff" paginationColor="#fff" navigationNextLabel="<svg><use href='#arrow-icon' /></svg>" navigationPrevLabel="<svg><use href='#arrow-icon' /></svg>" v-bind:navigationClickTargetSize="10" v-bind:paginationPadding="0" v-bind:paginationSize="20" v-bind:minSwipeDistance="200">
      <slide v-for="(testimonial, i) in testimonials" v-bind:key="i">
        <blockquote>
          <p v-html="testimonial.bodyContent"></p>
          <h4>{{testimonial.title}} - {{testimonial.jobTitle}} {{testimonial.year}}</h4>
        </blockquote>
      </slide>
    </carousel>
  </section>
</template>

<script>
export default {
  name: "PersonalIntroduction",
  data() {
    return {
      testimonials: [],
      axiosError: false,
      handleLoading: true,
    };
  },
  methods: {
    fetchTestimonials: function () {
      const baseURI = "/statics/testimonials.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.testimonials = result.data;
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
    this.fetchTestimonials();
  },
};
</script>