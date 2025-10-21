import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export function usePagePosition() {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { y: windowScrollY } = useWindowScroll()

  const endOfPage = computed(() => {
    const tolerance = 20 // marge de tolérance en px
    const scrollPosition = windowScrollY.value + windowHeight.value
    const pageHeight = document.documentElement.scrollHeight

    return scrollPosition >= pageHeight - tolerance
  })

  return {
    endOfPage,
    windowHeight,
    windowWidth,
  }
}
