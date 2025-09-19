<script setup lang="ts">
import NumberItem from '@/components/numbers/NumberItem.vue'
</script>

<template>
  <div class="stats">
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
</template>

<style lang="scss" scoped>
.stats {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  @include mq(desktop) {
    flex-wrap: nowrap;
    gap: 0 2.6875rem;
  }

  .stat-item {
    width: 100%;

    @include mq(desktop) {
      width: 25%;
    }
  }
}
</style>
