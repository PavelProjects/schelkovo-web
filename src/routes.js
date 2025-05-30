import { createRouter, createWebHashHistory } from "vue-router"
import SpotStatus from "./components/SpotStatus.vue"
import AdminPanel from "./components/AdminPanel.vue"

const unkownRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/'
}

const routes = [
  {
    name: 'spot-status',
    path: '/',
    component: SpotStatus
  },
  {
    name: 'admin',
    path: '/admin',
    component: AdminPanel
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})