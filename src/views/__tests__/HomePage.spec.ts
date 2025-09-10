import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { fr } from '@/locales'

const HomePageH1Content = fr.hero.title

vi.mock('@unhead/vue', () => ({
  useHead: vi.fn(), // no-op
}))

describe('HomeView', () => {
  it('contient un h1', () => {
    const wrapper = mount(HomeView)
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
  })

  it('le h1 contient le bon texte', () => {
    const wrapper = mount(HomeView)
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe(HomePageH1Content)
  })
})
