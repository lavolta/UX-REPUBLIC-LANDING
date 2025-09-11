<template>
  <div class="card">
    <p>Je suis une card</p>
  </div>
</template>
<style lang="scss" scoped>
.card {
  p {
    font-size: 2rem;

    @include mq(tablet) {
      font-size: 3rem;
    }

    @include mq(desktop) {
      font-size: 6rem;
    }
  }
}
</style>
