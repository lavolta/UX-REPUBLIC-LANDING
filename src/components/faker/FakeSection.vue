<template>
  <section>
    <slot />
  </section>
</template>
<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-bg-dark);
}
</style>
