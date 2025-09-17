<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
}

const props = defineProps<Props>()

const formattedNumber = computed(() => {
  return props.value.toString().padStart(2, '0')
})

const showPlus = computed(() => {
  return props.value >= 100
})
</script>

<template>
  <span class="number">
    {{ formattedNumber }}
    <span
      v-if="showPlus"
      class="number-plus"
    >+</span>
  </span>
</template>

<style lang="scss" scoped>
.number {
  display: inline-block;
  color: var(--color-white);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 6.25rem; // 100px
  font-style: normal;
  font-weight: 200;
  letter-spacing: 0%;
  line-height: 2.8125rem; // 45px

  &-plus {
    // margin-left: 0.1em;
    // font-size: 0.8em;
    // vertical-align: super;
  }
}
</style>
