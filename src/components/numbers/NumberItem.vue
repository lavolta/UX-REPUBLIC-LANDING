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
    <!-- <div class="title-line" /> -->
    <TitleComponent
      uppercase
      class="stat-title"
    >
      {{ title }}
    </TitleComponent>
    <NumberComponent
      :value="value"
      class="stat-number"
    />
  </div>
</template>

<style lang="scss" scoped>
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @include mq(tablet) {
    align-items: center;
    gap: 1.25rem;
  }

  @include mq(desktop) {
    align-items: flex-start;
    gap: 1.5625rem;
  }
}

.stat-title {
    width: 12.5rem;
    padding-top: 1.75rem;
    border-top: 0.063rem solid #2F3339;
}

// .title-line {
//   width: 100%;
//   height: 1px;
//   margin-bottom: 1rem;
//   background-color: #2F3339;

//   @include mq(tablet) {
//     margin-bottom: 1.25rem;
//   }

//   @include mq(desktop) {
//     margin-bottom: 1.5625rem;
//   }
// }

// Responsive adjustments
@include mq(mobile-small) {
  .stat-item {
    gap: 0.75rem;
  }

  .title-line {
    margin-bottom: 0.75rem;
  }
}
</style>
