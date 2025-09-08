<script setup lang="ts">
const test = defineProps<{
  isVisible: boolean
}>()
console.log('test', test)
</script>

<template>
  <h1>
    You did it!
  </h1>
  <p>
    Visit
    <a
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener"
    >
      vuejs.org
    </a>
    to read the documentation
  </p>
</template>

<style scoped lang="scss">
section {
  h1 {
    color:red;
    font-size: 1.3rem;
  }

  p {
    font-size:1.2rem;
  }
}
</style>
