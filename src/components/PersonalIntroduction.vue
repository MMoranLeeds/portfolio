<template>
  <aside>
    <h1>{{personalDetails.name}}</h1>

    <h2>{{personalDetails.title}}</h2>

    <p v-html="personalDetails.introduction"></p>

    <ul>
      <li>
        <svg>
          <use href="#mobile-icon" />
        </svg>

        <a aria-label="Call me on 07759 952 035" href="tel:07759952035">{{personalDetails.contactNumber}}</a>
      </li>

      <li>
        <svg>
          <use href="#email-icon" />
        </svg>

        <a
          href="mailto:matthewdm@live.co.uk?subject = Hi Matthew&amp;body = I just wanted to drop you a quick email..."
          target="_blank"
          aria-label="Get in touch by email at matthewdm@live.co.uk"
        >{{personalDetails.contactEmail}}</a>
      </li>

      <li>
        <svg>
          <use href="#location-icon" />
        </svg>

        <a
          href="https://www.google.com/maps/place/East+Morton/"
          target="_blank"
          rel="noopener"
          aria-label="I'm currently located in East Morton"
        >{{personalDetails.contactAddress}}</a>
      </li>

      <li>
        <svg>
          <use href="#degree-icon" />
        </svg>
        <span>
          {{personalDetails.degree}}
        </span>
      </li>
    </ul>
  </aside>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "PersonalIntroduction",
  data() {
    return {
      personalDetails: [],
      axiosError: false,
      handleLoading: true,
    };
  },
  methods: {
    fetchPersonalIntroduction: function () {
      const baseURI = "/statics/personal-introduction.json";
      this.$http
        .get(baseURI)
        .then((result) => {
          this.personalDetails = result.data;
        })
        .catch((error) => {
          console.log(error);
          this.axiosError = true;
        })
        .finally(() => {
          this.handleLoading = false;
          this.personalInformationAnimation();
        });
    },
    personalInformationAnimation: function () {
      gsap.from("aside > *", {
        duration: .75,
        opacity: 0,
        y: 50
      });
    },
  },
  created() {
    this.fetchPersonalIntroduction();
  },
};
</script>