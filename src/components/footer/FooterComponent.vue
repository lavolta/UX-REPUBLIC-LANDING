<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import { watch } from 'vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterNav from '@/components/footer/FooterNav.vue'
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { globalStore } from '@/store'
const footerSection = useTemplateRef('footerSection')
const { height: footerHeight } = useElementBounding(footerSection)
watch(footerHeight, (newValue) => {
  globalStore.setFooterHeight(newValue)
})
</script>

<template>
  <footer
    ref="footerSection"
    class="footer-section"
  >
    <div class="footer-section__inner">
      <div>
        <ContactSection />
      </div>
      <FooterNav />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  $c: &;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: transform ease-in .3s;
  background: var(--color-bg-footer);

  .contact {
    margin-bottom: 3.5rem;
  }

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 4rem 2rem;
    overflow: hidden;

    @include mq(desktop) {
      padding: 28.125rem 0 4rem;
    }
  }

  &__title {
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;
    transform: translateY(100%);
    color: var(--color-bg-footer);

  }
}
</style>
