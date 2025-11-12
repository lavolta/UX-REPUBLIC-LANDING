<!-- components/footer/FooterSection.vue -->
<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import FooterNav from '@/components/footer/FooterNav.vue'
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { globalStore } from '@/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const footerSection = useTemplateRef('footerSection')

let footerGsapContext: gsap.Context | null = null

const { height: footerHeight } = useElementBounding(footerSection)

watch(footerHeight, (newValue) => {
  globalStore.setFooterHeight(newValue)
})
onMounted(() => {
  footerGsapContext = gsap.context(() => {
    const footerTimeLine = gsap.timeline()
    footerTimeLine.fromTo(footerSection.value, {
      translateY: '-100%',
    }, {
      translateY: '0%',
      ease: 'power1',
      duration: 4000,
    }, '<')

    footerTimeLine.fromTo('#footer-contact',
      { opacity: 0, translateY: 100 },
      { opacity: 1, translateY: 0, duration: 1000, ease: 'power1' },
      '>',
    )

    footerTimeLine.fromTo('#footer-nav',
      { opacity: 0, translateY: 100 },
      { opacity: 1, translateY: 0, duration: 2000, ease: 'power1' },
      '<',
    )

    const test = ScrollTrigger.create({
      trigger: '#footerSection',
      start: () => window.innerWidth < 768 ? `top top ` : 'bottom-=50% 50%',
      end: () => window.innerWidth < 768 ? `bottom-=20% bottom` : 'bottom+=100% bottom',
      scrub: 3,
      animation: footerTimeLine,
      once: true,
    })
    setTimeout(() => {
      test.refresh()
    }, 3000)
  })
})
onUnmounted(() => {
  if (footerGsapContext) {
    footerGsapContext.revert()
  }
})
</script>

<template>
  <footer
    id="footerSection"
    ref="footerSection"
    class="footer-section"
  >
    <div class="footer-section__inner">
      <div>
        <ContactSection
          id="footer-contact"
        />
      </div>
      <FooterNav
        id="footer-nav"
      />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-section {
  $c: &;

  position: relative;
  z-index: 9;

  // transform: translateY(-100%);
  background: var(--color-bg-footer);

  .contact {
    margin-bottom: 3.5rem;
  }

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 2rem 1rem;
    overflow: hidden;

    @include mq(smartphone) {
      padding: 4rem 2rem;
    }

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

#footer-contact,
#footer-nav {
  transform: translateY(-100px);
  opacity: 0%;
}
</style>
