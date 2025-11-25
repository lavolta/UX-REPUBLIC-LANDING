<script lang="ts" setup>
import { computed, onMounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const buttonTimeLine = gsap.timeline()
const spanLines = useTemplateRef('spanLines')
const ariaLabelBtnToggleNavMenu = computed(() => {
  return props.open ? 'Fermer menu mobile' : 'Ouvrir menu mobile'
})

const initTimeline = () => {
  if (!spanLines.value || spanLines.value.length < 3) {
    return
  }
  const [span1, span2, span3] = spanLines.value
  buttonTimeLine.to([span1, span2, span3], {
    width: 0,
    duration: 0.3,
    ease: 'power1',
    stagger: 0.1,
  }).to(span1, {
    rotation: 45,
    top: 5,
    marginBottom: 0,
    duration: 0,
    backgroundColor: '#181C23',
  }, '>').to(span3, {
    rotation: -45,
    top: -5,
    marginBottom: 0,
    duration: 0,
    backgroundColor: '#181C23',
  }, '<').to([span1, span3], {
    width: 30,
    duration: 0.3,
    ease: 'power1',
    stagger: 0.1,
  }, '>')
}

onMounted(() => {
  initTimeline()
})

defineExpose({
  buttonTimeLine,
})

</script>
<template>
  <button
    class="header__toggle"
    :class="{'header__toggle--open': open}"
    :aria-label="ariaLabelBtnToggleNavMenu"
    @click="emit('click')"
  >
    <span
      v-for="index in 3"
      ref="spanLines"
      :key="`header-toggle-span-line-${index}`"
    />
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  position: relative;
  z-index:200;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  > span {
    display: block;
    position: relative;
    width: 25px;
    height: 2px;
    border-radius: 3px;
    background-color: var(--color-white);

    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }

}
</style>
