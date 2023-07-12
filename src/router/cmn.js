import MainLayout from '~/layout/MainLayout.vue'

const routes = [
  {
    path: '/main',
    component: MainLayout,
    children: [
      {
        // 앱 메인
        path: '',
        component: () => import('~/views/appMain.vue')
      },
      {
        // 출근기록
        path: 'history',
        name: 'history',
        component: () => import('~/views/history.vue')
      },
      {
        // 마이페이지
        path: 'myPage',
        name: 'mypage',
        component: () => import('~/views/myPage/Index.vue')
      },
      {
        // 마이페이지
        path: 'profile',
        name: 'profile',
        component: () => import('~/views/myPage/profile.vue')
      },
      {
        // 마이페이지
        path: 'notice',
        name: 'notice',
        component: () => import('~/views/myPage/notice.vue')
      },
      {
        // 마이페이지
        path: 'terms',
        name: 'terms',
        component: () => import('~/views/myPage/terms.vue')
      },
      {
        // 마이페이지
        path: 'privacy',
        name: 'privacy',
        component: () => import('~/views/myPage/privacy.vue')
      },
      {
        // 마이페이지
        path: 'version',
        name: 'version',
        component: () => import('~/views/myPage/version.vue')
      }
    ],
    meta: {
      chkLogin: true
    }
  }
]

export default routes
