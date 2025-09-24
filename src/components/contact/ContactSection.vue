<!-- components/contact/ContactSection.vue -->
<script setup lang="ts">

</script>

<template>
  <div class="contact">
    <h2 class="contact__title">
      Prêts à transformer <br>
      votre expérience digitale&nbsp;?
    </h2>
    <div class="contact__cta">
      <a
        href="mailto:contact@ux-republic.com"
        target="_blank"
        class="button"
      >
        Contactez-nous
      </a>
      <a
        href="https://share.hsforms.com/1yebtsQyRStqLl6yNujF0fw3n0wx"
        target="_blank"
        class="button"
      >
        Votre projet
      </a>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  &__title {
    flex-shrink: 1;
    font-size: 2.375rem;
    font-weight: 400;
    line-height: 2.8125rem;
  }

  &__cta {
    display: flex;
    align-items: stretch;

    > a {
      display: flex;
      align-items: center;
      padding: 0 1.875rem;
      font-size: 1.5rem;
      font-weight: 400;

      &:first-child {
        margin-right: 2.25rem;
      }

      &:last-child {
        padding-right: 3.25rem;
        padding-left: 3.25rem;
      }
    }
  }
}

</style>
