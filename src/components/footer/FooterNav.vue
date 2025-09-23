<!-- components/footer/FooterNav.vue -->
<script setup lang="ts">
import LinkedinIcon from '../icons/LinkedinIcon.vue'
import YoutubeIcon from '../icons/YoutubeIcon.vue'

const footerLinks = [
  { text: 'Informations Légales', url: '#legal' },
  { text: 'Politique de Confidentialité (RGPD)', url: '#privacy' },
  { text: 'Mentions légales', url: '#mentions' },
]

const socialLinks = [
  { icon: LinkedinIcon, url: '#linkedin' },
  { icon: YoutubeIcon, url: '#youtube' },
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

      <!-- Right: nav + social -->
      <div class="footer__nav">
        <nav
          class="footer__nav-links"
          aria-label="Liens de pied de page"
        >
          <a
            v-for="link in footerLinks"
            :key="link.url"
            :href="link.url"
            class="footer__nav-links--style"
          >
            {{ link.text }}
          </a>
        </nav>

        <div class="footer__nav-socials">
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
    justify-content: flex-start;
    gap: 6rem;
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
    gap: 3rem;
    }

    &-links {
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;

      @include mq(desktop) {
        display: flex;
        flex-direction: row;
        gap: 2.5rem;
        align-items: center;
        margin-top: 0;
      }

      &--style {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.19;
        text-decoration: none;
        white-space: nowrap;

        // &:hover {
        //   opacity: 100%;
        //   text-decoration: underline;
        // }
      }
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
