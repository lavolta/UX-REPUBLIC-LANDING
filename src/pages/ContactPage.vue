<script lang="ts" setup>
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDefaultSeo, usePageTransition } from '@/composable'
import HeroBanner from '@/components/hero-banner/HeroBanner2.vue'
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'

useDefaultSeo('contact')
usePageTransition()

const generateHbsptForm = () => {
  if (window) {
    window.hbspt.forms.create({
      portalId: '6113121',
      formId: 'ad2a381b-6c32-4683-adaf-369b6157507d',
      region: 'na1',
      target: '#hubspotForm',
      onFormReady(formulaire: HTMLFormElement) {
        const submitButton = formulaire.querySelector('.actions input')
        submitButton?.classList.add('button')
        ScrollTrigger.refresh()
      },
    })
  }
}
onMounted(() => {
  if (window.hbspt) {
    generateHbsptForm()
    return
  }
  const script = document.createElement('script')
  script.src = 'https://js.hsforms.net/forms/v2.js'
  document.body.appendChild(script)
  script.addEventListener('load', () => {
    generateHbsptForm()
  })
})
</script>

<template>
  <div>
    <HeroBanner />
    <div class="form">
      <div class="form__inner">
        <div
          v-once
          id="hubspotForm"
        />
      </div>
    </div>
  </div>
  <InfiniteScrollText id="contacteznousinfinitescrollcontentcontact">
    {{ $t('footer.infiniteTitle') }}
    <template #icon>
      <StarsIcon />
    </template>
  </InfiniteScrollText>
</template>
<style lang="scss">
.form {
  /* stylelint-disable max-nesting-depth, selector-class-pattern */
  padding: 4rem 2rem;

  @include mq(desktop) {
    padding: 7.25rem 0 15.9375rem;
  }

  &__inner {
    width: 100%;
    max-width: var(--max-section-width);
    margin: 0 auto;
  }
}

.hs-form {
  display: flex;
  flex-wrap: wrap;
  gap:1rem;

  > div {
    width: 100%;

    &:first-child {
      margin-bottom: 3rem;

      .hs-richtext {
        p {
          &:first-child {
            font-size: 2rem!important;
            line-height: 1;

            @include mq(desktop) {
              font-size: 3rem!important;
            }
          }
        }
      }
    }

    &.hs_firstname,
    &.hs_lastname {
      width: 100%;

      @include mq(desktop) {
        width: calc(50% - 0.5rem);
      }
    }
  }

  .hs-input {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--color-btn-border);
    border-radius: 1.875rem;
    background-color: transparent;
    color: var(--color-white);
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.375rem;
  }

  .hs-fieldtype-textarea {
    min-height: 15.625rem;
  }

  .hs-form-field {
    label {
      display: block;
      margin-bottom: 1rem;
    }

    .hs-error-msgs {
      margin-top: 1rem;
    }
  }

  .hs-fieldtype-select {
    .hs-input {
      background-color: var(--color-bg);
    }
  }

  .hs_submit {
    .actions {
        display: block;
        position: relative;
        overflow: hidden;
        border: 1px solid var(--color-btn-border);
        border-radius: 99rem;
        color: var(--color-text);
        line-height: 1;

        &:hover {
          cursor: pointer!important;

          &::after {
            transform: translateY(0);
          }
        }

        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          top:0; left:0;
          width: 100%;
          height: 100%;
          transform: translateY(100%);
          transition: transform ease-in .2s;
          opacity: 10%;
          background: var(--color-white);
        }
    }

    .hs-button {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0.8125rem 1.875rem;
          border: none;
          background-color: transparent;
          text-align: center;
    }
  }
}

</style>
