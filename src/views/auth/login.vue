<script setup>
import { reactive } from 'vue'
import lib from '~/util/axiosModule'

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
  if (valid()) {
    lib
      .api({
        url: '/auth',
        data: {
          email: userInfo.userId,
          password: userInfo.password
        }
      })
      .then((res) => {
        console.log('res : ', res)
      })
  }
}
</script>
<template>
  <input class="form-control" type="text" placeholder="ID" v-model="userInfo.email" />
  <input type="password" placeholder="PASSWORD" v-model="userInfo.userPw" />
  <button @click="login">Login</button>
</template>
