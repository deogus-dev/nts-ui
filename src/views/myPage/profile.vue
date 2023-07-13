<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '~/stores/auth'

const userInfo = reactive({})
const authStore = useAuthStore()
</script>

<template>
  <p>이름 | {{ authStore.getUserNm }}</p>
  <p>휴대폰 | {{ userInfo.getUserNm }}</p>
  <p>회사 이메일 | {{ userInfo.getUserNm }}</p>
</template>
