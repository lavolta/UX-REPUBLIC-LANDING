<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterNav from '@/components/footer/FooterNav.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'
import { useTemplateRef } from 'vue'
const footerSection = useTemplateRef('footerSection')
const footerMask = useTemplateRef('footerMask')

let footergsapContext: gsap.Context | null = null

onMounted(() => {
  footergsapContext = gsap.context(() => {
    ScrollTrigger.create({
      trigger: footerSection.value,
      start: 'top 80%', // quand le haut du footer atteint 70% de l’écran
      scrub: 2,
      onEnter: () => {
        // lancer la timeline à ce moment
        gsap.to(footerMask.value, {
          bottom: '100%',
          duration: 1,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        console.log('onLeaveBack')
        gsap.to(footerMask.value, {
          bottom: '0%',
          duration: 1,
          ease: 'power2.out',
        })
      },
      toggleActions: 'play reverse play reverse',
    })
  })
})
onUnmounted(() => {
  if (footergsapContext) {
    footergsapContext.revert()
  }
})
</script>

<template>
  <footer
    ref="footerSection"
    class="footer-section"
  >
    <div class="footer-section__inner">
      <div
        ref="footerMask"
        class="footer-section__mask"
      />
      <ContactSection />
      <FooterNav />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  $c: &;

  position: relative;
  width: 100%;
  overflow: hidden;
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

    @include mq(desktop) {
      padding: 28.125rem 0 4rem;
    }
  }

  &__mask {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left:0;
    width: 100%;

    // background-color: red;

    background-color: var(--color-bg);
    }
}
</style>
