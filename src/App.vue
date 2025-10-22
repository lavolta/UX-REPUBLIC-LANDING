<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { gsap } from 'gsap'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import TransitionComponent from './components/transition-component/TransitionComponent.vue'
import { globalStore } from '@/store'

const mainContent = useTemplateRef('mainContent')
const footerContent = useTemplateRef<InstanceType<typeof FooterComponent>>('footerComponent')

const { height: PageHeight } = useElementSize(mainContent)
const firstLoad = ref(true)

let globalAppGsapContext: gsap.Context | null = null

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
  const footer = footerContent.value

  if (!footer) return

  globalAppGsapContext = gsap.context(() => {
    const footerTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: '#footerComponent',
        start: 'bottom-=50% 50%',
        end: 'bottom+=100% bottom',
        scrub: 3,
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
  if (firstLoad.value) {
    globalStore.setDisplayTransitionPanel(true)
  }
})
onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  if (globalAppGsapContext) {
    globalAppGsapContext.revert()
  }
})
const handleTransitionCompleted = () => {
  firstLoad.value = false
  // globalStore.setDisplayTransitionPanel(false)
}
</script>
<template>
  <TransitionComponent
    :display-transition-component="globalStore.displayTransitionPanel"
    @complet="handleTransitionCompleted"
  />
  <div
    class="content"
    :class="{'first-load': firstLoad}"
  >
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
  </div>
</template>

<style lang="scss" scoped>
#smooth-content {
  overflow: hidden;
}

.content {
  background-color: var(--color-bg-footer);

  &.first-load {
    > * {
      opacity: 0%;
    }
  }
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
