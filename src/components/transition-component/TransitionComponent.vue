<script setup lang="ts">
import StickyLogoHover from '@/components/logo/StickyLogoHover.vue'
import { onMounted, onUnmounted, useTemplateRef, ref, watch, defineEmits, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { gsap } from 'gsap'
import { globalStore } from '@/store'
interface CoordinatePointInterface { x: number, y: number }

let transistionComponentGSAPContext: gsap.Context | null = null
let transitionComponentTimeline: gsap.core.Timeline | null = null

const emit = defineEmits<{
  (e: 'complet'): void
  (e: 'reverseCompleted'): void
}>()

const props = defineProps<{
  displayTransitionComponent: boolean
}>()

watch(() => props.displayTransitionComponent, (newValue) => {
  if (!transitionComponentTimeline) return
  if (newValue) {
    disabled.value = false
    transitionComponentTimeline.play()
  }
  else {
    transitionComponentTimeline.reverse()
  }
})
const { width, height } = useWindowSize()
const canvasRef = useTemplateRef<HTMLCanvasElement>('tcCanvas')
const reverse = ref(false)
const disabled = ref(true)

let canvasContext: CanvasRenderingContext2D | null = null

const canvasShapePoints = computed<CoordinatePointInterface[]>(() => {
  return [
    { x: 0, y: 0 },
    { x: width.value, y: 0 },
    { x: width.value, y: height.value },
    { x: 0, y: height.value },
  ]
})

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvasContext = canvas.getContext('2d')

  if (!canvasContext) return
  canvasContext.clearRect(0, 0, width.value, height.value)
  canvasContext.beginPath()
  canvasContext.moveTo(canvasShapePoints.value[0].x, canvasShapePoints.value[0].y)
  for (let index = 1; index < canvasShapePoints.value.length; index++) {
    canvasContext.lineTo(canvasShapePoints.value[index].x, canvasShapePoints.value[index].y)
  }
  canvasContext.closePath()
  canvasContext.fillStyle = '#22262D'
  canvasContext.fill()
}

onMounted(() => {
  transistionComponentGSAPContext = gsap.context(() => {
    const timeline = gsap.timeline({
      onUpdate: draw,
      onComplete: () => {
        console.log('onComplete')
        reverse.value = true
        emit('complet')
        globalStore.setReadyToSwitchTransitionPanel(true)
      },
      onStart: () => {
        console.log('start')
      },
      onReverseComplete: () => {
        reverse.value = false
        disabled.value = true
        emit('reverseCompleted')
      },
      paused: true,
    })
    timeline.fromTo(
      [canvasShapePoints.value[3], canvasShapePoints.value[2]],
      { y: 0 },
      {
        y: height.value,
        ease: 'quart.inOut',
        duration: 1,
        stagger: 0.1,
      },
    ).fromTo('.tc__logo',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power1' },
    )
    transitionComponentTimeline = timeline
  })
})

onUnmounted(() => {
  if (transistionComponentGSAPContext) {
    transistionComponentGSAPContext.revert()
    transistionComponentGSAPContext.clear()
    transistionComponentGSAPContext.kill()
  }
})
</script>

<template>
  <div
    class="tc"
    :class="{'disabled': disabled}"
  >
    <canvas
      ref="tcCanvas"
      :width
      :height
      class="tc__bg"
    />
    <div class="tc__inner">
      <StickyLogoHover
        class="tc__logo"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tc  {
  display: flex;
  position: fixed;
  z-index: 999;
  align-items: stretch;
  width: 100%;
  height: 100svh;
  inset: 0;

  &.disabled {
    display: none;
  }

  &__inner {
    display: flex;
    position: relative;
    z-index: 2;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
    padding: 0.8rem 0;
  }

  &__bg {
    position: absolute;
    z-index: 1;
    inset:0;
    width: 100%;
    height: 100%;
  }

  &__logo {
    display: inline-block;
    position: relative;
    z-index: 99;

    // opacity: 0%;
    pointer-events: none;
  }

  &__btn {
    position: relative;
    z-index:2;
    background-color: transparent;
  }

}
</style>
