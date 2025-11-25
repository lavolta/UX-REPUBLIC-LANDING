<script lang="ts" setup>
import { onMounted, useTemplateRef, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type ThemeType = 'default' | 'white'
type AnimationDirectionType = 'normal' | 'reverse'

interface IniniteScrollTextPropsInterface {
  revealTextOnScroll?: boolean
  theme?: ThemeType
  id: string
  duration?: string
  direction?: AnimationDirectionType
}
const props = withDefaults(defineProps<IniniteScrollTextPropsInterface>(), {
  revealTextOnScroll: true,
  theme: 'default',
  duration: '60',
  direction: 'normal',
})

const infiniteScrollContent = useTemplateRef('infiniteScrollContent')
const infiniteInner = useTemplateRef('infiniteInner')

let infiniteScrollContentContext: gsap.Context | null = null

onMounted(() => {
  if (infiniteInner.value) {
    infiniteInner.value.style.setProperty('--animation-duration', `${props.duration}s`)
    infiniteInner.value.style.setProperty('--animation-direction', props.direction)
  }
  if (!props.revealTextOnScroll) return
  infiniteScrollContentContext = gsap.context(() => {
    const infiniteScrollContentTimeline = gsap.timeline()
    const contentpictos = gsap.utils.toArray(`#${props.id} .infinite-scroll-content__picto`) as HTMLOrSVGElement[]

    infiniteScrollContentTimeline.to(infiniteScrollContent.value, {
      translateY: '10%',
      duration: 200,
      ease: 'power1',
    }, '>')
    contentpictos.forEach((picto) => {
      infiniteScrollContentTimeline.to(
        picto,
        {
          rotation: 90,
          duration: 250,
          ease: 'power1',
        },
        '<',
      )
    })
    const scrolltriger = ScrollTrigger.create({
      trigger: `#${props.id}`,
      start: 'top 80%',
      end: 'bottom 50%',
      scrub: 4,
      animation: infiniteScrollContentTimeline,
    })

    setTimeout(() => {
      scrolltriger.refresh()
    }, 3000)
  })
})
onUnmounted(() => {
  if (infiniteScrollContentContext) {
    infiniteScrollContentContext.revert()
  }
})
</script>
<template>
  <div
    :id="id"
    class="infinite-scroll-content"
    :class="{'static': !props.revealTextOnScroll, 'white': props.theme === 'white'}"
  >
    <div ref="infiniteScrollContent">
      <div
        ref="infiniteInner"
        class="infinite-scroll-content__inner"
      >
        <div
          v-for="item in 4"
          :key="`infinite-scroll-content-${item}`"
          class="infinite-scroll-content__item"
        >
          <span>
            <slot />
          </span>

          <div
            v-if="$slots.icon"
            class="infinite-scroll-content__picto"
          >
            <slot name="icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.infinite-scroll-content {
  $c: &;

  overflow: hidden;

  --translate-value: calc(-25% - 5px);

  @include mq(desktop) {
    --translate-value: calc(-25% - 7px);
  }

  @keyframes scroll {
    to {
      transform: translateX(var(--translate-value));
    }
  }

  &.white {
    #{$c}__item {
      color: var(--color-white);

      span {
        color: var(--color-white);
        line-height: 1;
      }
    }
    #{$c}__picto {
      color: var(--color-white);
    }
  }

  &.static {
    > div {
    transform: translateY(0%);
    }
    #{$c}__item {
      span {
        line-height: 1;
      }
    }
  }

  > div {
    transform: translateY(100%);
  }

  &__inner {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    animation: scroll var(--animation-duration) linear infinite;
    animation-direction: var(--animation-direction);
    gap: 1rem;
  }

  &__item {
    display: flex;
    align-items: center;

    span {
      display: block;
      color: var(--color-bg-footer);
      font-size: 3.1rem;
      font-weight: 400;
      line-height: 0;
      text-align: center;
      white-space: nowrap;

      @include mq(smartphone) {
        font-size: 3.7rem;
      }

      @include mq(desktop) {
        font-size: 12.075rem;
      }
    }

  }

  &__picto {
    position: relative;
    top: 3px;
    margin-left: 1rem;
    color: var(--color-bg-footer);

    svg {
      display: block;
      flex: 0 0 auto;
      width: 3rem;

      @include mq(desktop) {
        width: 9rem;
      }
    }

    @include mq(desktop) {
      top: 18px;
      margin-left: 2rem;
    }
  }
}
</style>
