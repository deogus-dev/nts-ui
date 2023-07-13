<script setup>
import { reactive } from 'vue'
import lib from '~/util/axiosModule'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import valid from '~/util/validation'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()
const userInfo = reactive({})

const login = () => {
  authStore.clearToken()
  if (valid('email', userInfo?.email)) {
    lib
      .api({
        url: '/login',
        data: {
          email: userInfo.email,
          password: userInfo.userPw
        }
      })
      .then(async (res) => {
        await authStore.saveToken(res)
        await authStore.saveMember(res)
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
