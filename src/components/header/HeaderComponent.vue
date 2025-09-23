<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import { useScroll } from '@vueuse/core'
import { ref, watchEffect, shallowRef, onMounted } from 'vue'

const disabledNavMenu = ref(false)

const windowTarget = shallowRef<Window | null>(null)

const { y, directions } = useScroll(windowTarget)

const handlscroll = () => {
  if (!window) return
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

onMounted(() => {
  windowTarget.value = window
})

watchEffect(() => {
  if (y.value <= 0) {
    disabledNavMenu.value = false
  }
  else if (directions.bottom) {
    disabledNavMenu.value = true
  }
  else if (directions.top) {
    disabledNavMenu.value = false
  }
})

</script>
<template>
  <header class="header">
    <div class="header__inner">
      <StickyLogoHover />
      <nav
        class="header__nav"
        :class="{'hidden': disabledNavMenu}"
      >
        <a
          href="#"
          traget="_blank"
          class="button"
        >Rejoignez-nous</a>
        <button
          class="button"
          @click="handlscroll"
        >
          Contactez-nous
        </button>
      </nav>
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  $c: &;

  --header-vertical-padding: .8125rem;

  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--header-vertical-padding) 0;

  &__inner {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
  }

  &__nav {
    --nav-translate-y: calc(-100% - var(--header-vertical-padding));

    display: flex;
    align-items: center;
    transition: transform ease-in .3s;

    &.hidden {
      transform: translateY(var(--nav-translate-y));
    }

    > a,
    > button {
      padding: 1rem;

      @include mq(desktop) {
        padding: 1rem 1.5625rem;
      }

      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }

  .sticky-logo {
    position: relative;
    left: -4.75rem;
  }
}
</style>
