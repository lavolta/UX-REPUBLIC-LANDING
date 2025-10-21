<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { gsap } from 'gsap'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { globalStore } from './store'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'
const mainContent = useTemplateRef('mainContent')
const { height: PageHeight } = useElementSize(mainContent)
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
watch(PageHeight, () => {
  ScrollTrigger.refresh()
})
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
  <div class="main-section">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main
          ref="mainContent"
          :style="{'margin-bottom': `${globalStore.footerHeight}px`}"
        >
          <RouterView />
        </main>
        <div />
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style lang="scss" scoped>
#smooth-content {
  overflow: hidden;

  >div {
    height: 1px;
    background-color: var(--color-bg-footer);
  }
}

.main-section {
  position: relative;
  z-index: 30;
  pointer-events: none;

  main {
    // margin-bottom: 684px;
    background-color: var(--color-bg);
  }
}
</style>
