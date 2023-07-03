import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import SingleLayout from '~/layout/SingleLayout.vue'

import auth from '~/router/auth'
import cmn from '~/router/cmn'
import exam from '~/router/exam'

const routes = [...auth, ...cmn, ...exam]

routes.push({
  path: '/:pathMatch(.*)*',
  component: SingleLayout,
  children: [
    {
      path: '',
      component: () => import('~/views/404.vue')
    }
  ]
})

const router = createRouter({
  history: createWebHistory('/nts-ui/'),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  if (to.meta.chkLogin && store.isLogin()) {
    router.push('/main')
  }
  next()
})

export default router
