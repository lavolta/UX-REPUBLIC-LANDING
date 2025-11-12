<script setup lang="ts">
defineProps<{
  backgroundColor: 'black' | 'white'
}>()
</script>

<template>
  <div
    :class="['presentation', `presentation--${backgroundColor}`, {'presentation--noSecondary': !$slots.secondaryContent}]"
  >
    <div class="presentation__inner">
      <div class="presentation__grid">
        <p class="presentation__sectionTitle section-title">
          <slot name="title" />
        </p>

        <div class="presentation__content">
          <p>
            <slot name="content" />
          </p>
        </div>
      </div>
      <div
        v-if="$slots.secondaryContent"
        class="presentation__bottom"
      >
        <slot name="secondaryContent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.presentation {
  width: 100%;
  padding: 4rem 1rem;

  $c: &;

  @include mq(smartphone) {
    padding: 4rem 2rem;
  }

  @include mq(desktop) {
    padding: 7.25rem 0 15.9375rem;
  }

  &--white {
    background-color: var(--color-background);
    color: var(--color-text-dark);
  }

  &--noSecondary {
    #{$c}__grid {
      margin-bottom: 0;
    }

    padding: 7rem 1rem;

    @include mq(smartphone) {
      padding: 7rem 2rem;
    }

    @include mq(desktop) {
      padding: 11rem 0;
    }
  }

  &__inner {
    max-width: var(--max-section-width);
    margin: 0 auto;
  }

  &__sectionTitle {
    margin-bottom: 2rem;
    line-height: 1;

    @include mq(desktop) {
      margin-bottom: 0;
      line-height: 2.8125rem;
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    margin-bottom: 4rem;

    @include mq(desktop) {
      margin-bottom: 13.125rem;
    }

    >* {
      width: 100%;

      @include mq(desktop) {
        width: 50%;
      }
    }
  }

  &__content {
    p {
      margin: 0;
      font-size: 1rem;
      font-weight: 200;
      line-height: 1.3;

      @include mq(smartphone) {
        font-size: 1.2rem;
        line-height: 2rem;
      }

      @include mq(desktop) {
        font-size: 2rem;
        line-height: 2.8125rem;
      }
    }
  }
}

</style>
