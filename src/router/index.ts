import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage, name: 'home-fr' },
  { path: '/contact/', component: ContactPage, name: 'contact-fr' },
  { path: '/en/', component: HomePage, name: 'home-en' },
  { path: '/en/contact/', component: ContactPage, name: 'contact-en' },
  { path: '/es/', component: HomePage, name: 'home-es' },
  { path: '/es/contact/', component: ContactPage, name: 'contact-es' },
  { path: '/nl/', component: HomePage, name: 'home-nl' },
  { path: '/nl/contact/', component: ContactPage, name: 'contact-nl' },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

export default routes
