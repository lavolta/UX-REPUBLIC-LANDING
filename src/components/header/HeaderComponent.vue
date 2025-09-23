<script lang="ts" setup>
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import { useScroll } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const disabledNavMenu = ref(false)
const isMenuOpen = ref(false)

const { y, directions } = useScroll(window)

const handlscroll = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
  closeMenu()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

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

  if (y.value > 0) {
    closeMenu()
  }
})
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <!-- Bouton burger pour mobile/tablette -->
      <button
        class="header__burger"
        :class="{'active': isMenuOpen}"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
      </button>

      <!-- Logo à droite -->
      <StickyLogoHover />

      <!-- Navigation -->
      <nav
        class="header__nav"
        :class="{'hidden': disabledNavMenu, 'active': isMenuOpen}"
      >
        <a
          href="https://jobs.smile.eu/departments/ux-republic"
          target="_blank"
          @click="closeMenu"
        >Rejoignez-nous</a>
        <button
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
  padding: 1rem 2rem;

  &__inner {
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
  }

  // Bouton burger pour mobile/tablette
  &__burger {
    display: block;
    z-index: 30;
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;

    span {
      display: block;
      width: 25px;
      height: 3px;
      margin: 5px 0;
      transition: 0.3s;
      background-color: #ffffffff;
    }

    &.active span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }

    &.active span:nth-child(2) {
      opacity: 0%;
    }

    &.active span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
  }

  &__nav {
    --nav-translate-y: calc(-100% - var(--header-vertical-padding));

    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    background-color: rgb(0 0 0 / 95%);

    &.active {
      transform: translateX(0);
    }

    &.hidden:not(.active) {
      transform: translateX(-100%) translateY(var(--nav-translate-y));
    }

    > a,
    > button {
      display: block;
      margin: 1rem 0;
      padding: 1rem 1.563rem;
      border: none;
      background-color: transparent;
      color: white;
      font-size: 1.5rem;
      font-weight: 200;
      cursor: pointer;

      &:hover {
          border-radius: 2.563rem;
          background-color:#555555;
      }
    }
  }

  .sticky-logo {
    position: relative;
    z-index: 30;

    @include mq(desktop) {
      left: -4.75rem;
    }
  }

  @include mq(desktop) {
    &__inner {
      flex-direction: row;
    }

    &__burger {
      display: none;
    }

    &__nav {
      position: static;
      flex-direction: row;
      align-items: center;
      width: auto;
      height: auto;
      transform: translateX(0);
      transition: transform ease-in .3s;
      background-color: transparent;

      &.hidden {
        transform: translateY(var(--nav-translate-y));
      }

      > a,
      > button {
        margin: 0;
        color: inherit;
        font-size: 1rem;

        // &:not(:last-child) {
        //   margin-right: 3.125rem;
        // }
      }
    }
  }
}
</style>
