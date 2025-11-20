<script lang="ts" setup>
import { agencyItems } from '@/data'
import { globalStore } from '@/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResizeObserver } from '@vueuse/core'

import {
  ref,
  onMounted,
  onUnmounted,
  useTemplateRef,
  withDefaults,
  watch,
  nextTick,
} from 'vue'
import AgencyItemComponent from './AgencyItemComponent.vue'

const props = withDefaults(defineProps<{
  sliderTiming?: number
  idAgency: string
}>(), {
  sliderTiming: 3000,
})

const agencySlider = useTemplateRef('agencySection')
const agencyNav = useTemplateRef('agencyNav')

const agencySize = ref({
  width: 0,
  height: 0,
})

const mobileSvgScale = ref({
  x: 0,
  y: 0,
})

const svgMobileExportSize = {
  width: 430,
  height: 844,
}

useResizeObserver(agencySlider, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  mobileSvgScale.value.x = width / svgMobileExportSize.width
  mobileSvgScale.value.y = height / svgMobileExportSize.height
  agencySize.value.width = width
  agencySize.value.height = height
})
const items = ref(agencyItems)

const itemActif = ref(0)

const sliderInterval = ref<null | number>(null)

let agencyGsapContext: gsap.Context | null = null
let agencyGsapScrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null

const isInView = ref(true)
const displayNav = ref(false)

const handleClickOnNavButton = (key) => {
  disabledAutoSlide()
  itemActif.value = key
  globalStore.scrollSmoother?.scrollTo(`#${props.idAgency}`, true)
  globalStore.setForcedHideHeader(true)
  activeAutoSlide()
}

const handleChangingSliderIndex = () => {
  const temp = itemActif.value + 1
  if (temp === items.value.length) {
    itemActif.value = 0
  }
  else {
    itemActif.value = temp
  }
}

const activeAutoSlide = () => {
  if (sliderInterval.value) {
    clearInterval(sliderInterval.value)
    sliderInterval.value = null
  }
  sliderInterval.value = setInterval(() => {
    handleChangingSliderIndex()
  }, props.sliderTiming)
}

const disabledAutoSlide = () => {
  if (sliderInterval.value) {
    clearInterval(sliderInterval.value)
    sliderInterval.value = null
  }
}

watch(itemActif, async (newIndex) => {
  await nextTick()
  const navEl = agencyNav.value
  if (!navEl) return

  const buttons = navEl.querySelectorAll('.agency__cta')
  const activeBtn = buttons[newIndex] as HTMLElement | undefined
  if (!activeBtn) return

  // Calcul de la position à atteindre
  const navRect = navEl.getBoundingClientRect()
  const btnRect = activeBtn.getBoundingClientRect()

  // Différence entre le centre du bouton et le centre du conteneur
  const offset = btnRect.left - navRect.left

  navEl.scrollTo({
    left: navEl.scrollLeft + offset,
    behavior: 'smooth',
  })
})

onMounted(() => {
  agencyGsapContext = gsap.context(() => {
    if (!agencyGsapScrollTrigger) {
      agencyGsapScrollTrigger = ScrollTrigger.create({
        trigger: `#${props.idAgency}`,
        id: props.idAgency,
        start: 'top top',
        end: '+=60% top',
        onEnter() {
          globalStore.setForcedHideHeader(true)
          isInView.value = true
          displayNav.value = true
          activeAutoSlide()
        },
        onEnterBack() {
          globalStore.setForcedHideHeader(true)
          displayNav.value = true
          activeAutoSlide()
        },
        onLeave() {
          globalStore.setForcedHideHeader(false)
          displayNav.value = false
          disabledAutoSlide()
        },
        onLeaveBack() {
          globalStore.setForcedHideHeader(false)
          disabledAutoSlide()
        },
      })
    }
  })
})

onUnmounted(() => {
  if (agencyGsapContext) {
    agencyGsapContext.revert()
  }
})
</script>

<template>
  <section
    :id="idAgency"
    ref="agencySection"
    class="agency"
  >
    <p class="agency__sectiontitle section-title">
      Un réseau international <br>au service de vos projets
    </p>
    <div
      class="agency__mask"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="agencySize.width"
        :height="agencySize.height"
        fill="none"
        preserveAspectRatio="none"
        :viewBox="`0 0 ${agencySize.width} ${agencySize.height}`"
      >
        <defs>
          <mask
            id="agencyMaskMobile"
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
          >
            <rect
              fill="black"
              x="0"
              y="0"
              width="1"
              height="1"
            />
            <g>
              <path
                d="M46 444C41.5 466.5 11.5 592.5 1 625V823.914C81.5 814.828 117.5 674.5 124.5 655.5C131.5 681.5 143 720.5 161.5 759.5C180 798.5 194.5 815 205 826C215.5 837 231.5 844.5 242 845C268.5 847 292.5 806 305.58 778.97C318.659 751.939 341 640 345.5 622C348.5 604.5 355.5 614 371 631C387.4 652.2 417.833 685.5 431 699.5V676C427.5 671.833 419.5 662 415.5 656C410.5 648.5 410.5 647 414.5 648.5C417.7 649.7 426.833 656.667 431 660V494C419.333 475.167 394.5 435.1 388.5 425.5C392.5 402.3 418.5 292.167 431 240V1H363C350.6 35.8 309 208.333 290 290C290 290.667 281.2 279.3 246 228.5C180.5 135 160.5 120.5 127 106C93.5 91.5 84 99.5003 72.4341 115.459C60.8682 131.418 52.5 165 50 198C47.5 231 62.5 322 63.5 329C64.5 336 62 355 61 361C60 367 50.5 421.5 46 444Z"
                :transform="`scale(${mobileSvgScale.x}, ${mobileSvgScale.y})`"
                fill="white"
              />
            </g>
          </mask>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="agencySize.width"
        :height="agencySize.height"
        :viewBox="`0 0 ${agencySize.width} ${agencySize.height}`"
        fill="none"
      >
        <defs>
          <mask
            id="agencyMask"
          >
            <rect
              fill="black"
              x="0"
              y="0"
              width="1"
              height="1"
            />
            <g>
              <path
                d="M1280.15 0H815.483C818.351 20.9568 826.603 74.8569 836.664 122.803C851.227 176.272 855.86 182.736 848.579 266.759C809.526 518.828 751.277 747.982 728.11 820.841C704.943 893.7 687.071 883.711 661.256 857.858C635.441 832.005 546.082 613.427 501.734 439.505C457.385 265.583 417.008 208.001 312.425 216.227C207.842 224.453 184.675 323.753 157.536 531.167C130.398 738.58 109.878 820.841 95.3162 871.96C80.754 923.079 64.206 953.633 45.0104 952.457C26.0502 951.297 4.50688 900.263 0.154144 889.952L0 889.587V993H350.155C354.788 980.661 368.026 943.644 375.307 929.542C377.293 933.067 400.46 973.61 411.713 993H963.753C973.681 975.96 1002.81 889.587 1020.68 841.993C1033.39 879.598 1067.45 958.333 1082.9 993H1469.46C1469.68 992.217 1470.65 988.534 1472.77 980.073C1476.08 967.147 1514.47 772.072 1516.45 763.259C1518.44 754.445 1519.76 732.117 1532.34 737.993C1544.92 743.869 1578.67 772.072 1593.24 788.524C1607.8 804.976 1674.65 865.496 1686.57 877.248C1698.48 888.999 1768.64 944.231 1786.52 955.983C1804.39 967.734 1824.91 984.186 1829.54 980.661C1834.17 977.135 1793.14 931.892 1773.94 914.265C1754.74 896.638 1664.72 808.502 1671.34 803.214C1677.96 797.925 1713.04 823.191 1762.69 862.559C1812.33 901.926 1858 936.593 1905 967.734V715.665C1755.41 573.472 1632.29 403.076 1597.21 358.42C1601.44 318.935 1649.72 103.021 1673.33 0H1382.08L1362.23 94.5994L1280.15 0Z"
                fill="white"
              />
            </g>
          </mask>
        </defs>
      </svg>
    </div>
    <div class="agency__bg">
      <template
        v-for="(item, key) in items"
        :key="`agency-bg-image-${key}`"
      >
        <picture
          v-if="item.pictureM"
          :style="{zIndex: 1 * key}"
        >
          <source
            :srcset="item.picture.href"
            media="(width >= 600px)"
          >
          <img
            :src="item.pictureM.href"
            :alt="item.picture.href"
            :class="{'actif': itemActif === key}"
            loading="lazy"
          >
        </picture>
        <img
          v-else
          :src="item.picture.href"
          :alt="item.picture.href"
          :style="{zIndex: 1 * key}"
          :class="{'actif': itemActif === key}"
          loading="lazy"
        >
      </template>
    </div>
    <div class="agency__inner">
      <AgencyItemComponent
        v-for="(item, key) in items"
        :key="`${idAgency}agency-item-${key}`"
        :actif="itemActif === key && isInView"
        :item="item"
      />
    </div>
    <nav
      class="agency__nav"
      :class="{'actif': displayNav}"
    >
      <div>
        <ul ref="agencyNav">
          <li
            v-for="(item, key) in items"
            :key="`agency-nav-item-${key}`"
          >
            <button
              class="agency__cta"
              :class="{'actif': key === itemActif}"
              @click="handleClickOnNavButton(key)"
            >
              <span>
                {{ item.title }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>

<style lang="scss" scoped>

.agency {
  --animation-duration: all cubic-bezier(0.68, -0.55, 0.27, 1.55) .3s;
  --animation: transform ease-in-out 1s;

  position: relative;
  width: 100%;
  height: var(--window-height);
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-text-dark);

  @include mq(desktop) {
    height: 100vh;
  }

  &__mask {
    position: absolute;
    z-index: 2;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: hidden;

    >svg {
      display: block;

      &:first-child {
        @include mq(desktop) {
          display: none;
        }
      }

      &:last-child {
        display: none;

        @include mq(desktop) {
          display: block;
        }
      }
    }
  }

  &__bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    mask-image: url("#agencyMaskMobile");
    mask-size: 100% 100%;
    mask-position: center;

    /* Pour Safari */
    -webkit-mask: url("#agencyMaskMobile");
    mask-repeat: no-repeat;
    -webkit-mask-size: cover;
    -webkit-mask-position: center;

    @include mq(desktop) {
      -webkit-mask: url("#aagencyMask");
      mask-image: url("#agencyMask");
    }

    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--window-height);
      transform: scale(1.1);
      transition: var(--animation);
      opacity: 0%;
      object-fit: cover;

      &.actif {
        transform: scale(1);
        opacity: 100%;
      }
    }
  }

  &__sectiontitle {
    display: block;
    position: absolute;
    z-index: 10;
    top: 3.125rem;
    left: 50%;
    width: 100%;
    max-width: var(--max-section-width);
    padding: 0 2rem;
    transform: translateX(-50%);
    color: var(--color-text-dark);

    @include mq(desktop) {
      padding: 0;
      color: var(--color-text-dark);
    }
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
    display: flex;
    position: absolute;
    z-index: 7;
    bottom: 0;
    left: 0;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
    transform: translateY(100%);
    transition: all ease-in .2s;

    &.actif {
      transform: translateY(0);
    }

    @include mq(desktop) {
      justify-content: center;
      padding: 1rem 0;
    }

    > div {
      position: relative;
      margin: 0 auto;
      padding: 0.5rem 1rem;
      overflow: hidden;
      border-radius: 99rem;

      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        opacity: 100%;
        background: rgb(24 28 35 / 40%);
        backdrop-filter: blur(2px);
        inset: 0;
      }
    }

    ul {
      display: flex;
      position: relative;
      z-index: 2;
      justify-content: flex-start;
      width: 100%;
      margin: 0 auto;
      overflow-y: auto;
      gap: 0;

      @include mq(desktop) {
        justify-content: center;
        max-width: var(--max-section-width);
        padding: 0;
        overflow-y: none;
        gap: 1rem;
      }
    }
  }

  &__cta {
        position: relative;
        padding: 0.5rem 1rem;
        overflow: hidden;
        transition: all ease-in .2s;
        border-radius: 99rem;
        background-color: transparent;

        // background-color: rgb(197 197 197 / 100%);
        color: var(--color-text);
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: 1px;
        line-height: 1.125rem;
        text-align: center;

        @include mq(desktop) {
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
        }

        span {
          display: block;
          position: relative;
          z-index: 2;
        }

        &::after {
          content: '';
          display: block;
          position: absolute;
          z-index: 1;
          width: 100%;
          transform: translateY(calc(100% + 2px));
          transition: all ease-in .2s;
          background-color: white;
          inset: 0;
        }

        &:hover {
          @include mq(desktop) {
            color: var(--color-text-dark);

            &::after {
              transform: translateY(0);
            }
          }
        }

        &.actif,
        &:hover {
          font-weight: 700;
          cursor: pointer;
        }

        &.actif {
          color: var(--color-text-dark);

          &::after {
            transform: translateY(0);
          }
        }
  }

}

</style>
