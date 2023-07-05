import { defineStore } from 'pinia'

export const useCmnStore = defineStore('cmn', {
  state: () => ({
    modal: {
      full: false,
      half: false,
      kakao: false,
      holy: false
    }
  }),
  actions: {
    openModal(type) {
      this.modal[type] = true
    },
    closeModal(type) {
      this.modal[type] = false
    }
  }
})
