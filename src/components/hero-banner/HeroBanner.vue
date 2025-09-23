<template>
  <section class="hero">
    <picture
      class="hero__img"
      aria-hidden="true"
    >
      <source
        srcset="/images/hero/lion_m.png"
        media="(max-width: 767px)"
      >
      <img
        src="/images/hero/lion.png"
        alt=""
        loading="eager"
      >
    </picture>
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
  height: auto;
  overflow: hidden;

  &__img {
    display: block;
    width: 100%;
    height: 100%;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    @include mq(desktop) {
      height: 80vh;
    }
  }

  &__bg {
    display: none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include mq(desktop) {
      display: block;
    }
  }

  @include mq(desktop) {
    &__bg {
      object-position: 50% 50%;
    }
  }
}
</style>
