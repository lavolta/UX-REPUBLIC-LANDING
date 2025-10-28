<script lang="ts" setup>
import { onMounted, useTemplateRef, onUnmounted } from 'vue'
import { gsap } from 'gsap'

interface IniniteScrollTextPropsInterface {
  revealTextOnScroll?: boolean
  id: string
}
const props = withDefaults(defineProps<IniniteScrollTextPropsInterface>(), {
  revealTextOnScroll: true,
})

const infiniteScrollContent = useTemplateRef('infiniteScrollContent')
let infiniteScrollContentContext: gsap.Context | null = null
onMounted(() => {
  infiniteScrollContentContext = gsap.context(() => {
    const infiniteScrollContentTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: `#${props.id}`,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 4,
      },
    })
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
  })
})
onUnmounted(() => {
  if (infiniteScrollContentContext) {
    infiniteScrollContentContext.revert()
    infiniteScrollContentContext.clear()
    infiniteScrollContentContext.kill()
  }
})
</script>
<template>
  <div
    :id
    class="infinite-scroll-content"
  >
    <div ref="infiniteScrollContent">
      <div
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

  > div {
    transform: translateY(100%);
  }

  &__inner {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    animation: scroll 60s linear infinite;
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
