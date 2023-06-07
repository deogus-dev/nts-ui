import SingleLayout from '~/layout/SingleLayout.vue'
import login from '~/views/auth/login.vue'
import signup from '~/views/auth/signup.vue'

const routes = [
  {
    path: '/',
    component: SingleLayout,
    children: [
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
