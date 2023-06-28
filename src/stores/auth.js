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
    saveToken({ grantType, accessToken, refreshToken }) {
      if (grantType) {
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
      this.member = {
        id: id,
        name: name
      }
    },
    clearToken() {
      localStorage.clear()
      delete this.accessToken
      delete this.refreshToken
    },
    isLogin() {
      if (this.at) return true
      else return false
    }
  },
  getters: {
    getUserNm(state) {
      return state.member.name
    }
  }
})
