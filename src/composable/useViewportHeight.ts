import { onMounted, onUnmounted } from 'vue'

export function useViewportHeight() {
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  onMounted(() => {
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !window.MSStream
    setVH()

    if (isIOS) {
      window.addEventListener('resize', setVH)
      window.addEventListener('orientationchange', setVH)
    }
  })

  onUnmounted(() => {
    const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !window.MSStream
    if (isIOS) {
      window.removeEventListener('resize', setVH)
      window.removeEventListener('orientationchange', setVH)
    }
  })
}
