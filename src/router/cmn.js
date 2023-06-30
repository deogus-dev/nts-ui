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
        // 휴가신청
        path: 'holyday',
        name: 'holyday',
        component: () => import('~/views/holyday.vue')
      },
      {
        // 마이페이지
        path: 'myPage',
        name: 'mypage',
        component: () => import('~/views/myPage.vue')
      }
    ]
  }
]

export default routes
