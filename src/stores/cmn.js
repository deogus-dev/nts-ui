import { defineStore } from 'pinia'
import _ from 'lodash'

export const useCmnStore = defineStore('cmn', {
  state: () => ({
    loading: false,
    modal: {
      full: false,
      half: false,
      kakao: false,
      holy: false
    },
    cmnCode: {
      holyType: [
        {
          code: 'AT06',
          value: '전일'
        },
        {
          code: 'AT02',
          value: '오전반차'
        },
        {
          code: 'AT03',
          value: '오후반차'
        },
        {
          code: 'AT04',
          value: '오전반반차'
        },
        {
          code: 'AT05',
          value: '오후반반차'
        }
      ]
    }
  }),
  actions: {
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    openModal(type) {
      this.modal[type] = true
    },
    closeModal(type) {
      this.modal[type] = false
    },
    modalAllClose() {
      this.modal = _.mapValues(this.modal, () => null)
      // for (const key in this.modal) {
      //   if (this.modal.hasOwnProperty(key)) {
      //     this.modal[key] = null;
      //   }
      // }
    }
  },
  getters: {
    getCmnCode: (state) => (type) => {
      return state.cmnCode[type]
    },
    isLoading(state) {
      return this.loading
    }
  }
})
