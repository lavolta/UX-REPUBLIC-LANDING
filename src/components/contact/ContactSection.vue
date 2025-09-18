<!-- components/contact/ContactSection.vue -->
<script setup lang="ts">
import ButtonComponent from '../ui/ButtonComponent.vue'
</script>

<template>
  <div class="contact-container">
    <div class="contact-grid">
      <div class="title-section">
        <h2 class="contact-title">
          Nous nous engageons à trouver<br>
          les solutions qui vous conviennent.
        </h2>
      </div>

      <div class="cta-section">
        <ButtonComponent
          variant="outline"
          size="large"
          class="contact-cta email-cta"
        >
          par email ?
        </ButtonComponent>

        <ButtonComponent
          variant="outline"
          size="large"
          class="contact-cta phone-cta"
        >
          par téléphone ?
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$grid-gap-mobile: 1.5rem;
$grid-gap-desktop: 2.6875rem; // 43px

.contact-container {
  width: 100%;
}

.contact-grid {
  display: grid;
  gap: $grid-gap-mobile;

  @include mq(desktop) {
    grid-template-columns: repeat(12, 1fr);
    gap: $grid-gap-desktop;
    align-items: center;
  }
}

.title-section {
  text-align: center;

  @include mq(desktop) {
    grid-column: 1 / span 6;
    text-align: left;
  }

  @include mq(large) {
    grid-column: 1 / span 7;
  }
}

.cta-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @include mq(tablet) {
    flex-flow: row wrap;
    justify-content: center;
  }

  @include mq(desktop) {
    grid-column: 7 / span 6;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 1.5rem;
  }

  @include mq(large) {
    grid-column: 8 / span 5;
  }
}

.contact-title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;

  @include mq(desktop) {
    font-size: 2.375rem;
    line-height: 2.8125rem;
  }
}

.contact-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 18rem;
  height: 3.5rem;
  border: 1px solid #555555;
  border-radius: 41.5px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  white-space: nowrap;

  @include mq(desktop) {
    height: 4rem;
    font-size: 1.25rem;

    &.email-cta {
      width: 11rem;
    }

    &.phone-cta {
      width: 16rem;
    }
  }
}
</style>
