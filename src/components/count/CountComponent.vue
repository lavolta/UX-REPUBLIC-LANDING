<script lang="ts" setup>
import NumberFlow, { continuous } from '@number-flow/vue'
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef, watch, ref } from 'vue'
import type { CountItem } from '@/interfaces'
const props = defineProps<{
  theme: 'white' | 'black'
  items: CountItem[]
}>()
const displayItems = ref<CountItem[]>(props.items)

const firstView = ref(true)
const target = useTemplateRef<HTMLDivElement>('countSection')
const targetIsVisible = useElementVisibility(target)

const handleSwitchValueToDisplay = () => {
  displayItems.value = props.items.map((item) => {
    return {
      title: item.title,
      value: item.value,
      displayValue: item.value,
      suffix: item.suffix,
    }
  })
}

watch(() => props.items, () => {
  handleSwitchValueToDisplay()
})

watch(targetIsVisible, (newValue) => {
  if (newValue && firstView.value) {
    firstView.value = false
    setTimeout(() => {
      handleSwitchValueToDisplay()
    }, 500)
  }
})
</script>
<template>
  <div
    ref="countSection"
    :class="['count', `count--${theme}`]"
  >
    <div
      v-for="(item, key) in displayItems"
      :key="`count-item-${key}`"
      class="count__item"
    >
      <div

        :class="['count-item', `count-item--${theme}`]"
      >
        <p>{{ item.title }}</p>
        <NumberFlow
          :value="item.displayValue"
          :plugins="[continuous]"
          :suffix="item.suffix"
          :format="{ minimumIntegerDigits: 2 }"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.count {
  display: grid;
  grid-template-columns: repeat(1,1fr);
  width: 100%;
  gap: 0;

  @include mq(tablet) {
    grid-template-columns: repeat(2,1fr);
  }

  @include mq(desktop) {
    grid-template-columns: repeat(4,1fr);
    gap: 2.70rem;
  }

}

.count-item {
    padding: 1.5625rem 0;
    border-top: solid 1px var(--color-btn-border);
    color: var(--color-white);

    @include mq(desktop) {
      padding-bottom: 0;
    }

    &--black {
      color: var(--color-text-dark);

      number-flow-vue::part(digit),
      number-flow-vue::part(suffix) {
        color: var(--color-text-dark);
      }
    }

    > p {
      margin: 0;
      margin-bottom: 0;
      font-size: 1rem;
      font-weight: 200;
      letter-spacing: 1px;
      letter-spacing: 10%;
      line-height: 119%;
      text-transform: uppercase;

      @include mq(desktop) {
        margin-bottom: 0.875rem;
      }
    }
}

number-flow-vue::part(digit),
number-flow-vue::part(suffix) {
  color: var(--color-white);
  font-size: 4rem;
  font-weight: 200;
  line-height: 1;
}

@include mq(desktop) {
  number-flow-vue::part(digit),
  number-flow-vue::part(suffix) {
  color: var(--color-white);
  font-size: 6.25rem;
  font-weight: 200;
  line-height: 1;
  }
}
</style>
