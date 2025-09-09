import {createRouter, createMemoryHistory, type RouteRecordRaw} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const children: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: 'about', name: 'about', component: AboutView },
]

export const routes: RouteRecordRaw[] = [
  { path: '/', children },
  { path: '/:locale(fr|en)', children }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
