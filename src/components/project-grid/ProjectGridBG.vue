<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core'
import { useTemplateRef, watch, ref } from 'vue'
const firstView = ref(true)
const animeBg = ref(false)

const target = useTemplateRef<HTMLDivElement>('gridBgContainer')
const { top } = useElementBounding(target)

watch(top, (newvalue) => {
  if (newvalue <= 0 && firstView.value) {
    firstView.value = false
    animeBg.value = true
  }
})

</script>
<template>
  <div
    ref="gridBgContainer"
    aria-hidden="true"
    class="project-grid-bg"
  >
    <div>
      <div class="project-grid-bg__inner">
        <span
          v-for="i in 6"
          :key="i"
          aria-hidden="true"
          :class="{'show': animeBg}"
          :style="{transitionDelay: `${i * 10 * 2}ms`}"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scopde>
.project-grid-bg {
    position: absolute;
    z-index: 1;
    top: 0; left: 0;
    width: 100%;
    height: 100%;

  > div {
    width: 100%;
    max-width: 1260px;
    height: 100%;
    margin: 0 auto;
  }

  &__inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 1rem;

    @include mq(smartphone) {
      padding: 0 2rem;
    }

    @include mq(desktop) {
      display: grid;
      grid-gap: 0 2.85%;
      grid-template-areas:
      "s1 s2 . . s3 s4 . . s5 s6 . .";
      justify-content: inherit;
      padding: 0;
    }

    > span {
      height: 0;
      transition: height cubic-bezier(0.4, 0, 0.2, 1) 3s;

      &.show {
        height: 100%;
      }

      &:nth-child(3) {
        display: none;

        @include mq(tablet) {
          display: block;
        }
      }

      &:nth-child(4),
      &:nth-child(5) {
        display: none;

        @include mq(desktop) {
          display: block;
        }
      }

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          grid-area: s#{$i};
          border-right: 1px solid var(--color-border);
        }
      }
    }
  }
}
</style>
