<template>
  <div
    aria-hidden="true"
    class="project-grid-bg"
  >
    <div>
      <div class="project-grid-bg__inner">
        <span
          v-for="i in 6"
          :key="i"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scopde>
.project-grid-bg {
    position: absolute;
    z-index: 1;
    top: 0; left: 0;
    width: 100%;
    height: 100%;

  > div {
    width: 100%;
    max-width: 1260px;
    height: 100%;
    margin: 0 auto;
  }

  &__inner {
    display: grid;
    grid-gap: 0 2.85%;
    grid-template-areas:
    "s1 s2 . . s3 s4 . . s5 s6 . .";
    grid-template-columns: repeat(12, 1fr);
    width: 100%;
    height: 100%;

    > span {
      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          grid-area: s#{$i};
          border-right: 1px solid #2F3339;
        }
      }
    }
  }
}
</style>
