<!-- components/contact/ContactSection.vue -->
<script setup lang="ts">

</script>

<template>
  <div class="contact">
    <h2 class="contact__title">
      Nous nous engageons à trouver<br>
      les solutions qui vous conviennent.
    </h2>
    <div class="contact__cta">
      <a
        class="button"
        href="#_"
      >
        Contactez-nous
      </a>
      <a
        class="button"
        href="#_"
      >
        Un projet ?
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
