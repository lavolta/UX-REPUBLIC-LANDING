import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

const HomePageH1Content = 'HomePage'

describe('HomeView', () => {
  const mountWithMock = () =>
    mount(HomeView, {
      global: {
        mocks: {
          $t: (key: string) => (key === 'hero.title' ? HomePageH1Content : key),
        },
      },
    })

  it('contient un h1', () => {
    const wrapper = mountWithMock()
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
  })

  it('le h1 contient le bon texte', () => {
    const wrapper = mountWithMock()
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe(HomePageH1Content)
  })
})
