<!-- components/numbers/NumberItem.vue -->
<script setup lang="ts">
import TitleComponent from '@/components/title/TitleComponent.vue'
import NumberComponent from '@/components/numbers/NumberExemple.vue'

interface Props {
  title: string
  value: number
}

defineProps<Props>()
</script>

<template>
  <div class="stat-item">
    <div class="stat-item__inner">
      <TitleComponent
        uppercase
        class="stat-item__title"
      >
        {{ title }}
      </TitleComponent>
      <NumberComponent
        :value="value"
        class="stat-item__number"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stat-item {
  width: 100%;
  border-top: solid 1px var(--color-btn-border);

  &__inner {
    padding: 1.5625rem 0;
  }

  &__title {
    margin-bottom: 2.9375rem;
    letter-spacing: 1px;
  }

  &__number {
    font-size: 3.125rem;
    line-height: 1.4063rem;

    @include mq(desktop) {
      font-size: 6.25rem;
      line-height: 2.8125rem;
    }
  }
}

</style>
