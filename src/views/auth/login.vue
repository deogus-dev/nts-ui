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
      .then((res) => {
        authStore.saveToken(res)
        authStore.saveMember(res)
        router.push('/main')
      })
  }
}

const getApi = () => {
  axios
    .get(
      'https://www.ninetosixapi.tk/codes',
      { params: {} },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS'
        }
      }
    )
    .then((res) => {
      console.log('get Method resp', res)
    })
    .catch((error) => {
      console.log('get Method error', error)
    })
}

const postApi = () => {
  axios
    .post('/login', {
      email: 'it1485@gsitm.com',
      password: '1'
    })
    .then((res) => {
      console.log('post Method resp', res)
    })
    .catch((error) => {
      console.log('post Method error', error)
    })
}
</script>
<template>
  <input type="text" placeholder="ID" v-model="userInfo.email" />
  <input type="password" placeholder="PASSWORD" v-model="userInfo.userPw" />
  <button @click="login">Login</button>
  <button @click="getApi">get Api Test</button>
  <button @click="postApi">post Api Test</button>
</template>
