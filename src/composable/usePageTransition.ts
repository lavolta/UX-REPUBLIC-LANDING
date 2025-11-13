import {
  onBeforeRouteLeave,
  useRouter,
  useRoute,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'

import { globalStore, transitionStore } from '@/store'
import { watch, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export function usePageTransition() {
  const pendingRoute = ref<RouteLocationNormalizedLoaded | null>(null)
  const router = useRouter()
  const route = useRoute()
  const goNext = ref(false)

  watch(() => transitionStore.state.readyToNextPage, (ready) => {
    if (ready && pendingRoute.value) {
      goNext.value = true
      router.push(pendingRoute.value.fullPath)
      pendingRoute.value = null
    }
  })

  onBeforeRouteLeave(async (to, from, next) => {
    if (goNext.value) {
      goNext.value = false
      next()
    }
    else {
      transitionStore.setStateTransition('displayTransitionScreen', true)
      pendingRoute.value = to
      next(false)
    }
  })

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id) as HTMLElement | null
    if (!target) return
    globalStore.setDisabledObserver(true)
    // ScrollTrigger.disable()
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
    gsap.to(window, {
      scrollTo: {
        y: targetPosition,
      },
      duration: 0.5,
      ease: 'power1',
      onComplete: () => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'instant',
        })
        globalStore.setDisabledObserver(false)
      },
    })
  }

  watch(() => route.hash, (newHash) => {
    if (newHash !== '') {
      scrollToSection(newHash)
    }
  })
  const timeoutid = ref<null | number>(null)
  onMounted(() => {
    if (transitionStore.state.transitionInProgress) {
      transitionStore.setStateTransition('displayTransitionLeave', true)
      if (timeoutid.value) {
        clearTimeout(timeoutid.value)
      }
      timeoutid.value = setTimeout(() => {
        if (route.hash) {
          scrollToSection(route.hash)
        }
      }, 300)
    }
    else {
      if (route.hash) {
        scrollToSection(route.hash)
      }
    }
  })
}
