import { onBeforeRouteLeave } from 'vue-router'
import { globalStore } from '@/store'
import { watch } from 'vue'

export function usePageTransition() {
  onBeforeRouteLeave(() => {
    globalStore.setDisplayTransitionPanel(true)
  })
  // onMounted(() => {
  //   if (globalStore.readyToSwitchTransitionPanel) {
  //     globalStore.setDisplayTransitionPanel(false)
  //   }
  // })
  watch(() => globalStore.readyToSwitchTransitionPanel, (readyToSwitch: boolean) => {
    if (readyToSwitch) {
      globalStore.setDisplayTransitionPanel(false)
    }
  })
  return {
  }
}
