<script lang="ts" setup>
import { onMounted, useTemplateRef, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import BgCanvas from '@/components/bg-canvas/BgCanvas.vue'

const { tm } = useI18n()
const items = tm('header.navigation')
const mobileNavComponentTimeline = gsap.timeline()
const mobileNav = useTemplateRef('mobileNav')
const mobileNavItems = useTemplateRef('mobileNavItems')
const bgCanvas = useTemplateRef('bgCanvas')

const defineMobileTimeLine = () => {
  console.log('11')
  if (!mobileNav.value) {
    return
  }
  console.log('22')
  console.log('bgCanvas.value', bgCanvas.value.canvasGsapTimeline)
  if (bgCanvas.value?.canvasGsapTimeline) {
    console.log('bgCanvas.value.canvasGsapTimeline', bgCanvas.value.canvasGsapTimeline)
    mobileNavComponentTimeline.add(bgCanvas.value.canvasGsapTimeline)
  }
  const menuNavItems = gsap.utils.toArray(mobileNavItems.value)
  if (mobileNavItems.value) {
    menuNavItems.forEach((menuNavItem, index) => {
      mobileNavComponentTimeline.fromTo(menuNavItem, {
        opacity: 0,
        y: 10,
        duration: 0.25,
      }, { opacity: 1, y: 0 }, index === 0 ? '<+1' : `<+0.${index}`)
    })
  }
}

onMounted(async () => {
  await nextTick()
  defineMobileTimeLine()
})

defineExpose({
  mobileNavComponentTimeline,
})
</script>
<template>
  <div
    ref="mobileNav"
    class="mobile-nav"
  >
    <BgCanvas
      ref="bgCanvas"
      class="mobile-nav__canvas"
    />
    <div class="mobile-nav__inner">
      <nav class="mobile-nav__list">
        <ul>
          <li
            v-for="(item, key) in items"
            :key="`mobile-nav-item-${key}`"
            ref="mobileNavItems"
          >
            <a
              :href="item.href"
              class="button"
            >
              {{ item.content }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mobile-nav {
  position: fixed;
  z-index: 100;
  opacity: 0%;

  // transform: translateY(-110%);
  background-color: transparent;
  background-color: var(--color-bg);
  inset: 0;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
  }

  &__list {
    li {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      .button {
        display: block;
      }
    }
  }

  &__canvas {
    position: fixed;
    top:0; left:0;
    width:100%;
    height: 100svh;
  }
}
</style>
