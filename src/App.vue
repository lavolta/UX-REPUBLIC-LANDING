<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  useTemplateRef,
} from 'vue'
import { useHead } from '@unhead/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { useElementSize, useWindowSize } from '@vueuse/core'
import { globalStore, transitionStore } from '@/store'

import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import WelcomeComponent from '@/components/welcome/WelcomeComponent.vue'
import TransitionScreen from '@/components/transition-screen/TransitionScreen.vue'

const mainContent = useTemplateRef('mainContent')
const { height: PageHeight } = useElementSize(mainContent)
const { height: windowHeight } = useWindowSize()

const scrollSmoother = ref<ReturnType<typeof ScrollSmoother.create> | null>(null)

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

watch(PageHeight, () => {
  globalStore.setPageHeight(PageHeight.value)
})

watch(windowHeight, () => {
  globalStore.setWindowHeight(windowHeight.value)
  document.documentElement.style.setProperty('--window-height', `${windowHeight.value}px`)
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
    { name: 'robots', content: 'noindex, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})

onMounted(() => {
  window.addEventListener('touchend', () => {
    globalStore.setPageHeight(window.innerHeight)
  })
  scrollSmoother.value = ScrollSmoother.create({
    smooth: 1,
    smoothTouch: 1,
  })
  globalStore.setScrollSmoother(scrollSmoother.value)

  if (/iP(ad|hone)/.test(navigator.userAgent)) {
    globalStore.setIsIOS(true)
  }
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})

const handleScrollOnTopWindow = () => {
  if (window && window.scrollY === 0) return
  ScrollTrigger.disable()
  if (window) {
    window.scroll({
      top: 0,
      behavior: 'instant',
    })
  }
  if (scrollSmoother.value) {
    scrollSmoother.value.scrollTop(0)
    scrollSmoother.value.refresh()
  }
  ScrollTrigger.enable()
}

const handleEndTransitionEnterAnimation = () => {
  transitionStore.setStateTransition('forceCloseNavMenu', true)
  handleScrollOnTopWindow()
  transitionStore.setStateTransition('readyToNextPage', true)
}
const handleEndTransitionLeave = () => {
  transitionStore.resetTransitionState()
}
</script>

<template>
  <TransitionScreen
    v-if="transitionStore.state.displayTransitionScreen"
    :play-transition-leave="transitionStore.state.displayTransitionLeave"
    @start="transitionStore.setStateTransition('transitionInProgress', true)"
    @end-transition-enter="handleEndTransitionEnterAnimation"
    @end-transition-leave="handleEndTransitionLeave"
  />

  <WelcomeComponent
    v-if="transitionStore.state.welcomeAnimation"
    @start="handleScrollOnTopWindow"
  />
  <HeaderComponent />
  <div class="main-section">
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main
          ref="mainContent"
        >
          <RouterView />
        </main>
        <FooterComponent
          class="footer"
        />
        <div />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#smooth-content {
  overflow: hidden;
}

.main-section {
  position: relative;

  main {
    position: relative;
    z-index: 10;

    // margin-bottom: 684px;
    background-color: var(--color-bg);
  }
}
</style>
