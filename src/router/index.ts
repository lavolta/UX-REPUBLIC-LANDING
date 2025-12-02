import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/contact', component: ContactPage },
  { path: '/en', component: HomePage },
  { path: '/en/contact', component: ContactPage },
  { path: '/es', component: HomePage },
  { path: '/es/contact', component: ContactPage },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
]

export default routes
