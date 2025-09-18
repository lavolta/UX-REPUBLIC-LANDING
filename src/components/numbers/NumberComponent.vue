<script setup lang="ts">
import NumberItem from '@/components/numbers/NumberItem.vue'
</script>

<template>
  <div class="stats-container">
    <div class="stats-row">
      <NumberItem
        title="Xperience"
        :value="12"
      />

      <NumberItem
        title="Collaborateurs"
        :value="100"
      />

      <NumberItem
        title="Projets"
        :value="950"
      />

      <NumberItem
        title="Pays"
        :value="4"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats-container {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 2rem 1rem 0;

  @include mq(tablet) {
    padding: 6rem 3rem 0;
  }

  @include mq(desktop) {
    padding: 12.875rem 5.625rem 0;
  }
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: start;
  justify-content: center;
  width: 100%;
  gap: 1.5rem;
  column-gap: 0.625rem;
  background-color: var(--color-bg-dark);
  text-align: center;

  :deep(.stat-item) {
    grid-column: span 12;
  }

  @include mq(tablet) {
    gap: 2rem;
    column-gap: 0.625rem;

    :deep(.stat-item) {
      grid-column: span 6;
    }
  }

  @include mq(desktop) {
    gap: 2.6875rem;

    :deep(.stat-item) {
      grid-column: span 3;
    }
  }
}

@include mq(mobile-small) {
  .stats-container {
    padding: 1.5rem 0.75rem 0;
  }

  .stats-row {
    gap: 1rem;
    column-gap: 0.5rem;
  }
}
</style>
