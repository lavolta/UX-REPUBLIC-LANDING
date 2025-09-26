<script lang="ts" setup>
import { agencyItems } from '@/data'
import {
  ref,
  computed,
  onMounted,
  watch,
  useTemplateRef,

} from 'vue'
import {
  useWindowSize,
  useElementVisibility,
  useElementBounding,
  useWindowScroll,
  useThrottleFn,
} from '@vueuse/core'

const items = ref(agencyItems)
const { height: windowHeight } = useWindowSize()

const agencySection = useTemplateRef('agencySection')
const agencySectionInView = useElementVisibility(agencySection)
const { y: windowsYScroll } = useWindowScroll()
const { top: agencySectionTop } = useElementBounding(agencySection)

const itemActif = ref(0)
const prevActif = ref(0)
const hasMounted = ref(false)
const inTransition = ref(false)
const out = ref(false)
const SPEED_PX_PER_S = 1400

const distancePx = computed(() =>
  Math.abs(itemActif.value - prevActif.value) * windowHeight.value,
)
const isAgencySectionFitToOfTheScreen = computed(() => {
  return !(Math.abs(agencySectionTop.value) > 1)
})
const snapSectionToTop = useThrottleFn(() => {
  if (!window) return
  const offset = agencySectionTop?.value // distance entre le haut de la section et le haut du viewport
  window.scrollTo({
    top: windowsYScroll.value + offset, // aligne le haut de la section à 0
    behavior: 'smooth',
  })
}, 300)

const pickRandomThemeIndex = (exclude: number | null) => {
  let n = 1 + Math.floor(Math.random() * THEME_COUNT) // 1..5
  while (exclude !== null && n === exclude) {
    n = 1 + Math.floor(Math.random() * THEME_COUNT)
  }
  return n
}
const setThemeForActifItem = () => {
  const idx = pickRandomThemeIndex(lastThemeIdx.value)
  lastThemeIdx.value = idx
  activeTheme.value = `theme-${idx}`
}
watch(agencySectionInView, (newState) => {
  console.log('agencySectionInView :', newState)
  if (newState) {
    // snapSectionToTop()
  }
})
watch(itemActif, (newIndex, oldIndex) => {
  prevActif.value = oldIndex ?? 0
  setThemeForActifItem()
})

const durationSec = computed(() => {
  if (!hasMounted.value) return 0
  const raw = distancePx.value / SPEED_PX_PER_S
  const min = 0.18
  const max = 1.2
  return Math.min(max, Math.max(min, raw))
})

const setActifItem = (key: number) => {
  if (key === itemActif.value) {
    return
  }
  if (!isAgencySectionFitToOfTheScreen.value) {
    snapSectionToTop()
  }
  if (inTransition.value) {
    return
  }
  inTransition.value = true
  out.value = true
  setTimeout(() => {
    itemActif.value = key
    activeTilt.value = randomTilt()
    inTransition.value = false
    out.value = false
  }, 10)
}

const randomTilt = (min = -10, max = 10, excludeAbsBelow = 2): number => {
  let n = 0
  do {
    n = Math.floor(Math.random() * (max - min + 1)) + min // entier inclusif
  } while (Math.abs(n) < excludeAbsBelow) // évite -1,0,1 pour que ça se voie
  return n
}

const activeTilt = ref(0)
const handleClickOnAgencySection = () => {
  console.log('click')
  let tempActifItem = itemActif.value + 1
  if (tempActifItem > items.value.length - 1) {
    tempActifItem = 0
  }
  setActifItem(tempActifItem)
}

const THEME_COUNT = 5

const activeTheme = ref<string>('theme-1')
const lastThemeIdx = ref<number | null>(null)

onMounted(() => {
  hasMounted.value = true
  activeTilt.value = randomTilt()
})
</script>
<template>
  <section
    ref="agencySection"
    class="agency"
  >
    <p class="agency__sectiontitle section-title">
      Un réseau international <br>au service de vos projets
    </p>
    <div
      class="agency__inner"
      @click="handleClickOnAgencySection"
    >
      <div
        v-for="(item, key) in items"
        :key="`agency-item-${key}`"
        class="agency-item"
        :data-theme="item.theme"
        :class="{ actif: key === itemActif, out: out && key === itemActif }"
      >
        <h2 class="agency-item__title">
          <span
            :style="{

            }"
          >
            {{ item.title }}
          </span>
        </h2>
        <div>
          <p class="agency-item__address">
            {{ item.address }}
          </p>
          <a
            v-if="item.email"
            :href="`mailto:${item.email}`"
            class="agency-item__email"
          >
            {{ item.email }}
          </a>
        </div>
      </div>
    </div>
    <div class="agency__pictures">
      <div
        :style="{
          transform: `translateY(-${itemActif * 100}vh)`,
          transitionDuration: `${durationSec.toFixed(3)}s`,
        }"
      >
        <div
          v-for="(item, imgKey) in items"
          :key="`agency-picture-item-${imgKey}`"
          class="agency__picture"
        >
          <img
            :src="item.picture.href"
            :alt="item.picture.alt"
            :style="{
              transform: imgKey === itemActif ? `rotate(${activeTilt}deg)`: 'rotate(0deg)',
              transitionDuration: `${durationSec.toFixed(3)}s`,
              transitionDelay: `100ms`,
            }"
          >
        </div>
      </div>
    </div>
    <nav class="agency__nav">
      <ul>
        <li
          v-for="(item, key) in items"
          :key="`agency-nav-item-${key}`"
        >
          <button
            class="agency__cta"
            :class="{'actif': key === itemActif}"
            @click.prevent="setActifItem(key)"
          >
            {{ item.title }}
          </button>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style lang="scss" scoped>

.agency {
  --animation-duration: all cubic-bezier(0.68, -0.55, 0.27, 1.55) .3s;

  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-text-dark);

  // overscroll-behavior: contain;
  touch-action: pan-x;

  &__sectiontitle {
    display: block;
    position: absolute;
    z-index: 3;
    top: 3.125rem;
    left: 50%;
    width: 100%;
    max-width: var(--max-section-width);
    transform: translateX(-50%);
    color: var(--color-text-dark);
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 7;
    align-items: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;

    &:hover {
      cursor: pointer;
    }

    > .agency-item {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      opacity: 0%;
      text-align: center;

      &.actif {
        display: block;
        opacity: 100%;
      }
    }
  }

  &__pictures {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    > div {
      width: 100%;
      height: max-content;
      transition: var(--animation-duration);
    }
  }

  &__picture {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

    >img {
      display: block;
      position: relative;
      top: -5.275rem;
      transition: var(--animation-duration);
      border-radius: 3px;
    }
  }

  &__nav {
    position: absolute;
    z-index: 7;
    bottom: 0;
    left: 0;
    width: 100%;

    ul {
      display: flex;
      gap: 9.375rem;
      width: 100%;
      max-width: var(--max-section-width);
      margin: 0 auto;
    }
  }

  &__cta {
        padding: 1.25rem 0;
        background-color: transparent;
        font-size: .75rem;
        font-weight: 200;
        letter-spacing: 1px;
        line-height: 1.125rem;
        text-align: center;

        &.actif,
        &:hover {
          font-weight: 700;
          cursor: pointer;
        }
  }

}

.agency-item {
  $c: &;

  opacity: 0%;

  --animation: transform cubic-bezier(0.68, -0.55, 0.27, 1.55) .5s;
  --title-color: #3E434C;

  &[data-theme="theme-2"] {
    #{$c}__title {
      font-family: Carattere, cursive;
    }
  }

  &[data-theme="theme-3"] {
    #{$c}__title {
      font-family: "Bowlby One", sans-serif;
    }
  }

  &[data-theme="theme-4"] {
    #{$c}__title {
      font-family: "Dawning of a New Day", cursive;
    }
  }

  &[data-theme="theme-5"] {
    #{$c}__title {
      font-family: Questrial, sans-serif;
    }
  }

  &[data-theme="theme-6"] {
    #{$c}__title {
      font-family: "VT323", monospace;
    }
  }

  &[data-theme="theme-7"] {
    #{$c}__title {
      font-family: "Zen Loop", cursive;
    }
  }

  &.actif {
    opacity: 100%;
    #{$c}__title {
      >span {
        transform: translateY(0);
      }
    }
  }

  &.out {
    #{$c}__title {
      >span {
        transform: translateY(-100%);
      }
    }
  }

  &__title {
    margin-bottom: 6.375rem;
    overflow: hidden;
    color: var(--title-color);
    font-size: 14.375rem;
    font-weight: 400;
    line-height: 22.4rem;

    > span {
      display: block;
      transform: translateY(-100%);
      transition: var(--animation);
    }

    // text-shadow: 0 0 2px var(--color-background);
  }

  &__address,
  &__email {
    font-weight: 300;
    line-height: 1;
  }

  &__email {
    text-decoration: underline;
  }

  &__address {
    &:not(:only-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
