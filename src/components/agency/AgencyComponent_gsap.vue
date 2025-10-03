<script lang="ts" setup>
import { agencyItems } from '@/data'
import { globalStore } from '@/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ref,
  onMounted,
} from 'vue'
import AgencyItemComponent from './AgencyItemComponent.vue'

const props = defineProps<{ idAgency: string }>()
const items = ref(agencyItems)

const itemActif = ref(0)
const agencyTimeline = gsap.timeline()

const handleClickOnNavButton = (key) => {
  itemActif.value = key
  agencyTimeline.tweenTo(`${props.idAgency}-background-${key}`)
}

onMounted(() => {
  const agencyBackgrounds = gsap.utils.toArray(`#${props.idAgency} .agency__bg > img`)
  console.log('agencyBackgrounds', agencyBackgrounds.length)
  agencyBackgrounds.forEach((background, backgroundIndex) => {
    const transitionDuration = 2
    const fakeTransisionDuration = 3
    const label = `${props.idAgency}-background-${backgroundIndex}`
    const timeToInsertLabel = backgroundIndex === 0 ? 0 : (backgroundIndex * transitionDuration) + fakeTransisionDuration

    agencyTimeline.addLabel(label, timeToInsertLabel)
      .to(background, {
        opacity: 1,
        scale: 1,
        duration: transitionDuration,
      }).to({}, { duration: fakeTransisionDuration }, '>')
  })
  ScrollTrigger.create({
    animation: agencyTimeline,
    trigger: `#${props.idAgency}`,
    start: 'top top',
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    fastScrollEnd: false,
    end: () => '+=' + (agencyBackgrounds.length * window.innerHeight),
    onEnter() {
      globalStore.setForcedHideHeader(true)
    },
    onUpdate(self) {
      const progress = self.progress
      const totalSlides = agencyBackgrounds.length
      const index = Math.floor(progress * totalSlides)
      itemActif.value = Math.min(totalSlides - 1, Math.max(0, index))
    },
    onEnterBack() {
      globalStore.setForcedHideHeader(true)
    },
    onLeave() {
      globalStore.setForcedHideHeader(false)
    },
    onLeaveBack() {
      globalStore.setForcedHideHeader(false)
    },
  })
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
        width="100%"
        height="100%"
        fill="none"
      >
        <defs>
          <mask
            id="agencyMask"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <rect
              fill="black"
              x="0"
              y="0"
              width="1"
              height="1"
            />
            <g transform="scale(0.000524934, 0.001007049)">
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
      <img
        v-for="(image, key) in items"
        :key="`agency-bg-image-${key}`"
        :src="image.picture.href"
        :alt="image.picture.alt"
        :style="{zIndex: 1 * key}"
      >
    </div>
    <div class="agency__inner">
      <AgencyItemComponent
        v-for="(item, key) in items"
        :key="`${idAgency}agency-item-${key}`"
        :actif="itemActif === key"
        :item="item"
      />
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
            @click="handleClickOnNavButton(key)"
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

  &__mask {
    position: absolute;
    z-index: 2;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: hidden;
  }

  &__bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    mask: url("#agencyMask");

    > img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      transform: scale(1.1);
      opacity: 0%;
      object-fit: cover;

      &:first-child {
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
    position: absolute;
    z-index: 7;
    bottom: 0;
    left: 0;
    width: 100%;

    ul {
      display: flex;
      gap: 1rem;
      width: 100%;
      max-width: var(--max-section-width);
      margin: 0 auto;
      padding: 0 1rem;
      overflow-y: auto;

      @include mq(desktop) {
        padding: 0;
        gap: 9.375rem;
        overflow-y: none;
      }
    }
  }

  &__cta {
        padding: 2rem;
        background-color: transparent;
        color: var(--agency-text-color);
        font-size: 1rem;
        font-weight: 200;
        letter-spacing: 1px;
        line-height: 1.125rem;
        text-align: center;

        @include mq(desktop) {
          padding: 1.25rem 0;
          font-size: .75rem;
        }

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

  --animation: all ease-in-out .5s;
  --title-color: var(--agency-text-color);

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
        opacity: 100%;
      }
    }
  }

  &.out {
    #{$c}__title {
      >span {
        transform: translateY(-3%);
      }
    }
  }

  >div {
    padding: 0 2rem;

    @include mq(desktop) {
      padding: 0;
    }
  }

  &__title {
    margin-bottom: 6.375rem;
    overflow: hidden;
    color: #C5C5C5;
    font-size: 6rem;
    font-weight: 400;
    line-height: 10rem;

    @include mq(desktop) {
      font-size: 14.375rem;
      font-weight: 400;
      line-height: 22.4rem;
    }

    > span {
      display: block;
      transform: translateY(-3%);
      transition: var(--animation);
      opacity: 0%;
    }

    // text-shadow: 0 0 2px var(--color-background);
  }

  &__address,
  &__email {
    color: #C5C5C5;
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
