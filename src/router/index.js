import { createRouter, createWebHistory } from 'vue-router'

import notFound from '~/views/404.vue'

import auth from '~/router/auth'
import exam from '~/router/exam'

const routes = [...auth, ...exam]

routes.push({
  path: '/:pathMatch(.*)*',
  component: notFound
  // children: [
  //   {
  //     path: '',
  //     component: notFound
  //   }
  // ]
})
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
