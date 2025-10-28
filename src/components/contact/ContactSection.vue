<!-- components/contact/ContactSection.vue -->
<script setup lang="ts">

</script>

<template>
  <div class="contact">
    <h2 class="contact__title">
      Prêts à transformer <br>
      votre expérience digitale ?
    </h2>
    <div class="contact__cta">
      <RouterLink
        to="/contact"
        class="button"
      >
        Contactez-nous
      </RouterLink>
      <a
        href="https://jobs.smile.eu/departments/ux-republic"
        target="_blank"
        class="button"
      >
        Rejoignez-nous
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  @include mq(desktop) {
    flex-direction: row;
  }

  &__title {
    flex-shrink: 1;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2rem;

    @include mq(desktop) {
      margin-bottom: 0;
      font-size: 2.375rem;
      font-weight: 400;
      line-height: 2.8125rem;
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @include mq(desktop) {
      flex-direction: row;
      align-items: stretch;
    }

    > a {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 400;

      &:not(:last-child) {
        margin-bottom: 1rem;

        @include mq(desktop) {
          margin-right: 2.25rem;
          margin-bottom: 0;
        }
      }

      &:last-child {
        @include mq(desktop) {
          padding-right: 3.25rem;
          padding-left: 3.25rem;
        }
      }
    }
  }
}

</style>
