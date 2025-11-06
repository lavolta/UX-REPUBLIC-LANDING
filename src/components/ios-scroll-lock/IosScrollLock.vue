<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

const setIOSHeight = () => {
  document.documentElement.style.setProperty(
    '--isl-vh',
    window.innerHeight * 0.01 + 'px',
  )
}

const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false

  const ua = navigator.userAgent
  const isIosUa = /iPad|iPhone|iPod/i.test(ua)

  // Cas iPad récent en mode desktop
  const isTouch = navigator.maxTouchPoints && navigator.maxTouchPoints > 1
  const isMacWithTouch = (/Macintosh/i.test(ua) && isTouch) || false

  return isIosUa || isMacWithTouch
}

onMounted(() => {
  if (isIOS()) {
    setIOSHeight()
    window.addEventListener('resize', setIOSHeight)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', setIOSHeight)
})

</script>
<template>
  <div class="isl">
    <div class="isl__scroller">
      <div class="isl__inner">
        <div class="isl__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --isl-vh: 1%;
}

.isl {
  width: 100%;
  height: min(var(--isl-vh) * 100, 100%);
  overflow: hidden;

  @include mq(desktop) {
    height: 100vh;
  }

  &__scroller {
    height: 100%;
    overflow: hidden auto;
    overscroll-behavior: none;
    scrollbar-width: none;
  }

  &__inner {
    height: calc(100% + 1px);
    min-height: calc(100% + 1px);
  }

  &__content {
      position: sticky;
      top: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 1px);
  }
}
</style>
