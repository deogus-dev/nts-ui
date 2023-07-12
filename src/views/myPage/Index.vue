<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import lib from '@/util/axiosModule'

const authStore = useAuthStore()
const router = useRouter()
const menuList = [
  { link: 'profile', name: '프로필 정보' },
  { link: 'notice', name: '공지사항' },
  { link: 'terms', name: '이용약관' },
  { link: 'privacy', name: '개인정보처리방침' },
  { link: 'version', name: '버전 정보' }
]

const logout = () => {
  // authStore.clearToken()
  lib
    .api({
      url: '/logout',
      data: {
        accessToken: authStore.accessToken
      }
    })
    .then((res) => {
      authStore.clearToken()
      console.log('res == ', res)
    })
}
</script>

<template>
  <ul>
    <li v-for="item in menuList">
      <router-link :to="{ name: item.link }">{{ item.name }}</router-link>
    </li>
  </ul>
  <button @click="logout">로그아웃</button>
</template>
