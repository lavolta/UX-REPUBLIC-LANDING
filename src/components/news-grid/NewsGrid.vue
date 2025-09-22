<script lang="ts" setup>
import NewsGridItemText from './NewsGridItemText.vue'
import NewsGridItemImage from './NewsGridItemImage.vue'
import ContactAnimation from '../contact/ContactAnimation.vue'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const items = tm('news.items')

</script>
<template>
  <section class="news">
    <div class="news__inner">
      <p class="news__title section-title">
        News
      </p>
      <div class="news__grid">
        <div
          v-for="(item, key) in items"
          :key="key"
        >
          <NewsGridItemText
            v-if="item.type === 'text'"
            :no-left-padding="key == 0 || key == 4"
            :no-right-padding="key == 3 || key == 7"
            :item="item"
          />
          <NewsGridItemImage
            v-else-if="item.type === 'img'"
            :picture="item.image"
          />
        </div>
      </div>
    </div>
    <ContactAnimation />
  </section>
</template>
<style lang="scss" scoped>
.news {
  position: relative;
  overflow: hidden;

  --item-size: 25%;

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);

    // max-width: 1356px;
    margin: 0 auto;
    padding: 9.1875rem 0 23.3125rem;
  }

  &__title {
    margin-bottom: 5rem;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;

    > div {
      position: relative;
      width: var(--item-size);
      padding-top: var(--item-size);

      &:nth-child(odd) {border-right: 1px solid var(--color-border);}
      &:nth-child(-n+4) {border-bottom: 1px solid var(--color-border);}

      &:nth-child(2) {
        border-right: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      &:nth-child(6) {border-right: 1px solid var(--color-border);}

      > div {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
