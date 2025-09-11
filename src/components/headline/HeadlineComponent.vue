<script lang="ts" setup>
interface Props {
  title: string
  description?: string
}
defineProps<Props>()
</script>

<template>
  <header class="container">
    <h1 class="container__title">
      {{ title }}
    </h1>
    <p
      v-if="description"
      class="container__description"
    >
      {{ description }}
    </p>
  </header>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  &__title {
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }

  &__description {
    font-size: 1.2rem;
  }
}
</style>
