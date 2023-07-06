<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import lib from '~/util/axiosModule'

const authStore = useAuthStore()
const router = useRouter()
const menuList = ['프로필 정보', '공지사항', '이용약관', '개인정보처리방침', '버전 정보']
const logout = () => {
  authStore.clearToken()
  lib
    .api({
      url: '/logout',
      data: {
        accessToken: authStore.accessToken
      }
    })
    .then((res) => {
      console.log('res == ', res)
    })
}
</script>

<template>
  <ul>
    <li v-for="item in menuList">
      {{ item }}
    </li>
  </ul>
  <button @click="logout">로그아웃</button>
</template>
