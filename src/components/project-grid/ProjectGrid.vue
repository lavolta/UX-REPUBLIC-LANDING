<template>
  <section class="project-grid">
    <div class="project-grid__inner">
      <div
        aria-hidden="true"
        class="project-grid__bg"
      >
        <span
          v-for="i in 6"
          :key="i"
          aria-hidden="true"
        />
      </div>
      <p class="project-grid__title section-title">
        Nos réussites
      </p>
      <div class="project-grid__list">
        <div
          class="project-item project-item--first"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-1.gif"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">01</span>
                <h3 class="project-item__title">
                  Schmidt
                </h3>
                <p class="project-item__text">
                  Accélérer la stratégie métier par la méthode du Design Sprint.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="project-item project-item--second"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-1.gif"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">02</span>
                <h3 class="project-item__title">
                  Pièces et Pneus
                </h3>
                <p class="project-item__text">
                  SEO & IA au service de la performance : +50% de trafic en seulement un an.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="project-item project-item--third"
        >
          <div class="project-item__inner">
            <div class="project-item__media">
              <img
                src="/images/project/project-item-media-1.gif"
                alt="Image verre Schmidt"
              >
            </div>
            <div class="project-item__content">
              <div>
                <span class="project-item__number">03</span>
                <h3 class="project-item__title">
                  Découvrons notre Constitution
                </h3>
                <p class="project-item__text">
                  Design ludique au service de l'instruction civique : Rendre la Constitution attractive pour les jeunes générations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.project-grid {
  &__inner {
    position: relative;
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding:8.125rem 0;

    // background: linear-gradient(to right, white 0, transparent 1px,transparent 108px, white 108px, transparent 109px);
    // background-size: 10% 100%;
  }

  &__bg {
    display: grid;
    position: absolute;
    z-index: 1;
    top: 0; left: 0;
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

  &__title {
    position: relative;
    z-index: 2;
    margin-bottom: 4.625rem;
  }

  &__list {
    display: grid;
    position: relative;
    z-index: 2;
    grid-gap: 0 2.85%;
    grid-template-areas:
    ". i1 i1 i1 i1 i1 i1 i1 . . . ."
    "i2 i2 i2 i2 i2 i2 i2 i2 i2 i2 i2 i2"
    ". . . . . i3 i3 i3 i3 i3 i3 i3";
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, auto);

    > div {
      &:nth-child(1) {grid-area: i1;}
      &:nth-child(2) {grid-area: i2;}
      &:nth-child(3) {grid-area: i3;}

      &:not(:last-child) {
        margin-bottom: 4.25rem;
      }
    }
  }
}

.project-item {
  $c: &;

  &__inner {
    display: flex;
    align-items: start;
  }

  &__media {
    width: 100%;
    max-width: 13.4375rem;
    height: 21.25rem;
    overflow: hidden;
    border-radius: 3px;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding-top: 7.5rem;
  }

  &__number {
      display: block;
      margin-bottom: 2.25rem;
      font-size: 1.25rem;
      font-weight: 300;
  }

  &__title {
    margin-bottom: 2.75rem;
    font-size: 2.375rem;
    font-weight: 400;
    line-height: 2.8125rem;
  }

  &__text {
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 2.25rem;
  }

  &--first {
    #{$c}__inner {
      padding-left: 10.1%;
    }
    #{$c}__media {
      position: relative;
      max-width: 15.62rem;
      height: 19.125rem;
      background-color: pink;

      > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    #{$c}__content {
      padding-left: 11.2%;
    }
  }

  &--second {
    #{$c}__inner {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    #{$c}__content {
      padding-top: 8.125rem;
      padding-left: 5.6%;
    }
    #{$c}__text {
      width: 100%;
      max-width: 20.25rem;
    }
  }

  &--third {
    #{$c}__inner {
      padding-left: 10.1%;
    }
    #{$c}__media {
      height: 18.25rem;
    }
    #{$c}__content {
      padding-left: 18%;
    }
  }
}

</style>
