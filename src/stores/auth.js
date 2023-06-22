import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    loadToken() {
      let at, rt
      at = localStorage.getItem('accessToken')
      rt = localStorage.getItem('refreshToken')

      this.accessToken = at
      this.refreshToken = rt
    },
    saveToken({ accessToken, refreshToken }) {
      console.log('save token', accessToken, refreshToken)
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        this.accessToken = accessToken
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
        this.refreshToken = refreshToken
      }
    },
    clearToken() {
      localStorage.clear()
      delete this.at
      delete this.rt
    }
  },
  getters: {
    getUserNm(state) {
      return state.userNm
    }
  }
})
