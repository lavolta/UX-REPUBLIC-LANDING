<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterSection from '@/components/footer/FooterComponent.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bowlby+One&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Questrial&family=Carattere&family=Dawning+of+a+New+Day&family=VT323&family=Zen+Loop&display=swap',
    },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

onMounted(() => {
  ScrollSmoother.create({
    smooth: 1,
  })
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    type: 'touch',
  })
})
onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})

</script>
<template>
  <HeaderComponent />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main class="main-section">
        <RouterView />
      </main>
      <FooterSection />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// #smooth {
//   overflow: hidden;
// }

.main-section {
  position: relative;
  z-index: 10;
  background-color: var(--color-bg);
}
</style>
