import {
  onBeforeRouteLeave,
  useRouter,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'

import { transitionStore } from '@/store'
import { watch, ref, onMounted } from 'vue'
export function usePageTransition() {
  const pendingRoute = ref<RouteLocationNormalizedLoaded | null>(null)
  const router = useRouter()

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
  onMounted(() => {
    if (transitionStore.state.transitionInProgress) {
      transitionStore.setStateTransition('displayTransitionLeave', true)
    }
  })
}
