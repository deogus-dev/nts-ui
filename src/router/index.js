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

router.beforeEach(async (to, from, next) => {
  useCmnStore().showLoading()

  // console.log('beforeEach from path :', from.path)
  // console.log('beforeEach from meta chkLogin :', !!from.meta?.chkLogin)
  // console.log('beforeEach to path :', to.path)
  // console.log('beforeEach to meta chkLogin :', to.meta?.chkLogin)

  // console.log('beforeEach is login :', !!useAuthStore().isLogin)

  if (to.meta?.chkLogin) {
    if (!useAuthStore().isLogin) {
      alert('로그인 정보가 없습니다. 메인화면으로 돌아갑니다.')
      location.href = '/nts-ui/'
    }
  } else {
    if (useAuthStore().isLogin) {
      location.href = '/nts-ui/main'
    }
  }

  useCmnStore().modalAllClose()

  // setTimeout(() => {
  next()
  // }, 250)
})

router.afterEach((to, from) => {
  useCmnStore().hideLoading()

  // console.log('afterEach from path :', from.path)
  // console.log('afterEach from meta chkLogin :', !!from.meta?.chkLogin)
  // console.log('afterEach to path :', to.path)
  // console.log('afterEach to meta chkLogin :', to.meta?.chkLogin)

  // console.log('afterEach is login :', !!useAuthStore().isLogin)
})

export default router
