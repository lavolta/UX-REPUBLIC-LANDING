<script lang="ts" setup>
import NumberFlow, { continuous } from '@number-flow/vue'
import { useElementVisibility } from '@vueuse/core'
import { useTemplateRef, watch, ref } from 'vue'
interface ItemsNumber {
  title: string
  value: number
  displayValue: number
  suffix: string
}
const items = ref<ItemsNumber[]>([
  { title: 'Années', value: 12, displayValue: 10, suffix: '' },
  { title: 'Collaborateurs', value: 100, displayValue: 50, suffix: '+' },
  { title: 'Projets', value: 950, displayValue: 800, suffix: '+' },
  { title: 'Pays', value: 4, displayValue: 0, suffix: '' },
])

const firstView = ref(true)
const target = useTemplateRef<HTMLDivElement>('countSection')
const targetIsVisible = useElementVisibility(target)

const handleSwitchValueToDisplay = () => {
  items.value = items.value.map((item) => {
    return {
      title: item.title,
      value: item.value,
      displayValue: item.value,
      suffix: item.suffix,
    }
  })
}

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
    class="count"
  >
    <div
      v-for="(item, key) in items"
      :key="`count-item-${key}`"
      class="count__item"
    >
      <div

        class="count-item"
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

    @include mq(desktop) {
      padding-bottom: 0;
    }

    border-top: solid 1px var(--color-btn-border);

    >p {
      margin: 0;
      margin-bottom: 0.875rem;
      color: var(--color-white);
      font-size: 1rem;
      font-weight: 200;
      letter-spacing: 1px;
      letter-spacing: 10%;
      line-height: 119%;
      text-transform: uppercase;
    }
}

number-flow-vue::part(digit),
number-flow-vue::part(suffix) {
color: var(--color-white);
font-size: 6.25rem;
font-weight: 200;
line-height: 1;
}
</style>
