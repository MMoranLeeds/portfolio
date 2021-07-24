<template>
  <div class="person-details">
    <h1>{{ name }}</h1>

    <h2>{{ title }}</h2>

    <p v-html="introduction"></p>

    <ul>
      <li>
        <Icon name="mobile" />

        <a
          v-bind:aria-label="`Call me on ` + contactNumber"
          v-bind:href="`tel:` + contactNumber.replace(/\s+/g, '')"
          >{{ contactNumber }}</a
        >
      </li>

      <li>
        <Icon name="email" />

        <a
          v-bind:href="
            `mailto:` +
            contactEmail +
            `?subject=I%20just%20wanted%20to%20drop%20you%20a%20quick%20email&body=Hi%20Matthew,%0D%0A%0D%0A`
          "
          target="_blank"
          v-bind:aria-label="`Get in touch by email at ` + contactEmail"
          >{{ contactEmail }}</a
        >
      </li>

      <li>
        <Icon name="location" />

        <a
          href="https://www.google.com/maps/place/East+Morton/"
          target="_blank"
          rel="noopener"
          v-bind:aria-label="`I'm currently located in ` + contactAddress"
          >{{ contactAddress }}</a
        >
      </li>

      <li>
        <Icon name="graduate" />

        <button
          type="button"
          v-on:click="celebration()"
          v-bind:disabled="confettiFalling"
          aria-label="Click to celebrate"
          v-tooltip.bottom="'Click to celebrate'"
        >
          {{ degree }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { gsap } from "gsap";

const personalDetailsModule = namespace("personalDetails");

@Component
export default class PersonalDetails extends Vue {
  @personalDetailsModule.Getter name!: string;
  @personalDetailsModule.Getter title!: string;
  @personalDetailsModule.Getter introduction!: string;
  @personalDetailsModule.Getter contactNumber!: string;
  @personalDetailsModule.Getter contactEmail!: string;
  @personalDetailsModule.Getter contactAddress!: string;
  @personalDetailsModule.Getter degree!: string;

  displayContent = gsap.timeline();
  confettiFalling = false;
  $confetti: any;

  celebration(): void {
    this.$confetti.start({
      particles: [
        {
          type: "rect",
        },
      ],
    });
    this.confettiFalling = true;

    setTimeout(() => this.$confetti.stop(), 1500);
    setTimeout(() => (this.confettiFalling = false), 6000);
  }

  animateContent() {
    this.displayContent.play();
  }

  mounted() {
    this.displayContent.from(".person-details > *", {
      duration: 0.75,
      opacity: 0,
      y: 50,
      stagger: 0.25,
    });
    this.animateContent();
  }
}
</script>