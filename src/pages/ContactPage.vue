<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDefaultSeo, usePageTransition } from '@/composable'
import HeroBanner from '@/components/hero-banner/HeroBanner.vue'
import InfiniteScrollText from '@/components/infinite-scroll-text/InfiniteScrollText.vue'
import StarsIcon from '@/components/icons/StarsIcon.vue'
const { locale } = useI18n()
useDefaultSeo('contact')
usePageTransition()

// const formId = {
//   fr: 'c9e6edb1-0c91-4ada-8b97-ac8dba31747f',
//   en: '7580579c-7ec5-4443-b18f-45e19b2c875b',
//   es: '7580579c-7ec5-4443-b18f-45e19b2c875b',
//   nl: '7580579c-7ec5-4443-b18f-45e19b2c875b',
// }
const getFormId = (): string => {
  return locale.value === 'fr' ? 'c9e6edb1-0c91-4ada-8b97-ac8dba31747f' : '7580579c-7ec5-4443-b18f-45e19b2c875b'
}
const generateHbsptForm = () => {
  if (window) {
    window.hbspt.forms.create({
      portalId: '6113121',
      formId: getFormId(),
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
    padding: 7.25rem 0 4.9375rem;
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
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 350px;
    margin: 1rem auto;

    .actions {
        display: inline-block;
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
          display: block;
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0.8125rem 1.875rem;
          border: none;
          background-color: transparent;
          font-size: 1.5rem;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;

          @include mq (smartphone) {
            padding: 1.8125rem 3.25rem;
          }

          &:hover {
            cursor: pointer;
          }
    }
  }
}

</style>
