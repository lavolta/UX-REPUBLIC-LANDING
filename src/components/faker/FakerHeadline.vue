<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
}>()
</script>
<template>
  <div class="headline">
    <h2>{{ title }}</h2>
    <p>{{ subtitle }}</p>
  </div>
</template>
<style lang="scss" scoped>
.headline {
  width: 100%;
  max-width: 60vw;
  margin: 0 auto;
  padding: 0 2rem;
  color: var(--color-white);

  h2 {
    margin-bottom: 2rem;
    font-size: 3rem;
  }

  p {
    font-size: 1.125rem;
  }
}
</style>
