<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import {
  defineExpose,
  ref,
  computed,
  useTemplateRef,
  onMounted,
  onUnmounted,
  withDefaults,
} from 'vue'
import { gsap } from 'gsap'
interface CanvasProps {
  color?: string
}
const props = withDefaults(defineProps<CanvasProps>(), { color: '#22262D' })

let canvasGsapContext: gsap.Context | null = null
const canvasGsapTimeline = ref<gsap.core.Timeline | null>(null)

const { width, height } = useWindowSize()

const canvasRef = useTemplateRef('canvasRef')
const canvasPoints = computed(() => {
  return [
    { x: 0, y: 0 },
    { x: width.value, y: 0 },
    { x: width.value, y: height.value },
    { x: 0, y: height.value },
  ]
})

const draw = () => {
  console.log('draw')
  const canvas = canvasRef.value
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  context.clearRect(0, 0, width.value, height.value)
  context.beginPath()
  context.moveTo(canvasPoints.value[0].x, canvasPoints.value[0].y)
  for (let index = 1; index < canvasPoints.value.length; index++) {
    context.lineTo(canvasPoints.value[index].x, canvasPoints.value[index].y)
  }
  context.closePath()
  context.fillStyle = props.color
  context.fill()
}

onMounted(() => {
  canvasGsapContext = gsap.context(() => {
    const timeline = gsap.timeline({
      onUpdate: draw,
    })
    timeline.fromTo(
      [canvasPoints.value[3], canvasPoints.value[2]],
      { y: 0 },
      {
        y: height.value,
        ease: 'quart.inOut',
        duration: 1,
        stagger: 0.1,
      },
    )
    canvasGsapTimeline.value = timeline
  })
})
onUnmounted(() => {
  if (canvasGsapContext) {
    canvasGsapContext.revert()
    canvasGsapContext.clear()
    canvasGsapContext.kill()
  }
})
defineExpose({
  canvasGsapTimeline,
})
</script>
<template>
  <canvas
    ref="canvasRef"
    :width
    :height
  />
</template>
