<script lang="ts">
import { defineComponent, provide, reactive, ref } from 'vue'

export default defineComponent({
  name: 'AccordionMenu',
  setup() {
    const active = ref<number | null>(null)
    const count = ref(0)

    provide('AccordionMenu', reactive({
      active,
      count,
    }))
  },
})
</script>

<template>
  <ul class="accordion">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.accordion {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
