<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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
  <div id="smooth">
    <HeaderComponent />
    <main class="main-section">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>

<style lang="scss" scoped>
.main-section {
  position: relative;
  z-index: 10;
  margin-bottom: 30.1125rem;
  background-color: var(--color-bg);

  // @include mq(smartphone) {
  // margin-bottom: 30.1125rem;
  // }

  @include mq(desktop) {
    margin-bottom: 42.3125rem;
  }
}
</style>
