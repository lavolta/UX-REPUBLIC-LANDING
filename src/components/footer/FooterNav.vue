<!-- components/footer/FooterNav.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import LinkedinIcon from '../icons/LinkedinIcon.vue'
import YoutubeIcon from '../icons/YoutubeIcon.vue'

const footerLinks = ref([
  { text: 'Informations Légales', url: '#legal' },
  { text: 'Politique de Confidentialité (RGPD)', url: '#privacy' },
  { text: 'Mentions légales', url: '#mentions' },
])

const socialLinks = ref([
  { icon: LinkedinIcon, url: '#linkedin' },
  { icon: YoutubeIcon, url: '#youtube' },
])
</script>

<template>
  <footer
    class="footer-container"
    role="contentinfo"
  >
    <div class="footer-grid">
      <!-- Left: copyright -->
      <div class="copyright-section">
        <p class="copyright-text">
          © 2025 UX Republic — Membre du groupe Smile — Tous droits réservés.
        </p>
      </div>

      <!-- Right: nav + social -->
      <div class="nav-section">
        <nav
          class="footer-nav"
          aria-label="Liens de pied de page"
        >
          <a
            v-for="link in footerLinks"
            :key="link.url"
            :href="link.url"
            class="footer-link"
          >
            {{ link.text }}
          </a>
        </nav>

        <div class="social-icons">
          <a
            v-for="social in socialLinks"
            :key="social.url"
            :href="social.url"
            class="social-link"
          >
            <component
              :is="social.icon"
              class="social-icon"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/* Root container stays full width (so you can keep a full-bleed background) */
.footer-container {
  width: 100%;
  color: var(--color-text);
}

/* Inner wrapper; we'll constrain/center it at desktop+ */
.footer-grid {
  display: grid;
  gap: 1.5rem;
  padding-inline: 1rem; /* small gutters on small screens */
}

.copyright-section {
  text-align: center;
}

.nav-section {
  display: flex;
  flex-direction: column; /* nav on top, icons below */
  gap: 1rem;
  align-items: center;
  color: var(--color-text-grey);
}

.copyright-text {
  color: var(--color-text-grey);
  font-size: 0.875rem;
  font-weight: 300;
}

.footer-nav {
  display: flex;
  flex-direction: column; /* stacked links on mobile */
  gap: 0.75rem;
  align-items: center;
}

.footer-link {
  transition: opacity 0.3s ease;
  opacity: 80%;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.19;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    opacity: 100%;
    text-decoration: underline;
  }
}

.social-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  opacity: 80%;

  &:hover {
    opacity: 100%;
  }
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
  fill: var(--color-text);

  &:hover {
    transform: scale(1.1);
  }
}

/* ==================== TABLET (>=768px) ==================== */
@include mq(tablet) {
  .footer-grid {
    padding-inline: 2rem;
  }

  .copyright-section {
    text-align: left;
  }

  .footer-nav {
    flex-flow: row wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
}

/* ==================== DESKTOP (>=1024px & <1440px) ==================== */

@include mq(desktop) {
  .footer-grid {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 1260px;
    margin-inline: auto;
    padding-inline: 0;
    gap: 2rem;
  }

  .copyright-section {
    text-align: left;
  }

  .nav-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .footer-nav {
    display: inline-flex;
    flex-flow: row wrap;
    gap: 1rem;
  }

  .social-icons {
    gap: 0.75rem;
  }

  .social-icon {
    width: 1.625rem;
    height: 1.625rem;
  }
}

/* ==================== LARGE (>=1440px) ==================== */

/* Requirement: everything on ONE line here */
@include mq(large) {
  .footer-grid {
    align-items: center;
    max-width: 1260px;
    margin-inline: auto;
    gap: 2rem;
  }

  .nav-section {
    flex-direction: row;
    align-items: center;
    gap: 2.6875rem;
  }

  .footer-nav {
    flex-wrap: nowrap;
    gap: 2.6875rem;
  }

  .social-icons {
    gap: 1.0625rem;
    flex-shrink: 0;
  }
}
</style>
