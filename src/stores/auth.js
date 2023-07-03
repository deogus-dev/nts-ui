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
    },
    isLogin() {
      if (localStorage.getItem('accessToken')) return true
      else return false
    }
  },
  getters: {
    getUserNm(state) {
      return state.userNm
    }
  }
})
