<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterNav from '@/components/footer/FooterNav.vue'
</script>

<template>
  <footer class="footer-section">
    <div class="footer-section__inner">
      <ContactSection />
      <FooterNav />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--color-bg-footer);
  color: var(--color-text-grey);

  .contact {
    margin-bottom: 3.5rem;
  }

  &__inner {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 2rem;

     @include mq(desktop) {
      max-width: var(--max-section-width);
      padding: 28.125rem 0 4rem;
    }
  }
}
</style>
