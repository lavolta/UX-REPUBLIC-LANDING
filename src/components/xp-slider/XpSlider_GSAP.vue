<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { xpItems } from '@/data'
import { globalStore } from '@/store'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{ id: string }>()
const xpSection = useTemplateRef('xpSection')
const activeSlide = ref(0)
const items = ref(xpItems)
const xpTimeLine = gsap.timeline()

onMounted(() => {
  const xpBackgroundImages = gsap.utils.toArray(`#${props.id} .xp__bg img`)
  const xpImages = gsap.utils.toArray(`#${props.id} .xp__picturelist img`)

  // 1️⃣ Partie scrollée : le fond + images principales
  xpBackgroundImages.forEach((xpBackgroundImage, i) => {
    const centerImage = xpImages[i]

    xpTimeLine
      .addLabel(`slide-${i}`)
      .to(xpBackgroundImage, {
        y: 0,
        duration: 1,
      })
      .to(centerImage, {
        y: 0,
        duration: 1,
      }, '<')
  })
  xpTimeLine.to(xpBackgroundImages, { duration: 0.5 })

  ScrollTrigger.create({
    animation: xpTimeLine,
    trigger: `#${props.id}`,
    start: 'top top',
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    end: () => '+=' + (xpImages.length * window.innerHeight),
    onEnter() {
      globalStore.setForcedHideHeader(true)
    },
    onUpdate(self) {
      const progress = self.progress
      const totalSlides = xpImages.length
      const index = Math.floor(progress * totalSlides)
      activeSlide.value = Math.min(totalSlides - 1, Math.max(0, index))
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
    :id="props.id"
    ref="xpSection"
    class="xp"
  >
    <h2 class="xp__sectiontitle section-title">
      Nos expertises en action
    </h2>
    <div class="xp__inner">
      <div class="xp__titlelist">
        <div
          v-for="(item, key) in items"
          :key="`xp-title-item-${key}`"
          :class="{'actif': activeSlide === key}"
        >
          <p
            class="xp__title"
          >
            <span class="xp__number">
              0{{ key + 1 }}
            </span>
            <!-- eslint-disable vue/no-v-html -->
            <span v-html="item.title" />
          </p>
        </div>
      </div>
      <div class="xp__picturelist">
        <img
          v-for="(item, key) in items"
          :key="`xp-main-picture-${key}`"
          :src="item.mainpicture.href"
          :alt="item.mainpicture.alt"
          :class="{'actif': activeSlide >= key}"
          :style="{zIndex: 10 * key}"
        >
      </div>
      <div class="xp__textlist">
        <div
          v-for="(item, key) in items"
          :key="`xp-text-item-${key}`"
          :class="{'actif': activeSlide === key}"
        >
          <p>
            {{ item.text }}
          </p>
          <div
            class="xp__tags"
          >
            <span
              v-for="(tag, keytag) in item.tags"
              :key="keytag"
              class="button"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="xp__bg"
    >
      <img
        v-for="(item, key) in items"
        :key="`xp-bg-item-${key}`"
        :src="item.secondarypicture.href"
        :alt="item.secondarypicture.alt"
        :class="{'actif': activeSlide >= key}"
        :style="{zIndex: 10 * key}"
      >
    </div>
  </section>
</template>
<style lang="scss" scoped>
.debugger {
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  color: black;
}

.xp {
  $c: &;

  --transition-timing: all cubic-bezier(0.65, 0.05, 0.36, 1) .5s;

  position: relative;
  width: 100%;
  height: 100vh;
  overscroll-behavior: contain;
  overflow: hidden;
  touch-action: pan-x pan-y;

  &__tags {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin-top: 1rem;
    margin-left: auto;
    overflow-x: auto;
    transform: translateY(10px);

    @include mq(desktop) {
      flex-wrap: wrap;
      max-width: 20.25rem;
      overflow-x: none;
    }

    > .button {
      display: block;
      flex: 1 0 auto;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 1rem;
      font-size: 1rem;

      @include mq(desktop) {
        flex: 0 1 auto;
      }
    }
  }

  &__debugger {
    display: none;
    position: fixed;
    z-index: 200;
    right: 0;
    bottom: 0;
    padding: 2rem;
    background-color: white;
    color: black;
  }

  &__sectiontitle {
    position: absolute;
    z-index: 3;
    top: 3.125rem;
    left: 2rem;
    width: 100%;
    max-width: var(--max-section-width);

    @include mq(desktop) {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;

    > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translateY(100%);

      &.actif {
        transform: translateY(0);
      }
    }
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 2;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: var(--max-section-width);
    height: 100%;
    margin: 0 auto;
    padding: 2rem;

    @include mq(desktop) {
      flex-flow: row nowrap;
      flex-wrap: nowrap;
      align-items: center;
      padding: 0;
    }

    // background-color: rgb(69 69 104);

    >div {
      width: 100%;

      @include mq(desktop) {
        width: 33.33%;
      }
    }
  }

  &__titlelist {
    position: relative;
    height: 110px;
    margin-bottom: 2rem;

    > div {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      align-items: center;

      @include mq(desktop) {
        width: 100%;
        height: 100%;
      }

      &.actif {
        display: flex;
      }
    }

    @include mq(desktop) {
      height: auto;
      margin-bottom: 0;
      padding-top: 33.33%;
    }
  }

  &__title {
    span {
      display: block;

      &:last-child {
        font-size: 1.19rem;
        font-weight: 400;
        line-height: 1.41rem;

        @include mq(desktop) {
          font-size: 2.375rem;
          line-height: 2.8125rem;
        }
      }
    }
  }

  &__number {
    position: relative;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 200;

    @include mq(desktop) {
      margin-bottom: 2.125rem;
    }
  }

  &__textlist {
    position: relative;
    height: 11.375rem;

    @include mq(desktop) {
      height: auto;
      padding-top: 33.33%;
    }

    > div {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 2rem;

      &.actif {
        display: flex;
      }

      @include mq(desktop) {
        height: 100%;
        margin-top: 0;
        padding-left: 6.75rem;
      }
    }

    p {
      min-height: 6rem;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1.5rem;

      @include mq(desktop) {
        min-height: auto;
        margin-top: 0;
        margin-left: auto;
        font-size: 1.125rem;
        font-weight: 300;
        line-height: 1.875rem;
      }
    }
  }

  &__picturelist {
    position: relative;
    width: 15rem!important;
    height: 15rem;
    overflow: hidden;

    @include mq(tablet) {
      width: 50%!important;
      height: auto;
      padding-top: 50%;
    }

    @include mq(desktop) {
      width: 33.33%!important;
      padding-top: 33.33%;
    }

    > img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateY(100%);
      border-radius: 3px;

      &.actif {
        transform: translateY(0);
      }
    }

    > div {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
