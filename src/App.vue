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

import { useElementSize, useWindowSize } from '@vueuse/core'

import { globalStore, transitionStore } from '@/store'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import WelcomeComponent from '@/components/welcome/WelcomeComponent.vue'
import TransitionScreen from '@/components/transition-screen/TransitionScreen.vue'

const mainContent = useTemplateRef('mainContent')
const footerContent = useTemplateRef<InstanceType<typeof FooterComponent>>('footerComponent')

const { height: PageHeight } = useElementSize(mainContent)
const { height: windowHeight } = useWindowSize()

let globalAppGsapContext: gsap.Context | null = null
const scrollSmoother = ref<ReturnType<typeof ScrollSmoother.create> | null>(null)

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

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
    console.log('iphone device')
    // ScrollTrigger.normalizeScroll({
    //   allowNestedScroll: true,
    //   type: 'touch',
    // })
    // ScrollTrigger.config({ ignoreMobileResize: true })
    globalStore.setIsIOS(true)
  }

  const footer = footerContent.value

  if (!footer) return

  globalAppGsapContext = gsap.context(() => {
    const footerTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#footerComponent',
        start: () => window.innerWidth < 768 ? 'top 75%' : 'bottom-=50% 50%',
        end: () => window.innerWidth < 768 ? 'bottom 90%' : 'bottom+=100% bottom',
        scrub: 3,
        once: true,
      },
    })

    footerTimeLine.to('#footerComponent', {
      translateY: 0,
      ease: 'power1',
      duration: 4000,
    }, '<')

    const footerContact = document.querySelector('#footerComponent .contact')
    const footerNav = document.querySelector('#footerComponent .footer-container')

    if (!footerContact && !footerNav) return

    footerTimeLine.fromTo(footerContact,
      { opacity: 0, translateY: 100 },
      { opacity: 1, translateY: 0, duration: 1000, ease: 'power1' },
      '>',
    )

    footerTimeLine.fromTo(footerNav,
      { opacity: 0, translateY: 100 },
      { opacity: 1, translateY: 0, duration: 2000, ease: 'power1' },
      '<',
    )
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())

  if (globalAppGsapContext) {
    globalAppGsapContext.revert()
  }
})

const handleScrollOnTopWindow = () => {
  if (!window) return
  window.scroll({
    top: 0,
    behavior: 'instant',
  })
  if (!scrollSmoother.value) return
  scrollSmoother.value.scrollTop(0)
  scrollSmoother.value.refresh()
}

const handleEndTransitionEnterAnimation = () => {
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
          id="footerComponent"
          ref="footerComponent"
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

.footer {
  position: relative;
  z-index: 9;
  transform: translateY(-100%);
}
</style>
