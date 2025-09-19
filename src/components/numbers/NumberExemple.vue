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
  display: inline-flex;
  position: relative;
  align-items: center;
  color: var(--color-white);
  font-size: 4rem;
  font-style: normal;
  font-weight: 200;
  line-height: 1;

  @include mq(desktop) {
    font-size: 6.25rem;
  }
}

.number-plus {
  position: relative;
  top: 0.05em;
  align-self: center;
  margin-left: 0.1em;
  font-size: 0.5em;

  @include mq(desktop) {
    top: 0.03em;
    font-size: 0.45em;
  }
}

@include mq(tablet) {
  .number {
    font-size: 5rem;
  }

  .number-plus {
    top: 0.04em;
    font-size: 0.48em;
  }
}

@include mq(mobile) {
  .number {
    font-size: 3.5rem;
  }

  .number-plus {
    top: 0.06em;
    font-size: 0.52em;
  }
}
</style>
