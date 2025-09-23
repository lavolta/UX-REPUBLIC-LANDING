<!-- components/footer/FooterNav.vue -->
<script setup lang="ts">
import LinkedinIcon from '../icons/LinkedinIcon.vue'
import YoutubeIcon from '../icons/YoutubeIcon.vue'

const socialLinks = [
  { icon: LinkedinIcon, url: 'https://www.linkedin.com/company/ux-republic' },
  { icon: YoutubeIcon, url: 'https://www.youtube.com/@UXREPUBLICParis' },
]
</script>

<template>
  <footer
    class="footer"
    role="contentinfo"
  >
    <div class="footer__inner">
      <!-- Left: copyright -->
      <div class="footer__inner-copyright">
        <p class="footer__inner-copyright--text">
          © 2025 UX Republic — Membre du groupe Smile — Tous droits réservés.
        </p>
      </div>

      <!-- Right: social -->
      <div class="footer__nav">
        <a
          v-for="social in socialLinks"
          :key="social.url"
          :href="social.url"
          class="social-link"
        >
          <component
            :is="social.icon"
            class="footer__nav-socials--icon"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: block;
  width: 100%;

  &__inner {
   display: flex;
   flex-direction: column;

   @include mq(tablet) {
    display: flex;
    flex-direction: column;
   }

   @include mq(desktop) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 43rem;
   }

   &-copyright {
   text-align: left;

   &--text {
    font-size: 0.875rem;
    font-weight: 300;
    }
   }
  }

  &__nav {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @include mq(desktop) {
     justify-content: flex-end;
    }

    &-socials {
      display: flex;
      align-items: center;

      @include mq(desktop) {
        gap: 1.063rem;
      }

      &--icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

   }
}
</style>
