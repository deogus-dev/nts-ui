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
  if (confirm('로그아웃 하시겠습니까?')) {
    lib
      .api({
        url: '/member/logout',
        data: {
          accessToken: authStore.accessToken
        }
      })
      .then(() => {
        authStore.clearToken()
        router.push('/login')
      })
  }
}
</script>

<template>
  <p>{{ authStore.getUserNm }}님 안녕하세요!</p>
  <ul>
    <li v-for="item in menuList">
      <router-link :to="{ name: item.link }">{{ item.name }}</router-link>
    </li>
  </ul>
  <button @click="logout">로그아웃</button>
</template>
