<script setup lang="ts">
import CountComponent from '../count/CountComponent.vue'
</script>

<template>
  <div class="presentation">
    <div class="presentation__grid">
      <p class="presentation__sectionTitle section-title">
        UX-REPUBLIC
      </p>

      <div class="presentation__content">
        <p>
          Dompteur d'expériences digitales qui mettent l'utilisateur au centre. Précurseurs du design à Paris, nous avons grandi avec audace. Aujourd'hui, dans un paysage où les discours se ressemblent, nous choisissons de nous réinventer. Fidèles à nos valeurs — innovation, proximité, pragmatisme et partage — nous affirmons une nouvelle ambition : créer des expériences justes, utiles, performantes et profondément humaines.
        </p>
      </div>
    </div>
    <CountComponent />
  </div>
</template>

<style lang="scss" scoped>
.presentation {
  width: 100%;
  max-width: var(--max-section-width);
  margin: 0 auto;
  padding: 4rem 1rem;

  @include mq(smartphone) {
    padding: 4rem 2rem;
  }

  @include mq(desktop) {
    padding: 7.25rem 0 15.9375rem;
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
