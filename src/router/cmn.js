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
      }
    ]
  }
]

export default routes
