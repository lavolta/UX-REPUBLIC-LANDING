import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import HomePageTest from '@/pages/HomePageTest.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/homepagetest', component: HomePageTest },
  { path: '/about', component: AboutPage },
]

export default routes
