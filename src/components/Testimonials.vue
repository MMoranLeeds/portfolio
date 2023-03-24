<template>
  <section data-section-testimonials aria-label="Testimonials from previous colleagues">
    <carousel v-bind:per-page="1" v-bind:navigationEnabled="true" paginationActiveColor="#fff" paginationColor="#fff" navigationNextLabel="<svg><use href='#arrow-icon' /></svg>" navigationPrevLabel="<svg><use href='#arrow-icon' /></svg>" v-bind:navigationClickTargetSize="10" v-bind:paginationPadding="0" v-bind:paginationSize="20" v-bind:minSwipeDistance="200">
      <slide v-for="(testimonial, i) in testimonials" v-bind:key="i">
        <blockquote>
          <p v-html="testimonial.bodyContent"></p>
          <h4>{{testimonial.title}}</h4>
        </blockquote>
      </slide>
    </carousel>
  </section>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

const testimonialsModule = namespace("testimonials");

@Component
export default class Testimonials extends Vue {
  @testimonialsModule.Getter testimonials!: Array<string>;
}
</script>