<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
const video = useTemplateRef<HTMLVideoElement>('heroVideo')
onMounted(() => {
  video.value?.play()
})
</script>
<template>
  <section class="hero">
    <video
      ref="heroVideo"
      poster="/images/hero/lion.png"
      preload="none"
      class="hero__bg"
      muted
      playsinline
      loop
    >
      <source
        src="/images/hero/lion.mp4"
        type="video/mp4"
        media="(min-width: 1280px)"
      >
      <source
        src="/images/hero/lion_m.mp4"
        type="video/mp4"
      >
    </video>
  </section>
</template>
<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 9 / 10;
  overflow: hidden;

  @include mq(desktop) {
    height: 78vh;
  }

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% 0%;

    @include mq(desktop) {
      display: block;
      object-position: 50% 50%;
    }
  }
}
</style>
