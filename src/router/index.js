import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import loadingModule from '~/util/loadingModule'

import SingleLayout from '~/layout/SingleLayout.vue'

import auth from '~/router/auth'
import cmn from '~/router/cmn'
import exam from '~/router/exam'

import { useCmnStore } from '~/stores/cmn'

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
  useCmnStore().showLoading()
  // if (to.meta.chkLogin && !useAuthStore().isLogin) {
  //   alert('로그인 정보가 없습니다. 메인화면으로 돌아갑니다.')
  //   location.href = '/nts-ui/'
  // }

  useCmnStore().modalAllClose()

  // setTimeout(() => {
  next()
  // }, 250)
})

router.afterEach((to, from) => {
  useCmnStore().hideLoading()
})

export default router
