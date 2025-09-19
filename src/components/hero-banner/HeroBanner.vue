<template>
  <section class="hero">
    <video
      poster="/images/hero/lion.png"
      preload="none"
      class="hero__bg"
      autoplay
      muted
      loop
    >
      <source
        src="/images/hero/lion.mp4"
        type="video/mp4"
        media="(min-width: 1260px)"
      >
    </video>
  </section>
</template>
<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 80vh;

  &__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  }

  @include mq(desktop) {
    &__bg {
      object-position: 50% 50%;
    }
  }
}
</style>
