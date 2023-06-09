import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    grantType: null,
    accessToken: null,
    refreshToken: null,
    userId: null,
    userNm: null
  }),
  actions: {
    loadToken() {
      this.grantType = localStorage.getItem('grantType')
      this.accessToken = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
      this.userId = localStorage.getItem('userId')
      this.userNm = localStorage.getItem('userNm')
    },
    saveToken({ grantType, accessToken, refreshToken }) {
      if (grantType) {
        localStorage.setItem('grantType', grantType)
        this.grantType = grantType
      }
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        this.accessToken = accessToken
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
        this.refreshToken = refreshToken
      }
    },
    saveMember({ id, name }) {
      if (id) {
        localStorage.setItem('userId', id)
        this.userId = id
      }
      if (name) {
        localStorage.setItem('userNm', name)
        this.userNm = name
      }
    },
    clearToken() {
      localStorage.clear()
      delete this.accessToken
      delete this.refreshToken
    }
  },
  getters: {
    getUserNm(state) {
      return state.userNm
    },
    isLogin(state) {
      // const lcat = localStorage.getItem('accessToken')
      // return lcat

      return !!state.accessToken

      // console.log('authstore is login', !!state.userId)
      // console.log('localstorage at is?', !!localStorage.getItem('accessToken'))
      // return !!state.userId && !!localStorage.getItem('accessToken')
    }
  }
})
