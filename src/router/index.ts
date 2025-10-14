import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ContactPage from '@/pages/ContactPage.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/contact', component: ContactPage },
]

export default routes
