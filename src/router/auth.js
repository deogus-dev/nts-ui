import SingleLayout from '~/layout/SingleLayout.vue'
import index from '~/views/index.vue'
import login from '~/views/auth/login.vue'
import signup from '~/views/auth/signup.vue'

const routes = [
  {
    path: '/',
    component: SingleLayout,
    children: [
      {
        // 앱 초기화면
        path: '',
        component: index
      },
      {
        //로그인
        path: 'login',
        name: '로그인',
        component: login
      },
      {
        // 회원가입
        path: 'signup',
        name: '회원가입',
        component: signup
      }
    ]
  }
]

export default routes
