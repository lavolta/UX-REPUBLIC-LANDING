<script lang="ts" setup>
import { ref } from 'vue'
import NewsGridItemText from './NewsGridItemText.vue'
import NewsGridItemImage from './NewsGridItemImage.vue'
import NewGridSocialItem from './NewGridSocialItem.vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { cleanDataArcticleFromUxRepublicResponse } from '@/utils/data.utils'
import type { UxRepublicArticleInterface, NewsItemType } from '@/interfaces'
const { tm, locale } = useI18n()
const items = tm('news.items')

const gridToDisplay = ref(items)
const mapFrechDataWithDefaultData = (data: UxRepublicArticleInterface[]) => {
  const frechData = gridToDisplay.value.reduce<NewsItemType[]>((acc, currentItem, currrentItemIndex) => {
    if (currentItem.type === 'text') {
      acc.push(cleanDataArcticleFromUxRepublicResponse(data[currrentItemIndex]))
    }
    else {
      acc.push(currentItem)
    }
    return acc
  }, [])
  gridToDisplay.value = frechData
}
onMounted(async () => {
  try {
    const urlToFetch = locale.value === 'fr' ? `https://www.ux-republic.com/wp-json/wp/v2/posts?per_page=8` : `https://www.ux-republic.com/${locale.value}/wp-json/wp/v2/posts?per_page=8`
    const response = await fetch(urlToFetch)
    const data: UxRepublicArticleInterface[] = await response.json()
    mapFrechDataWithDefaultData(data)
    if (response.status !== 200) {
      throw new Error('failed to fetch news post')
    }
  }
  catch (error) {
    console.log('error', error)
  }
})

</script>
<template>
  <section class="news">
    <div class="news__inner">
      <p class="news__title section-title">
        News
      </p>
      <div class="news__grid">
        <div
          v-for="(item, key) in gridToDisplay"
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
          <NewGridSocialItem
            v-else-if="item.type === 'social'"
            :no-left-padding="key == 0 || key == 4"
            :no-right-padding="key == 3 || key == 7"
            :item="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.news {
  position: relative;
  overflow: hidden;

  --item-size: 100%;

  @include mq(tablet) {
    --item-size: 50%;
  }

  @include mq(desktop) {
    --item-size: 25%;
  }

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);

    // max-width: 1356px;
    margin: 0 auto;
    padding: 4rem 1rem;

    @include mq(smartphone) {
      padding: 4rem 2rem;
    }

    @include mq(desktop) {
      padding: 9.1875rem 0;
    }

  }

  &__title {
    margin-bottom: 2rem;

    @include mq(tablet) {
      margin-bottom: 5rem;
    }
  }

  &__grid {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: auto;
    gap: 1rem;

    @include mq(tablet) {
      flex-wrap: wrap;
      overflow-y: hidden;
      gap: 0;
    }

    > div {
      position: relative;
      flex: 0 0 90%;
      width: var(--item-size);
      padding-top: var(--item-size);
      border: 1px solid var(--color-border);

      @include mq(tablet) {
        flex: 0 0 auto;
      }

      @include mq(desktop) {
        border: none;
        &:nth-child(odd) {border-right: 1px solid var(--color-border);}
        &:nth-child(-n+4) {border-bottom: 1px solid var(--color-border);}

        &:nth-child(2) {
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        &:nth-child(6) {border-right: 1px solid var(--color-border);}
      }

      > * {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
