<script setup>
import { reactive } from 'vue'
import lib from '~/util/axiosModule'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const userInfo = reactive({})

const valid = () => {
  if (!userInfo?.email) {
    alert('아이디를 입력해주세요')
    return false
  } else if (!userInfo?.userPw) {
    alert('비밀번호를 입력해주세요')
    return false
  }
  return true
}

const login = () => {
  authStore.clearToken()
  if (valid()) {
    lib
      .api({
        url: '/auth',
        data: {
          email: userInfo.email,
          password: userInfo.userPw
        }
      })
      .then((res) => {
        console.log('res = ', res)
        authStore.saveToken(res)
        router.push('/main')
      })
  }
}
</script>
<template>
  <input type="text" placeholder="ID" v-model="userInfo.email" />
  <input type="password" placeholder="PASSWORD" v-model="userInfo.userPw" />
  <button @click="login">Login</button>
</template>
