import { createRouter, createWebHistory } from 'vue-router'
import SingleLayout from '~/layout/SingleLayout.vue'
import appMain from '~/views/appMain.vue'
import notFound from '~/views/404.vue'

import auth from '~/router/auth'
import exam from '~/router/exam'

const routes = [...auth, ...exam]

routes.push(
  {
    //앱 메인
    path: '/index',
    component: SingleLayout,
    children: [
      {
        path: '',
        component: appMain
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: notFound
    // children: [
    //   {
    //     path: '',
    //     component: notFound
    //   }
    // ]
  }
)
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
