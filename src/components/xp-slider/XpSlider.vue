<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { useEventListener, useResizeObserver, useThrottleFn, useElementBounding, useWindowScroll } from '@vueuse/core'

import type { PictureInterface } from '@/interfaces'

interface XpItemInterface {
  title: string
  text: string
  mainpicture: PictureInterface
  secondarypicture: PictureInterface
}

// MES REF AUX DIFFERENTS ITEM QUE JE CIBLE
const xpSection = useTemplateRef('xpSection')
const xpbgcontainer = useTemplateRef('xpbgcontainer')

// LES DIFFERENTES VALEURS UTILS POUR LES CALCULE DES POSITIONS
const { top } = useElementBounding(xpSection)
// const { height } = useElementBounding(xpbgcontainer)

const activeSlide = ref(0)

// combien on peut "monter" le bg au max pour voir son bas
// const maxTranslate = computed(() => Math.max(0, bgContainerHeight.value - xpSectionHeight.value))

// vrai si on voit le bas du bg (aligné avec le bas de la section)
// AtBottom = computed(() => translatePosition.value >= (maxTranslate.value - 1))

// accès au scroll de la fenêtre
const { y } = useWindowScroll()
const items = ref<XpItemInterface[]>([
  {
    title: 'Concevoir <br> des expériences<br> performantes',
    text: 'Nous créons des interfaces intuitives et inclusives, centrées sur vos utilisateurs, qui transforment leurs besoins en expériences désirables.',
    mainpicture: {
      alt: '',
      href: '/images/xp-slider/main-picture-1.png',

    },
    secondarypicture: {
      alt: '',
      href: '/images/xp-slider/secondary-picture-1.png',

    },
  },
  {
    title: 'Performance Optimiser vos parcours digitaux',
    text: 'Unir design et data pour éliminer les frictions et saisir les opportunités, maximisant vos conversions et votre retour sur investissement.',
    mainpicture: {
      alt: '',
      href: '/images/xp-slider/main-picture-2.png',

    },
    secondarypicture: {
      alt: '',
      href: '/images/xp-slider/secondary-picture-2.png',

    },
  },
  {
    title: 'Concevoir <br> des expériences<br> performantes',
    text: 'Nous créons des interfaces intuitives et inclusives, centrées sur vos utilisateurs, qui transforment leurs besoins en expériences désirables.',
    mainpicture: {
      alt: '',
      href: '/images/xp-slider/main-picture-1.png',

    },
    secondarypicture: {
      alt: '',
      href: '/images/xp-slider/secondary-picture-1.png',

    },
  },
])

const snapToTop = useThrottleFn(() => {
  const offset = top?.value // distance entre le haut de la section et le haut du viewport
  if (offset && Math.abs(offset) > 1) {
    window.scrollTo({
      top: y.value + offset, // aligne le haut de la section à 0
      behavior: 'smooth',
    })
  }
}, 200)

const bgContainerHeight = ref(0)
const translatePosition = ref(0)

useEventListener(xpSection, 'wheel', (e) => {
  e.stopPropagation()
  e.preventDefault()
  if (Math.abs(top.value) > 1) {
    snapToTop()
  }
  const scollingBottom = e.deltaY > 0
  const tempPos = scollingBottom ? translatePosition.value + 30 : translatePosition.value - 30
  translatePosition.value = tempPos <= 0 ? 0 : tempPos
}, { passive: false })

useResizeObserver(xpbgcontainer, (entries) => {
  const entry = entries[0]
  bgContainerHeight.value = entry.contentRect.height
})

</script>
<template>
  <section
    ref="xpSection"
    class="xp"
  >
    <div class="xp__inner">
      <div class="xp__titlelist">
        <p
          v-for="(item, key) in items"
          :key="`xp-title-item-${key}`"
          class="xp__title"
          :class="{'actif': activeSlide === key}"
        >
          <span>
            0{{ key + 1 }}
          </span>
          <!-- eslint-disable vue/no-v-html -->
          <span v-html="item.title" />
        </p>
      </div>
      <div class="xp__picturelist">
        <div>
          <img
            v-for="(item, key) in items"
            :key="`xp-main-picture-${key}`"
            :src="item.mainpicture.href"
            :alt="item.mainpicture.alt"
          >
        </div>
      </div>
      <div class="xp__textlist">
        <p
          v-for="(item, key) in items"
          :key="`xp-text-item-${key}`"
          :class="{'actif': activeSlide === key }"
        >
          {{ item.text }}
        </p>
      </div>
    </div>
    <div
      class="xp__bg"
    >
      <div
        ref="xpbgcontainer"
        :style="{ }"
      >
        <img
          v-for="(item, key) in items"
          :key="`xp-bg-item-${key}`"
          :src="item.secondarypicture.href"
          :alt="item.secondarypicture.alt"
          :style="{zIndex: 10 * key,transform: activeSlide === key ? `translateY(-${translatePosition}px)` : `translateY(0px)`}"
        >
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.xp {
  --transition-timing: transform linear .5s;

  position: relative;
  width: 100%;
  height: 100vh;

  // background-color: rgb(170 42 42);
  overflow: hidden;

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;

    > div {
      transition: var(--transition-timing);

      > img {
        position: sticky;
        top: 0;
      }
    }
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 2;
    align-items: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;

    // background-color: rgb(69 69 104);

    >div {
      width: 33.33%;
    }
  }

  &__title {
    span {
      display: block;

      &:first-child {
        margin-bottom: 2.1875rem;
        font-size: 1rem;
        font-weight: 200;
      }

      &:last-child {
        font-size: 2.375rem;
        font-weight: 400;
        line-height: 2.8125rem;
      }
    }

    &:not(.actif) {
      display: none;
    }
  }

  &__textlist {
    p {
      width: 100%;
      max-width: 20.25rem;
      margin-left: auto;
      font-size: 1.125rem;
      font-weight: 300;
      line-height: 1.875rem;

      &:not(.actif) {
        display: none;
      }
    }
  }

  &__picturelist {
    position: relative;
    width: 100%;
    padding-top: 33.33%;
    overflow: hidden;
    background-color: yellow;

    > div {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      transition: var(--transition-timing);
    }
  }
}
</style>
