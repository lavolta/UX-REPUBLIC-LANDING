<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import ContactSection from '../contact/ContactSection.vue'
import FooterNav from './FooterNav.vue'
</script>

<template>
  <footer class="footer-section">
    <ContactSection />
    <FooterNav />
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  // bottom: 0;
  // left: 0;
  width: 100%;
  background: var(--color-bg-dark);

  @include mq(desktop) {
    max-width: 1260px;
    padding: 0 90px;
  }
}
</style>
